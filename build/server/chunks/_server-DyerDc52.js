import { j as json, b as private_env } from './shared-server-CpOoumKm.js';
import { i as insert } from './insforge-7dizFqev.js';
import { v as validate, s as sendEmail, i as isPhone, r as required } from './validation-BkjWqkSF.js';

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
  const result = await insert("vridhi_applications", {
    student_name: body.student_name,
    age: Number(body.age),
    father_name: body.father_name,
    phone: body.phone,
    school_name: body.school_name || null,
    reason: body.reason,
    status: "new"
  });
  if (!result.ok) return json({ error: result.error || "Save failed" }, { status: 500 });
  const admin = private_env.EMAIL_ADMIN || "contact@niyodaya.in";
  sendEmail({
    to: admin,
    subject: `[Vridhi] New application: ${body.student_name}`,
    html: `<p>A new Vridhi application has been received.</p>
           <ul>
             <li><b>Student:</b> ${body.student_name} (age ${body.age})</li>
             <li><b>Father/Guardian:</b> ${body.father_name}</li>
             <li><b>Phone:</b> ${body.phone}</li>
             <li><b>School:</b> ${body.school_name || "—"}</li>
             <li><b>Reason:</b> ${body.reason}</li>
           </ul>`
  }).catch(() => {
  });
  return json({ ok: true, id: result.id });
}

export { POST };
//# sourceMappingURL=_server-DyerDc52.js.map
