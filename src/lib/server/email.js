// =====================================================
// Email sender — supports two transports, picked in this order:
//
//   1) SMTP           (if SMTP_HOST is set)      — via nodemailer
//   2) Resend HTTP API (if RESEND_API_KEY is set)
//   3) Console fallback (no config)               — prints to terminal
//
// The site code just calls sendEmail({ to, subject, html, ... }).
// Submitter + admin copies are automatic via sendToUserAndAdmin().
// =====================================================

import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

let _smtpTransport = null;

function getSmtpTransport() {
  if (_smtpTransport) return _smtpTransport;
  if (!env.SMTP_HOST) return null;
  _smtpTransport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || 587),
    secure: String(env.SMTP_SECURE || '').toLowerCase() === 'true' || Number(env.SMTP_PORT) === 465,
    auth: env.SMTP_USER
      ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
      : undefined
  });
  return _smtpTransport;
}

function fromAddress() {
  return env.EMAIL_FROM || 'Niyodaya Foundation <contact@niyodaya.in>';
}

/**
 * Send one email. The recipient can be a string or array of strings.
 * Also accepts `cc`, `replyTo`, and `attachments` (array of
 * `{ filename, content (Buffer), contentType }`).
 */
export async function sendEmail({ to, cc, subject, html, text, replyTo, attachments }) {
  const from = fromAddress();

  // 1) SMTP preferred (supports real attachments)
  const smtp = getSmtpTransport();
  if (smtp) {
    try {
      const info = await smtp.sendMail({ from, to, cc, subject, html, text, replyTo, attachments });
      return { ok: true, messageId: info.messageId, transport: 'smtp' };
    } catch (err) {
      console.error('[email:smtp] failed', err.message);
      return { ok: false, error: err.message, transport: 'smtp' };
    }
  }

  // 2) Resend (HTTP — attachments via base64)
  if (env.RESEND_API_KEY) {
    try {
      const body = { from, to, cc, subject, html, text, reply_to: replyTo };
      if (attachments?.length) {
        body.attachments = attachments.map((a) => ({
          filename: a.filename,
          content: Buffer.isBuffer(a.content) ? a.content.toString('base64') : a.content
        }));
      }
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const t = await res.text();
        return { ok: false, error: `Resend ${res.status}: ${t}`, transport: 'resend' };
      }
      return { ok: true, transport: 'resend' };
    } catch (err) {
      return { ok: false, error: err.message, transport: 'resend' };
    }
  }

  // 3) Console fallback
  const attInfo = attachments?.length ? ` + ${attachments.length} attachment(s)` : '';
  console.log(`[email:fallback] (no SMTP or RESEND configured) would send:`, { from, to, cc, subject: subject + attInfo });
  return { ok: true, mocked: true, transport: 'console' };
}

/**
 * Convenience — send the *same* message to the submitter AND
 * copy the Niyodaya admin inbox. Optionally attach a file
 * (e.g. the 80G receipt for donations).
 */
export async function sendToUserAndAdmin({ userEmail, userName, subject, body, attachments }) {
  const admin = env.EMAIL_ADMIN || 'contact@niyodaya.in';

  return sendEmail({
    to: userEmail,
    cc: admin,
    subject,
    html: ackTemplate({ name: userName, body }),
    replyTo: admin,
    attachments
  });
}

/**
 * Friendly, branded HTML template for acknowledgement emails.
 */
export function ackTemplate({ name, body }) {
  return `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937;">
    <h2 style="color: #1e3a8a; margin: 0 0 4px;">Niyodaya Foundation</h2>
    <p style="color: #b45309; margin: 0 0 20px; font-style: italic;">a new dawn for every child's learning</p>
    <p>Dear ${escape(name || 'friend')},</p>
    <div>${body}</div>
    <p style="margin-top: 24px;">With gratitude,<br>Team Niyodaya</p>
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0" />
    <p style="font-size: 12px; color: #6b7280;">
      Niyodaya Foundation · Saideep Haven, Sri Rama Temple Road, New Thippasandra, Bangalore 560075<br>
      <a href="mailto:contact@niyodaya.in" style="color: #1e3a8a;">contact@niyodaya.in</a> · niyodaya.in
    </p>
  </div>`;
}

function escape(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
