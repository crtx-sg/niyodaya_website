<script>
  // Page content lives in: src/lib/data/about.js  ← edit there
  import { about } from '$lib/data/about.js';
</script>

<svelte:head><title>{about.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#ecfeff,#ede9fe)">
      <div class="eyebrow">{about.hero.eyebrow}</div>
      <h1>{about.hero.heading}</h1>
      <p class="lede">{about.hero.lede}</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2-1">
      <div class="card prose">
        <h3>{about.story.heading}</h3>
        {#each about.story.paragraphs as p}
          <p>{@html p}</p>
        {/each}
      </div>
      <div class="card">
        <h3>{about.governance.heading}</h3>
        <p class="text-muted">{about.governance.description}</p>
        <a class="btn sm" href={about.governance.cta.href} target={about.governance.cta.external ? '_blank' : undefined} rel={about.governance.cta.external ? 'noopener' : undefined}>{about.governance.cta.label}</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      {#each about.pillars as pillar}
        <div class="card"><h3>{pillar.heading}</h3><p>{pillar.body}</p></div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>{about.objectives.heading}</h2>
    <p class="text-muted">{about.objectives.note}</p>
    <div class="grid cols-2 mt-2">
      {#each about.objectives.columns as col}
        <div class="card prose">
          <ul>
            {#each col as item}<li>{item}</li>{/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>{about.team.heading}</h2>
    <p class="text-muted">{about.team.note}</p>
    <div class="grid cols-4 mt-2">
      {#each about.team.members as m}
        <div class="card text-center">
          <div class="avatar">{m.initials}</div>
          <h4>{m.name}</h4>
          <p class="text-muted">{m.role}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .avatar { width: 64px; height: 64px; border-radius: 999px; background: #eef2ff; color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; margin: 0 auto 8px; }
</style>
