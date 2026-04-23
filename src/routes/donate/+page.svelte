<script>
  // Page content lives in: src/lib/data/donate.js  ← edit there
  // Bank details come from: src/lib/data/site.js
  import { donate } from '$lib/data/donate.js';
  import { site } from '$lib/data/site.js';
  import { onMount } from 'svelte';

  let form = { donor_name: '', email: '', phone: '', pan: '', amount: '', purpose: '' };
  let status = '';
  let errors = {};
  let submitting = false;
  let razorpayLoaded = false;

  onMount(() => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => (razorpayLoaded = true);
    s.onerror = () => (razorpayLoaded = false);
    document.body.appendChild(s);
  });

  async function submit(e) {
    e.preventDefault();
    status = ''; errors = {};
    submitting = true;
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        errors = data.errors || {};
        status = data.error || 'Unable to start payment. Please try again.';
        submitting = false;
        return;
      }

      if (data.order?.status === 'created_mock') {
        status = 'Thank you! (Mock mode — Razorpay keys are not configured, but your donor details were captured.)';
        submitting = false;
        return;
      }

      if (!razorpayLoaded || !window.Razorpay) {
        status = 'Payment widget still loading. Please try again in a moment.';
        submitting = false;
        return;
      }

      const rzp = new window.Razorpay({
        key: data.publicKey,
        order_id: data.order.id,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Niyodaya Foundation',
        description: 'Donation (80G eligible)',
        prefill: { name: form.donor_name, email: form.email, contact: form.phone },
        notes: { pan: form.pan, purpose: form.purpose || '' },
        theme: { color: '#1e3a8a' },
        handler: async (response) => {
          const v = await fetch('/api/donate', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...form,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const out = await v.json();
          if (v.ok) {
            status = donate.thankYouTemplate.replace('{EMAIL}', form.email);
            form = { donor_name: '', email: '', phone: '', pan: '', amount: '', purpose: '' };
          } else {
            status = out.error || 'Payment captured but verification failed. Please email contact@niyodaya.in.';
          }
          submitting = false;
        },
        modal: {
          ondismiss: () => { submitting = false; status = 'Payment cancelled. You can try again anytime.'; }
        }
      });
      rzp.open();
    } catch {
      status = 'Network error. Please try again.';
      submitting = false;
    }
  }
</script>

<svelte:head><title>{donate.title}</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#fef3c7,#fee2e2)">
      <div class="eyebrow">{donate.hero.eyebrow}</div>
      <h1>{donate.hero.heading}</h1>
      <p class="lede">{donate.hero.lede}</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2-1">
      <div class="card">
        <h3>{donate.formHeading}</h3>

        {#if status}
          <div class="alert {Object.keys(errors).length ? 'error' : 'success'}">{status}</div>
        {/if}

        <form class="form" on:submit={submit} novalidate>
          <div class="row">
            <div>
              <label>Donor Name *</label>
              <input bind:value={form.donor_name} required />
              {#if errors.donor_name}<div class="error">{errors.donor_name}</div>{/if}
            </div>
            <div>
              <label>Contact Email *</label>
              <input type="email" bind:value={form.email} required />
              {#if errors.email}<div class="error">{errors.email}</div>{/if}
            </div>
          </div>
          <div class="row">
            <div>
              <label>Contact Phone *</label>
              <input bind:value={form.phone} required />
              {#if errors.phone}<div class="error">{errors.phone}</div>{/if}
            </div>
            <div>
              <label>PAN / Tax Code *</label>
              <input bind:value={form.pan} placeholder="ABCDE1234F" required style="text-transform:uppercase" />
              {#if errors.pan}<div class="error">{errors.pan}</div>{/if}
            </div>
          </div>
          <label>Amount (INR) *</label>
          <input type="number" min="1" bind:value={form.amount} required />
          {#if errors.amount}<div class="error">{errors.amount}</div>{/if}

          <label>Purpose / earmark this donation for (optional)</label>
          <textarea rows="3" bind:value={form.purpose}></textarea>

          <div class="mt-2">
            <button class="btn primary" disabled={submitting}>
              {submitting ? 'Processing…' : 'Proceed to Razorpay Checkout →'}
            </button>
          </div>
          <p class="hint">{donate.formHint}</p>
        </form>
      </div>

      <div>
        <div class="card">
          <h3>{donate.whereMoneyGoes.heading}</h3>
          <table class="table">
            <thead><tr><th>Amount</th><th>What it enables</th></tr></thead>
            <tbody>
              {#each donate.whereMoneyGoes.rows as r}
                <tr><td>{r.amount}</td><td>{r.enables}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>

        <div class="card mt-2">
          <h3>{donate.bankHeading}</h3>
          <pre class="bank">
Name:    {site.bank.name}
Bank:    {site.bank.bank}
A/C No.: {site.bank.account}
IFSC:    {site.bank.ifsc}</pre>
          <p class="hint">{donate.bankNote.replace('{EMAIL}', site.email)}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  pre.bank {
    background: #f8fafc;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 10px 12px;
    font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
    font-size: 13px;
    line-height: 1.7;
    white-space: pre;
    overflow-x: auto;
  }
</style>
