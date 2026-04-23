import { j as json } from './shared-server-CO0iTl3r.js';
import { i as isAuthEnabled, a as issueCookie, c as checkLogin } from './auth-DQsOcvYJ.js';
import 'node:crypto';

async function POST({ request, cookies }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!isAuthEnabled()) {
    const c2 = issueCookie("dev@niyodaya.in");
    cookies.set(c2.name, c2.value, c2.options);
    return json({ ok: true, email: "dev@niyodaya.in", dev: true });
  }
  const result = checkLogin(body.email, body.password);
  if (!result.ok) return json({ error: result.error }, { status: 401 });
  const c = issueCookie(result.email);
  cookies.set(c.name, c.value, c.options);
  return json({ ok: true, email: result.email });
}

export { POST };
//# sourceMappingURL=_server-ZYV5CdOl.js.map
