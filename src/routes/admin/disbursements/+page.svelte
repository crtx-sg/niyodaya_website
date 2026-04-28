<script>
  import { onMount } from 'svelte';

  let rows = [];
  let years = [];
  let projects = ['vidya', 'vinaya', 'vridhi', 'general'];
  let statuses = ['planned', 'paid', 'cancelled'];
  let totalAmount = 0;
  let year = 'all';
  let project = 'all';
  let loading = true;
  let errorMessage = '';

  let form = emptyForm();
  let formErrors = {};
  let formStatus = '';
  let submitting = false;

  function emptyForm() {
    return {
      project: 'vidya',
      institution_name: '',
      beneficiaries: '',
      description: '',
      amount: '',
      bank_ref: '',
      payment_date: new Date().toISOString().slice(0, 10),
      status: 'paid',
      notes: ''
    };
  }

  async function load() {
    loading = true;
    errorMessage = '';
    try {
      const qs = new URLSearchParams({ year, project }).toString();
      const res = await fetch(`/api/admin/disbursements?${qs}`);
      const data = await res.json();
      rows = data.rows || [];
      years = data.years || [];
      totalAmount = data.totalAmount || 0;
      if (Array.isArray(data.projects) && data.projects.length) projects = data.projects;
      if (Array.isArray(data.statuses) && data.statuses.length) statuses = data.statuses;
    } catch (err) {
      errorMessage = 'Unable to load: ' + err.message;
    } finally {
      loading = false;
    }
  }

  async function submit(e) {
    e.preventDefault();
    formErrors = {};
    formStatus = '';
    submitting = true;
    try {
      const res = await fetch('/api/admin/disbursements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        formErrors = data.errors || {};
        formStatus = data.error || 'Could not save.';
        submitting = false;
        return;
      }
      formStatus = 'Disbursement recorded.';
      form = emptyForm();
      submitting = false;
      load();
    } catch (err) {
      formStatus = 'Network error: ' + err.message;
      submitting = false;
    }
  }

  async function updateStatus(row, next) {
    const prev = row.status;
    row.status = next;
    rows = rows;
    try {
      const res = await fetch('/api/admin/disbursements', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id, status: next })
      });
      const data = await res.json();
      if (!res.ok) {
        row.status = prev;
        rows = rows;
        errorMessage = data.error || 'Could not update.';
      }
    } catch (err) {
      row.status = prev;
      rows = rows;
      errorMessage = err.message;
    }
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function formatAmount(n) { return Number(n || 0).toLocaleString('en-IN'); }
  function chipClass(s) {
    if (s === 'paid') return 'ok';
    if (s === 'cancelled') return 'muted';
    return 'new';
  }

  onMount(load);
  $: if (year !== undefined && project !== undefined) load();
</script>

