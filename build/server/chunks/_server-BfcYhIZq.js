import { j as json, b as private_env } from './shared-server-CpOoumKm.js';
import { i as insert } from './insforge-7dizFqev.js';
import { v as validate, s as sendEmail, r as required } from './validation-BkjWqkSF.js';

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
  sendEmail({
    to: private_env.EMAIL_ADMIN || "contact@niyodaya.in",
    subject: `[Vinaya] New ${type} submission: ${body.name}`,
    html: `<pre>${JSON.stringify(row, null, 2)}</pre>`
  }).catch(() => {
  });
  return json({ ok: true, id: result.id });
}

export { POST };
//# sourceMappingURL=_server-BfcYhIZq.js.map
