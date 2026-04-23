// =====================================================
// Razorpay integration — order creation + signature check
// =====================================================
// Docs: https://razorpay.com/docs/payments/server-integration/nodejs/
//
// In v0.1 we intentionally do NOT depend on the razorpay
// npm package — we call Razorpay's REST API directly with
// fetch() so install is lighter and there's no native build.
// Swap to the SDK later if preferred.
// =====================================================

import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

function creds() {
  return {
    keyId: env.RAZORPAY_KEY_ID,
    keySecret: env.RAZORPAY_KEY_SECRET,
    webhookSecret: env.RAZORPAY_WEBHOOK_SECRET
  };
}

export function isConfigured() {
  const { keyId, keySecret } = creds();
  return Boolean(keyId && keySecret);
}

/**
 * Create a Razorpay order server-side.
 * @param {{amountPaise: number, receipt: string, notes?: Record<string,string>}} opts
 * @returns {Promise<{ok: boolean, order?: any, error?: string}>}
 */
export async function createOrder({ amountPaise, receipt, notes = {} }) {
  if (!isConfigured()) {
    // Mock order so the Donate page UI can still render in dev
    return {
      ok: true,
      order: {
        id: `order_mock_${Date.now()}`,
        amount: amountPaise,
        currency: 'INR',
        receipt,
        status: 'created_mock',
        notes
      }
    };
  }

  const { keyId, keySecret } = creds();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  try {
    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
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

/**
 * Verify the signature returned from a Razorpay Checkout success.
 * Called from our success handler BEFORE we record the donation.
 */
export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const { keySecret } = creds();
  if (!keySecret) return false;
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return expected === signature;
}

/**
 * Verify a Razorpay webhook signature.
 * Use this in /api/razorpay-webhook (not implemented in v0.1).
 */
export function verifyWebhookSignature(rawBody, signature) {
  const { webhookSecret } = creds();
  if (!webhookSecret) return false;
  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}
