<script>
  import { site } from '$lib/data/site.js';
  import { env as publicEnv } from '$env/dynamic/public';
  import { onMount } from 'svelte';

  let form = { donor_name: '', email: '', phone: '', pan: '', amount: '', purpose: '' };
  let status = '';
  let errors = {};
  let submitting = false;
  let razorpayLoaded = false;

  onMount(() => {
    // Load Razorpay Checkout script
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
      // 1. Create a Razorpay order via our server
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

      // If we're in mock mode (no gateway configured), just show success
      if (data.order?.status === 'created_mock') {
        status = 'Thank you! (Mock mode — Razorpay keys are not configured, but your donor details were captured.)';
        submitting = false;
        return;
      }

      // 2. Open Razorpay Checkout
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
          // 3. Verify + record the donation
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
            status = `Thank you for your donation! An 80G receipt will be emailed to ${form.email}.`;
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
    } catch (err) {
      status = 'Network error. Please try again.';
      submitting = false;
    }
  }
</script>

<svelte:head><title>Donate — Niyodaya Foundation</title></svelte:head>

<section class="section">
  <div class="container">
    <div class="hero" style="background: linear-gradient(135deg,#fef3c7,#fee2e2)">
      <div class="eyebrow">Donate</div>
      <h1>Donate — avail 80G Tax Exemption</h1>
      <p class="lede">Every contribution helps a child stay in school, eat a warm meal, and learn with dignity. Donations to Niyodaya are exempt under Section 80G of the Income Tax Act, 1961.</p>
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="grid cols-2-1">
      <div class="card">
        <h3>Donor form</h3>

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
          <p class="hint">We will email you an 80G receipt on successful payment.</p>
        </form>
      </div>

      <div>
        <div class="card">
          <h3>Where your money goes</h3>
          <table class="table">
            <thead><tr><th>Amount</th><th>What it enables</th></tr></thead>
            <tbody>
              <tr><td>₹1,500 / $15</td><td>Books &amp; stationery for one child for a term</td></tr>
              <tr><td>₹10,000 / $110</td><td>NIOS fees + study material for a Vridhi student</td></tr>
              <tr><td>₹2,40,000 / $2,500</td><td>One teaching-volunteer salary for a year (Vidya)</td></tr>
              <tr><td>₹3,00,000 / $3,200</td><td>Adopts one classroom for a year (Vidya)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="card mt-2">
          <h3>Bank transfer (NEFT / IMPS)</h3>
          <pre class="bank">
Name:    {site.bank.name}
Bank:    {site.bank.bank}
A/C No.: {site.bank.account}
IFSC:    {site.bank.ifsc}</pre>
          <p class="hint">For NEFT / IMPS / UPI, please email a screenshot of the transfer along with your PAN to <a href="mailto:{site.email}">{site.email}</a> for the 80G receipt.</p>
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
