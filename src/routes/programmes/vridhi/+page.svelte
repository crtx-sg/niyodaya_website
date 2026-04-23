<script>
  // Page content lives in: src/lib/data/vridhi.js  ← edit there
  import { vridhi } from '$lib/data/vridhi.js';

  let form = { student_name: '', age: '', father_name: '', phone: '', email: '', school_name: '', reason: '' };
  let status = '';
  let errors = {};
  let submitting = false;

  async function submit(e) {
    e.preventDefault();
    status = ''; errors = {};
    submitting = true;
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        errors = data.errors || {};
        status = data.error || 'Something went wrong. Please try again.';
      } else {
        status = vridhi.form.successMessage;
        form = { student_name: '', age: '', father_name: '', phone: '', email: '', school_name: '', reason: '' };
      }
    } catch {
      status = 'Network error. Please check your connection and try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head><title>{vridhi.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#fff7ed,#fef9c3)">
      <div class="eyebrow">{vridhi.hero.eyebrow}</div>
      <h1>{vridhi.hero.heading}</h1>
      <p class="lede">{vridhi.hero.lede}</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2">
      <div class="card prose">
        <h3>{vridhi.whoFor.heading}</h3>
        <ul>{#each vridhi.whoFor.items as item}<li>{item}</li>{/each}</ul>
      </div>
      <div class="card prose">
        <h3>{vridhi.howSupport.heading}</h3>
        <ul>{#each vridhi.howSupport.items as item}<li>{item}</li>{/each}</ul>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>{vridhi.impact.heading}</h2>
    <p class="text-muted">{@html vridhi.impact.note}</p>
    <div class="grid cols-4 mt-2">
      {#each vridhi.impact.stats as s}
        <div class="card stat"><div class="num">{s.num}</div><div class="lbl">{@html s.label}</div></div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="card">
      <h2>{vridhi.form.heading}</h2>
      <p class="text-muted">{vridhi.form.subheading}</p>

      {#if status}
        <div class="alert {errors && Object.keys(errors).length ? 'error' : 'success'}">{status}</div>
      {/if}

      <form class="form mt-2" on:submit={submit} novalidate>
        <div class="row">
          <div>
            <label for="student_name">Student Name *</label>
            <input id="student_name" bind:value={form.student_name} required />
            {#if errors.student_name}<div class="error">{errors.student_name}</div>{/if}
          </div>
          <div>
            <label for="age">Age *</label>
            <input id="age" type="number" min="4" max="25" bind:value={form.age} required />
            {#if errors.age}<div class="error">{errors.age}</div>{/if}
          </div>
        </div>
        <div class="row">
          <div>
            <label for="father_name">Father's / Guardian's Name *</label>
            <input id="father_name" bind:value={form.father_name} required />
            {#if errors.father_name}<div class="error">{errors.father_name}</div>{/if}
          </div>
          <div>
            <label for="phone">Contact Phone *</label>
            <input id="phone" bind:value={form.phone} required />
            {#if errors.phone}<div class="error">{errors.phone}</div>{/if}
          </div>
        </div>
        <div class="row">
          <div>
            <label for="email">Email (optional — we'll email an acknowledgement)</label>
            <input id="email" type="email" bind:value={form.email} />
          </div>
          <div>
            <label for="school_name">School Name (if applicable)</label>
            <input id="school_name" bind:value={form.school_name} />
          </div>
        </div>

        <label for="reason">Reason for support *</label>
        <textarea id="reason" rows="5" bind:value={form.reason} required></textarea>
        {#if errors.reason}<div class="error">{errors.reason}</div>{/if}

        <div class="mt-2">
          <button type="submit" class="btn primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        </div>
        <p class="hint">{vridhi.form.confidentialityHint}</p>
      </form>
    </div>
  </div>
</section>
