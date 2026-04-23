// Donate endpoint
//   POST /api/donate  → create Razorpay order
//   PUT  /api/donate  → verify signature + record donation
import { json } from '@sveltejs/kit';
import { insert } from '$lib/server/insforge.js';
import { sendEmail, ackTemplate } from '$lib/server/email.js';
import { createOrder, verifyPaymentSignature } from '$lib/server/razorpay.js';
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
    status: 'captured'
  });
  if (!result.ok) return json({ error: result.error || 'Save failed' }, { status: 500 });

  // Email an acknowledgement to the donor + admin (best effort)
  sendEmail({
    to: body.email,
    subject: 'Thank you for your donation to Niyodaya Foundation',
    html: ackTemplate({
      name: body.donor_name,
      subject: 'Donation received',
      body: `We have received your contribution of ₹${Number(body.amount).toLocaleString('en-IN')}. An 80G receipt will follow shortly. Ref: ${body.razorpay_payment_id}.`
    })
  }).catch(() => {});
  sendEmail({
    to: env.EMAIL_ADMIN || 'contact@niyodaya.in',
    subject: `[Donation] ₹${Number(body.amount).toLocaleString('en-IN')} — ${body.donor_name}`,
    html: `<p>New donation captured.</p><pre>${JSON.stringify(body, null, 2)}</pre>`
  }).catch(() => {});

  return json({ ok: true, id: result.id });
}
