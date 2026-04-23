<script>
  import { site } from '$lib/data/site.js';
</script>

<svelte:head><title>About — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#ecfeff,#ede9fe)">
      <div class="eyebrow">About us</div>
      <h1>About Niyodaya</h1>
      <p class="lede">"Niyodaya" — a new dawn — captures our commitment to being a steady, ethical partner in every child's learning journey.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2-1">
      <div class="card prose">
        <h3>Our story</h3>
        <p>
          Niyodaya Foundation was incorporated on {site.registration.incorporatedOn} in Bengaluru under
          Section 8 of the Companies Act, 2013. It was founded by Subramaniam Ganesh and Lalitha Shivaraman
          with a simple aim — to bring holistic, values-led education within reach of every child,
          especially those from underprivileged, displaced, or specially-abled backgrounds.
        </p>
      </div>
      <div class="card">
        <h3>Governance & compliance</h3>
        <p>
          {#each site.registration.certificates as c}
            <span class="pill" style="margin:2px 4px 4px 0">{c}</span>
          {/each}
        </p>
        <p class="text-muted">Registered office: {site.address.city}, {site.address.state}. Audited annually by a qualified auditor. Full financials published on the <a href="/resources">Resources</a> page.</p>
        <a class="btn sm" href="/resources">Download Memorandum →</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      <div class="card"><h3>Mission</h3><p>To promote holistic education for underprivileged, displaced, specially-abled, and destitute children — combining academic rigour with values, life-skills, and dignity.</p></div>
      <div class="card"><h3>Vision</h3><p>A society where every child — regardless of economic, social or ability status — receives education that nourishes mind, character and livelihood.</p></div>
      <div class="card"><h3>Values</h3><p>Dharma · Seva · Integrity · Confidentiality · Community first · Transparency in finances</p></div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>Our objectives</h2>
    <p class="text-muted">From our Memorandum of Association (Clause 3A):</p>
    <div class="grid cols-2 mt-2">
      <div class="card prose">
        <ul>
          <li>Provide Basic, Primary and Secondary school education to underprivileged, displaced, specially-abled and destitute children.</li>
          <li>Run after-school educational programmes and bridge courses for children who drop out.</li>
          <li>Adopt or operate schools that provide holistic, free education.</li>
          <li>Supply infrastructure, educational material, food and any support schools may need.</li>
        </ul>
      </div>
      <div class="card prose">
        <ul>
          <li>Offer scholarships, vocational training, and higher-education assistance to deserving students.</li>
          <li>Develop and distribute assistive technology for people with special needs.</li>
          <li>Conduct workshops, camps, sports, and health programmes — online and offline.</li>
          <li>Support people/children affected by natural or man-made calamities, pandemics, and critical illnesses.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>Team</h2>
    <p class="text-muted">Photos and bios to be added.</p>
    <div class="grid cols-4 mt-2">
      <div class="card text-center"><div class="avatar">SG</div><h4>Subramaniam Ganesh</h4><p class="text-muted">Director &amp; Promoter</p></div>
      <div class="card text-center"><div class="avatar">LS</div><h4>Lalitha Shivaraman</h4><p class="text-muted">Director &amp; Promoter</p></div>
      <div class="card text-center"><div class="avatar">+</div><h4>Advisory Board</h4><p class="text-muted">Coming soon</p></div>
      <div class="card text-center"><div class="avatar">♥</div><h4>Volunteers</h4><p class="text-muted">Across Bengaluru</p></div>
    </div>
  </div>
</section>

<style>
  .avatar { width: 64px; height: 64px; border-radius: 999px; background: #eef2ff; color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; margin: 0 auto 8px; }
</style>
