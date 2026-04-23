import { j as json } from './shared-server-CO0iTl3r.js';
import { i as insert } from './insforge-zvA6LdDZ.js';
import { v as validate, s as sendToUserAndAdmin, i as isEmail, r as required } from './validation-S2kpmb9a.js';
import 'nodemailer';

async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { ok, errors } = validate(body, {
    name: (v) => required(v, "Name"),
    email: isEmail,
    message: (v) => required(v, "Message")
  });
  if (!ok) return json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
  const result = await insert("contact_messages", {
    name: body.name,
    email: body.email,
    subject: body.subject || null,
    message: body.message
  });
  if (!result.ok) return json({ error: result.error || "Save failed" }, { status: 500 });
  const subject = `[Contact] ${body.subject || "Message received"} — ${body.name}`;
  const ackBody = `
    <p>Thank you for writing to Niyodaya. We've received your message and a member of our team will get back to you soon.</p>
    <p><b>You wrote:</b></p>
    <blockquote style="border-left:3px solid #f59e0b; padding: 4px 12px; margin: 6px 0; color:#374151;">
      ${body.subject ? `<p><b>Subject:</b> ${esc(body.subject)}</p>` : ""}
      <p>${esc(body.message).replace(/\n/g, "<br>")}</p>
    </blockquote>
  `;
  sendToUserAndAdmin({
    userEmail: body.email,
    userName: body.name,
    subject,
    body: ackBody
  }).catch(() => {
  });
  return json({ ok: true, id: result.id });
}
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export { POST };
//# sourceMappingURL=_server-CUjKQ8Tj.js.map