<svelte:head><title>Disbursements — Niyodaya Admin</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="crumbs"><a href="/admin">← Admin</a></div>
    <h1>Disbursements</h1>
    <p class="text-muted">Outgoing payments to donee institutions, recorded against a project. Payments are typically made offline from the bank — capture the bank reference and date here for audit.</p>

    <div class="card mt-2">
      <h3>Record a new disbursement</h3>

      {#if formStatus}
        <div class="alert {Object.keys(formErrors).length ? 'error' : 'success'}">{formStatus}</div>
      {/if}

      <form class="form" on:submit={submit} novalidate>
        <div class="row">
          <div>
            <label>Project *</label>
            <select bind:value={form.project} required>
              {#each projects as p}<option value={p}>{p}</option>{/each}
            </select>
            {#if formErrors.project}<div class="error">{formErrors.project}</div>{/if}
          </div>
          <div>
            <label>Donee institution *</label>
            <input bind:value={form.institution_name} placeholder="e.g. Gandhiji Memorial High School" required />
            {#if formErrors.institution_name}<div class="error">{formErrors.institution_name}</div>{/if}
          </div>
        </div>

        <label>Beneficiaries *</label>
        <input bind:value={form.beneficiaries} placeholder="e.g. 120 students (Classes 6–10)" required />
        {#if formErrors.beneficiaries}<div class="error">{formErrors.beneficiaries}</div>{/if}

        <label>Description (what was paid for)</label>
        <textarea rows="2" bind:value={form.description} placeholder="School furniture refresh — desks & blackboards"></textarea>

        <div class="row">
          <div>
            <label>Amount (INR) *</label>
            <input type="number" min="1" bind:value={form.amount} required />
            {#if formErrors.amount}<div class="error">{formErrors.amount}</div>{/if}
          </div>
          <div>
            <label>Bank reference *</label>
            <input bind:value={form.bank_ref} placeholder="NEFT/UTIB/202504091234" required />
            {#if formErrors.bank_ref}<div class="error">{formErrors.bank_ref}</div>{/if}
          </div>
        </div>

        <div class="row">
          <div>
            <label>Payment date *</label>
            <input type="date" bind:value={form.payment_date} required />
            {#if formErrors.payment_date}<div class="error">{formErrors.payment_date}</div>{/if}
          </div>
          <div>
            <label>Status</label>
            <select bind:value={form.status}>
              {#each statuses as s}<option value={s}>{s}</option>{/each}
            </select>
          </div>
        </div>

        <label>Notes</label>
        <textarea rows="2" bind:value={form.notes} placeholder="Optional — context, follow-ups, file refs."></textarea>

        <div class="mt-2">
          <button class="btn primary" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save disbursement'}
          </button>
        </div>
      </form>
    </div>

    <div class="toolbar mt-3">
      <label>
        Year:
        <select bind:value={year}>
          <option value="all">All years</option>
          {#each years as y}<option value={y}>{y}</option>{/each}
        </select>
      </label>
      <label>
        Project:
        <select bind:value={project}>
          <option value="all">All projects</option>
          {#each projects as p}<option value={p}>{p}</option>{/each}
        </select>
      </label>
      <div class="spacer"></div>
      <a class="btn sm" href={`/api/admin/disbursements?year=${year}&project=${project}&format=csv`} download>
        ⬇ Download CSV
      </a>
    </div>

    {#if errorMessage}<div class="alert error">{errorMessage}</div>{/if}

    <div class="card tight">
      <div class="summary">
        <div><span class="lbl">Records</span><span class="v">{rows.length}</span></div>
        <div><span class="lbl">Total disbursed</span><span class="v">₹{formatAmount(totalAmount)}</span></div>
      </div>
    </div>

    {#if loading}
      <p class="text-muted mt-2">Loading…</p>
    {:else if rows.length === 0}
      <div class="card mt-2 text-center">
        <p class="text-muted">No disbursements recorded for this filter yet.</p>
      </div>
    {:else}
      <div class="table-wrap mt-2">
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Donee institution</th>
              <th>Beneficiaries</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Bank ref</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as row (row.id)}
              <tr>
                <td>{formatDate(row.payment_date)}</td>
                <td><span class="proj proj-{row.project}">{row.project}</span></td>
                <td><strong>{row.institution_name}</strong></td>
                <td>{row.beneficiaries || '—'}</td>
                <td class="desc">{row.description || '—'}</td>
                <td class="right">₹{formatAmount(row.amount)}</td>
                <td class="code">{row.bank_ref || '—'}</td>
                <td>
                  <select class="status-select" value={row.status} on:change={(e) => updateStatus(row, e.currentTarget.value)}>
                    {#each statuses as s}<option value={s}>{s}</option>{/each}
                  </select>
                  <span class="chip {chipClass(row.status)}">{row.status}</span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</section>

<style>
  .crumbs { margin-bottom: 8px; font-size: 13px; }
  .toolbar { display: flex; gap: 14px; align-items: center; margin: 16px 0 12px; flex-wrap: wrap; }
  .toolbar label { font-size: 13.5px; color: var(--ink-soft); }
  .toolbar select { margin-left: 6px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--line-strong); background: #fff; font: inherit; }
  .spacer { flex: 1; }

  .card.tight { padding: 14px 18px; }
  .summary { display: flex; gap: 28px; flex-wrap: wrap; }
  .summary .lbl { display: block; color: var(--muted); font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
  .summary .v   { display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: var(--accent); }

  .table-wrap { overflow-x: auto; }
  .table th, .table td { vertical-align: top; font-size: 13.5px; }
  .table .right { text-align: right; font-variant-numeric: tabular-nums; }
  .table .code  { font-family: ui-monospace, monospace; font-size: 12.5px; }
  .table .desc  { max-width: 280px; }

  .proj { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 600; letter-spacing: .3px; text-transform: capitalize; background: #eef2ff; color: #3730a3; }
  .proj-vidya  { background: #ecfdf5; color: #047857; }
  .proj-vinaya { background: #fef3c7; color: #b45309; }
  .proj-vridhi { background: #fee2e2; color: #b91c1c; }

  .chip { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 600; letter-spacing: .3px; margin-left: 6px; }
  .chip.ok     { background: #ecfdf5; color: #047857; }
  .chip.muted  { background: #f1f5f9; color: #64748b; }
  .chip.new    { background: #eef2ff; color: #3730a3; }

  .status-select { padding: 4px 8px; border-radius: 6px; border: 1px solid var(--line-strong); background: #fff; font: inherit; font-size: 12.5px; }
</style>
