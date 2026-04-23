// =====================================================
// PROJECT VINAYA page content
// =====================================================

export const vinaya = {
  title: 'Project Vinaya — Niyodaya Foundation',

  hero: {
    eyebrow: 'Project',
    heading: 'Project Vinaya — Resources for schools that need them',
    lede: `Vinaya connects deserving schools and students with teaching materials,
           volunteer educators, and long-form mentorship from our network.`
  },

  capabilities: [
    { heading: 'Teaching resources',   body: 'Textbooks, worksheets, lab kits, computer hardware, and sports equipment.' },
    { heading: 'Volunteer educators',  body: 'Qualified professionals who give 2-6 hours a week to teach subjects, values, and life-skills.' },
    { heading: 'Mentorship',           body: 'Long-form mentoring for senior students on careers, higher education, and vocational choices.' }
  ],

  // ---- Impact (update as of each year) ----
  impact: {
    heading: 'Our impact so far',
    note: `A snapshot of what Project Vinaya has delivered <strong>as of 2025</strong>,
           working with modest resources and a committed volunteer network.`,
    stats: [
      { num: '5',        label: 'schools supported' },
      { num: '₹75,000',  label: 'disbursed in resources' },
      { num: '3',        label: 'categories: furniture, stationery, kitchen equipment' }
    ]
  },

  schoolForm: {
    heading: 'Request resources / volunteers (schools)',
    successMessage: 'Request received. Our team will reach out to your school within a week.'
  },

  volunteerForm: {
    heading: 'Offer to volunteer',
    successMessage: "Thank you for offering to volunteer. We'll be in touch soon."
  }
};
