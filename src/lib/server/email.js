// =====================================================
// Email sender — transactional mail via Resend
// (https://resend.com).  Falls back to console.log
// when RESEND_API_KEY is not set so local development
// never fails.
// =====================================================

import { env } from '$env/dynamic/private';

export async function sendEmail({ to, subject, html, text }) {
  const from = env.EMAIL_FROM || 'Niyodaya <no-reply@niyodaya.in>';
  if (!env.RESEND_API_KEY) {
    console.log('[email:fallback] would send mail', { from, to, subject });
    return { ok: true, mocked: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from, to, subject, html, text })
    });
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${t}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export function ackTemplate({ name, subject, body }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f2937;">
    <h2 style="color:#1e3a8a;margin:0 0 8px;">Niyodaya Foundation</h2>
    <p style="color:#b45309;margin:0 0 20px;font-style:italic;">a new dawn for every child's learning</p>
    <p>Dear ${name || 'friend'},</p>
    <p>${body}</p>
    <p>With gratitude,<br>Team Niyodaya</p>
    <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0"/>
    <p style="font-size:12px;color:#6b7280;">Niyodaya Foundation · Saideep Haven, Sri Rama Temple Road, New Thippasandra, Bangalore 560075 · contact@niyodaya.in</p>
  </div>`;
}
