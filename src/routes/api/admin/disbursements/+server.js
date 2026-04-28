// Admin report — Disbursements
//   GET    /api/admin/disbursements?year=2025&project=vidya&format=json|csv
//   POST   /api/admin/disbursements                — create a new disbursement
//   PATCH  /api/admin/disbursements                — update fields by { id, ... }
//
// A "disbursement" records an outgoing payment to a donee institution
// (school, partner NGO, vendor) made under one of our three projects.
// Payments are typically wired offline from the bank — this report is
// the audit trail.

import { json } from '@sveltejs/kit';
import { insert, list, update } from '$lib/server/insforge.js';
import { toCSV } from '$lib/utils/csv.js';
import { validate, required, isPositiveNumber } from '$lib/utils/validation.js';

export const PROJECTS = ['vidya', 'vinaya', 'vridhi', 'general'];
export const DISBURSEMENT_STATUSES = ['planned', 'paid', 'cancelled'];

const COLUMNS = [
  { key: 'payment_date',     label: 'Payment date' },
  { key: 'project',          label: 'Project' },
  { key: 'institution_name', label: 'Donee institution' },
  { key: 'beneficiaries',    label: 'Beneficiaries' },
  { key: 'description',      label: 'Description' },
  { key: 'amount',           label: 'Amount (INR)' },
  { key: 'bank_ref',         label: 'Bank ref' },
  { key: 'status',           label: 'Status' },
  { key: 'notes',            label: 'Notes' },
  { key: 'created_at',       label: 'Recorded at' }
];

const VALIDATORS = {
  project:          (v) => PROJECTS.includes(v) ? null : 'Pick a project',
  institution_name: (v) => required(v, 'Donee institution'),
  beneficiaries:    (v) => required(v, 'Beneficiaries'),
  amount:           isPositiveNumber,
  bank_ref:         (v) => required(v, 'Bank reference'),
  payment_date:     (v) => required(v, 'Payment date')
};

export async function GET({ url }) {
  const year = url.searchParams.get('year') || 'all';
  const project = url.searchParams.get('project') || 'all';
  const format = url.searchParams.get('format') || 'json';

  let rows = (await list('disbursements')) || [];
  if (year !== 'all')    rows = rows.filter((r) => (r.payment_date || r.created_at || '').startsWith(year));
  if (project !== 'all') rows = rows.filter((r) => r.project === project);
  rows.sort((a, b) => (b.payment_date || b.created_at || '').localeCompare(a.payment_date || a.created_at || ''));

  if (format === 'csv') {
    const csv = toCSV(rows, COLUMNS);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="niyodaya-disbursements-${project}-${year}.csv"`
      }
    });
  }

  const totalAmount = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const all = (await list('disbursements')) || [];
  const years = [...new Set(all.map((r) => (r.payment_date || r.created_at || '').slice(0, 4)).filter(Boolean))]
    .sort()
    .reverse();

  return json({
    rows,
    totalAmount,
    years,
    projects: PROJECTS,
    statuses: DISBURSEMENT_STATUSES,
    columns: COLUMNS
  });
}

export async function POST({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { ok, errors } = validate(body, VALIDATORS);
  if (!ok) return json({ error: 'Please correct the highlighted fields.', errors }, { status: 400 });

  const status = DISBURSEMENT_STATUSES.includes(body.status) ? body.status : 'paid';

  const result = await insert('disbursements', {
    project:          body.project,
    institution_name: String(body.institution_name).trim(),
    beneficiaries:    String(body.beneficiaries).trim(),
    description:      body.description ? String(body.description).trim() : null,
    amount:           Number(body.amount),
    bank_ref:         String(body.bank_ref).trim(),
    payment_date:     body.payment_date,
    status,
    notes:            body.notes ? String(body.notes).trim() : null
  });
  if (!result.ok) return json({ error: result.error || 'Save failed' }, { status: 500 });

  return json({ ok: true, id: result.id });
}

export async function PATCH({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!body.id) return json({ error: 'id is required' }, { status: 400 });

  const patch = {};
  if (body.status !== undefined) {
    if (!DISBURSEMENT_STATUSES.includes(body.status)) return json({ error: 'Invalid status' }, { status: 400 });
    patch.status = body.status;
  }
  if (body.notes !== undefined)        patch.notes = body.notes ? String(body.notes).trim() : null;
  if (body.description !== undefined)  patch.description = body.description ? String(body.description).trim() : null;
  if (body.bank_ref !== undefined)     patch.bank_ref = String(body.bank_ref).trim();

  if (Object.keys(patch).length === 0) return json({ error: 'No editable fields supplied' }, { status: 400 });

  const res = await update('disbursements', body.id, patch);
  if (!res.ok) return json({ error: res.error }, { status: 400 });
  return json({ ok: true, row: res.row });
}
