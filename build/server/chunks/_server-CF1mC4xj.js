import { j as json, b as private_env } from './shared-server-CpOoumKm.js';
import { i as insert } from './insforge-BJ62C2Sl.js';
import { v as validate, s as sendToUserAndAdmin, b as isPositiveNumber, c as isPan, a as isPhone, i as isEmail, r as required } from './validation-DEofG8tH.js';
import crypto from 'node:crypto';
import 'nodemailer';

function creds() {
  return {
    keyId: private_env.RAZORPAY_KEY_ID,
    keySecret: private_env.RAZORPAY_KEY_SECRET,
    webhookSecret: private_env.RAZORPAY_WEBHOOK_SECRET
  };
}
function isConfigured() {
  const { keyId, keySecret } = creds();
  return Boolean(keyId && keySecret);
}
async function createOrder({ amountPaise, receipt, notes = {} }) {
  if (!isConfigured()) {
    return {
      ok: true,
      order: {
        id: `order_mock_${Date.now()}`,
        amount: amountPaise,
        currency: "INR",
        receipt,
        status: "created_mock",
        notes
      }
    };
  }
  const { keyId, keySecret } = creds();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt,
        notes
      })
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: `Razorpay ${res.status}: ${t}` };
    }
    return { ok: true, order: await res.json() };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const { keySecret } = creds();
  if (!keySecret) return false;
  const expected = crypto.createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  return expected === signature;
}
const VALIDATORS = {
  donor_name: (v) => required(v, "Donor name"),
  email: isEmail,
  phone: isPhone,
  pan: isPan,
  amount: isPositiveNumber
};
async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { ok, errors } = validate(body, VALIDATORS);
  if (!ok) return json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
  const amountPaise = Math.round(Number(body.amount) * 100);
  const receipt = `rcpt_${Date.now()}`;
  const order = await createOrder({
    amountPaise,
    receipt,
    notes: { pan: String(body.pan).toUpperCase(), donor: body.donor_name, email: body.email }
  });
  if (!order.ok) return json({ error: order.error || "Unable to create order" }, { status: 502 });
  return json({
    ok: true,
    order: order.order,
    publicKey: private_env.PUBLIC_RAZORPAY_KEY_ID || private_env.RAZORPAY_KEY_ID || ""
  });
}
async function PUT({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const signatureOk = private_env.RAZORPAY_KEY_SECRET ? verifyPaymentSignature({
    orderId: body.razorpay_order_id,
    paymentId: body.razorpay_payment_id,
    signature: body.razorpay_signature
  }) : true;
  if (!signatureOk) {
    return json({ error: "Signature mismatch — payment could not be verified." }, { status: 400 });
  }
  const result = await insert("donations", {
    donor_name: body.donor_name,
    email: body.email,
    phone: body.phone,
    pan: String(body.pan || "").toUpperCase(),
    amount: Number(body.amount),
    purpose: body.purpose || null,
    razorpay_order_id: body.razorpay_order_id,
    razorpay_payment_id: body.razorpay_payment_id,
    cert_sent: false,
    // admin toggles this from /admin/reports/donors
    status: "captured"
  });
  if (!result.ok) return json({ error: result.error || "Save failed" }, { status: 500 });
  const formatted = Number(body.amount).toLocaleString("en-IN");
  const subject = `Thank you for your donation to Niyodaya — ₹${formatted}`;
  const ackBody = `
    <p>We have received your contribution of <strong>₹${formatted}</strong>. Your support means a great deal to us and to the children we work with.</p>
    <p>A formal 80G receipt will follow shortly for tax purposes.</p>
    <ul>
      <li><b>Donor:</b> ${esc(body.donor_name)}</li>
      <li><b>PAN:</b> ${esc(String(body.pan || "").toUpperCase())}</li>
      <li><b>Amount:</b> ₹${formatted}</li>
      <li><b>Payment ref:</b> ${esc(body.razorpay_payment_id)}</li>
      <li><b>Purpose:</b> ${esc(body.purpose || "—")}</li>
    </ul>
  `;
  sendToUserAndAdmin({
    userEmail: body.email,
    userName: body.donor_name,
    subject,
    body: ackBody
  }).catch(() => {
  });
  return json({ ok: true, id: result.id });
}
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export { POST, PUT };
//# sourceMappingURL=_server-CF1mC4xj.js.map
