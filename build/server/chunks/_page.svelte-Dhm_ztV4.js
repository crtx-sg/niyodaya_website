import { c as create_ssr_component, d as escape, e as each, f as add_attribute } from './ssr-8xrkOs2x.js';

const resources = {
  title: "Resources — Niyodaya Foundation",
  hero: {
    eyebrow: "Resources",
    heading: "Useful resources for students, teachers & parents",
    lede: "Curated external platforms, assessment toolkits, and values-led curricula recommended by our team."
  },
  externalResources: {
    items: [
      {
        heading: "DIKSHA",
        body: "National platform for school education, an NCERT initiative offering lesson plans, textbooks, and teacher training in multiple Indian languages.",
        links: [{ label: "Visit diksha.gov.in", href: "https://diksha.gov.in/", external: true }]
      },
      {
        heading: "DIYA — ASER toolkit",
        body: "Do-It-Yourself ASER is a toolkit anyone can use to test the basic learning levels of children aged 5–16. Ideal for parents, volunteers, and community workers.",
        links: [{ label: "Explore DIYA", href: "https://asercentre.org/do-it-yourself-aser-diya/", external: true }]
      },
      {
        heading: "Values-based class content",
        body: "Sri Sathya Sai Loka Seva Gurukulam offers a ready library of values-led courses and materials we draw inspiration from.",
        links: [
          { label: "Gurukulam home", href: "https://srisathyasailokasevagurukulam.org/", external: true },
          { label: "Browse courses", href: "https://srisathyasailokasevagurukulam.org/courses/", external: true }
        ]
      }
    ]
  },
  documents: {
    heading: "Niyodaya documents",
    // To re-enable the Annual Reports card later, add it back to this list
    // (sample entry commented below).
    items: [
      {
        heading: "Memorandum of Association",
        body: "Founding document — Section 8 Company, dated 15 May 2021.",
        links: [{ label: "Download PDF", href: "/MemorandumofAssociation.pdf", external: true }]
      },
      // {
      //   heading: 'Annual Reports',
      //   body: 'Published annually from FY 2022-23 onward.',
      //   links: [{ label: 'Browse reports', href: '#', external: false, ghost: true }]
      // },
      {
        heading: "80G Certificate",
        body: "Tax-exemption certificate for donors. Certificate ref: AAHCN6260DF20241.",
        links: [{ label: "Download PDF", href: "/80G_Certificate.pdf", external: true }]
      },
      {
        heading: "Darpan Certificate",
        body: "NITI Aayog NGO Darpan registration — verifies us on the Govt. of India NGO registry. <strong>Darpan ID: KA/2025/0606271.</strong>",
        links: [{ label: "Visit ngodarpan.gov.in", href: "https://ngodarpan.gov.in/", external: true }]
      }
    ]
  }
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1zqfaw_START -->${$$result.title = `<title>${escape(resources.title)}</title>`, ""}<!-- HEAD_svelte-1zqfaw_END -->`, ""} <section class="section"><div class="container"><div class="hero" style="background: linear-gradient(135deg,#eff6ff,#fefce8)"><div class="eyebrow">${escape(resources.hero.eyebrow)}</div> <h1>${escape(resources.hero.heading)}</h1> <p class="lede">${escape(resources.hero.lede)}</p></div></div></section> <section class="section tight"><div class="container"><div class="grid cols-3">${each(resources.externalResources.items, (r) => {
    return `<div class="card"><h3>${escape(r.heading)}</h3> <p>${escape(r.body)}</p> ${each(r.links, (link) => {
      return `<a class="${"btn sm " + escape(link.ghost ? "ghost" : "", true)}"${add_attribute("href", link.href, 0)}${add_attribute("target", link.external ? "_blank" : void 0, 0)}${add_attribute("rel", link.external ? "noopener" : void 0, 0)} style="margin-top:6px">${escape(link.label)}${escape(link.external ? " ↗" : "")} </a>`;
    })} </div>`;
  })}</div> <h2 class="mt-4">${escape(resources.documents.heading)}</h2> <div class="grid cols-4 mt-2">${each(resources.documents.items, (d) => {
    return `<div class="card"><h4>${escape(d.heading)}</h4> <p class="text-muted"><!-- HTML_TAG_START -->${d.body}<!-- HTML_TAG_END --></p> ${each(d.links, (link) => {
      return `<a class="${"btn sm " + escape(link.ghost ? "ghost" : "", true)}"${add_attribute("href", link.href, 0)}${add_attribute("target", link.external ? "_blank" : void 0, 0)}${add_attribute("rel", link.external ? "noopener" : void 0, 0)}>${escape(link.label)}${escape(link.external ? " ↗" : "")} </a>`;
    })} </div>`;
  })}</div></div></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Dhm_ztV4.js.map
