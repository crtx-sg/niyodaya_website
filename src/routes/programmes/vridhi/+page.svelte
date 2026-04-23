<script>
  let form = { student_name: '', age: '', father_name: '', phone: '', school_name: '', reason: '' };
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
        status = 'Thank you — your application has been received. Our team will contact you within 5 working days.';
        form = { student_name: '', age: '', father_name: '', phone: '', school_name: '', reason: '' };
      }
    } catch (err) {
      status = 'Network error. Please check your connection and try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head><title>Project Vridhi — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#fff7ed,#fef9c3)">
      <div class="eyebrow">Project</div>
      <h1>Project Vridhi — Growth through a second chance</h1>
      <p class="lede">For children who drop out of school or don't clear their Class 10 / 12 board exams. We counsel, re-engage, and provide NIOS and vocational pathways so the journey continues.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2">
      <div class="card prose">
        <h3>Who this is for</h3>
        <ul>
          <li>Children who have dropped out due to financial, family, or health reasons</li>
          <li>Students who have not cleared Std. 10 or Std. 12 board exams</li>
          <li>Schools wishing to refer students who need additional support</li>
        </ul>
      </div>
      <div class="card prose">
        <h3>How we support</h3>
        <ul>
          <li>One-on-one counselling with the student (and family)</li>
          <li>Re-enrolment via NIOS (National Institute of Open Schooling)</li>
          <li>Connections to vocational-training partners</li>
          <li>Study material, fees, and mentorship support</li>
          <li>All information is kept strictly confidential</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <h2>Our impact so far</h2>
    <p class="text-muted">Niyodaya operates on modest funds. Every rupee is stewarded carefully — here is what we have been able to do under Project Vridhi <strong>as of 2025</strong>.</p>
    <div class="grid cols-4 mt-2">
      <div class="card stat"><div class="num">15</div><div class="lbl">children supported<br>(including dropouts)</div></div>
      <div class="card stat"><div class="num">11</div><div class="lbl">partner schools across Bengaluru</div></div>
      <div class="card stat"><div class="num">50%</div><div class="lbl">of children supported are girls</div></div>
      <div class="card stat"><div class="num">₹5,00,000</div><div class="lbl">disbursed toward their education</div></div>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="card">
      <h2>Application for support</h2>
      <p class="text-muted">Schools or needy students can apply here. Information submitted is kept confidential.</p>

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
        <label for="school_name">School Name (if applicable)</label>
        <input id="school_name" bind:value={form.school_name} />

        <label for="reason">Reason for support *</label>
        <textarea id="reason" rows="5" bind:value={form.reason} required></textarea>
        {#if errors.reason}<div class="error">{errors.reason}</div>{/if}

        <div class="mt-2">
          <button type="submit" class="btn primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        </div>
        <p class="hint">Your information is kept confidential and will only be used by the Niyodaya team to assess your request.</p>
      </form>
    </div>
  </div>
</section>
