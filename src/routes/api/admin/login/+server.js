// POST /api/admin/login  — sign in (sets admin session cookie)
import { json } from '@sveltejs/kit';
import { checkLogin, issueCookie, isAuthEnabled } from '$lib/server/auth.js';

export async function POST({ request, cookies }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!isAuthEnabled()) {
    // Dev mode — set a throwaway cookie so the UI treats the user as signed-in.
    const c = issueCookie('dev@niyodaya.in');
    cookies.set(c.name, c.value, c.options);
    return json({ ok: true, email: 'dev@niyodaya.in', dev: true });
  }

  const result = checkLogin(body.email, body.password);
  if (!result.ok) return json({ error: result.error }, { status: 401 });

  const c = issueCookie(result.email);
  cookies.set(c.name, c.value, c.options);
  return json({ ok: true, email: result.email });
}
