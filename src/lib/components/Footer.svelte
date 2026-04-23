<script>
  import { site } from '$lib/data/site.js';
  const year = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="container cols">
    <div>
      <div class="brand">
        <img src="/logo-mark.svg" alt="" />
        <div>
          <strong>{site.name}</strong>
          <p class="tag">{site.tagline}</p>
        </div>
      </div>
      <p class="muted">
        {site.registration.type}.<br>
        Registered in {site.registration.stateOfRegistration}, incorporated on {site.registration.incorporatedOn}.
      </p>
      <p class="muted">
        {#each site.registration.certificates as c, i}
          <span class="chip">{c}</span>
        {/each}
      </p>
    </div>

    <div>
      <h4>Explore</h4>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/programmes">Our Programmes</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/resources">Resources</a></li>
      </ul>
    </div>

    <div>
      <h4>Get Involved</h4>
      <ul>
        <li><a href="/donate">Donate</a></li>
        <li><a href="/programmes/vinaya">Volunteer</a></li>
        <li><a href="/programmes/vridhi">Apply for support</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4>Registered office</h4>
      <address>
        {site.address.line1}<br>
        {site.address.line2}<br>
        {site.address.city} {site.address.pincode}<br>
        {site.address.state}, {site.address.country}<br><br>
        <a href="mailto:{site.email}">{site.email}</a>
      </address>
    </div>
  </div>

  <div class="bottom container">
    <span>© {year} {site.name}. All rights reserved.</span>
    <span class="muted">Built with SvelteKit · v0.1</span>
  </div>
</footer>

<style>
  .site-footer {
    background: #0f172a;
    color: #cbd5e1;
    padding: 48px 0 16px;
    margin-top: 60px;
  }
  .site-footer h4 { color: #fff; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; font-family: inherit; margin-bottom: 12px; }
  .site-footer a { color: #cbd5e1; }
  .site-footer a:hover { color: #fff; }
  .site-footer ul { list-style: none; padding: 0; margin: 0; font-size: 14px; }
  .site-footer li { padding: 4px 0; }
  .cols {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 28px;
  }
  @media (max-width: 900px) { .cols { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 520px) { .cols { grid-template-columns: 1fr; } }

  .brand { display: flex; gap: 12px; margin-bottom: 12px; }
  .brand img { width: 44px; height: 44px; background: #fff; border-radius: 999px; padding: 3px; }
  .brand strong { color: #fff; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; display: block; }
  .tag { margin: 2px 0 0; font-size: 12px; color: #94a3b8; font-style: italic; }
  .muted { color: #94a3b8; font-size: 13px; }
  .chip { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #1e293b; color: #94a3b8; font-size: 11px; margin: 2px 4px 0 0; }

  address { font-style: normal; font-size: 13.5px; line-height: 1.6; }

  .bottom {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid #1e293b;
    display: flex;
    justify-content: space-between;
    font-size: 12.5px;
    color: #64748b;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
