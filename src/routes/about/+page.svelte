<script>
  // Page content lives in: src/lib/data/about.js  ← hero, story, objectives
  // Team list lives in:    src/lib/data/team.js   ← edit there for team changes
  import { about } from '$lib/data/about.js';
  import { team } from '$lib/data/team.js';
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
    <h2>{team.heading}</h2>
    {#if team.note}<p class="text-muted">{team.note}</p>{/if}
    <div class="grid cols-4 mt-2">
      {#each team.members as m}
        <div class="card text-center team-card">
          {#if m.photo}
            <img src={m.photo} alt={m.name} class="photo" />
          {:else}
            <div class="avatar">{m.initials}</div>
          {/if}
          <h4>{m.name}</h4>
          <p class="role text-muted">{m.role}</p>
          {#if m.bio}
            <p class="bio">{@html m.bio}</p>
          {/if}
          {#if m.links && m.links.length}
            <div class="links">
              {#each m.links as link}
                <a href={link.href} target="_blank" rel="noopener">{link.label}</a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .team-card { display: flex; flex-direction: column; align-items: center; }
  .avatar {
    width: 72px; height: 72px; border-radius: 999px;
    background: #eef2ff; color: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px; margin: 0 auto 10px;
  }
  .photo {
    width: 96px; height: 96px; border-radius: 999px;
    object-fit: cover; margin: 0 auto 10px;
    border: 2px solid var(--saffron-soft);
  }
  .role { margin: 2px 0 8px; font-size: 13px; }
  .bio  { font-size: 13.5px; color: var(--ink-soft); line-height: 1.55; }
  .links { margin-top: 10px; display: flex; gap: 10px; justify-content: center; font-size: 12.5px; }
</style>
