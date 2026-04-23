<script>
  import { page } from '$app/stores';
  import { nav } from '$lib/data/site.js';
  let open = false;
</script>

<header class="site-header">
  <div class="container bar">
    <a href="/" class="brand" aria-label="Niyodaya Foundation home">
      <img src="/logo-mark.svg" alt="" />
      <div class="brand-text">
        <strong>NIYODAYA</strong>
        <small>FOUNDATION</small>
      </div>
    </a>

    <button class="menu-toggle" aria-label="Toggle menu" on:click={() => (open = !open)}>
      <span />
      <span />
      <span />
    </button>

    <nav class:open>
      {#each nav as item}
        <a
          href={item.href}
          class:active={$page.url.pathname === item.href ||
            ($page.url.pathname.startsWith(item.href) && item.href !== '/')}
          on:click={() => (open = false)}
        >{item.label}</a>
      {/each}
      <a href="/donate" class="btn saffron sm" on:click={() => (open = false)}>Donate</a>
    </nav>
  </div>
</header>

<style>
  .site-header {
    background: #fff;
    border-bottom: 1px solid var(--line);
    position: sticky;
    top: 0;
    z-index: 40;
  }
  .bar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 20px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;
  }
  .brand img { height: 44px; width: 44px; }
  .brand-text { display: flex; flex-direction: column; line-height: 1; }
  .brand-text strong { font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: var(--accent); letter-spacing: .5px; }
  .brand-text small { font-size: 10px; color: var(--saffron-dark); letter-spacing: 3px; margin-top: 3px; }

  nav {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }
  nav a {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    color: var(--ink-soft);
    font-weight: 500;
    text-decoration: none;
  }
  nav a:hover { background: var(--saffron-soft); color: var(--saffron-dark); text-decoration: none; }
  nav a.active { color: var(--accent); background: #eef2ff; }

  .menu-toggle {
    display: none;
    margin-left: auto;
    background: transparent;
    border: 1px solid var(--line-strong);
    border-radius: 6px;
    padding: 8px 10px;
    cursor: pointer;
    flex-direction: column;
    gap: 4px;
  }
  .menu-toggle span {
    display: block; width: 20px; height: 2px; background: var(--ink);
  }

  @media (max-width: 860px) {
    .menu-toggle { display: flex; }
    nav {
      position: absolute;
      top: 100%;
      left: 0; right: 0;
      background: #fff;
      border-bottom: 1px solid var(--line);
      flex-direction: column;
      align-items: stretch;
      padding: 10px 20px 16px;
      display: none;
    }
    nav.open { display: flex; }
    nav a { padding: 10px 12px; }
  }
</style>
