import { c as create_ssr_component, d as escape, e as each, f as add_attribute } from './ssr-8xrkOs2x.js';

const about = {
  title: "About — Niyodaya Foundation",
  hero: {
    eyebrow: "About us",
    heading: "About Niyodaya",
    lede: `"Niyodaya" — a new dawn — captures our commitment to being a steady, ethical
           partner in every child's learning journey.`
  },
  story: {
    heading: "Our story",
    paragraphs: [
      `Niyodaya Foundation was formally incorporated on <strong>15 May 2021</strong>
       in Bengaluru under Section 8 of the Companies Act, 2013 — with a simple aim:
       to bring holistic, values-led education within reach of every child, especially
       those from underprivileged, displaced, or specially-abled backgrounds.`,
      `The work, however, began much earlier. Since <strong>2010</strong>, our founding
       team has volunteered at low-resourced government schools — setting up science
       labs, libraries and computer rooms; running science exhibitions inspired by
       Arvind Gupta's <em>Toys from Trash</em>
       (<a href="https://www.arvindguptatoys.com/" target="_blank" rel="noopener">arvindguptatoys.com</a>);
       and helping schools celebrate festivals and national events. Many of those
       moments are captured in our <a href="/gallery">Gallery</a>.`
    ]
  },
  governance: {
    heading: "Governance & compliance",
    description: `Registered office in Bengaluru, Karnataka. Audited annually by a
                  qualified auditor. Full financials are published on the Resources page.`,
    cta: { label: "Download Memorandum →", href: "/resources" }
  },
  pillars: [
    { heading: "Mission", body: `To promote holistic education for underprivileged,
        displaced, specially-abled, and destitute children — combining academic rigour
        with values, life-skills, and dignity.` },
    { heading: "Vision", body: `A society where every child — regardless of economic,
        social or ability status — receives education that nourishes mind, character
        and livelihood.` },
    { heading: "Values", body: `Dharma · Seva · Integrity · Confidentiality · Community
        first · Transparency in finances` }
  ],
  objectives: {
    heading: "Our objectives",
    note: "From our Memorandum of Association (Clause 3A):",
    columns: [
      [
        `Provide Basic, Primary and Secondary school education to underprivileged,
         displaced, specially-abled and destitute children.`,
        `Run after-school educational programmes and bridge courses for children who
         drop out.`,
        `Adopt or operate schools that provide holistic, free education.`,
        `Supply infrastructure, educational material, food and any support schools may need.`
      ],
      [
        `Offer scholarships, vocational training, and higher-education assistance to
         deserving students.`,
        `Develop and distribute assistive technology for people with special needs.`,
        `Conduct workshops, camps, sports, and health programmes — online and offline.`,
        `Support people/children affected by natural or man-made calamities, pandemics,
         and critical illnesses.`
      ]
    ]
  },
  team: {
    heading: "Team",
    note: "Photos and bios to be added.",
    members: [
      { initials: "SG", name: "Subramaniam Ganesh", role: "Director & Promoter" },
      { initials: "LS", name: "Lalitha Shivaraman", role: "Director & Promoter" },
      { initials: "+", name: "Advisory Board", role: "Coming soon" },
      { initials: "♥", name: "Volunteers", role: "Across Bengaluru" }
    ]
  }
};
const css = {
  code: ".avatar.svelte-hbw578{width:64px;height:64px;border-radius:999px;background:#eef2ff;color:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'Playfair Display', Georgia, serif;font-size:22px;margin:0 auto 8px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  // Page content lives in: src/lib/data/about.js  ← edit there\\n  import { about } from '$lib/data/about.js';\\n<\/script>\\n\\n<svelte:head><title>{about.title}</title></svelte:head>\\n\\n<section class=\\"section\\">\\n  <div class=\\"container\\">\\n    <div class=\\"hero\\" style=\\"background: linear-gradient(135deg,#ecfeff,#ede9fe)\\">\\n      <div class=\\"eyebrow\\">{about.hero.eyebrow}</div>\\n      <h1>{about.hero.heading}</h1>\\n      <p class=\\"lede\\">{about.hero.lede}</p>\\n    </div>\\n  </div>\\n</section>\\n\\n<section class=\\"section tight\\">\\n  <div class=\\"container\\">\\n    <div class=\\"grid cols-2-1\\">\\n      <div class=\\"card prose\\">\\n        <h3>{about.story.heading}</h3>\\n        {#each about.story.paragraphs as p}\\n          <p>{@html p}</p>\\n        {/each}\\n      </div>\\n      <div class=\\"card\\">\\n        <h3>{about.governance.heading}</h3>\\n        <p class=\\"text-muted\\">{about.governance.description}</p>\\n        <a class=\\"btn sm\\" href={about.governance.cta.href}>{about.governance.cta.label}</a>\\n      </div>\\n    </div>\\n  </div>\\n</section>\\n\\n<section class=\\"section tight\\">\\n  <div class=\\"container\\">\\n    <div class=\\"grid cols-3\\">\\n      {#each about.pillars as pillar}\\n        <div class=\\"card\\"><h3>{pillar.heading}</h3><p>{pillar.body}</p></div>\\n      {/each}\\n    </div>\\n  </div>\\n</section>\\n\\n<section class=\\"section tight\\">\\n  <div class=\\"container\\">\\n    <h2>{about.objectives.heading}</h2>\\n    <p class=\\"text-muted\\">{about.objectives.note}</p>\\n    <div class=\\"grid cols-2 mt-2\\">\\n      {#each about.objectives.columns as col}\\n        <div class=\\"card prose\\">\\n          <ul>\\n            {#each col as item}<li>{item}</li>{/each}\\n          </ul>\\n        </div>\\n      {/each}\\n    </div>\\n  </div>\\n</section>\\n\\n<section class=\\"section tight\\">\\n  <div class=\\"container\\">\\n    <h2>{about.team.heading}</h2>\\n    <p class=\\"text-muted\\">{about.team.note}</p>\\n    <div class=\\"grid cols-4 mt-2\\">\\n      {#each about.team.members as m}\\n        <div class=\\"card text-center\\">\\n          <div class=\\"avatar\\">{m.initials}</div>\\n          <h4>{m.name}</h4>\\n          <p class=\\"text-muted\\">{m.role}</p>\\n        </div>\\n      {/each}\\n    </div>\\n  </div>\\n</section>\\n\\n<style>\\n  .avatar { width: 64px; height: 64px; border-radius: 999px; background: #eef2ff; color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; margin: 0 auto 8px; }\\n</style>\\n"],"names":[],"mappings":"AA8EE,qBAAQ,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,IAAI,CAAE,aAAa,CAAE,KAAK,CAAE,UAAU,CAAE,OAAO,CAAE,KAAK,CAAE,IAAI,QAAQ,CAAC,CAAE,OAAO,CAAE,IAAI,CAAE,WAAW,CAAE,MAAM,CAAE,eAAe,CAAE,MAAM,CAAE,WAAW,CAAE,GAAG,CAAE,WAAW,CAAE,kBAAkB,CAAC,CAAC,OAAO,CAAC,CAAC,KAAK,CAAE,SAAS,CAAE,IAAI,CAAE,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,GAAK"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1iu91qo_START -->${$$result.title = `<title>${escape(about.title)}</title>`, ""}<!-- HEAD_svelte-1iu91qo_END -->`, ""} <section class="section"><div class="container"><div class="hero" style="background: linear-gradient(135deg,#ecfeff,#ede9fe)"><div class="eyebrow">${escape(about.hero.eyebrow)}</div> <h1>${escape(about.hero.heading)}</h1> <p class="lede">${escape(about.hero.lede)}</p></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-2-1"><div class="card prose"><h3>${escape(about.story.heading)}</h3> ${each(about.story.paragraphs, (p) => {
    return `<p><!-- HTML_TAG_START -->${p}<!-- HTML_TAG_END --></p>`;
  })}</div> <div class="card"><h3>${escape(about.governance.heading)}</h3> <p class="text-muted">${escape(about.governance.description)}</p> <a class="btn sm"${add_attribute("href", about.governance.cta.href, 0)}>${escape(about.governance.cta.label)}</a></div></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-3">${each(about.pillars, (pillar) => {
    return `<div class="card"><h3>${escape(pillar.heading)}</h3><p>${escape(pillar.body)}</p></div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><h2>${escape(about.objectives.heading)}</h2> <p class="text-muted">${escape(about.objectives.note)}</p> <div class="grid cols-2 mt-2">${each(about.objectives.columns, (col) => {
    return `<div class="card prose"><ul>${each(col, (item) => {
      return `<li>${escape(item)}</li>`;
    })}</ul> </div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><h2>${escape(about.team.heading)}</h2> <p class="text-muted">${escape(about.team.note)}</p> <div class="grid cols-4 mt-2">${each(about.team.members, (m) => {
    return `<div class="card text-center"><div class="avatar svelte-hbw578">${escape(m.initials)}</div> <h4>${escape(m.name)}</h4> <p class="text-muted">${escape(m.role)}</p> </div>`;
  })}</div></div> </section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Wa25UxUp.js.map
