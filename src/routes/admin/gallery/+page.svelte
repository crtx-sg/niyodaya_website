<script>
  import { onMount } from 'svelte';

  let rows = [];
  let loading = true;
  let error = '';
  let file = null;
  let caption = '';
  let photo_date = '';
  let programme_tag = 'vidya';
  let event_tag = '';
  let consent_ok = false;
  let uploading = false;
  let success = '';
  let preview = '';

  async function refresh() {
    loading = true;
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      rows = (data.rows || []).filter((r) => r.approved);
    } catch (err) { error = err.message; }
    finally { loading = false; }
  }
  onMount(refresh);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    file = f;
    preview = URL.createObjectURL(f);
  }

  async function upload(e) {
    e.preventDefault();
    error = ''; success = '';
    if (!file) { error = 'Please choose an image.'; return; }
    if (!caption) { error = 'Please write a short caption.'; return; }
    if (!consent_ok) { error = 'Please tick the consent box.'; return; }
    uploading = true;
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('caption', caption);
      fd.append('photo_date', photo_date);
      fd.append('programme_tag', programme_tag);
      fd.append('event_tag', event_tag);
      fd.append('consent_ok', String(consent_ok));
      const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) { error = data.error || 'Upload failed.'; return; }
      success = 'Uploaded successfully.';
      file = null; caption = ''; photo_date = ''; event_tag = ''; consent_ok = false; preview = '';
      await refresh();
    } catch (err) { error = err.message; }
    finally { uploading = false; }
  }

  async function remove(id) {
    if (!confirm('Remove this photo from the public gallery? (File is retained for audit.)')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) rows = rows.filter((r) => r.id !== id);
    } catch (err) { error = err.message; }
  }

  function formatDate(s) {
    if (!s) return '—';
    try { return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch { return s; }
  }
</script>

<svelte:head><title>Gallery upload — Niyodaya Admin</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="crumbs"><a href="/admin">← Admin</a></div>
    <h1>Gallery — upload &amp; manage</h1>
    <p class="text-muted">Add new photos to the public gallery. Uploads go to Insforge Storage when configured, otherwise to <code>static/gallery/uploads/</code> (dev only).</p>

    <div class="grid cols-2-1 mt-2">
      <form class="card form" on:submit={upload} novalidate>
        <h3>Upload a photo</h3>

        {#if error}<div class="alert error">{error}</div>{/if}
        {#if success}<div class="alert success">{success}</div>{/if}

        <label>Image file * <span class="muted">(JPEG / PNG / WebP, max 8 MB)</span></label>
        <input type="file" accept="image/jpeg,image/png,image/webp" on:change={handleFile} />
        {#if preview}
          <img src={preview} alt="preview" class="preview" />
        {/if}

        <label>Caption *</label>
        <input type="text" bind:value={caption} placeholder="What's happening in the photo?" />

        <div class="row">
          <div>
            <label>Date of photo</label>
            <input type="date" bind:value={photo_date} />
          </div>
          <div>
            <label>Programme</label>
            <select bind:value={programme_tag}>
              <option value="vidya">Vidya</option>
              <option value="vinaya">Vinaya</option>
              <option value="vridhi">Vridhi</option>
              <option value="">(none)</option>
            </select>
          </div>
        </div>

        <label>Event tag <span class="muted">(optional — e.g. "Republic Day")</span></label>
        <input type="text" bind:value={event_tag} />

        <label class="check">
          <input type="checkbox" bind:checked={consent_ok} />
          I confirm that parental / school consent has been received for this photograph to be published.
        </label>

        <div class="mt-2">
          <button class="btn primary" disabled={uploading}>{uploading ? 'Uploading…' : 'Upload photo'}</button>
        </div>
      </form>

      <div>
        <div class="card">
          <h4>How this behaves</h4>
          <ul class="note">
            <li>Uploaded photos appear immediately on <a href="/gallery" target="_blank" rel="noopener">the public gallery</a>.</li>
            <li>Removing a photo here hides it from the public site but keeps the row for audit.</li>
            <li>The 17 curated photos shipped with the site are always present — they live in <code>src/lib/data/gallery.js</code>.</li>
          </ul>
        </div>
      </div>
    </div>

    <h2 class="mt-4">Uploaded photos ({rows.length})</h2>

    {#if loading}
      <p class="text-muted">Loading…</p>
    {:else if rows.length === 0}
      <div class="card text-center"><p class="text-muted">No admin uploads yet.</p></div>
    {:else}
      <div class="gallery-grid">
        {#each rows as r (r.id)}
          <div class="gcard">
            <img src={r.image_url} alt={r.caption} />
            <div class="gcap">
              <span class="date">{formatDate(r.photo_date || r.created_at)} · {r.event_tag || r.programme_tag || '—'}</span>
              {r.caption}
              <div class="mt-1">
                <button class="btn sm ghost" on:click={() => remove(r.id)}>Remove</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .crumbs { margin-bottom: 8px; font-size: 13px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .check { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: var(--ink-soft); margin-top: 12px; }
  .check input { margin-top: 4px; }
  .muted { color: var(--muted); }
  .preview { max-width: 100%; max-height: 260px; margin: 10px 0 0; border-radius: 6px; border: 1px solid var(--line); }
  .note { padding-left: 20px; }
  .note li { margin: 6px 0; color: var(--ink-soft); font-size: 13.5px; }

  .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; margin-top: 14px; }
  .gcard { background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; }
  .gcard img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
  .gcap { padding: 10px 12px; font-size: 13px; }
  .date { display: block; color: var(--saffron-dark); font-size: 12px; font-weight: 600; margin-bottom: 2px; }
</style>
