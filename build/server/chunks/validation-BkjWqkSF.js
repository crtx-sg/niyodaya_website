import { b as private_env } from './shared-server-CpOoumKm.js';

async function sendEmail({ to, subject, html, text }) {
  const from = private_env.EMAIL_FROM || "Niyodaya <no-reply@niyodaya.in>";
  if (!private_env.RESEND_API_KEY) {
    console.log("[email:fallback] would send mail", { from, to, subject });
    return { ok: true, mocked: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${private_env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
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
function ackTemplate({ name, subject, body }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f2937;">
    <h2 style="color:#1e3a8a;margin:0 0 8px;">Niyodaya Foundation</h2>
    <p style="color:#b45309;margin:0 0 20px;font-style:italic;">a new dawn for every child's learning</p>
    <p>Dear ${name || "friend"},</p>
    <p>${body}</p>
    <p>With gratitude,<br>Team Niyodaya</p>
    <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0"/>
    <p style="font-size:12px;color:#6b7280;">Niyodaya Foundation · Saideep Haven, Sri Rama Temple Road, New Thippasandra, Bangalore 560075 · contact@niyodaya.in</p>
  </div>`;
}
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

export { isEmail as a, ackTemplate as b, isPositiveNumber as c, isPan as d, isPhone as i, required as r, sendEmail as s, validate as v };
//# sourceMappingURL=validation-BkjWqkSF.js.map
