<script>
  import { site } from '$lib/data/site.js';

  let form = { name: '', email: '', subject: '', message: '' };
  let status = '';
  let errors = {};
  let submitting = false;

  async function submit(e) {
    e.preventDefault();
    status = ''; errors = {};
    submitting = true;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        errors = data.errors || {};
        status = data.error || 'Something went wrong. Please try again.';
      } else {
        status = "Thank you — we'll get back to you soon.";
        form = { name: '', email: '', subject: '', message: '' };
      }
    } catch {
      status = 'Network error. Please try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head><title>Contact — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero">
      <div class="eyebrow">Contact</div>
      <h1>Get in touch</h1>
      <p class="lede">Questions about our programmes, partnering with us, or volunteering? Send us a note — we read every message.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2-1">
      <div class="card">
        <h3>Send us a message</h3>

        {#if status}<div class="alert {Object.keys(errors).length ? 'error' : 'success'}">{status}</div>{/if}

        <form class="form" on:submit={submit} novalidate>
          <label>Your name *</label>
          <input bind:value={form.name} required />
          {#if errors.name}<div class="error">{errors.name}</div>{/if}
          <label>Email *</label>
          <input type="email" bind:value={form.email} required />
          {#if errors.email}<div class="error">{errors.email}</div>{/if}
          <label>Subject</label>
          <input bind:value={form.subject} />
          <label>Message *</label>
          <textarea rows="6" bind:value={form.message} required></textarea>
          {#if errors.message}<div class="error">{errors.message}</div>{/if}

          <div class="mt-2">
            <button class="btn primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3>Registered office</h3>
        <address>
          {site.name}<br>
          {site.address.line1}<br>
          {site.address.line2}<br>
          {site.address.city} {site.address.pincode}<br>
          {site.address.state}, {site.address.country}
        </address>
        <p>Email: <a href="mailto:{site.email}">{site.email}</a></p>
        <p>Website: <a href="https://{site.website}">{site.website}</a></p>

        <div class="map mt-2">
          <iframe
            title="Map — Niyodaya Foundation registered office"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.650%2C12.967%2C77.665%2C12.978&layer=mapnik&marker=12.9725%2C77.6575"
            loading="lazy"
            referrerpolicy="no-referrer"
          ></iframe>
          <div class="map-link">
            <a class="btn sm" href="https://www.google.com/maps/search/?api=1&query=Saideep+Haven+Sri+Rama+Temple+Road+New+Thippasandra+Bangalore+560075" target="_blank" rel="noopener">Open in Google Maps ↗</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  address { font-style: normal; line-height: 1.7; }
  .map { border-radius: 10px; overflow: hidden; border: 1px solid var(--line); }
  .map iframe { width: 100%; height: 280px; border: 0; display: block; }
  .map-link { padding: 10px 12px; background: #f8fafc; border-top: 1px solid var(--line); text-align: center; }
</style>
