import { j as json } from './shared-server-CO0iTl3r.js';
import { i as insert } from './insforge-zvA6LdDZ.js';
import { v as validate, i as isEmail, s as sendToUserAndAdmin, a as isPhone, r as required } from './validation-S2kpmb9a.js';
import 'nodemailer';

async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { ok, errors } = validate(body, {
    student_name: (v) => required(v, "Student name"),
    age: (v) => Number(v) >= 4 && Number(v) <= 25 ? null : "Enter a valid age (4-25)",
    father_name: (v) => required(v, "Father's name"),
    phone: isPhone,
    reason: (v) => required(v, "Reason")
  });
  if (!ok) return json({ error: "Please correct the highlighted fields.", errors }, { status: 400 });
  const hasEmail = body.email && !isEmail(body.email);
  const result = await insert("vridhi_applications", {
    student_name: body.student_name,
    age: Number(body.age),
    father_name: body.father_name,
    phone: body.phone,
    email: hasEmail ? body.email : null,
    school_name: body.school_name || null,
    reason: body.reason,
    status: "new"
  });
  if (!result.ok) return json({ error: result.error || "Save failed" }, { status: 500 });
  const subject = `[Vridhi] Application received for ${body.student_name}`;
  const ackBody = `
    <p>We have received your application for support under <strong>Project Vridhi</strong>. Our team will review the details and contact you within <strong>5 working days</strong>.</p>
    <p>A copy of what you submitted:</p>
    <ul>
      <li><b>Student:</b> ${esc(body.student_name)} (age ${esc(body.age)})</li>
      <li><b>Father / Guardian:</b> ${esc(body.father_name)}</li>
      <li><b>Phone:</b> ${esc(body.phone)}</li>
      <li><b>School:</b> ${esc(body.school_name || "—")}</li>
      <li><b>Reason for support:</b><br>${esc(body.reason).replace(/\n/g, "<br>")}</li>
    </ul>
    <p>Your information is kept strictly confidential and used only to assess your request.</p>
  `;
  if (hasEmail) {
    sendToUserAndAdmin({
      userEmail: body.email,
      userName: body.father_name || body.student_name,
      subject,
      body: ackBody
    }).catch(() => {
    });
  } else {
    const { sendEmail, ackTemplate } = await import('./validation-S2kpmb9a.js').then((n) => n.f);
    sendEmail({
      to: process.env.EMAIL_ADMIN || "contact@niyodaya.in",
      subject,
      html: ackTemplate({ name: "Team Niyodaya", body: ackBody + `<p><em>No email was supplied by the applicant.</em></p>` })
    }).catch(() => {
    });
  }
  return json({ ok: true, id: result.id });
}
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export { POST };
//# sourceMappingURL=_server-D6MzP_Lm.js.map
