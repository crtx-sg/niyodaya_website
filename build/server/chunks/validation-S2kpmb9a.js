import { b as private_env } from './shared-server-CO0iTl3r.js';
import nodemailer from 'nodemailer';

let _smtpTransport = null;
function getSmtpTransport() {
  if (_smtpTransport) return _smtpTransport;
  if (!private_env.SMTP_HOST) return null;
  _smtpTransport = nodemailer.createTransport({
    host: private_env.SMTP_HOST,
    port: Number(private_env.SMTP_PORT || 587),
    secure: String(private_env.SMTP_SECURE || "").toLowerCase() === "true" || Number(private_env.SMTP_PORT) === 465,
    auth: private_env.SMTP_USER ? { user: private_env.SMTP_USER, pass: private_env.SMTP_PASS } : void 0
  });
  return _smtpTransport;
}
function fromAddress() {
  return private_env.EMAIL_FROM || "Niyodaya Foundation <contact@niyodaya.in>";
}
async function sendEmail({ to, cc, subject, html, text, replyTo, attachments }) {
  const from = fromAddress();
  const smtp = getSmtpTransport();
  if (smtp) {
    try {
      const info = await smtp.sendMail({ from, to, cc, subject, html, text, replyTo, attachments });
      return { ok: true, messageId: info.messageId, transport: "smtp" };
    } catch (err) {
      console.error("[email:smtp] failed", err.message);
      return { ok: false, error: err.message, transport: "smtp" };
    }
  }
  if (private_env.RESEND_API_KEY) {
    try {
      const body = { from, to, cc, subject, html, text, reply_to: replyTo };
      if (attachments?.length) {
        body.attachments = attachments.map((a) => ({
          filename: a.filename,
          content: Buffer.isBuffer(a.content) ? a.content.toString("base64") : a.content
        }));
      }
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${private_env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const t = await res.text();
        return { ok: false, error: `Resend ${res.status}: ${t}`, transport: "resend" };
      }
      return { ok: true, transport: "resend" };
    } catch (err) {
      return { ok: false, error: err.message, transport: "resend" };
    }
  }
  const attInfo = attachments?.length ? ` + ${attachments.length} attachment(s)` : "";
  console.log(`[email:fallback] (no SMTP or RESEND configured) would send:`, { from, to, cc, subject: subject + attInfo });
  return { ok: true, mocked: true, transport: "console" };
}
async function sendToUserAndAdmin({ userEmail, userName, subject, body, attachments }) {
  const admin = private_env.EMAIL_ADMIN || "contact@niyodaya.in";
  return sendEmail({
    to: userEmail,
    cc: admin,
    subject,
    html: ackTemplate({ name: userName, body }),
    replyTo: admin,
    attachments
  });
}
function ackTemplate({ name, body }) {
  return `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f2937;">
    <h2 style="color: #1e3a8a; margin: 0 0 4px;">Niyodaya Foundation</h2>
    <p style="color: #b45309; margin: 0 0 20px; font-style: italic;">a new dawn for every child's learning</p>
    <p>Dear ${escape(name || "friend")},</p>
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
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const email = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ackTemplate,
  sendEmail,
  sendToUserAndAdmin
}, Symbol.toStringTag, { value: "Module" }));
function required(v, field = "Field") {
  if (v === void 0 || v === null || String(v).trim() === "") return `${field} is required`;
  return null;
}
function isEmail(v) {
  if (!v) return "Email is required";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email";
}
function isPhone(v) {
  if (!v) return "Phone is required";
  const digits = String(v).replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? null : "Enter a valid phone number";
}
function isPositiveNumber(v, field = "Amount") {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? null : `${field} must be a positive number`;
}
function isPan(v) {
  if (!v) return "PAN is required for 80G receipt";
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(String(v).toUpperCase()) ? null : "Enter a valid PAN (e.g. ABCDE1234F)";
}
function validate(data, rules) {
  const errors = {};
  for (const key of Object.keys(rules)) {
    const err = rules[key](data[key]);
    if (err) errors[key] = err;
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

export { isPhone as a, isPositiveNumber as b, isPan as c, sendEmail as d, ackTemplate as e, email as f, isEmail as i, required as r, sendToUserAndAdmin as s, validate as v };
//# sourceMappingURL=validation-S2kpmb9a.js.map
