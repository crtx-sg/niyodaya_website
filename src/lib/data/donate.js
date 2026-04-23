// =====================================================
// DONATE page content
// Bank details live in `site.js` (shared with footer).
// This file controls the donate-page text and the
// "where your money goes" table.
// =====================================================

export const donate = {
  title: 'Donate — Niyodaya Foundation',

  hero: {
    eyebrow: 'Donate',
    heading: 'Donate — avail 80G Tax Exemption',
    lede: `Every contribution helps a child stay in school, eat a warm meal, and learn
           with dignity. Donations to Niyodaya are exempt under Section 80G of the
           Income Tax Act, 1961.`
  },

  formHeading: 'Donor form',
  formHint:    'We will email you an 80G receipt on successful payment.',

  whereMoneyGoes: {
    heading: 'Where your money goes',
    rows: [
      { amount: '₹7,500 / $80',        enables: 'Uniform, books & stationery for one child for a year' },
      { amount: '₹10,000 / $110',      enables: 'NIOS fees + study material for a Vridhi student' },
      { amount: '₹75,000 / $800',      enables: 'School furniture & infrastructure maintenance for a year' },
      { amount: '₹2,40,000 / $2,500',  enables: 'One teaching-volunteer salary for a year (Vidya)' },
      { amount: '₹3,00,000 / $3,200',  enables: 'Adopts one classroom for a year (Vidya)' }
    ]
  },

  bankHeading: 'Bank transfer (NEFT / IMPS)',
  bankNote:    'For NEFT / IMPS / UPI, please email a screenshot of the transfer along with your PAN to {EMAIL} for the 80G receipt.',

  thankYouTemplate: 'Thank you for your donation! An 80G receipt will be emailed to {EMAIL}.'
};
