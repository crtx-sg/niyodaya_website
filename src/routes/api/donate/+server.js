// Donate endpoint
//   POST /api/donate  → create Razorpay order
//   PUT  /api/donate  → verify signature + record donation + email receipts
import { json } from '@sveltejs/kit';
import { insert, update } from '$lib/server/insforge.js';
import { sendToUserAndAdmin } from '$lib/server/email.js';
import { createOrder, verifyPaymentSignature } from '$lib/server/razorpay.js';
import { generateReceipt } from '$lib/server/receipt.js';
import { env } from '$env/dynamic/private';
import { validate, required, isEmail, isPhone, isPan, isPositiveNumber } from '$lib/utils/validation.js';

const VALIDATORS = {
  donor_name: (v) => required(v, 'Donor name'),
  email: isEmail,
  phone: isPhone,
  pan: isPan,
  amount: isPositiveNumber
};

export async function POST({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { ok, errors } = validate(body, VALIDATORS);
  if (!ok) return json({ error: 'Please correct the highlighted fields.', errors }, { status: 400 });

  const amountPaise = Math.round(Number(body.amount) * 100);
  const receipt = `rcpt_${Date.now()}`;

  const order = await createOrder({
    amountPaise,
    receipt,
    notes: { pan: String(body.pan).toUpperCase(), donor: body.donor_name, email: body.email }
  });
  if (!order.ok) return json({ error: order.error || 'Unable to create order' }, { status: 502 });

  return json({
    ok: true,
    order: order.order,
    publicKey: env.PUBLIC_RAZORPAY_KEY_ID || env.RAZORPAY_KEY_ID || ''
  });
}

export async function PUT({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }

  const signatureOk =
    env.RAZORPAY_KEY_SECRET
      ? verifyPaymentSignature({
          orderId: body.razorpay_order_id,
          paymentId: body.razorpay_payment_id,
          signature: body.razorpay_signature
        })
      : true; // Mock mode — accept without verification

  if (!signatureOk) {
    return json({ error: 'Signature mismatch — payment could not be verified.' }, { status: 400 });
  }

  const result = await insert('donations', {
    donor_name: body.donor_name,
    email: body.email,
    phone: body.phone,
    pan: String(body.pan || '').toUpperCase(),
    amount: Number(body.amount),
    purpose: body.purpose || null,
    razorpay_order_id: body.razorpay_order_id,
    razorpay_payment_id: body.razorpay_payment_id,
    cert_sent: false,                  // admin toggles this from /admin/reports/donors
    status: 'captured'
  });
  if (!result.ok) return json({ error: result.error || 'Save failed' }, { status: 500 });

  const formatted = Number(body.amount).toLocaleString('en-IN');
  const subject = `Thank you for your donation to Niyodaya — ₹${formatted}`;

  // Generate the 80G receipt PDF and attach it to the thank-you email.
  let attachments = [];
  try {
    const pdf = await generateReceipt({
      donor_name: body.donor_name,
      email: body.email,
      phone: body.phone,
      pan: body.pan,
      amount: body.amount,
      purpose: body.purpose,
      payment_id: body.razorpay_payment_id,
      order_id: body.razorpay_order_id,
      created_at: new Date().toISOString()
    });
    attachments = [{ filename: 'Niyodaya_80G_Receipt.pdf', content: pdf, contentType: 'application/pdf' }];
    // Mark as sent immediately — we're delivering the receipt in this email.
    await update('donations', result.id, { cert_sent: true }).catch(() => {});
  } catch (err) {
    console.error('[donate] receipt generation failed:', err.message);
  }

  // Public re-download link (so the donor can fetch the receipt later too).
  const origin = env.PUBLIC_SITE_URL || 'https://niyodaya.in';
  const reDownload = `${origin}/api/receipt?payment_id=${encodeURIComponent(body.razorpay_payment_id || '')}&pan=${encodeURIComponent(String(body.pan || '').toUpperCase())}`;

  const ackBody = `
    <p>We have received your contribution of <strong>₹${formatted}</strong>. Your support means a great deal to us and to the children we work with.</p>
    <p>Your <strong>80G receipt</strong> is attached to this email. You can also <a href="${reDownload}">re-download it any time</a>.</p>
    <ul>
      <li><b>Donor:</b> ${esc(body.donor_name)}</li>
      <li><b>PAN:</b> ${esc(String(body.pan || '').toUpperCase())}</li>
      <li><b>Amount:</b> ₹${formatted}</li>
      <li><b>Payment ref:</b> ${esc(body.razorpay_payment_id)}</li>
      <li><b>Purpose:</b> ${esc(body.purpose || '—')}</li>
    </ul>
  `;

  sendToUserAndAdmin({
    userEmail: body.email,
    userName: body.donor_name,
    subject,
    body: ackBody,
    attachments
  }).catch(() => {});

  return json({ ok: true, id: result.id });
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
