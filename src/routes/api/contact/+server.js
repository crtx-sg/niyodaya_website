// POST /api/contact — contact form
import { json } from '@sveltejs/kit';
import { insert } from '$lib/server/insforge.js';
import { sendEmail } from '$lib/server/email.js';
import { env } from '$env/dynamic/private';
import { validate, required, isEmail } from '$lib/utils/validation.js';

export async function POST({ request }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { ok, errors } = validate(body, {
    name: (v) => required(v, 'Name'),
    email: isEmail,
    message: (v) => required(v, 'Message')
  });
  if (!ok) return json({ error: 'Please correct the highlighted fields.', errors }, { status: 400 });

  const result = await insert('contact_messages', {
    name: body.name,
    email: body.email,
    subject: body.subject || null,
    message: body.message
  });
  if (!result.ok) return json({ error: result.error || 'Save failed' }, { status: 500 });

  sendEmail({
    to: env.EMAIL_ADMIN || 'contact@niyodaya.in',
    subject: `[Contact] ${body.subject || 'New message'} — ${body.name}`,
    html: `<p><b>From:</b> ${body.name} &lt;${body.email}&gt;</p>
           <p><b>Subject:</b> ${body.subject || '—'}</p>
           <p><b>Message:</b></p><p>${body.message.replace(/\n/g, '<br>')}</p>`
  }).catch(() => {});

  return json({ ok: true, id: result.id });
}
