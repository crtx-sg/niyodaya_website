// =====================================================
// RESOURCES page content
// Add / remove link cards freely. Use `external: true`
// to open in a new tab with a `↗` icon.
// =====================================================

export const resources = {
  title: 'Resources — Niyodaya Foundation',

  hero: {
    eyebrow: 'Resources',
    heading: 'Useful resources for students, teachers & parents',
    lede: 'Curated external platforms, assessment toolkits, and values-led curricula recommended by our team.'
  },

  externalResources: {
    heading: '',
    items: [
      {
        heading: 'DIKSHA',
        body: 'National platform for school education, an NCERT initiative offering lesson plans, textbooks, and teacher training in multiple Indian languages.',
        links: [{ label: 'Visit diksha.gov.in', href: 'https://diksha.gov.in/', external: true }]
      },
      {
        heading: 'DIYA — ASER toolkit',
        body: 'Do-It-Yourself ASER is a toolkit anyone can use to test the basic learning levels of children aged 5–16. Ideal for parents, volunteers, and community workers.',
        links: [{ label: 'Explore DIYA', href: 'https://asercentre.org/do-it-yourself-aser-diya/', external: true }]
      },
      {
        heading: 'Values-based class content',
        body: 'Sri Sathya Sai Loka Seva Gurukulam offers a ready library of values-led courses and materials we draw inspiration from.',
        links: [
          { label: 'Gurukulam home',  href: 'https://srisathyasailokasevagurukulam.org/',         external: true },
          { label: 'Browse courses',  href: 'https://srisathyasailokasevagurukulam.org/courses/', external: true }
        ]
      }
    ]
  },

  documents: {
    heading: 'Niyodaya documents',
    // To re-enable the Annual Reports card later, add it back to this list
    // (sample entry commented below).
    items: [
      {
        heading: 'Memorandum of Association',
        body: 'Founding document — Section 8 Company, dated 15 May 2021.',
        links: [{ label: 'Download PDF', href: '/MemorandumofAssociation.pdf', external: true }]
      },
      // {
      //   heading: 'Annual Reports',
      //   body: 'Published annually from FY 2022-23 onward.',
      //   links: [{ label: 'Browse reports', href: '#', external: false, ghost: true }]
      // },
      {
        heading: '80G Certificate',
        body: 'Tax-exemption certificate for donors. Certificate ref: AAHCN6260DF20241.',
        links: [{ label: 'Download PDF', href: '/80G_Certificate.pdf', external: true }]
      },
      {
        heading: 'Darpan Certificate',
        body: 'NITI Aayog NGO Darpan registration — verifies us on the Govt. of India NGO registry. <strong>Darpan ID: KA/2025/0606271.</strong>',
        links: [{ label: 'Visit ngodarpan.gov.in', href: 'https://ngodarpan.gov.in/', external: true }]
      }
    ]
  }
};
