<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';
  let submitting = false;

  async function submit(e) {
    e.preventDefault();
    error = '';
    submitting = true;
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        error = data.error || 'Login failed.';
      } else {
        const next = $page.url.searchParams.get('next') || '/admin';
        goto(next);
      }
    } catch (err) {
      error = err.message;
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head><title>Admin login — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container login-wrap">
    <div class="card">
      <h1>Admin login</h1>
      <p class="text-muted">Sign in with your authorised admin email and the shared admin password. 8-hour session.</p>

      {#if error}<div class="alert error">{error}</div>{/if}

      <form class="form mt-2" on:submit={submit} novalidate>
        <label>Email</label>
        <input type="email" bind:value={email} autocomplete="username" required />
        <label>Password</label>
        <input type="password" bind:value={password} autocomplete="current-password" required />
        <div class="mt-2">
          <button class="btn primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>

      <p class="hint mt-2">If you don't have credentials yet, contact <a href="mailto:contact@niyodaya.in">contact@niyodaya.in</a>.</p>
    </div>
  </div>
</section>

<style>
  .login-wrap { max-width: 440px; margin: 0 auto; }
</style>
