<script>
  import { page } from '$app/stores';
</script>

<svelte:head><title>{$page.status} — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container text-center">
    <div class="card" style="max-width:500px; margin: 40px auto;">
      <h1>{$page.status}</h1>
      <p class="text-muted">{$page.error?.message || 'Something went wrong.'}</p>
      <a class="btn primary mt-2" href="/">Go to homepage →</a>
    </div>
  </div>
</section>
