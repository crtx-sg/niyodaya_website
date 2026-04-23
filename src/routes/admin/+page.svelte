<svelte:head><title>Admin — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero">
      <div class="eyebrow">Admin</div>
      <h1>Admin dashboard (v0.1)</h1>
      <p class="lede">A protected area for managing gallery uploads and reviewing form submissions. Full authentication lands in v0.2 (Insforge magic-link restricted to admin emails).</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="alert info">
      <strong>v0.1 note:</strong> This page is currently a placeholder. In production, it will be behind Insforge Auth with an allow-list of admin emails (see <code>ADMIN_EMAILS</code> in <code>.env</code>). The endpoints already exist and write to the correct Insforge tables.
    </div>

    <div class="grid cols-4 mt-2">
      <div class="card"><h4>Gallery</h4><p class="text-muted">Upload / edit / delete photos, captions, dates, tags.</p></div>
      <div class="card"><h4>Vridhi Applications</h4><p class="text-muted">View &amp; respond to student support applications.</p></div>
      <div class="card"><h4>Vinaya Requests</h4><p class="text-muted">Schools / volunteer offers.</p></div>
      <div class="card"><h4>Donations</h4><p class="text-muted">List of donations, receipts, export for audit.</p></div>
    </div>
  </div>
</section>
