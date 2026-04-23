<script>
  // Curated photos live in: src/lib/data/gallery.js
  // Admin uploads are merged via GET /api/gallery at runtime.
  import { galleryImages, formatDate } from '$lib/data/gallery.js';
  import { onMount } from 'svelte';

  let images = galleryImages;
  let filter = 'all';
  let lightbox = null;

  $: filtered = images
    .filter((img) => {
      if (filter === 'all') return true;
      if (filter.startsWith('year:')) return (img.date || '').startsWith(filter.slice(5));
      if (filter.startsWith('prog:')) return img.programme === filter.slice(5);
      return true;
    })
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

  function src(img) {
    return img.url ? img.url : `/gallery/${img.file}`;
  }
  function onKey(e) { if (e.key === 'Escape') lightbox = null; }

  onMount(async () => {
    window.addEventListener('keydown', onKey);
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) images = await res.json();
    } catch { /* keep curated-only fallback */ }
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<svelte:head><title>Gallery — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#fef2f2,#fff7ed)">
      <div class="eyebrow">Gallery</div>
      <h1>Moments from the field</h1>
      <p class="lede">Filter by year or programme. Click a photo to see the full caption and context.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="filter-bar" role="tablist" aria-label="Filter gallery">
      <button class:active={filter === 'all'} on:click={() => (filter = 'all')}>All</button>
      <button class:active={filter === 'year:2010'} on:click={() => (filter = 'year:2010')}>2010</button>
      <button class:active={filter === 'year:2011'} on:click={() => (filter = 'year:2011')}>2011</button>
      <button class:active={filter === 'year:2012'} on:click={() => (filter = 'year:2012')}>2012</button>
      <button class:active={filter === 'prog:vidya'} on:click={() => (filter = 'prog:vidya')}>Vidya</button>
      <button class:active={filter === 'prog:vinaya'} on:click={() => (filter = 'prog:vinaya')}>Vinaya</button>
    </div>

    <div class="gallery-grid">
      {#each filtered as img (img.file || img.id || img.url)}
        <article class="gallery-card">
          <button class="thumb" aria-label={`Open ${img.caption}`} on:click={() => (lightbox = img)}>
            <img src={src(img)} alt={img.caption} loading="lazy" />
          </button>
          <div class="cap">
            <span class="date">{formatDate(img.date)}{img.event ? ' · ' + img.event : ''}</span>
            {img.caption}
          </div>
        </article>
      {/each}
    </div>

    <p class="text-muted mt-3">{filtered.length} photo{filtered.length === 1 ? '' : 's'}</p>
  </div>
</section>

{#if lightbox}
  <div class="lightbox" on:click={() => (lightbox = null)} role="dialog" aria-modal="true">
    <button class="close" aria-label="Close" on:click={() => (lightbox = null)}>✕</button>
    <img src={src(lightbox)} alt={lightbox.caption} on:click|stopPropagation />
    <div class="meta">
      <strong>{formatDate(lightbox.date)}{lightbox.event ? ' · ' + lightbox.event : ''}</strong><br>
      {lightbox.caption}
    </div>
  </div>
{/if}

<style>
  .thumb { display: block; padding: 0; border: 0; background: transparent; cursor: zoom-in; }
  .thumb img { width: 100%; }
</style>
