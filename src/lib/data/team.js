// =====================================================
// TEAM section (About page)
// =====================================================
// Edit the entries below to update names, roles, photos,
// short bios, and optional links. No code changes required.
//
// HOW TO ADD A PERSON'S PHOTO
// ---------------------------
// 1. Drop the image into  static/team/<filename>.jpg
//    (any JPG / PNG / WebP works; ~400x400 square looks best).
// 2. Set `photo: '/team/<filename>.jpg'` on their entry.
// 3. When the photo field is empty, the card shows a coloured
//    circle with the person's initials instead.
//
// HOW TO ADD / REMOVE A MEMBER
// ---------------------------
// Copy one of the blocks below, paste it, and edit the fields.
// Remove a block to delete that person. Commas between
// entries matter — keep the list valid JavaScript.
//
// HTML is allowed inside `bio` (e.g. <strong>, <em>, <a href="…">).
// Everything else is treated as plain text.
// =====================================================

export const team = {
  heading: 'Team',
  // Short note shown above the cards. Set to '' to hide.
  note: 'Photos and bios will be updated soon.',

  members: [
    {
      initials: 'SG',
      name: 'Subramaniam Ganesh',
      role: 'Director & Promoter',
      photo: '',          // e.g. '/team/ganesh.jpg'
      bio: '',            // e.g. 'Founding director — background in engineering and volunteer education.'
      links: [
        // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' }
      ]
    },
    {
      initials: 'LS',
      name: 'Lalitha Shivaraman',
      role: 'Director & Promoter',
      photo: '',
      bio: '',
      links: []
    },
    {
      initials: '+',
      name: 'Advisory Board',
      role: 'Coming soon',
      photo: '',
      bio: '',
      links: []
    },
    {
      initials: '♥',
      name: 'Volunteers',
      role: 'Across Bengaluru',
      photo: '',
      bio: '',
      links: []
    }
  ]
};
