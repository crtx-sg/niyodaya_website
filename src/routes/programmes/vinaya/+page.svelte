<script>
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
        status = which === 'school'
          ? 'Request received. Our team will reach out to your school within a week.'
          : "Thank you for offering to volunteer. We'll be in touch soon.";
        if (which === 'school') school = { type: 'school', name: '', contact: '', city: '', needs: '', description: '' };
        else volunteer = { type: 'volunteer', name: '', contact: '', city: '', skills: '', hours_per_week: '' };
      }
    } catch (err) {
      status = 'Network error. Please try again.';
    } finally {
      submitting = null;
    }
  }
</script>

<svelte:head><title>Project Vinaya — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#ecfeff,#f0fdf4)">
      <div class="eyebrow">Project</div>
      <h1>Project Vinaya — Resources for schools that need them</h1>
      <p class="lede">Vinaya connects deserving schools and students with teaching materials, volunteer educators, and long-form mentorship from our network.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-3">
      <div class="card"><h3>Teaching resources</h3><p>Textbooks, worksheets, lab kits, computer hardware, and sports equipment.</p></div>
      <div class="card"><h3>Volunteer educators</h3><p>Qualified professionals who give 2-6 hours a week to teach subjects, values, and life-skills.</p></div>
      <div class="card"><h3>Mentorship</h3><p>Long-form mentoring for senior students on careers, higher education, and vocational choices.</p></div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>Our impact so far</h2>
    <p class="text-muted">A snapshot of what Project Vinaya has delivered <strong>as of 2025</strong>, working with modest resources and a committed volunteer network.</p>
    <div class="grid cols-3 mt-2">
      <div class="card stat"><div class="num">5</div><div class="lbl">schools supported</div></div>
      <div class="card stat"><div class="num">₹75,000</div><div class="lbl">disbursed in resources</div></div>
      <div class="card stat"><div class="num">3</div><div class="lbl">categories: furniture, stationery, kitchen equipment</div></div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    {#if status}<div class="alert {Object.keys(errors).length ? 'error' : 'success'}">{status}</div>{/if}

    <div class="grid cols-2 mt-2">
      <div class="card">
        <h3>Request resources / volunteers (schools)</h3>
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
        <h3>Offer to volunteer</h3>
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
