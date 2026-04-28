<script>
  export let data;
</script>

<svelte:head><title>Admin — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero">
      <div class="eyebrow">Admin dashboard</div>
      <h1>Welcome{data?.user?.email ? `, ${data.user.email}` : ''}</h1>
      <p class="lede">Reports, inbox, and gallery management for Niyodaya's day-to-day operations.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    {#if data?.user?.dev}
      <div class="alert info">
        <strong>Dev mode.</strong> <code>ADMIN_PASSWORD</code> is not set — admin pages are currently open to anyone who knows the URL.
        Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_EMAILS</code> in <code>.env</code> before deploying to production.
      </div>
    {/if}

    <h2>Reports</h2>
    <div class="grid cols-4 mt-2">
      <a class="card report-card" href="/admin/reports/donors">
        <div class="icon">💸</div>
        <h3>Donors</h3>
        <p>Donations by year, 80G receipt status, per-donor PDF download, CSV export.</p>
        <span class="cta">Open →</span>
      </a>

      <a class="card report-card" href="/admin/reports/volunteers">
        <div class="icon">🤝</div>
        <h3>Volunteers</h3>
        <p>People who signed up under Project Vinaya — registered date, contact, skills.</p>
        <span class="cta">Open →</span>
      </a>

      <a class="card report-card" href="/admin/reports/applications">
        <div class="icon">🎓</div>
        <h3>Applications</h3>
        <p>Project Vridhi student / school requests. Filter by year, track status.</p>
        <span class="cta">Open →</span>
      </a>

      <a class="card report-card" href="/admin/reports/contact">
        <div class="icon">📥</div>
        <h3>Contact inbox</h3>
        <p>Messages sent via the public Contact form. Reply by email in one click.</p>
        <span class="cta">Open →</span>
      </a>

      <a class="card report-card" href="/admin/disbursements">
        <div class="icon">📤</div>
        <h3>Disbursements</h3>
        <p>Record outgoing payments to schools / partners. Project, beneficiaries, bank ref, date.</p>
        <span class="cta">Open →</span>
      </a>
    </div>

    <h2 class="mt-4">Content management</h2>
    <div class="grid cols-4 mt-2">
      <a class="card report-card" href="/admin/gallery">
        <div class="icon">🖼️</div>
        <h3>Gallery</h3>
        <p>Upload new photos (Insforge Storage in production, static folder in dev).</p>
        <span class="cta">Open →</span>
      </a>
      <div class="card dim"><h4>Annual reports</h4><p class="text-muted">PDF upload under /resources. v0.3.</p></div>
      <div class="card dim"><h4>Team bios</h4><p class="text-muted">Photos + bios on About page. v0.3.</p></div>
      <div class="card dim"><h4>Kannada version</h4><p class="text-muted">Bilingual i18n layer. v0.3.</p></div>
    </div>
  </div>
</section>

<style>
  .report-card {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform .08s ease, box-shadow .15s ease;
  }
  .report-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08); text-decoration: none; }
  .report-card .icon { font-size: 32px; margin-bottom: 6px; }
  .report-card .cta { color: var(--accent); font-weight: 600; font-size: 14px; }
  .card.dim { opacity: 0.65; }
</style>
