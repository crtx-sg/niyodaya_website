import { c as create_ssr_component, b as subscribe, d as escape } from './ssr--GcvDUzA.js';
import { p as page } from './stores-CBGV_o6J.js';
import './ssr2-e2juEaAg.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1w6eb7p_START -->${$$result.title = `<title>${escape($page.status)} — Niyodaya Foundation</title>`, ""}<!-- HEAD_svelte-1w6eb7p_END -->`, ""} <section class="section"><div class="container text-center"><div class="card" style="max-width:500px; margin: 40px auto;"><h1>${escape($page.status)}</h1> <p class="text-muted">${escape($page.error?.message || "Something went wrong.")}</p> <a class="btn primary mt-2" href="/" data-svelte-h="svelte-izp3bz">Go to homepage →</a></div></div></section>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-CCQ-TgNX.js.map
