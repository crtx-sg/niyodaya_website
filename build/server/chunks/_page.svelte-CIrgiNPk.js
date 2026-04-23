import { c as create_ssr_component, d as escape, e as each, f as add_attribute } from './ssr-8xrkOs2x.js';

const vinaya = {
  title: "Project Vinaya — Niyodaya Foundation",
  hero: {
    eyebrow: "Project",
    heading: "Project Vinaya — Resources for schools that need them",
    lede: `Vinaya connects deserving schools and students with teaching materials,
           volunteer educators, and long-form mentorship from our network.`
  },
  capabilities: [
    { heading: "Teaching resources", body: "Textbooks, worksheets, lab kits, computer hardware, and sports equipment." },
    { heading: "Volunteer educators", body: "Qualified professionals who give 2-6 hours a week to teach subjects, values, and life-skills." },
    { heading: "Mentorship", body: "Long-form mentoring for senior students on careers, higher education, and vocational choices." }
  ],
  // ---- Impact (update as of each year) ----
  impact: {
    heading: "Our impact so far",
    note: `A snapshot of what Project Vinaya has delivered <strong>as of 2025</strong>,
           working with modest resources and a committed volunteer network.`,
    stats: [
      { num: "5", label: "schools supported" },
      { num: "₹75,000", label: "disbursed in resources" },
      { num: "3", label: "categories: furniture, stationery, kitchen equipment" }
    ]
  },
  schoolForm: {
    heading: "Request resources / volunteers (schools)"
  },
  volunteerForm: {
    heading: "Offer to volunteer"
  }
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let school = {
    name: "",
    contact: "",
    city: "",
    needs: ""
  };
  let volunteer = {
    name: "",
    contact: "",
    city: "",
    skills: "",
    hours_per_week: ""
  };
  return `${$$result.head += `<!-- HEAD_svelte-1pyw5wx_START -->${$$result.title = `<title>${escape(vinaya.title)}</title>`, ""}<!-- HEAD_svelte-1pyw5wx_END -->`, ""} <section class="section"><div class="container"><div class="hero" style="background: linear-gradient(135deg,#ecfeff,#f0fdf4)"><div class="eyebrow">${escape(vinaya.hero.eyebrow)}</div> <h1>${escape(vinaya.hero.heading)}</h1> <p class="lede">${escape(vinaya.hero.lede)}</p></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-3">${each(vinaya.capabilities, (c) => {
    return `<div class="card"><h3>${escape(c.heading)}</h3><p>${escape(c.body)}</p></div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><h2>${escape(vinaya.impact.heading)}</h2> <p class="text-muted"><!-- HTML_TAG_START -->${vinaya.impact.note}<!-- HTML_TAG_END --></p> <div class="grid cols-3 mt-2">${each(vinaya.impact.stats, (s) => {
    return `<div class="card stat"><div class="num">${escape(s.num)}</div><div class="lbl"><!-- HTML_TAG_START -->${s.label}<!-- HTML_TAG_END --></div></div>`;
  })}</div></div></section> <section class="section tight"><div class="container">${``} <div class="grid cols-2 mt-2"><div class="card"><h3>${escape(vinaya.schoolForm.heading)}</h3> <form class="form" novalidate><label data-svelte-h="svelte-1f7iv19">School Name *</label> <input required${add_attribute("value", school.name, 0)}> <label data-svelte-h="svelte-128pyze">Contact person &amp; phone *</label> <input required${add_attribute("value", school.contact, 0)}> <label data-svelte-h="svelte-1897lbp">City</label> <input${add_attribute("value", school.city, 0)}> <label data-svelte-h="svelte-1s2u4w7">Type of support needed *</label> <input placeholder="e.g. volunteer maths teacher" required${add_attribute("value", school.needs, 0)}> <label data-svelte-h="svelte-1ufp3lm">Brief description</label> <textarea rows="4">${escape("")}</textarea> <div class="mt-2"><button class="btn primary" ${""}>${escape("Submit request")}</button></div></form></div> <div class="card"><h3>${escape(vinaya.volunteerForm.heading)}</h3> <form class="form" novalidate><label data-svelte-h="svelte-w7164">Your name *</label> <input required${add_attribute("value", volunteer.name, 0)}> <label data-svelte-h="svelte-1xs1lau">Contact (email / phone) *</label> <input required${add_attribute("value", volunteer.contact, 0)}> <label data-svelte-h="svelte-1agcqb7">City *</label> <input required${add_attribute("value", volunteer.city, 0)}> <label data-svelte-h="svelte-1734w46">Skills / subjects you can teach *</label> <input placeholder="e.g. Maths, Spoken English, Computers" required${add_attribute("value", volunteer.skills, 0)}> <label data-svelte-h="svelte-c2bxgn">Hours available per week</label> <input type="number" min="1" max="40"${add_attribute("value", volunteer.hours_per_week, 0)}> <div class="mt-2"><button class="btn saffron" ${""}>${escape("I want to volunteer")}</button></div></form></div></div></div></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CIrgiNPk.js.map
