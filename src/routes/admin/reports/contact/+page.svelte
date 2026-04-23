<script>
  import { onMount } from 'svelte';

  let rows = [];
  let years = [];
  let year = 'all';
  let loading = true;
  let errorMessage = '';

  async function load() {
    loading = true;
    try {
      const res = await fetch(`/api/admin/contact?year=${year}`);
      const data = await res.json();
      rows = data.rows || [];
      years = data.years || [];
    } catch (err) {
      errorMessage = err.message;
    } finally {
      loading = false;
    }
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function mailto(row) {
    const subject = encodeURIComponent(`Re: ${row.subject || 'Your message to Niyodaya'}`);
    const body = encodeURIComponent(`Dear ${row.name},\n\n> ${(row.message || '').replace(/\n/g, '\n> ')}\n\n`);
    return `mailto:${row.email}?subject=${subject}&body=${body}`;
  }

  onMount(load);
  $: if (year !== undefined) load();
</script>

<svelte:head><title>Contact inbox — Niyodaya Admin</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="crumbs"><a href="/admin">← Admin</a></div>
    <h1>Contact inbox</h1>
    <p class="text-muted">Messages submitted via the public Contact form. Click a sender to reply by email.</p>

    <div class="toolbar">
      <label>
        Year:
        <select bind:value={year}>
          <option value="all">All years</option>
          {#each years as y}<option value={y}>{y}</option>{/each}
        </select>
      </label>
      <div class="spacer"></div>
      <a class="btn sm" href={`/api/admin/contact?year=${year}&format=csv`} download>⬇ Download CSV</a>
    </div>

    {#if errorMessage}<div class="alert error">{errorMessage}</div>{/if}

    <div class="card tight">
      <div class="summary">
        <div><span class="lbl">Messages</span><span class="v">{rows.length}</span></div>
      </div>
    </div>

    {#if loading}
      <p class="text-muted mt-2">Loading…</p>
    {:else if rows.length === 0}
      <div class="card mt-2 text-center"><p class="text-muted">No messages received for this filter yet.</p></div>
    {:else}
      <div class="messages mt-2">
        {#each rows as row (row.id)}
          <div class="card msg">
            <div class="msg-head">
              <div>
                <strong>{row.name}</strong>
                <a class="email" href={mailto(row)}>&lt;{row.email}&gt;</a>
              </div>
              <div class="muted small">{formatDate(row.created_at)}</div>
            </div>
            {#if row.subject}<div class="subj">{row.subject}</div>{/if}
            <div class="body">{row.message}</div>
            <div class="actions">
              <a class="btn sm primary" href={mailto(row)}>Reply by email</a>
            </div>
          </div>
        {/each}
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

  .messages { display: flex; flex-direction: column; gap: 14px; }
  .msg-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
  .email { color: var(--muted); font-size: 13px; margin-left: 6px; }
  .subj { font-weight: 600; margin-bottom: 6px; color: var(--ink); }
  .body { white-space: pre-wrap; color: var(--ink-soft); font-size: 14.5px; line-height: 1.55; padding: 8px 12px; border-left: 3px solid var(--saffron); background: #fffbeb; border-radius: 4px; }
  .actions { margin-top: 10px; }
  .muted { color: var(--muted); }
  .small { font-size: 12px; }
</style>
