<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  export let data;

  $: showBar = $page.url.pathname !== '/admin/login';

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    goto('/admin/login');
  }
</script>

{#if showBar && data.user}
  <div class="admin-bar">
    <div class="container inner">
      <a href="/admin" class="label">🛡 Niyodaya Admin</a>
      <span class="sep">·</span>
      <a href="/admin" class="sub">Home</a>
      <a href="/admin/reports/donors" class="sub">Donors</a>
      <a href="/admin/reports/volunteers" class="sub">Volunteers</a>
      <a href="/admin/reports/applications" class="sub">Applications</a>
      <a href="/admin/reports/contact" class="sub">Inbox</a>
      <a href="/admin/gallery" class="sub">Gallery</a>
      <span class="spacer"></span>
      {#if data.user.dev}
        <span class="pill pill-warn">dev mode · no password set</span>
      {:else}
        <span class="who">{data.user.email}</span>
      {/if}
      <button class="btn sm ghost" on:click={signOut}>Sign out</button>
    </div>
  </div>
{/if}

<slot />

<style>
  .admin-bar {
    background: #1e293b;
    color: #cbd5e1;
    font-size: 13px;
    border-bottom: 1px solid #334155;
  }
  .admin-bar .inner {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 8px 20px;
  }
  .admin-bar a { color: #cbd5e1; text-decoration: none; }
  .admin-bar a:hover { color: #fff; }
  .admin-bar .label { font-weight: 700; color: #fff; letter-spacing: .3px; }
  .admin-bar .sep { color: #475569; }
  .admin-bar .sub { padding: 3px 8px; border-radius: 4px; }
  .admin-bar .sub:hover { background: #334155; }
  .admin-bar .spacer { flex: 1; }
  .admin-bar .who { color: #e2e8f0; }
  .admin-bar .btn { padding: 4px 10px; font-size: 12px; color: #fff; border-color: #475569; background: transparent; }
  .admin-bar .btn:hover { background: #334155; }
  .pill-warn { background: #b45309; color: #fffbeb; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; }
</style>
