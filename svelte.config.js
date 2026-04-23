import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib'
    },
    // Our admin cookie is SameSite=Lax (blocks cross-site CSRF by default),
    // so we rely on that + explicit auth checks instead of SvelteKit's
    // extra form-origin check (which breaks server-to-server testing tools
    // and some mobile browsers).
    csrf: { checkOrigin: false }
  }
};

export default config;
