// =====================================================
// PROJECT VIDYA page content
// Add / remove schools in `adoptedSchools`. Paragraphs
// may contain HTML (<strong>, <em>, <a href="…">).
// =====================================================

export const vidya = {
  title: 'Project Vidya — Niyodaya Foundation',

  hero: {
    eyebrow: 'Project',
    heading: 'Project Vidya — Adopting schools, sustaining learning',
    lede: `Under Vidya, Niyodaya adopts entire schools and sustains them with the
           combined support of donors, volunteers, and the school's own staff.`
  },

  pillars: [
    { heading: 'How adoption works', body: 'We sign an MoU with the school, assess gaps, fund the plan, and review outcomes twice a year.' },
    { heading: 'What we fund',       body: 'Salaries of extra staff, infrastructure (toilets, labs, library), mid-day meals, digital learning, and stationery.' },
    { heading: 'What we measure',    body: 'Learning outcomes (ASER-style tests), attendance, dropout reduction, and parent satisfaction.' }
  ],

  currentlyAdopted: {
    heading: 'Currently adopted / supported',
    schools: [
      `<strong>Gandhiji Memorial Vimanapura Vidya Mandir</strong>, Bengaluru — our flagship
       adopted primary school. We provide sustained support across teaching staff, learning
       infrastructure, values-led curriculum, mid-day meals and digital learning.`,
      `Government Primary School, New Thippasandra, Bengaluru — computer lab, Mid-Day Meal,
       and science-exhibition support.`
    ]
  },

  spotlight: {
    heading: 'Gandhiji Memorial Vimanapura Vidya Mandir — adoption spotlight',
    note: 'Two photographs of the school and its students will be featured here. Admin can upload from /admin.',
    placeholders: [
      { caption: 'Photo #1 placeholder', subcaption: 'Gandhiji Memorial Vimanapura Vidya Mandir' },
      { caption: 'Photo #2 placeholder', subcaption: 'Gandhiji Memorial Vimanapura Vidya Mandir' }
    ]
  },

  cta: { label: 'Support a classroom →', href: '/donate' }
};
