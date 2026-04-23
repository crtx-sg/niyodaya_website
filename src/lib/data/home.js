// =====================================================
// HOME PAGE content
// Edit any text between the backticks (`…`) or quotes ('…').
// Save the file — the site hot-reloads automatically.
// =====================================================

export const home = {
  title: "Niyodaya Foundation — a new dawn for every child's learning",

  hero: {
    eyebrow: 'Niyodaya Foundation',
    heading: 'Every child deserves an education rooted in values.',
    lede: `Niyodaya Foundation — a Section 8 non-profit based in Karnataka — supports
           underprivileged, displaced, and specially-abled children through bridge
           courses, school adoption, and volunteer-driven learning programmes.`,
    ctas: [
      { label: 'Apply for Support',  href: '/programmes/vridhi', style: 'saffron' },
      { label: 'Donate & get 80G',   href: '/donate',            style: 'primary' },
      { label: 'Volunteer with us',  href: '/programmes/vinaya', style: 'ghost'   }
    ]
  },

  programmeCards: [
    { pill: 'Vridhi', pillStyle: 'saffron', heading: 'Project Vridhi',
      body: `Bridge support for children who drop out, or don't clear Class 10 / 12 board exams.
             Counselling, NIOS re-enrolment, and vocational routes.`,
      cta: { label: 'Learn more →', href: '/programmes/vridhi' } },

    { pill: 'Vinaya', pillStyle: '', heading: 'Project Vinaya',
      body: `Connects deserving schools and students with teaching materials, trained
             volunteers, and mentorship from our network.`,
      cta: { label: 'Learn more →', href: '/programmes/vinaya' } },

    { pill: 'Vidya', pillStyle: 'green', heading: 'Project Vidya',
      body: `Adopting entire schools and sustaining them with donor-funded infrastructure,
             staff support, and values-led learning.`,
      cta: { label: 'Learn more →', href: '/programmes/vidya' } }
  ],

  impact: {
    heading: "The learning gap we're working on",
    stats: [
      { num: '1 in 2',   label: 'children lack grade-level foundational skills (ASER)' },
      { num: '~28-30%',  label: 'of youth enter higher education (GER)' },
      { num: '10-15%',   label: 'drop out at secondary school' },
      { num: '0 focus',  label: 'on values-based education in most institutions' }
    ]
  },

  fromTheGround: {
    heading: 'From the ground',
    note: 'A glimpse of our work with partner schools.',
    showCount: 4,
    cta: { label: 'See full gallery →', href: '/gallery' }
  },

  supportTiles: [
    { heading: 'Donate (80G)',       body: 'Every rupee goes directly to children. Tax-exempt under Section 80G.', cta: { label: 'Donate now', href: '/donate',             style: 'primary' } },
    { heading: 'Volunteer',          body: 'Teach, mentor, or support operations in your city.',                   cta: { label: 'Volunteer',  href: '/programmes/vinaya', style: ''        } },
    { heading: 'Partner / Adopt',    body: 'Companies, trusts, and schools can collaborate with us.',              cta: { label: 'Get in touch', href: '/contact',         style: ''        } }
  ]
};
