import { c as create_ssr_component, d as escape, e as each, f as add_attribute } from './ssr--GcvDUzA.js';
import { f as formatDate, g as galleryImages } from './gallery-D5Yjdw_z.js';

const home = {
  title: "Niyodaya Foundation — a new dawn for every child's learning",
  hero: {
    eyebrow: "Niyodaya Foundation",
    heading: "Every child deserves an education rooted in values.",
    lede: `Niyodaya Foundation — a Section 8 non-profit based in Karnataka — supports
           underprivileged, displaced, and specially-abled children through bridge
           courses, school adoption, and volunteer-driven learning programmes.`,
    ctas: [
      { label: "Apply for Support", href: "/programmes/vridhi", style: "saffron" },
      { label: "Donate & get 80G", href: "/donate", style: "primary" },
      { label: "Volunteer with us", href: "/programmes/vinaya", style: "ghost" }
    ]
  },
  programmeCards: [
    {
      pill: "Vridhi",
      pillStyle: "saffron",
      heading: "Project Vridhi",
      body: `Bridge support for children who drop out, or don't clear Class 10 / 12 board exams.
             Counselling, NIOS re-enrolment, and vocational routes.`,
      cta: { label: "Learn more →", href: "/programmes/vridhi" }
    },
    {
      pill: "Vinaya",
      pillStyle: "",
      heading: "Project Vinaya",
      body: `Connects deserving schools and students with teaching materials, trained
             volunteers, and mentorship from our network.`,
      cta: { label: "Learn more →", href: "/programmes/vinaya" }
    },
    {
      pill: "Vidya",
      pillStyle: "green",
      heading: "Project Vidya",
      body: `Adopting entire schools and sustaining them with donor-funded infrastructure,
             staff support, and values-led learning.`,
      cta: { label: "Learn more →", href: "/programmes/vidya" }
    }
  ],
  impact: {
    heading: "The learning gap we're working on",
    stats: [
      { num: "1 in 2", label: "children lack grade-level foundational skills (ASER)" },
      { num: "~28-30%", label: "of youth enter higher education (GER)" },
      { num: "10-15%", label: "drop out at secondary school" },
      { num: "0 focus", label: "on values-based education in most institutions" }
    ]
  },
  fromTheGround: {
    heading: "From the ground",
    note: "A glimpse of our work with partner schools.",
    showCount: 4,
    cta: { label: "See full gallery →", href: "/gallery" }
  },
  supportTiles: [
    { heading: "Donate (80G)", body: "Every rupee goes directly to children. Tax-exempt under Section 80G.", cta: { label: "Donate now", href: "/donate", style: "primary" } },
    { heading: "Volunteer", body: "Teach, mentor, or support operations in your city.", cta: { label: "Volunteer", href: "/programmes/vinaya", style: "" } },
    { heading: "Partner / Adopt", body: "Companies, trusts, and schools can collaborate with us.", cta: { label: "Get in touch", href: "/contact", style: "" } }
  ]
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const featured = galleryImages.slice(0, home.fromTheGround.showCount);
  return `${$$result.head += `<!-- HEAD_svelte-11fp6tq_START -->${$$result.title = `<title>${escape(home.title)}</title>`, ""}<!-- HEAD_svelte-11fp6tq_END -->`, ""} <section class="section"><div class="container"><div class="hero"><div class="eyebrow">${escape(home.hero.eyebrow)}</div> <h1>${escape(home.hero.heading)}</h1> <p class="lede">${escape(home.hero.lede)}</p> <div class="ctas">${each(home.hero.ctas, (c) => {
    return `<a class="${"btn " + escape(c.style, true)}"${add_attribute("href", c.href, 0)}>${escape(c.label)}</a>`;
  })}</div></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-3">${each(home.programmeCards, (p) => {
    return `<div class="card"><span class="${"pill " + escape(p.pillStyle, true)}">${escape(p.pill)}</span> <h3>${escape(p.heading)}</h3> <p>${escape(p.body)}</p> <a class="btn sm"${add_attribute("href", p.cta.href, 0)}>${escape(p.cta.label)}</a> </div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><h2 class="text-center">${escape(home.impact.heading)}</h2> <div class="grid cols-4 mt-2">${each(home.impact.stats, (s) => {
    return `<div class="card stat"><div class="num">${escape(s.num)}</div><div class="lbl">${escape(s.label)}</div></div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><h2>${escape(home.fromTheGround.heading)}</h2> <p class="text-muted">${escape(home.fromTheGround.note)}</p> <div class="gallery-grid mt-2">${each(featured, (img) => {
    return `<article class="gallery-card"><img src="${"/gallery/" + escape(img.file, true)}"${add_attribute("alt", img.caption, 0)} loading="lazy"> <div class="cap"><span class="date">${escape(formatDate(img.date))} · ${escape(img.event)}</span> ${escape(img.caption)}</div> </article>`;
  })}</div> <div class="text-center mt-3"><a class="btn"${add_attribute("href", home.fromTheGround.cta.href, 0)}>${escape(home.fromTheGround.cta.label)}</a></div></div></section> <section class="section"><div class="container"><div class="grid cols-3">${each(home.supportTiles, (t) => {
    return `<div class="card"><h3>${escape(t.heading)}</h3> <p>${escape(t.body)}</p> <a class="${"btn sm " + escape(t.cta.style, true)}"${add_attribute("href", t.cta.href, 0)}>${escape(t.cta.label)}</a> </div>`;
  })}</div></div></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BTy1yuEL.js.map
