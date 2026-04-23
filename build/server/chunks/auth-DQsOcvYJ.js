import { b as private_env } from './shared-server-CO0iTl3r.js';
import crypto from 'node:crypto';

const COOKIE_NAME = "niyodaya_admin";
const COOKIE_MAX_AGE = 60 * 60 * 8;
let _warned = false;
function isAuthEnabled() {
  return Boolean(private_env.ADMIN_PASSWORD);
}
function warnIfOpen() {
  if (!isAuthEnabled() && !_warned) {
    _warned = true;
    console.warn("⚠️  ADMIN_PASSWORD is not set — /admin is UNPROTECTED. Set it in .env before going to production.");
  }
}
function getSecret() {
  return private_env.ADMIN_SESSION_SECRET || private_env.ADMIN_PASSWORD || "niyodaya-dev-secret";
}
function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}
function verify(token) {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
function allowedEmails() {
  return (private_env.ADMIN_EMAILS || "contact@niyodaya.in").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}
function checkLogin(email, password) {
  if (!isAuthEnabled()) return { ok: true, email: (email || "dev@niyodaya.in").toLowerCase() };
  if (!email || !password) return { ok: false, error: "Email and password are required." };
  const e = email.trim().toLowerCase();
  if (!allowedEmails().includes(e)) return { ok: false, error: "This email is not authorised for admin access." };
  if (password !== private_env.ADMIN_PASSWORD) return { ok: false, error: "Incorrect password." };
  return { ok: true, email: e };
}
function issueCookie(email) {
  const payload = { email, iat: Date.now(), exp: Date.now() + COOKIE_MAX_AGE * 1e3 };
  return {
    name: COOKIE_NAME,
    value: sign(payload),
    options: {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE
    }
  };
}
function readSession(cookies) {
  if (!isAuthEnabled()) return { email: "dev@niyodaya.in", dev: true };
  const token = cookies.get(COOKIE_NAME);
  return verify(token);
}
function clearCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    options: { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 }
  };
}

export { issueCookie as a, clearCookie as b, checkLogin as c, isAuthEnabled as i, readSession as r, warnIfOpen as w };
//# sourceMappingURL=auth-DQsOcvYJ.js.map
