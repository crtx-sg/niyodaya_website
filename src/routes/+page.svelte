<script>
  // Page content lives in: src/lib/data/home.js  ← edit there
  import { home } from '$lib/data/home.js';
  import { galleryImages, formatDate } from '$lib/data/gallery.js';

  const featured = galleryImages.slice(0, home.fromTheGround.showCount);
</script>

<svelte:head><title>{home.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero">
      <div class="eyebrow">{home.hero.eyebrow}</div>
      <h1>{home.hero.heading}</h1>
      <p class="lede">{home.hero.lede}</p>
      <div class="ctas">
        {#each home.hero.ctas as c}
          <a class="btn {c.style}" href={c.href}>{c.label}</a>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      {#each home.programmeCards as p}
        <div class="card">
          <span class="pill {p.pillStyle}">{p.pill}</span>
          <h3>{p.heading}</h3>
          <p>{p.body}</p>
          <a class="btn sm" href={p.cta.href}>{p.cta.label}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2 class="text-center">{home.impact.heading}</h2>
    <div class="grid cols-4 mt-2">
      {#each home.impact.stats as s}
        <div class="card stat"><div class="num">{s.num}</div><div class="lbl">{s.label}</div></div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>{home.fromTheGround.heading}</h2>
    <p class="text-muted">{home.fromTheGround.note}</p>
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
    <div class="text-center mt-3"><a class="btn" href={home.fromTheGround.cta.href}>{home.fromTheGround.cta.label}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid cols-3">
      {#each home.supportTiles as t}
        <div class="card">
          <h3>{t.heading}</h3>
          <p>{t.body}</p>
          <a class="btn sm {t.cta.style}" href={t.cta.href}>{t.cta.label}</a>
        </div>
      {/each}
    </div>
  </div>
</section>
