import { j as json } from './shared-server-CO0iTl3r.js';
import { b as clearCookie } from './auth-DQsOcvYJ.js';
import 'node:crypto';

async function POST({ cookies }) {
  const c = clearCookie();
  cookies.set(c.name, c.value, c.options);
  return json({ ok: true });
}

export { POST };
//# sourceMappingURL=_server-DKewVl4R.js.map
