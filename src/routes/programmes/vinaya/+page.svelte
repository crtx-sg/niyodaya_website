<script>
  // Page content lives in: src/lib/data/vinaya.js  ← edit there
  import { vinaya } from '$lib/data/vinaya.js';

  let school = { type: 'school', name: '', contact: '', city: '', needs: '', description: '' };
  let volunteer = { type: 'volunteer', name: '', contact: '', city: '', skills: '', hours_per_week: '' };
  let status = '';
  let errors = {};
  let submitting = null;

  async function submit(which) {
    status = ''; errors = {};
    submitting = which;
    const payload = which === 'school' ? school : volunteer;
    try {
      const res = await fetch('/api/vinaya', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        errors = data.errors || {};
        status = data.error || 'Something went wrong.';
      } else {
        status = which === 'school' ? vinaya.schoolForm.successMessage : vinaya.volunteerForm.successMessage;
        if (which === 'school') school = { type: 'school', name: '', contact: '', city: '', needs: '', description: '' };
        else volunteer = { type: 'volunteer', name: '', contact: '', city: '', skills: '', hours_per_week: '' };
      }
    } catch {
      status = 'Network error. Please try again.';
    } finally {
      submitting = null;
    }
  }
</script>

<svelte:head><title>{vinaya.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#ecfeff,#f0fdf4)">
      <div class="eyebrow">{vinaya.hero.eyebrow}</div>
      <h1>{vinaya.hero.heading}</h1>
      <p class="lede">{vinaya.hero.lede}</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      {#each vinaya.capabilities as c}
        <div class="card"><h3>{c.heading}</h3><p>{c.body}</p></div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>{vinaya.impact.heading}</h2>
    <p class="text-muted">{@html vinaya.impact.note}</p>
    <div class="grid cols-3 mt-2">
      {#each vinaya.impact.stats as s}
        <div class="card stat"><div class="num">{s.num}</div><div class="lbl">{@html s.label}</div></div>
      {/each}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    {#if status}<div class="alert {Object.keys(errors).length ? 'error' : 'success'}">{status}</div>{/if}

    <div class="grid cols-2 mt-2">
      <div class="card">
        <h3>{vinaya.schoolForm.heading}</h3>
        <form class="form" on:submit|preventDefault={() => submit('school')} novalidate>
          <label>School Name *</label>
          <input bind:value={school.name} required />
          <label>Contact person &amp; phone *</label>
          <input bind:value={school.contact} required />
          <label>City</label>
          <input bind:value={school.city} />
          <label>Type of support needed *</label>
          <input bind:value={school.needs} placeholder="e.g. volunteer maths teacher" required />
          <label>Brief description</label>
          <textarea rows="4" bind:value={school.description}></textarea>
          <div class="mt-2">
            <button class="btn primary" disabled={submitting === 'school'}>
              {submitting === 'school' ? 'Submitting…' : 'Submit request'}
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3>{vinaya.volunteerForm.heading}</h3>
        <form class="form" on:submit|preventDefault={() => submit('volunteer')} novalidate>
          <label>Your name *</label>
          <input bind:value={volunteer.name} required />
          <label>Contact (email / phone) *</label>
          <input bind:value={volunteer.contact} required />
          <label>City *</label>
          <input bind:value={volunteer.city} required />
          <label>Skills / subjects you can teach *</label>
          <input bind:value={volunteer.skills} placeholder="e.g. Maths, Spoken English, Computers" required />
          <label>Hours available per week</label>
          <input type="number" min="1" max="40" bind:value={volunteer.hours_per_week} />
          <div class="mt-2">
            <button class="btn saffron" disabled={submitting === 'volunteer'}>
              {submitting === 'volunteer' ? 'Submitting…' : 'I want to volunteer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
