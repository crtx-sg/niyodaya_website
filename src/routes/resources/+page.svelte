<script>
  // Page content lives in: src/lib/data/resources.js  ← edit there
  import { resources } from '$lib/data/resources.js';
</script>

<svelte:head><title>{resources.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#eff6ff,#fefce8)">
      <div class="eyebrow">{resources.hero.eyebrow}</div>
      <h1>{resources.hero.heading}</h1>
      <p class="lede">{resources.hero.lede}</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      {#each resources.externalResources.items as r}
        <div class="card">
          <h3>{r.heading}</h3>
          <p>{r.body}</p>
          {#each r.links as link}
            <a class="btn sm {link.ghost ? 'ghost' : ''}" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener' : undefined} style="margin-top:6px">
              {link.label}{link.external ? ' ↗' : ''}
            </a>
          {/each}
        </div>
      {/each}
    </div>

    <h2 class="mt-4">{resources.documents.heading}</h2>
    <div class="grid cols-4 mt-2">
      {#each resources.documents.items as d}
        <div class="card">
          <h4>{d.heading}</h4>
          <p class="text-muted">{@html d.body}</p>
          {#each d.links as link}
            <a class="btn sm {link.ghost ? 'ghost' : ''}" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener' : undefined}>
              {link.label}{link.external ? ' ↗' : ''}
            </a>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
