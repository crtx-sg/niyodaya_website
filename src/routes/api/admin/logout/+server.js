// POST /api/admin/logout  — clear the admin session cookie
import { json } from '@sveltejs/kit';
import { clearCookie } from '$lib/server/auth.js';

export async function POST({ cookies }) {
  const c = clearCookie();
  cookies.set(c.name, c.value, c.options);
  return json({ ok: true });
}
