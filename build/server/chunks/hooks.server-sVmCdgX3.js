import { r as redirect, j as json } from './shared-server-CO0iTl3r.js';
import { w as warnIfOpen, r as readSession } from './auth-DQsOcvYJ.js';
import 'node:crypto';

const PROTECTED_PAGE = /^\/admin(\/|$)/;
const PROTECTED_API = /^\/api\/admin\//;
const EXEMPT_PATHS = /* @__PURE__ */ new Set(["/admin/login", "/api/admin/login", "/api/admin/logout"]);
async function handle({ event, resolve }) {
  warnIfOpen();
  const { pathname } = event.url;
  const session = readSession(event.cookies);
  event.locals.user = session;
  const isProtectedPage = PROTECTED_PAGE.test(pathname) && !EXEMPT_PATHS.has(pathname);
  const isProtectedApi = PROTECTED_API.test(pathname) && !EXEMPT_PATHS.has(pathname);
  if (isProtectedPage && !session) {
    const next = encodeURIComponent(pathname + (event.url.search || ""));
    throw redirect(303, `/admin/login?next=${next}`);
  }
  if (isProtectedApi && !session) {
    return json({ error: "Unauthorised" }, { status: 401 });
  }
  return resolve(event);
}

export { handle };
//# sourceMappingURL=hooks.server-sVmCdgX3.js.map
