// GET /api/admin/donors/receipt?id=<donation_id>
// Admin-only (protected via hooks.server.js). Generates and returns
// the per-donor 80G receipt PDF on demand.

import { list } from '$lib/server/insforge.js';
import { generateReceipt } from '$lib/server/receipt.js';
import { error } from '@sveltejs/kit';

export async function GET({ url }) {
  const id = url.searchParams.get('id');
  if (!id) throw error(400, 'id is required');

  const rows = (await list('donations')) || [];
  const d = rows.find((r) => r.id === id);
  if (!d) throw error(404, 'Donation not found');

  const pdf = await generateReceipt({
    donor_name: d.donor_name,
    email: d.email,
    phone: d.phone,
    pan: d.pan,
    amount: d.amount,
    purpose: d.purpose,
    payment_id: d.razorpay_payment_id,
    order_id: d.razorpay_order_id,
    created_at: d.created_at
  });

  const safeName = String(d.donor_name || 'donor').replace(/[^a-z0-9]+/gi, '_');
  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Niyodaya_80G_Receipt_${safeName}.pdf"`,
      'Cache-Control': 'private, no-store'
    }
  });
}
