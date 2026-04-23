// =====================================================
// Admin authentication — simple session cookie
// =====================================================
// Not dependent on Insforge. Uses a single ADMIN_PASSWORD
// shared by the admin team, plus ADMIN_EMAILS allow-list.
// Cookies are signed with HMAC-SHA256 using ADMIN_SESSION_SECRET.
//
// If ADMIN_PASSWORD is blank, admin pages are OPEN
// (dev / demo mode) — the server prints a one-time warning.
// =====================================================

import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';

const COOKIE_NAME = 'niyodaya_admin';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

let _warned = false;

export function isAuthEnabled() {
  return Boolean(env.ADMIN_PASSWORD);
}

export function warnIfOpen() {
  if (!isAuthEnabled() && !_warned) {
    _warned = true;
    console.warn('⚠️  ADMIN_PASSWORD is not set — /admin is UNPROTECTED. Set it in .env before going to production.');
  }
}

function getSecret() {
  return env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || 'niyodaya-dev-secret';
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  return `${body}.${mac}`;
}

function verify(token) {
  if (!token || !token.includes('.')) return null;
  const [body, mac] = token.split('.');
  const expected = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function allowedEmails() {
  return (env.ADMIN_EMAILS || 'contact@niyodaya.in')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function checkLogin(email, password) {
  if (!isAuthEnabled()) return { ok: true, email: (email || 'dev@niyodaya.in').toLowerCase() };
  if (!email || !password) return { ok: false, error: 'Email and password are required.' };
  const e = email.trim().toLowerCase();
  if (!allowedEmails().includes(e)) return { ok: false, error: 'This email is not authorised for admin access.' };
  if (password !== env.ADMIN_PASSWORD) return { ok: false, error: 'Incorrect password.' };
  return { ok: true, email: e };
}

export function issueCookie(email) {
  const payload = { email, iat: Date.now(), exp: Date.now() + COOKIE_MAX_AGE * 1000 };
  return {
    name: COOKIE_NAME,
    value: sign(payload),
    options: {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: COOKIE_MAX_AGE
    }
  };
}

export function readSession(cookies) {
  if (!isAuthEnabled()) return { email: 'dev@niyodaya.in', dev: true };
  const token = cookies.get(COOKIE_NAME);
  return verify(token);
}

export function clearCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    options: { path: '/', httpOnly: true, sameSite: 'lax', maxAge: 0 }
  };
}
