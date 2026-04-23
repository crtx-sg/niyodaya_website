// =====================================================
// Niyodaya Foundation — site-wide content (easy to edit)
// Edit this file to update contact details, nav items, etc.
// =====================================================

export const site = {
  name: 'Niyodaya Foundation',
  tagline: "a new dawn for every child's learning",
  email: 'contact@niyodaya.in',
  website: 'niyodaya.in',
  address: {
    line1: 'Saideep Haven, Sri Rama Temple Road',
    line2: 'New Thippasandra',
    city: 'Bangalore',
    pincode: '560075',
    state: 'Karnataka',
    country: 'India'
  },
  bank: {
    name: 'Niyodaya Foundation',
    bank: 'Axis Bank',
    account: '921010023379607',
    ifsc: 'UTIB0004426'
  },
  social: {
    instagram: '',
    linkedin: '',
    youtube: '',
    twitter: ''
  },
  registration: {
    type: 'Section 8 Non-profit (Companies Act, 2013)',
    stateOfRegistration: 'Karnataka',
    incorporatedOn: '15 May 2021',
    certificates: ['80G', '12A', 'CSR-1', 'NGO Darpan']
  }
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Our Programmes',
    href: '/programmes',
    children: [
      { label: 'Project Vridhi', href: '/programmes/vridhi' },
      { label: 'Project Vinaya', href: '/programmes/vinaya' },
      { label: 'Project Vidya', href: '/programmes/vidya' }
    ]
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' }
];
