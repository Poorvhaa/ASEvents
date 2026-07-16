import type { EventPackage } from '@/lib/types/packages'

export const packageCategories = [
  'All',
  'Weddings',
  'Corporate',
  'Social Events',
  
] as const

const weddingServices = [
  'Event planning & coordination',
  'Venue liaison',
  'Decor & floral design',
  'Photography & videography',
  'Entertainment coordination',
  'Guest hospitality',
]

export const packages: EventPackage[] = [
  // WEDDINGS
  {
    id: 'haldi',
    slug: 'haldi-ceremony',
    title: 'Haldi Ceremony',
    category: 'wedding',
    includes: ['Traditional Decor', 'Floral Arrangements', 'Seating Setup', 'Photography', 'Music System'],
    includedServices: weddingServices,
    highlights: ['Yellow theme decor', 'Traditional seating', 'Live dhol optional'],
    suitableGuests: '50 - 200',
    duration: '4-6 hours',
    description: 'A vibrant haldi ceremony with traditional aesthetics and joyful ambiance.',
  },
    {
    id: 'complete-wedding',
    slug: 'complete-wedding-package',
    title: 'Complete Wedding Package',
    category: 'wedding',
    includes: ['Haldi', 'Mehendi', 'Sangeet', 'Baraat', 'Wedding', 'Reception'],
    includedServices: [
      'End-to-end wedding planning',
      'All ceremony coordination',
      'Premium decor & mandap',
      'Photography & cinematography',
      'Entertainment & DJ',
      'Catering management',
      'Guest hospitality',
    ],
    highlights: ['All ceremonies covered', 'Dedicated wedding manager', 'Premium vendor network'],
    suitableGuests: '300 - 1,000',
    duration: '3-7 days',
    popular: true,
    description: 'The ultimate all-in-one wedding experience covering every ceremony from haldi to reception.',
  },
  {
    id: 'mehendi',
    slug: 'mehendi-ceremony',
    title: 'Mehendi Ceremony',
    category: 'wedding',
    includes: ['Theme Decor', 'Mehendi Artists', 'Live Music', 'Food Counters', 'Photography'],
    includedServices: weddingServices,
    highlights: ['Colourful lounge setup', 'Artist coordination', 'Live folk music'],
    suitableGuests: '100 - 300',
    duration: '5-7 hours',
    description: 'A colourful mehendi celebration with artists, live music, and themed decor.',
  },
  {
  id: 'carnival',
  slug: 'carnival',
  title: 'Carnival',
  category: 'wedding',
  includes: [
    'Carnival Theme Decor',
    'Interactive Game Stalls',
    'Live Performers',
    'Food & Dessert Counters',
    'Photo Booths',
    'Kids Entertainment',
  ],
  includedServices: [
    'Event planning & coordination',
    'Carnival theme design',
    'Game stall management',
    'Artist & performer coordination',
    'Food counter coordination',
    'Photography & videography',
    'Guest hospitality',
  ],
  highlights: [
    'Colourful carnival-themed decor',
    'Interactive games for all age groups',
    'Live entertainers and performers',
  ],
  suitableGuests: '150 - 800',
  duration: '6-8 hours',
  //price: 'Starting from ₹3,00,000',
  popular: true,
  description:
    'A vibrant carnival-style celebration with themed decor, interactive games, live performers, food counters, and entertainment for guests of all ages.',
},
  {
    id: 'sangeet',
    slug: 'sangeet-night',
    title: 'Sangeet Night',
    category: 'wedding',
    includes: ['Stage Design', 'LED Setup', 'DJ', 'Sound System', 'Dance Floor'],
    includedServices: weddingServices,
    highlights: ['Professional stage', 'LED backdrop', 'Choreography support'],
    suitableGuests: '200 - 600',
    duration: '6-8 hours',
    description: 'A high-energy sangeet night with professional stage, sound, and dance floor setup.',
  },
  {
    id: 'baarat',
    slug: 'baarat-management',
    title: 'Baraat Management',
    category: 'wedding',
    includes: ['Procession Setup', 'Band & Dhol', 'Decorated Horse/Car', 'Lighting', 'Guest Coordination'],
    includedServices: weddingServices,
    highlights: ['Royal procession', 'Live band & dhol', 'VIP guest handling'],
    suitableGuests: '100 - 500',
    duration: '3-5 hours',
    description: 'A grand baarat procession with traditional music, decor, and seamless coordination.',
  },
  {
    id: 'reception',
    slug: 'reception-celebration',
    title: 'Reception Celebration',
    category: 'wedding',
    includes: ['Luxury Stage', 'Lighting', 'Entertainment', 'Catering', 'Photography'],
    includedServices: weddingServices,
    highlights: ['Grand stage design', 'Premium lighting', 'Live entertainment'],
    suitableGuests: '300 - 1,000',
    duration: '5-7 hours',
    description: 'A grand reception with luxury staging, lighting, and premium entertainment.',
  },


  // CORPORATE
  {
    id: 'corporate-conference',
    slug: 'corporate-conference',
    title: 'Corporate Conference',
    category: 'corporate',
    includes: ['Agenda Planning', 'Venue & AV Setup', 'Registration Desk', 'Hospitality', 'Photography'],
    includedServices: ['Planning', 'Venue Coordination', 'Branding', 'AV Setup', 'Photography', 'Hospitality'],
    highlights: ['Keynote production', 'Breakout sessions', 'Hybrid streaming ready'],
    suitableGuests: '100 - 1,200',
    duration: '1-3 days',
    description: 'Professional conference planning with branding, AV, and hospitality management.',
  },
 

  // SOCIAL EVENTS
  {
    id: 'birthday',
    slug: 'birthday-celebration',
    title: 'Birthday Celebration',
    category: 'social',
    includes: ['Theme Decor', 'Entertainment', 'Photography', 'Cake & Catering', 'Venue Setup'],
    includedServices: ['Planning', 'Decor & Styling', 'Entertainment', 'Photography', 'Catering'],
    highlights: ['Custom themes', 'Photo booth add-on', 'Kids & adult packages'],
    suitableGuests: '30 - 300',
    duration: '4-6 hours',
    description: 'Memorable birthday parties with themed decor, entertainment, and photography.',
  },

  {
    id: 'anniversary',
    slug: 'anniversary-celebration',
    title: 'Anniversary Celebration',
    category: 'social',
    includes: ['Elegant Decor', 'Live Music', 'Photography', 'Fine Dining', 'Memory Display'],
    includedServices: ['Planning', 'Decor & Styling', 'Entertainment', 'Photography', 'Catering'],
    highlights: ['Romantic styling', 'Memory wall', 'Live musicians'],
    suitableGuests: '50 - 250',
    duration: '4-6 hours',
    description: 'Romantic anniversary celebrations with elegant styling and curated entertainment.',
  },
  {
    id: 'baby-shower',
    slug: 'baby-shower',
    title: 'Baby Shower',
    category: 'social',
    includes: ['Theme Decor', 'Games & Activities', 'Catering', 'Photography', 'Favours'],
    includedServices: ['Planning', 'Decor', 'Entertainment', 'Photography', 'Catering'],
    highlights: ['Pastel themes', 'Game coordination', 'Custom favours'],
    suitableGuests: '30 - 100',
    duration: '3-5 hours',
    description: 'Charming baby shower events with delightful decor and thoughtful hospitality.',
  }
]

export function getPackageBySlug(slug: string): EventPackage | undefined {
  return packages.find((pkg) => pkg.slug === slug)
}

export function getPopularPackages(): EventPackage[] {
  return packages.filter((pkg) => pkg.popular).slice(0, 4)
}
