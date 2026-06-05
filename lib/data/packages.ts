import type { EventPackage } from '@/lib/types/packages'

const corporateIncludes = [
  'Planning',
  'Venue Coordination',
  'Branding',
  'AV Setup',
  'Photography',
  'Hospitality',
]

const socialIncludes = [
  'Planning',
  'Venue Coordination',
  'Decor & Styling',
  'Entertainment',
  'Photography',
  'Hospitality',
]

const festivalIncludes = [
  'Planning',
  'Venue Coordination',
  'Theme Decor',
  'Entertainment',
  'Photography',
  'Hospitality',
]

export const packageCategories = ['All', 'Wedding', 'Corporate', 'Social', 'Festival'] as const

export const packages: EventPackage[] = [
  // Wedding Packages
  {
    id: 'engagement',
    slug: 'engagement-package',
    title: 'Engagement',
    category: 'wedding',
    includes: ['Venue Setup', 'Floral Decor', 'Photography', 'Entertainment', 'Guest Coordination'],
    price: 'Starting from ₹50,000',
    description: 'An elegant engagement celebration with curated decor and seamless guest management.',
  },
  {
    id: 'haldi',
    slug: 'haldi-package',
    title: 'Haldi',
    category: 'wedding',
    includes: ['Traditional Decor', 'Floral Arrangements', 'Seating Setup', 'Photography', 'Music System'],
    price: 'Starting from ₹75,000',
    description: 'A vibrant haldi ceremony with traditional aesthetics and joyful ambiance.',
  },
  {
    id: 'mehendi',
    slug: 'mehendi-package',
    title: 'Mehendi',
    category: 'wedding',
    includes: ['Theme Decor', 'Mehendi Artists', 'Live Music', 'Food Counters', 'Photography'],
    price: 'Starting from ₹1,00,000',
    description: 'A colourful mehendi celebration with artists, live music, and themed decor.',
  },
  {
    id: 'sangeet',
    slug: 'sangeet-package',
    title: 'Sangeet',
    category: 'wedding',
    includes: ['Stage Design', 'LED Setup', 'DJ', 'Sound System', 'Dance Floor'],
    price: 'Starting from ₹2,00,000',
    description: 'A high-energy sangeet night with professional stage, sound, and dance floor setup.',
  },
  {
    id: 'baarat',
    slug: 'baarat-package',
    title: 'Baarat',
    category: 'wedding',
    includes: ['Procession Setup', 'Band & Dhol', 'Decorated Horse/Car', 'Lighting', 'Guest Coordination'],
    price: 'Starting from ₹1,50,000',
    description: 'A grand baarat procession with traditional music, decor, and seamless coordination.',
  },
  {
    id: 'wedding-ceremony',
    slug: 'wedding-ceremony-package',
    title: 'Wedding Ceremony',
    category: 'wedding',
    includes: ['Mandap Setup', 'Floral Decor', 'Photography', 'Catering Coordination', 'Guest Management'],
    price: 'Starting from ₹3,00,000',
    description: 'A sacred wedding ceremony with stunning mandap decor and full coordination.',
  },
  {
    id: 'reception',
    slug: 'reception-package',
    title: 'Reception',
    category: 'wedding',
    includes: ['Luxury Stage', 'Lighting', 'Entertainment', 'Catering', 'Photography'],
    price: 'Starting from ₹2,50,000',
    description: 'A grand reception with luxury staging, lighting, and premium entertainment.',
  },
  {
    id: 'complete-wedding',
    slug: 'complete-wedding-package',
    title: 'Complete Wedding Package',
    category: 'wedding',
    includes: ['Engagement', 'Haldi', 'Mehendi', 'Sangeet', 'Baarat', 'Wedding', 'Reception'],
    price: 'Starting from ₹10,00,000',
    popular: true,
    description: 'The ultimate all-in-one wedding experience covering every ceremony from engagement to reception.',
  },

  // Corporate Packages
  {
    id: 'corporate-conference',
    slug: 'corporate-conference',
    title: 'Conference',
    category: 'corporate',
    includes: corporateIncludes,
    price: 'Starting from ₹2,00,000',
    description: 'Professional conference planning with branding, AV, and hospitality management.',
  },
  {
    id: 'product-launch',
    slug: 'product-launch',
    title: 'Product Launch',
    category: 'corporate',
    includes: corporateIncludes,
    price: 'Starting from ₹3,50,000',
    description: 'Impactful product launches with immersive branding and media-ready production.',
  },
  {
    id: 'award-ceremony',
    slug: 'award-ceremony',
    title: 'Award Ceremony',
    category: 'corporate',
    includes: corporateIncludes,
    price: 'Starting from ₹2,50,000',
    description: 'Prestigious award ceremonies with elegant staging and flawless hospitality.',
  },
  {
    id: 'trade-show',
    slug: 'trade-show',
    title: 'Trade Show',
    category: 'corporate',
    includes: corporateIncludes,
    price: 'Starting from ₹5,00,000',
    description: 'Large-scale trade show management with exhibition branding and visitor hospitality.',
  },
  {
    id: 'annual-meeting',
    slug: 'annual-meeting',
    title: 'Annual Meeting',
    category: 'corporate',
    includes: corporateIncludes,
    price: 'Starting from ₹1,50,000',
    description: 'Seamless annual meeting execution with venue coordination and professional AV setup.',
  },

  // Social Packages
  {
    id: 'birthday-celebration',
    slug: 'birthday-celebration',
    title: 'Birthday',
    category: 'social',
    includes: socialIncludes,
    price: 'Starting from ₹75,000',
    description: 'Memorable birthday parties with themed decor, entertainment, and photography.',
  },
  {
    id: 'anniversary-celebration',
    slug: 'anniversary-celebration',
    title: 'Anniversary',
    category: 'social',
    includes: socialIncludes,
    price: 'Starting from ₹1,00,000',
    description: 'Romantic anniversary celebrations with elegant styling and curated entertainment.',
  },
  {
    id: 'baby-shower',
    slug: 'baby-shower',
    title: 'Baby Shower',
    category: 'social',
    includes: socialIncludes,
    price: 'Starting from ₹60,000',
    description: 'Charming baby shower events with delightful decor and thoughtful hospitality.',
  },
  {
    id: 'housewarming',
    slug: 'housewarming-ceremony',
    title: 'Housewarming',
    category: 'social',
    includes: socialIncludes,
    price: 'Starting from ₹50,000',
    description: 'Traditional housewarming events with auspicious decor and guest coordination.',
  },

  // Festival Packages
  {
    id: 'navratri-event',
    slug: 'navratri-event',
    title: 'Navratri',
    category: 'festival',
    includes: festivalIncludes,
    price: 'Starting from ₹1,50,000',
    description: 'Vibrant Navratri celebrations with traditional decor and live garba entertainment.',
  },
  {
    id: 'garba-night',
    slug: 'garba-night',
    title: 'Garba Night',
    category: 'festival',
    includes: festivalIncludes,
    price: 'Starting from ₹2,00,000',
    description: 'Energetic garba nights with stage setup, lighting, and live musicians.',
  },
  {
    id: 'diwali-celebration',
    slug: 'diwali-celebration',
    title: 'Diwali Event',
    category: 'festival',
    includes: festivalIncludes,
    price: 'Starting from ₹1,00,000',
    description: 'Festive Diwali events with luminous decor, entertainment, and hospitality.',
  },
  {
    id: 'holi-festival',
    slug: 'holi-festival',
    title: 'Holi Festival',
    category: 'festival',
    includes: festivalIncludes,
    price: 'Starting from ₹80,000',
    description: 'Colourful Holi celebrations with outdoor setup, music, and safety coordination.',
  },
  {
    id: 'new-year-event',
    slug: 'new-year-event',
    title: 'New Year Event',
    category: 'festival',
    includes: festivalIncludes,
    price: 'Starting from ₹2,50,000',
    description: 'Spectacular New Year galas with countdown staging, DJ, and premium hospitality.',
  },
]

export function getPackageBySlug(slug: string): EventPackage | undefined {
  return packages.find((pkg) => pkg.slug === slug)
}

export function getPopularPackages() {
  return packages.filter((pkg) => pkg.popular || pkg.category === 'wedding').slice(0, 4)
}
