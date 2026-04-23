import { b as private_env } from './shared-server-CO0iTl3r.js';
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
function verifyWebhookSignature(rawBody, signature) {
  const { webhookSecret } = creds();
  if (!webhookSecret) return false;
  const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  return expected === signature;
}

export { verifyWebhookSignature as a, createOrder as c, verifyPaymentSignature as v };
//# sourceMappingURL=razorpay-MZEdMOjq.js.map
