import { j as json, b as private_env } from './shared-server-CpOoumKm.js';
import { i as insert } from './insforge-7dizFqev.js';
import { v as validate, s as sendEmail, a as isEmail, r as required } from './validation-BkjWqkSF.js';

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
  sendEmail({
    to: private_env.EMAIL_ADMIN || "contact@niyodaya.in",
    subject: `[Contact] ${body.subject || "New message"} — ${body.name}`,
    html: `<p><b>From:</b> ${body.name} &lt;${body.email}&gt;</p>
           <p><b>Subject:</b> ${body.subject || "—"}</p>
           <p><b>Message:</b></p><p>${body.message.replace(/\n/g, "<br>")}</p>`
  }).catch(() => {
  });
  return json({ ok: true, id: result.id });
}

export { POST };
//# sourceMappingURL=_server-01NVJkCN.js.map
