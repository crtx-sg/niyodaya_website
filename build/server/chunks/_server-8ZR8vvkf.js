import { j as json, b as private_env } from './shared-server-CpOoumKm.js';
import { i as insert } from './insforge-7dizFqev.js';
import { v as validate, s as sendEmail, b as ackTemplate, c as isPositiveNumber, d as isPan, i as isPhone, a as isEmail, r as required } from './validation-BkjWqkSF.js';
import crypto from 'node:crypto';

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
    status: "captured"
  });
  if (!result.ok) return json({ error: result.error || "Save failed" }, { status: 500 });
  sendEmail({
    to: body.email,
    subject: "Thank you for your donation to Niyodaya Foundation",
    html: ackTemplate({
      name: body.donor_name,
      subject: "Donation received",
      body: `We have received your contribution of ₹${Number(body.amount).toLocaleString("en-IN")}. An 80G receipt will follow shortly. Ref: ${body.razorpay_payment_id}.`
    })
  }).catch(() => {
  });
  sendEmail({
    to: private_env.EMAIL_ADMIN || "contact@niyodaya.in",
    subject: `[Donation] ₹${Number(body.amount).toLocaleString("en-IN")} — ${body.donor_name}`,
    html: `<p>New donation captured.</p><pre>${JSON.stringify(body, null, 2)}</pre>`
  }).catch(() => {
  });
  return json({ ok: true, id: result.id });
}

export { POST, PUT };
//# sourceMappingURL=_server-8ZR8vvkf.js.map
