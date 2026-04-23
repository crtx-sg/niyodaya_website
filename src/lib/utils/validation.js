// ------------ shared form validators ------------
export function required(v, field = 'Field') {
  if (v === undefined || v === null || String(v).trim() === '') return `${field} is required`;
  return null;
}
export function isEmail(v) {
  if (!v) return 'Email is required';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Enter a valid email';
}
export function isPhone(v) {
  if (!v) return 'Phone is required';
  const digits = String(v).replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? null : 'Enter a valid phone number';
}
export function isPositiveNumber(v, field = 'Amount') {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? null : `${field} must be a positive number`;
}
export function isPan(v) {
  if (!v) return 'PAN is required for 80G receipt';
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(String(v).toUpperCase())
    ? null
    : 'Enter a valid PAN (e.g. ABCDE1234F)';
}

/**
 * Run a plain-object of validator functions and collect errors.
 * @param {Record<string, any>} data
 * @param {Record<string, (v:any)=>string|null>} rules
 */
export function validate(data, rules) {
  const errors = {};
  for (const key of Object.keys(rules)) {
    const err = rules[key](data[key]);
    if (err) errors[key] = err;
  }
  return { ok: Object.keys(errors).length === 0, errors };
}
