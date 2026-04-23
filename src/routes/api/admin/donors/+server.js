// Admin report — Donors
//   GET  /api/admin/donors?year=2025&format=json|csv
//   PATCH /api/admin/donors/{id}   { cert_sent: true|false }
//
// v0.1 NOTE: these endpoints are NOT yet protected. Put them behind
// HTTP Basic Auth at the hosting layer, or Insforge Auth in v0.2.

import { json } from '@sveltejs/kit';
import { list, update, seedSampleData } from '$lib/server/insforge.js';
import { toCSV } from '$lib/utils/csv.js';

const COLUMNS = [
  { key: 'created_at',          label: 'Date' },
  { key: 'donor_name',          label: 'Donor name' },
  { key: 'email',               label: 'Email' },
  { key: 'phone',               label: 'Phone' },
  { key: 'pan',                 label: 'PAN' },
  { key: 'amount',              label: 'Amount (INR)' },
  { key: 'purpose',             label: 'Purpose' },
  { key: 'razorpay_payment_id', label: 'Payment ref' },
  { key: 'cert_sent',           label: '80G sent?' },
  { key: 'status',              label: 'Status' }
];

export async function GET({ url }) {
  seedSampleData();
  const year = url.searchParams.get('year');
  const format = url.searchParams.get('format') || 'json';

  let rows = (await list('donations')) || [];
  if (year && year !== 'all') rows = rows.filter((r) => (r.created_at || '').startsWith(year));
  rows.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

  if (format === 'csv') {
    const csv = toCSV(rows.map((r) => ({ ...r, cert_sent: r.cert_sent ? 'Yes' : 'No' })), COLUMNS);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="niyodaya-donors-${year || 'all'}.csv"`
      }
    });
  }

  const totalAmount = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const years = [...new Set(
    ((await list('donations')) || []).map((r) => (r.created_at || '').slice(0, 4)).filter(Boolean)
  )].sort().reverse();

  return json({ rows, totalAmount, years, columns: COLUMNS });
}

export async function PATCH({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!body.id) return json({ error: 'id is required' }, { status: 400 });
  const res = await update('donations', body.id, { cert_sent: Boolean(body.cert_sent) });
  if (!res.ok) return json({ error: res.error }, { status: 400 });
  return json({ ok: true, row: res.row });
}
