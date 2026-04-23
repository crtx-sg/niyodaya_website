import { j as json, b as private_env } from './shared-server-CO0iTl3r.js';
import { i as insert } from './insforge-zvA6LdDZ.js';
import { v as validate, s as sendToUserAndAdmin, d as sendEmail, e as ackTemplate, r as required } from './validation-S2kpmb9a.js';
import 'nodemailer';

async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const type = body.type === "volunteer" ? "volunteer" : "school";
  const rules = type === "school" ? {
    name: (v) => required(v, "School name"),
    contact: (v) => required(v, "Contact"),
    needs: (v) => required(v, "Type of support")
  } : {
    name: (v) => required(v, "Your name"),
    contact: (v) => required(v, "Contact"),
    city: (v) => required(v, "City"),
    skills: (v) => required(v, "Skills")
  };
  const { ok, errors } = validate(body, rules);
  if (!ok) return json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
  const row = {
    type,
    name: body.name,
    contact: body.contact,
    city: body.city || null,
    needs_or_skills: type === "school" ? body.needs : body.skills,
    description: body.description || null,
    hours_per_week: type === "volunteer" ? Number(body.hours_per_week) || null : null,
    status: "new"
  };
  const result = await insert("vinaya_requests", row);
  if (!result.ok) return json({ error: result.error || "Save failed" }, { status: 500 });
  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.contact || "").trim());
  const subject = type === "school" ? `[Vinaya] Request received from ${body.name}` : `[Vinaya] Volunteer sign-up received: ${body.name}`;
  const ackBody = type === "school" ? `<p>Thank you — we have received your request for support from Niyodaya under <strong>Project Vinaya</strong>. A member of our team will reach out to your school within a week.</p>
       <ul>
         <li><b>School:</b> ${esc(body.name)}</li>
         <li><b>Contact:</b> ${esc(body.contact)}</li>
         <li><b>City:</b> ${esc(body.city || "—")}</li>
         <li><b>Support needed:</b> ${esc(body.needs)}</li>
         <li><b>Description:</b><br>${esc(body.description || "—").replace(/\n/g, "<br>")}</li>
       </ul>` : `<p>Thank you for offering to volunteer with Niyodaya under <strong>Project Vinaya</strong>. We'll be in touch shortly to match your skills with the right opportunity.</p>
       <ul>
         <li><b>Name:</b> ${esc(body.name)}</li>
         <li><b>Contact:</b> ${esc(body.contact)}</li>
         <li><b>City:</b> ${esc(body.city)}</li>
         <li><b>Skills:</b> ${esc(body.skills)}</li>
         <li><b>Hours / week:</b> ${esc(body.hours_per_week || "—")}</li>
       </ul>`;
  if (emailLike) {
    sendToUserAndAdmin({
      userEmail: String(body.contact).trim(),
      userName: body.name,
      subject,
      body: ackBody
    }).catch(() => {
    });
  } else {
    sendEmail({
      to: private_env.EMAIL_ADMIN || "contact@niyodaya.in",
      subject,
      html: ackTemplate({ name: "Team Niyodaya", body: ackBody + `<p><em>Contact provided was not an email address — reach out via phone.</em></p>` })
    }).catch(() => {
    });
  }
  return json({ ok: true, id: result.id });
}
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export { POST };
//# sourceMappingURL=_server-Col-7Wb8.js.map
