import { g as getContext } from './ssr-8xrkOs2x.js';
import { o as onMount } from './ssr2-e2juEaAg.js';

const is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
const placeholder_url = "a:";
if (is_legacy) {
  ({
    url: new URL(placeholder_url)
  });
}
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};

export { page as p };
//# sourceMappingURL=stores-D28bUQUW.js.map
