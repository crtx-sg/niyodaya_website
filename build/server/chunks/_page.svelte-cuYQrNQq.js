import { c as create_ssr_component, d as escape, e as each, f as add_attribute } from './ssr-8xrkOs2x.js';

const vridhi = {
  title: "Project Vridhi — Niyodaya Foundation",
  hero: {
    eyebrow: "Project",
    heading: "Project Vridhi — Growth through a second chance",
    lede: `For children who drop out of school or don't clear their Class 10 / 12
           board exams. We counsel, re-engage, and provide NIOS and vocational
           pathways so the journey continues.`
  },
  whoFor: {
    heading: "Who this is for",
    items: [
      "Children who have dropped out due to financial, family, or health reasons",
      "Students who have not cleared Std. 10 or Std. 12 board exams",
      "Schools wishing to refer students who need additional support"
    ]
  },
  howSupport: {
    heading: "How we support",
    items: [
      "One-on-one counselling with the student (and family)",
      "Re-enrolment via NIOS (National Institute of Open Schooling)",
      "Connections to vocational-training partners",
      "Study material, fees, and mentorship support",
      "All information is kept strictly confidential"
    ]
  },
  // ---- Impact (update as of each year) ----
  impact: {
    heading: "Our impact so far",
    note: `Niyodaya operates on modest funds. Every rupee is stewarded carefully —
           here is what we have been able to do under Project Vridhi
           <strong>as of 2025</strong>.`,
    stats: [
      { num: "15", label: "children supported<br>(including dropouts)" },
      { num: "11", label: "partner schools across Bengaluru" },
      { num: "50%", label: "of children supported are girls" },
      { num: "₹5,00,000", label: "disbursed toward their education" }
    ]
  },
  form: {
    heading: "Application for support",
    subheading: "Schools or needy students can apply here. Information submitted is kept confidential.",
    confidentialityHint: "Your information is kept confidential and will only be used by the Niyodaya team to assess your request."
  }
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = {
    student_name: "",
    age: "",
    father_name: "",
    phone: "",
    school_name: ""
  };
  let errors = {};
  return `${$$result.head += `<!-- HEAD_svelte-1b5d2il_START -->${$$result.title = `<title>${escape(vridhi.title)}</title>`, ""}<!-- HEAD_svelte-1b5d2il_END -->`, ""} <section class="section"><div class="container"><div class="hero" style="background: linear-gradient(135deg,#fff7ed,#fef9c3)"><div class="eyebrow">${escape(vridhi.hero.eyebrow)}</div> <h1>${escape(vridhi.hero.heading)}</h1> <p class="lede">${escape(vridhi.hero.lede)}</p></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-2"><div class="card prose"><h3>${escape(vridhi.whoFor.heading)}</h3> <ul>${each(vridhi.whoFor.items, (item) => {
    return `<li>${escape(item)}</li>`;
  })}</ul></div> <div class="card prose"><h3>${escape(vridhi.howSupport.heading)}</h3> <ul>${each(vridhi.howSupport.items, (item) => {
    return `<li>${escape(item)}</li>`;
  })}</ul></div></div></div></section> <section class="section tight"><div class="container"><h2>${escape(vridhi.impact.heading)}</h2> <p class="text-muted"><!-- HTML_TAG_START -->${vridhi.impact.note}<!-- HTML_TAG_END --></p> <div class="grid cols-4 mt-2">${each(vridhi.impact.stats, (s) => {
    return `<div class="card stat"><div class="num">${escape(s.num)}</div><div class="lbl"><!-- HTML_TAG_START -->${s.label}<!-- HTML_TAG_END --></div></div>`;
  })}</div></div></section> <section class="section tight"><div class="container"><div class="card"><h2>${escape(vridhi.form.heading)}</h2> <p class="text-muted">${escape(vridhi.form.subheading)}</p> ${``} <form class="form mt-2" novalidate><div class="row"><div><label for="student_name" data-svelte-h="svelte-c82m3h">Student Name *</label> <input id="student_name" required${add_attribute("value", form.student_name, 0)}> ${errors.student_name ? `<div class="error">${escape(errors.student_name)}</div>` : ``}</div> <div><label for="age" data-svelte-h="svelte-vcboiu">Age *</label> <input id="age" type="number" min="4" max="25" required${add_attribute("value", form.age, 0)}> ${errors.age ? `<div class="error">${escape(errors.age)}</div>` : ``}</div></div> <div class="row"><div><label for="father_name" data-svelte-h="svelte-5molk7">Father&#39;s / Guardian&#39;s Name *</label> <input id="father_name" required${add_attribute("value", form.father_name, 0)}> ${errors.father_name ? `<div class="error">${escape(errors.father_name)}</div>` : ``}</div> <div><label for="phone" data-svelte-h="svelte-1hut4o0">Contact Phone *</label> <input id="phone" required${add_attribute("value", form.phone, 0)}> ${errors.phone ? `<div class="error">${escape(errors.phone)}</div>` : ``}</div></div> <label for="school_name" data-svelte-h="svelte-1jlm0s4">School Name (if applicable)</label> <input id="school_name"${add_attribute("value", form.school_name, 0)}> <label for="reason" data-svelte-h="svelte-1bcn8qs">Reason for support *</label> <textarea id="reason" rows="5" required>${escape("")}</textarea> ${errors.reason ? `<div class="error">${escape(errors.reason)}</div>` : ``} <div class="mt-2"><button type="submit" class="btn primary" ${""}>${escape("Submit application")}</button></div> <p class="hint">${escape(vridhi.form.confidentialityHint)}</p></form></div></div></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-cuYQrNQq.js.map
