<script>
  import { onMount } from 'svelte';

  let rows = [];
  let years = [];
  let statuses = ['new', 'active', 'inactive', 'declined'];
  let year = 'all';
  let loading = true;
  let errorMessage = '';
  let savingId = null;

  async function load() {
    loading = true;
    try {
      const res = await fetch(`/api/admin/volunteers?year=${year}`);
      const data = await res.json();
      rows = data.rows || [];
      years = data.years || [];
      if (Array.isArray(data.statuses) && data.statuses.length) statuses = data.statuses;
    } catch (err) {
      errorMessage = err.message;
    } finally {
      loading = false;
    }
  }

  async function updateStatus(row, next) {
    const prev = row.status;
    row.status = next;         // optimistic
    rows = rows;
    savingId = row.id;
    errorMessage = '';
    try {
      const res = await fetch('/api/admin/volunteers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id, status: next })
      });
      const data = await res.json();
      if (!res.ok) {
        row.status = prev;     // rollback
        rows = rows;
        errorMessage = data.error || 'Could not update status.';
      }
    } catch (err) {
      row.status = prev;
      rows = rows;
      errorMessage = err.message;
    } finally {
      savingId = null;
    }
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function chipClass(s) {
    if (s === 'active') return 'ok';
    if (s === 'declined' || s === 'inactive') return 'muted';
    return 'new';
  }

  onMount(load);
  $: if (year !== undefined) load();
</script>

<svelte:head><title>Volunteer report — Niyodaya Admin</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="crumbs"><a href="/admin">← Admin</a></div>
    <h1>Volunteer report</h1>
    <p class="text-muted">People who have signed up to volunteer with Niyodaya under Project Vinaya.</p>

    <div class="toolbar">
      <label>
        Year registered:
        <select bind:value={year}>
          <option value="all">All years</option>
          {#each years as y}<option value={y}>{y}</option>{/each}
        </select>
      </label>
      <div class="spacer"></div>
      <a class="btn sm" href={`/api/admin/volunteers?year=${year}&format=csv`} download>⬇ Download CSV</a>
    </div>

    {#if errorMessage}<div class="alert error">{errorMessage}</div>{/if}

    <div class="card tight">
      <div class="summary">
        <div><span class="lbl">Volunteers</span><span class="v">{rows.length}</span></div>
        <div><span class="lbl">Active</span><span class="v">{rows.filter((r) => r.status === 'active').length}</span></div>
        <div><span class="lbl">New</span><span class="v">{rows.filter((r) => r.status === 'new').length}</span></div>
        <div><span class="lbl">Cities</span><span class="v">{new Set(rows.map((r) => r.city).filter(Boolean)).size}</span></div>
      </div>
    </div>

    {#if loading}
      <p class="text-muted mt-2">Loading…</p>
    {:else if rows.length === 0}
      <div class="card mt-2 text-center"><p class="text-muted">No volunteers registered yet.</p></div>
    {:else}
      <div class="table-wrap mt-2">
        <table class="table">
          <thead>
            <tr>
              <th>Registered on</th>
              <th>Name</th>
              <th>Contact</th>
              <th>City</th>
              <th>Skills</th>
              <th>Hrs/wk</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as row (row.id)}
              <tr>
                <td>{formatDate(row.created_at)}</td>
                <td><strong>{row.name}</strong></td>
                <td>{row.contact}</td>
                <td>{row.city || '—'}</td>
                <td>{row.needs_or_skills || '—'}</td>
                <td class="right">{row.hours_per_week || '—'}</td>
                <td>{row.description || '—'}</td>
                <td>
                  <div class="status-cell">
                    <span class="chip {chipClass(row.status)}">{row.status || 'new'}</span>
                    <select
                      value={row.status || 'new'}
                      on:change={(e) => updateStatus(row, e.target.value)}
                      disabled={savingId === row.id}
                      aria-label="Update status"
                    >
                      {#each statuses as s}<option value={s}>{s}</option>{/each}
                    </select>
                    {#if savingId === row.id}<span class="saving">saving…</span>{/if}
                  </div>
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

  .status-cell { display: flex; flex-direction: column; gap: 4px; min-width: 120px; }
  .status-cell select { padding: 4px 6px; font-size: 12px; border: 1px solid var(--line-strong); border-radius: 4px; background: #fff; }
  .saving { color: var(--muted); font-size: 11px; }

  .chip { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 600; text-transform: capitalize; }
  .chip.ok     { background: #ecfdf5; color: #047857; }
  .chip.new    { background: #eff6ff; color: #1e40af; }
  .chip.muted  { background: #f1f5f9; color: #475569; }
</style>
