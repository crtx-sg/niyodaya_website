// =====================================================
// ABOUT PAGE content
// Paragraphs in the `paragraphs` arrays may contain HTML
// (e.g. <strong>, <em>, <a href="…">) — keep tags balanced.
// =====================================================

export const about = {
  title: 'About — Niyodaya Foundation',

  hero: {
    eyebrow: 'About us',
    heading: 'About Niyodaya',
    lede: `"Niyodaya" — a new dawn — captures our commitment to being a steady, ethical
           partner in every child's learning journey.`
  },

  story: {
    heading: 'Our story',
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
    heading: 'Governance & compliance',
    description: `Registered office in Bengaluru, Karnataka. Audited annually by a
                  qualified auditor. Full financials are published on the Resources page.`,
    // Downloads the Memorandum of Association PDF directly.
    cta: { label: 'Download Memorandum →', href: '/MemorandumofAssociation.pdf', external: true }
  },

  pillars: [
    { heading: 'Mission', body: `To promote holistic education for underprivileged,
        displaced, specially-abled, and destitute children — combining academic rigour
        with values, life-skills, and dignity.` },
    { heading: 'Vision',  body: `A society where every child — regardless of economic,
        social or ability status — receives education that nourishes mind, character
        and livelihood.` },
    { heading: 'Values',  body: `Dharma · Seva · Integrity · Confidentiality · Community
        first · Transparency in finances` }
  ],

  objectives: {
    heading: 'Our objectives',
    note: 'From our Memorandum of Association (Clause 3A):',
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
    heading: 'Team',
    note: 'Photos and bios to be added.',
    members: [
      { initials: 'SG', name: 'Subramaniam Ganesh', role: 'Director & Promoter' },
      { initials: 'LS', name: 'Lalitha Shivaraman', role: 'Director & Promoter' },
      { initials: '+',  name: 'Advisory Board',     role: 'Coming soon' },
      { initials: '♥',  name: 'Volunteers',         role: 'Across Bengaluru' }
    ]
  }
};
