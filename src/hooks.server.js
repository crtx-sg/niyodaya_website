// =====================================================
// hooks.server.js — runs on every request.
// Protects /admin pages and /api/admin endpoints behind
// the admin session cookie. See src/lib/server/auth.js.
// =====================================================

import { redirect, json } from '@sveltejs/kit';
import { readSession, warnIfOpen } from '$lib/server/auth.js';

const PROTECTED_PAGE = /^\/admin(\/|$)/;
const PROTECTED_API  = /^\/api\/admin\//;
const EXEMPT_PATHS = new Set(['/admin/login', '/api/admin/login', '/api/admin/logout']);

export async function handle({ event, resolve }) {
  warnIfOpen();
  const { pathname } = event.url;
  const session = readSession(event.cookies);
  event.locals.user = session;

  const isProtectedPage = PROTECTED_PAGE.test(pathname) && !EXEMPT_PATHS.has(pathname);
  const isProtectedApi  = PROTECTED_API.test(pathname)  && !EXEMPT_PATHS.has(pathname);

  if (isProtectedPage && !session) {
    const next = encodeURIComponent(pathname + (event.url.search || ''));
    throw redirect(303, `/admin/login?next=${next}`);
  }
  if (isProtectedApi && !session) {
    return json({ error: 'Unauthorised' }, { status: 401 });
  }

  return resolve(event);
}
