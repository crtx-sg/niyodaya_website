// POST /api/razorpay-webhook
// Razorpay → our server, fired on payment events.
// Verifies signature and ensures every successful payment
// is recorded in the `donations` table even if the browser
// flow was interrupted.

import { json } from '@sveltejs/kit';
import { insert, list } from '$lib/server/insforge.js';
import { verifyWebhookSignature } from '$lib/server/razorpay.js';

export async function POST({ request }) {
  const signature = request.headers.get('x-razorpay-signature') || '';
  const raw = await request.text();

  if (!verifyWebhookSignature(raw, signature)) {
    return json({ error: 'Invalid signature' }, { status: 400 });
  }

  let payload;
  try { payload = JSON.parse(raw); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }

  const event = payload.event;
  const entity = payload.payload?.payment?.entity;
  if (!event || !entity) return json({ ok: true, skipped: 'no payment entity' });

  if (event === 'payment.captured') {
    // Idempotent — skip if we already have this payment.
    const existing = ((await list('donations')) || []).find((r) => r.razorpay_payment_id === entity.id);
    if (existing) return json({ ok: true, already: true });

    await insert('donations', {
      donor_name: entity.notes?.donor || entity.email || 'Unknown donor',
      email:      entity.email || null,
      phone:      entity.contact || null,
      pan:        String(entity.notes?.pan || '').toUpperCase() || null,
      amount:     Number(entity.amount || 0) / 100,
      purpose:    entity.notes?.purpose || null,
      razorpay_order_id:   entity.order_id,
      razorpay_payment_id: entity.id,
      cert_sent:  false,
      status:     'captured_via_webhook'
    });
    return json({ ok: true, recorded: entity.id });
  }

  if (event === 'payment.failed') {
    // Simply log — we don't record failed payments.
    console.log('[razorpay-webhook] payment.failed', entity.id, entity.error_description);
  }

  return json({ ok: true });
}
