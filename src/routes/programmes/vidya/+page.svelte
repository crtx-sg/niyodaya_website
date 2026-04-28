<script>
  // Page content lives in: src/lib/data/vidya.js  ← edit there
  import { vidya } from '$lib/data/vidya.js';
</script>

<svelte:head><title>{vidya.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#f5f3ff,#fdf2f8)">
      <div class="eyebrow">{vidya.hero.eyebrow}</div>
      <h1>{vidya.hero.heading}</h1>
      <p class="lede">{vidya.hero.lede}</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      {#each vidya.pillars as p}
        <div class="card"><h3>{p.heading}</h3><p>{p.body}</p></div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>{vidya.currentlyAdopted.heading}</h2>
    <div class="card prose mt-2">
      <ul>
        {#each vidya.currentlyAdopted.schools as school}
          <li>{@html school}</li>
        {/each}
      </ul>
    </div>

    <h3 class="mt-3">{vidya.spotlight.heading}</h3>
    <p class="text-muted">{vidya.spotlight.note}</p>
    <div class="grid cols-2 mt-2">
      {#each vidya.spotlight.placeholders as ph}
        <div class="card placeholder">
          <div class="ph-inner">
            <span>{ph.caption}</span>
            <small>{ph.subcaption}</small>
          </div>
        </div>
      {/each}
    </div>

    <div class="text-center mt-3">
      <a class="btn primary" href={vidya.cta.href}>{vidya.cta.label}</a>
      <p class="text-muted mt-2" style="font-size: 13.5px;">
        Or <a href="/donor-appeal.pdf">download our donor-appeal letter (PDF)</a>
        — context for the upcoming Gandhiji Memorial Vimanapura Vidya Mandir adoption and ways to give.
      </p>
    </div>
  </div>
</section>

<style>
  .placeholder { min-height: 220px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-style: dashed; }
  .ph-inner { text-align: center; color: #64748b; font-size: 14px; }
  .ph-inner small { display: block; color: #94a3b8; margin-top: 4px; font-size: 12px; }
</style>
