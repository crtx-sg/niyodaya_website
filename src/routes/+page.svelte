<script>
  import { galleryImages, formatDate } from '$lib/data/gallery.js';
  const featured = galleryImages.slice(0, 4);
</script>

<svelte:head><title>Niyodaya Foundation — a new dawn for every child's learning</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero">
      <div class="eyebrow">Niyodaya Foundation</div>
      <h1>Every child deserves an education rooted in values.</h1>
      <p class="lede">
        Niyodaya Foundation — a Section 8 non-profit based in Karnataka — supports underprivileged,
        displaced, and specially-abled children through bridge courses, school adoption, and
        volunteer-driven learning programmes.
      </p>
      <div class="ctas">
        <a class="btn saffron" href="/programmes/vridhi">Apply for Support</a>
        <a class="btn primary" href="/donate">Donate &amp; get 80G</a>
        <a class="btn" href="/programmes/vinaya">Volunteer with us</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      <div class="card">
        <span class="pill saffron">Vridhi</span>
        <h3>Project Vridhi</h3>
        <p>Bridge support for children who drop out, or don't clear Class 10 / 12 board exams. Counselling, NIOS re-enrolment, and vocational routes.</p>
        <a class="btn sm" href="/programmes/vridhi">Learn more →</a>
      </div>
      <div class="card">
        <span class="pill">Vinaya</span>
        <h3>Project Vinaya</h3>
        <p>Connects deserving schools and students with teaching materials, trained volunteers, and mentorship from our network.</p>
        <a class="btn sm" href="/programmes/vinaya">Learn more →</a>
      </div>
      <div class="card">
        <span class="pill green">Vidya</span>
        <h3>Project Vidya</h3>
        <p>Adopting entire schools and sustaining them with donor-funded infrastructure, staff support, and values-led learning.</p>
        <a class="btn sm" href="/programmes/vidya">Learn more →</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2 class="text-center">The learning gap we're working on</h2>
    <div class="grid cols-4 mt-2">
      <div class="card stat"><div class="num">1 in 2</div><div class="lbl">children lack grade-level foundational skills (ASER)</div></div>
      <div class="card stat"><div class="num">~28-30%</div><div class="lbl">of youth enter higher education (GER)</div></div>
      <div class="card stat"><div class="num">10-15%</div><div class="lbl">drop out at secondary school</div></div>
      <div class="card stat"><div class="num">0 focus</div><div class="lbl">on values-based education in most institutions</div></div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>From the ground</h2>
    <p class="text-muted">A glimpse of our work with partner schools.</p>
    <div class="gallery-grid mt-2">
      {#each featured as img}
        <article class="gallery-card">
          <img src="/gallery/{img.file}" alt={img.caption} loading="lazy" />
          <div class="cap">
            <span class="date">{formatDate(img.date)} · {img.event}</span>
            {img.caption}
          </div>
        </article>
      {/each}
    </div>
    <div class="text-center mt-3"><a class="btn" href="/gallery">See full gallery →</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid cols-3">
      <div class="card">
        <h3>Donate (80G)</h3>
        <p>Every rupee goes directly to children. Tax-exempt under Section 80G.</p>
        <a class="btn primary sm" href="/donate">Donate now</a>
      </div>
      <div class="card">
        <h3>Volunteer</h3>
        <p>Teach, mentor, or support operations in your city.</p>
        <a class="btn sm" href="/programmes/vinaya">Volunteer</a>
      </div>
      <div class="card">
        <h3>Partner / Adopt</h3>
        <p>Companies, trusts, and schools can collaborate with us.</p>
        <a class="btn sm" href="/contact">Get in touch</a>
      </div>
    </div>
  </div>
</section>
