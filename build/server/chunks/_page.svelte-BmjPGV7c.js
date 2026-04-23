import { c as create_ssr_component, d as escape, e as each, f as add_attribute } from './ssr-8xrkOs2x.js';

const vidya = {
  title: "Project Vidya — Niyodaya Foundation",
  hero: {
    eyebrow: "Project",
    heading: "Project Vidya — Adopting schools, sustaining learning",
    lede: `Under Vidya, Niyodaya adopts entire schools and sustains them with the
           combined support of donors, volunteers, and the school's own staff.`
  },
  pillars: [
    { heading: "How adoption works", body: "We sign an MoU with the school, assess gaps, fund the plan, and review outcomes twice a year." },
    { heading: "What we fund", body: "Salaries of extra staff, infrastructure (toilets, labs, library), mid-day meals, digital learning, and stationery." },
    { heading: "What we measure", body: "Learning outcomes (ASER-style tests), attendance, dropout reduction, and parent satisfaction." }
  ],
  currentlyAdopted: {
    heading: "Currently adopted / supported",
    schools: [
      `<strong>Gandhiji Memorial Vimanapura Vidya Mandir</strong>, Bengaluru — our flagship
       adopted primary school. We provide sustained support across teaching staff, learning
       infrastructure, values-led curriculum, mid-day meals and digital learning.`,
      `Government Primary School, New Thippasandra, Bengaluru — computer lab, Mid-Day Meal,
       and science-exhibition support.`
    ]
  },
  spotlight: {
    heading: "Gandhiji Memorial Vimanapura Vidya Mandir — adoption spotlight",
    note: "Two photographs of the school and its students will be featured here. Admin can upload from /admin.",
    placeholders: [
      { caption: "Photo #1 placeholder", subcaption: "Gandhiji Memorial Vimanapura Vidya Mandir" },
      { caption: "Photo #2 placeholder", subcaption: "Gandhiji Memorial Vimanapura Vidya Mandir" }
    ]
  },
  cta: { label: "Support a classroom →", href: "/donate" }
};
const css = {
  code: ".placeholder.svelte-1d4amkx.svelte-1d4amkx{min-height:220px;display:flex;align-items:center;justify-content:center;background:#f1f5f9;border-style:dashed}.ph-inner.svelte-1d4amkx.svelte-1d4amkx{text-align:center;color:#64748b;font-size:14px}.ph-inner.svelte-1d4amkx small.svelte-1d4amkx{display:block;color:#94a3b8;margin-top:4px;font-size:12px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  // Page content lives in: src/lib/data/vidya.js  ← edit there\\n  import { vidya } from '$lib/data/vidya.js';\\n<\/script>\\n\\n<svelte:head><title>{vidya.title}</title></svelte:head>\\n\\n<section class=\\"section\\">\\n  <div class=\\"container\\">\\n    <div class=\\"hero\\" style=\\"background: linear-gradient(135deg,#f5f3ff,#fdf2f8)\\">\\n      <div class=\\"eyebrow\\">{vidya.hero.eyebrow}</div>\\n      <h1>{vidya.hero.heading}</h1>\\n      <p class=\\"lede\\">{vidya.hero.lede}</p>\\n    </div>\\n  </div>\\n</section>\\n\\n<section class=\\"section tight\\">\\n  <div class=\\"container\\">\\n    <div class=\\"grid cols-3\\">\\n      {#each vidya.pillars as p}\\n        <div class=\\"card\\"><h3>{p.heading}</h3><p>{p.body}</p></div>\\n      {/each}\\n    </div>\\n  </div>\\n</section>\\n\\n<section class=\\"section tight\\">\\n  <div class=\\"container\\">\\n    <h2>{vidya.currentlyAdopted.heading}</h2>\\n    <div class=\\"card prose mt-2\\">\\n      <ul>\\n        {#each vidya.currentlyAdopted.schools as school}\\n          <li>{@html school}</li>\\n        {/each}\\n      </ul>\\n    </div>\\n\\n    <h3 class=\\"mt-3\\">{vidya.spotlight.heading}</h3>\\n    <p class=\\"text-muted\\">{vidya.spotlight.note}</p>\\n    <div class=\\"grid cols-2 mt-2\\">\\n      {#each vidya.spotlight.placeholders as ph}\\n        <div class=\\"card placeholder\\">\\n          <div class=\\"ph-inner\\">\\n            <span>{ph.caption}</span>\\n            <small>{ph.subcaption}</small>\\n          </div>\\n        </div>\\n      {/each}\\n    </div>\\n\\n    <div class=\\"text-center mt-3\\">\\n      <a class=\\"btn primary\\" href={vidya.cta.href}>{vidya.cta.label}</a>\\n    </div>\\n  </div>\\n</section>\\n\\n<style>\\n  .placeholder { min-height: 220px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-style: dashed; }\\n  .ph-inner { text-align: center; color: #64748b; font-size: 14px; }\\n  .ph-inner small { display: block; color: #94a3b8; margin-top: 4px; font-size: 12px; }\\n</style>\\n"],"names":[],"mappings":"AA0DE,0CAAa,CAAE,UAAU,CAAE,KAAK,CAAE,OAAO,CAAE,IAAI,CAAE,WAAW,CAAE,MAAM,CAAE,eAAe,CAAE,MAAM,CAAE,UAAU,CAAE,OAAO,CAAE,YAAY,CAAE,MAAQ,CAC1I,uCAAU,CAAE,UAAU,CAAE,MAAM,CAAE,KAAK,CAAE,OAAO,CAAE,SAAS,CAAE,IAAM,CACjE,wBAAS,CAAC,oBAAM,CAAE,OAAO,CAAE,KAAK,CAAE,KAAK,CAAE,OAAO,CAAE,UAAU,CAAE,GAAG,CAAE,SAAS,CAAE,IAAM"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-rgupps_START -->${$$result.title = `<title>${escape(vidya.title)}</title>`, ""}<!-- HEAD_svelte-rgupps_END -->`, ""} <section class="section"><div class="container"><div class="hero" style="background: linear-gradient(135deg,#f5f3ff,#fdf2f8)"><div class="eyebrow">${escape(vidya.hero.eyebrow)}</div> <h1>${escape(vidya.hero.heading)}</h1> <p class="lede">${escape(vidya.hero.lede)}</p></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-3">${each(vidya.pillars, (p) => {
    return `<div class="card"><h3>${escape(p.heading)}</h3><p>${escape(p.body)}</p></div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><h2>${escape(vidya.currentlyAdopted.heading)}</h2> <div class="card prose mt-2"><ul>${each(vidya.currentlyAdopted.schools, (school) => {
    return `<li><!-- HTML_TAG_START -->${school}<!-- HTML_TAG_END --></li>`;
  })}</ul></div> <h3 class="mt-3">${escape(vidya.spotlight.heading)}</h3> <p class="text-muted">${escape(vidya.spotlight.note)}</p> <div class="grid cols-2 mt-2">${each(vidya.spotlight.placeholders, (ph) => {
    return `<div class="card placeholder svelte-1d4amkx"><div class="ph-inner svelte-1d4amkx"><span>${escape(ph.caption)}</span> <small class="svelte-1d4amkx">${escape(ph.subcaption)}</small></div> </div>`;
  })}</div> <div class="text-center mt-3"><a class="btn primary"${add_attribute("href", vidya.cta.href, 0)}>${escape(vidya.cta.label)}</a></div></div> </section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BmjPGV7c.js.map
