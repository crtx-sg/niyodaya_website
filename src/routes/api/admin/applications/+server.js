// Admin report — Vridhi applications for support
//   GET    /api/admin/applications?year=2025&format=json|csv
//   PATCH  /api/admin/applications   { id, status }

import { json } from '@sveltejs/kit';
import { list, update, seedSampleData } from '$lib/server/insforge.js';
import { toCSV } from '$lib/utils/csv.js';
import { APPLICATION_STATUSES } from '$lib/utils/statuses.js';

const COLUMNS = [
  { key: 'created_at',   label: 'Applied on' },
  { key: 'student_name', label: 'Student' },
  { key: 'age',          label: 'Age' },
  { key: 'father_name',  label: 'Father / Guardian' },
  { key: 'phone',        label: 'Phone' },
  { key: 'email',        label: 'Email' },
  { key: 'school_name',  label: 'School' },
  { key: 'reason',       label: 'Reason' },
  { key: 'status',       label: 'Status' }
];

export async function GET({ url }) {
  seedSampleData();
  const year = url.searchParams.get('year');
  const format = url.searchParams.get('format') || 'json';

  let rows = (await list('vridhi_applications')) || [];
  if (year && year !== 'all') rows = rows.filter((r) => (r.created_at || '').startsWith(year));
  rows.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

  if (format === 'csv') {
    const csv = toCSV(rows, COLUMNS);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="niyodaya-applications-${year || 'all'}.csv"`
      }
    });
  }

  const years = [...new Set(
    ((await list('vridhi_applications')) || []).map((r) => (r.created_at || '').slice(0, 4)).filter(Boolean)
  )].sort().reverse();

  return json({ rows, years, statuses: APPLICATION_STATUSES });
}

export async function PATCH({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!body.id) return json({ error: 'id is required' }, { status: 400 });
  if (!APPLICATION_STATUSES.includes(body.status)) {
    return json({ error: `status must be one of: ${APPLICATION_STATUSES.join(', ')}` }, { status: 400 });
  }
  const res = await update('vridhi_applications', body.id, { status: body.status });
  if (!res.ok) return json({ error: res.error }, { status: 400 });
  return json({ ok: true, row: res.row });
}
