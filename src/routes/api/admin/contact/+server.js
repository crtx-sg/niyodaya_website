// Admin report — Contact inbox
//   GET /api/admin/contact?year=2025&format=json|csv

import { json } from '@sveltejs/kit';
import { list, seedSampleData } from '$lib/server/insforge.js';
import { toCSV } from '$lib/utils/csv.js';

const COLUMNS = [
  { key: 'created_at', label: 'Received' },
  { key: 'name',       label: 'Name' },
  { key: 'email',      label: 'Email' },
  { key: 'subject',    label: 'Subject' },
  { key: 'message',    label: 'Message' }
];

export async function GET({ url }) {
  seedSampleData();
  const year = url.searchParams.get('year');
  const format = url.searchParams.get('format') || 'json';

  let rows = (await list('contact_messages')) || [];
  if (year && year !== 'all') rows = rows.filter((r) => (r.created_at || '').startsWith(year));
  rows.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

  if (format === 'csv') {
    const csv = toCSV(rows, COLUMNS);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="niyodaya-contact-${year || 'all'}.csv"`
      }
    });
  }

  const years = [...new Set(
    ((await list('contact_messages')) || []).map((r) => (r.created_at || '').slice(0, 4)).filter(Boolean)
  )].sort().reverse();

  return json({ rows, years });
}
