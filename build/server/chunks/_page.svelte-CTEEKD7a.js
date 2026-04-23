import { c as create_ssr_component, b as subscribe, f as add_attribute, d as escape } from './ssr--GcvDUzA.js';
import { p as page } from './stores-CBGV_o6J.js';
import './ssr2-e2juEaAg.js';

const css = {
  code: ".login-wrap.svelte-fmowzn{max-width:440px;margin:0 auto}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { page } from '$app/stores';\\n  import { goto } from '$app/navigation';\\n\\n  let email = '';\\n  let password = '';\\n  let error = '';\\n  let submitting = false;\\n\\n  async function submit(e) {\\n    e.preventDefault();\\n    error = '';\\n    submitting = true;\\n    try {\\n      const res = await fetch('/api/admin/login', {\\n        method: 'POST',\\n        headers: { 'Content-Type': 'application/json' },\\n        body: JSON.stringify({ email, password })\\n      });\\n      const data = await res.json();\\n      if (!res.ok) {\\n        error = data.error || 'Login failed.';\\n      } else {\\n        const next = $page.url.searchParams.get('next') || '/admin';\\n        goto(next);\\n      }\\n    } catch (err) {\\n      error = err.message;\\n    } finally {\\n      submitting = false;\\n    }\\n  }\\n<\/script>\\n\\n<svelte:head><title>Admin login — Niyodaya Foundation</title></svelte:head>\\n\\n<section class=\\"section\\">\\n  <div class=\\"container login-wrap\\">\\n    <div class=\\"card\\">\\n      <h1>Admin login</h1>\\n      <p class=\\"text-muted\\">Sign in with your authorised admin email and the shared admin password. 8-hour session.</p>\\n\\n      {#if error}<div class=\\"alert error\\">{error}</div>{/if}\\n\\n      <form class=\\"form mt-2\\" on:submit={submit} novalidate>\\n        <label>Email</label>\\n        <input type=\\"email\\" bind:value={email} autocomplete=\\"username\\" required />\\n        <label>Password</label>\\n        <input type=\\"password\\" bind:value={password} autocomplete=\\"current-password\\" required />\\n        <div class=\\"mt-2\\">\\n          <button class=\\"btn primary\\" disabled={submitting}>\\n            {submitting ? 'Signing in…' : 'Sign in'}\\n          </button>\\n        </div>\\n      </form>\\n\\n      <p class=\\"hint mt-2\\">If you don't have credentials yet, contact <a href=\\"mailto:contact@niyodaya.in\\">contact@niyodaya.in</a>.</p>\\n    </div>\\n  </div>\\n</section>\\n\\n<style>\\n  .login-wrap { max-width: 440px; margin: 0 auto; }\\n</style>\\n"],"names":[],"mappings":"AA8DE,yBAAY,CAAE,SAAS,CAAE,KAAK,CAAE,MAAM,CAAE,CAAC,CAAC,IAAM"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let email = "";
  let password = "";
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1r2qeq_START -->${$$result.title = `<title>Admin login — Niyodaya Foundation</title>`, ""}<!-- HEAD_svelte-1r2qeq_END -->`, ""} <section class="section"><div class="container login-wrap svelte-fmowzn"><div class="card"><h1 data-svelte-h="svelte-1fl3twk">Admin login</h1> <p class="text-muted" data-svelte-h="svelte-1ghu3kg">Sign in with your authorised admin email and the shared admin password. 8-hour session.</p> ${``} <form class="form mt-2" novalidate><label data-svelte-h="svelte-40lqqw">Email</label> <input type="email" autocomplete="username" required${add_attribute("value", email, 0)}> <label data-svelte-h="svelte-a3t0mr">Password</label> <input type="password" autocomplete="current-password" required${add_attribute("value", password, 0)}> <div class="mt-2"><button class="btn primary" ${""}>${escape("Sign in")}</button></div></form> <p class="hint mt-2" data-svelte-h="svelte-ttgg7d">If you don&#39;t have credentials yet, contact <a href="mailto:contact@niyodaya.in">contact@niyodaya.in</a>.</p></div></div> </section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CTEEKD7a.js.map
