<script>
  import { onMount } from 'svelte';

  let rows = [];
  let years = [];
  let totalAmount = 0;
  let year = 'all';
  let loading = true;
  let errorMessage = '';

  async function load() {
    loading = true;
    errorMessage = '';
    try {
      const res = await fetch(`/api/admin/donors?year=${year}`);
      const data = await res.json();
      rows = data.rows || [];
      years = data.years || [];
      totalAmount = data.totalAmount || 0;
    } catch (err) {
      errorMessage = 'Unable to load data: ' + err.message;
    } finally {
      loading = false;
    }
  }

  async function toggleCert(row) {
    const newVal = !row.cert_sent;
    try {
      const res = await fetch('/api/admin/donors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id, cert_sent: newVal })
      });
      const data = await res.json();
      if (res.ok) {
        row.cert_sent = newVal;
        rows = rows; // force reactivity
      } else {
        errorMessage = data.error || 'Unable to update.';
      }
    } catch (err) {
      errorMessage = err.message;
    }
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function formatAmount(n) {
    return Number(n || 0).toLocaleString('en-IN');
  }

  onMount(load);
  $: if (year !== undefined) load();
</script>

<svelte:head><title>Donor report — Niyodaya Admin</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="crumbs"><a href="/admin">← Admin</a></div>
    <h1>Donor report</h1>
    <p class="text-muted">Donations received, filterable by year. Export as CSV or mark per-donor 80G receipts as sent.</p>

    <div class="toolbar">
      <label>
        Year:
        <select bind:value={year}>
          <option value="all">All years</option>
          {#each years as y}<option value={y}>{y}</option>{/each}
        </select>
      </label>

      <div class="spacer"></div>

      <a class="btn sm" href={`/api/admin/donors?year=${year}&format=csv`} download>
        ⬇ Download CSV
      </a>
    </div>

    {#if errorMessage}
      <div class="alert error">{errorMessage}</div>
    {/if}

    <div class="card tight">
      <div class="summary">
        <div><span class="lbl">Donors</span><span class="v">{rows.length}</span></div>
        <div><span class="lbl">Total raised</span><span class="v">₹{formatAmount(totalAmount)}</span></div>
        <div><span class="lbl">80G sent</span><span class="v">{rows.filter((r) => r.cert_sent).length} / {rows.length}</span></div>
      </div>
    </div>

    {#if loading}
      <p class="text-muted mt-2">Loading…</p>
    {:else if rows.length === 0}
      <div class="card mt-2 text-center">
        <p class="text-muted">No donations recorded for this filter yet.</p>
      </div>
    {:else}
      <div class="table-wrap mt-2">
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Donor</th>
              <th>Email</th>
              <th>PAN</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Payment ref</th>
              <th>80G receipt</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as row (row.id)}
              <tr>
                <td>{formatDate(row.created_at)}</td>
                <td>
                  <div><strong>{row.donor_name}</strong></div>
                  {#if row.phone}<div class="muted small">{row.phone}</div>{/if}
                </td>
                <td>{row.email || '—'}</td>
                <td>{row.pan || '—'}</td>
                <td class="right">₹{formatAmount(row.amount)}</td>
                <td>{row.purpose || '—'}</td>
                <td class="code">{row.razorpay_payment_id || '—'}</td>
                <td>
                  <div class="cert">
                    <span class="chip {row.cert_sent ? 'ok' : 'pending'}">
                      {row.cert_sent ? '✓ Sent' : 'Pending'}
                    </span>
                    <button class="btn sm ghost" on:click={() => toggleCert(row)}>
                      {row.cert_sent ? 'Mark pending' : 'Mark sent'}
                    </button>
                    <a class="btn sm" href={`/api/admin/donors/receipt?id=${row.id}`} target="_blank" rel="noopener">Download receipt</a>
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
  .table .code { font-family: ui-monospace, monospace; font-size: 12.5px; }
  .small { font-size: 12px; }
  .muted { color: var(--muted); }

  .chip { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 600; letter-spacing: .3px; }
  .chip.ok       { background: #ecfdf5; color: #047857; }
  .chip.pending  { background: #fef3c7; color: #b45309; }
  .cert { display: flex; flex-direction: column; gap: 4px; min-width: 170px; }
</style>
