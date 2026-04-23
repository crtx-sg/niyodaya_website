// Admin report — Volunteers (from vinaya_requests where type='volunteer')
//   GET    /api/admin/volunteers?format=json|csv
//   PATCH  /api/admin/volunteers   { id, status }

import { json } from '@sveltejs/kit';
import { list, update, seedSampleData } from '$lib/server/insforge.js';
import { toCSV } from '$lib/utils/csv.js';
import { VOLUNTEER_STATUSES } from '$lib/utils/statuses.js';

const COLUMNS = [
  { key: 'created_at',       label: 'Registered on' },
  { key: 'name',             label: 'Name' },
  { key: 'contact',          label: 'Contact' },
  { key: 'city',             label: 'City' },
  { key: 'needs_or_skills',  label: 'Skills' },
  { key: 'hours_per_week',   label: 'Hours/week' },
  { key: 'description',      label: 'Notes' },
  { key: 'status',           label: 'Status' }
];

export async function GET({ url }) {
  seedSampleData();
  const format = url.searchParams.get('format') || 'json';
  const year = url.searchParams.get('year');

  let rows = ((await list('vinaya_requests')) || []).filter((r) => r.type === 'volunteer');
  if (year && year !== 'all') rows = rows.filter((r) => (r.created_at || '').startsWith(year));
  rows.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

  if (format === 'csv') {
    const csv = toCSV(rows, COLUMNS);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="niyodaya-volunteers-${year || 'all'}.csv"`
      }
    });
  }

  const years = [...new Set(
    ((await list('vinaya_requests')) || [])
      .filter((r) => r.type === 'volunteer')
      .map((r) => (r.created_at || '').slice(0, 4))
      .filter(Boolean)
  )].sort().reverse();

  return json({ rows, years, columns: COLUMNS, statuses: VOLUNTEER_STATUSES });
}

export async function PATCH({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!body.id) return json({ error: 'id is required' }, { status: 400 });
  if (!VOLUNTEER_STATUSES.includes(body.status)) {
    return json({ error: `status must be one of: ${VOLUNTEER_STATUSES.join(', ')}` }, { status: 400 });
  }
  const res = await update('vinaya_requests', body.id, { status: body.status });
  if (!res.ok) return json({ error: res.error }, { status: 400 });
  return json({ ok: true, row: res.row });
}
