export const portfolioCategories = [
  'All',
  'Wedding',
  'Corporate',
  'Destination',
  'Product Launches',
  'Exhibitions',
  'Birthdays',
  'Anniversaries',
  'Entertainment',
] as const

export type PortfolioCategory = (typeof portfolioCategories)[number]

export const categorySlugMap: Record<string, PortfolioCategory> = {
  wedding: 'Wedding',
  weddings: 'Wedding',
  corporate: 'Corporate',
  destination: 'Destination',
  exhibitions: 'Exhibitions',
  'product-launches': 'Product Launches',
  birthdays: 'Birthdays',
  anniversaries: 'Anniversaries',
  entertainment: 'Entertainment',
}

export interface PortfolioItem {
  id: number
  title: string
  category: PortfolioCategory
  location: string
  date: string
  guests: string
  image: string
  description: string
  gallery: string[]
}

export interface GalleryImage {
  id: number
  src: string
  category: PortfolioCategory
  alt: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'The Royal Garden Wedding',
    category: 'Wedding',
    location: 'Ahmedabad',
    date: 'June 2024',
    guests: '250',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    description: 'A magnificent garden wedding featuring cascading florals, crystal chandeliers under the stars, and a five-course gourmet dining experience.',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    ],
  },
  {
    id: 2,
    title: 'Tech Summit 2024',
    category: 'Corporate',
    location: 'Pune',
    date: 'March 2024',
    guests: '1,500',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    description: 'A three-day technology summit featuring keynote speakers, interactive workshops, and networking events for industry leaders.',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800',
    ],
  },
  {
    id: 3,
    title: 'Maldives Destination Wedding',
    category: 'Destination',
    location: 'Maldives',
    date: 'February 2024',
    guests: '80',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
    description: 'An intimate overwater ceremony in the Maldives with bespoke decor, traditional performances, and sunset cocktails.',
    gallery: [
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
    ],
  },
  {
    id: 4,
    title: 'Golden Anniversary Gala',
    category: 'Anniversaries',
    location: 'Mumbai',
    date: 'January 2024',
    guests: '150',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    description: 'A glamorous 50th anniversary celebration with live orchestra, memory displays, and an elegant formal dinner.',
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    ],
  },
  {
    id: 5,
    title: 'Luxury Brand Launch',
    category: 'Product Launches',
    location: 'New Delhi',
    date: 'December 2023',
    guests: '300',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop',
    description: 'An exclusive product launch event featuring celebrity appearances, immersive brand experiences, and VIP reception.',
    gallery: [
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800',
    ],
  },
  {
    id: 6,
    title: 'Enchanted Forest Reception',
    category: 'Wedding',
    location: 'Ahmedabad',
    date: 'October 2023',
    guests: '180',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
    description: 'A whimsical forest-themed reception with fairy lights, moss installations, and farm-to-table cuisine.',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
    ],
  },
  {
    id: 7,
    title: 'Tuscan Villa Wedding',
    category: 'Destination',
    location: 'Bangalore',
    date: 'September 2023',
    guests: '120',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
    description: 'A romantic Italian countryside wedding with vineyard ceremonies, traditional cuisine, and opera performances.',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    ],
  },
  {
    id: 8,
    title: 'Sweet 16 Extravaganza',
    category: 'Birthdays',
    location: 'Pune',
    date: 'August 2023',
    guests: '200',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
    description: 'A spectacular sweet sixteen party with custom LED installations, live DJ, and themed photo experiences.',
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800',
    ],
  },
  {
    id: 9,
    title: 'International Trade Expo',
    category: 'Exhibitions',
    location: 'Mumbai',
    date: 'July 2025',
    guests: '5000',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    description: 'Large-scale exhibition event with international exhibitors and immersive brand experiences.',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800',
    ],
  },
  {
    id: 10,
    title: 'Luxury Car Launch',
    category: 'Product Launches',
    location: 'Ahmedabad',
    date: 'June 2025',
    guests: '600',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop',
    description: 'Premium automobile launch event with celebrity guests and immersive brand storytelling.',
    gallery: [
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800',
    ],
  },
  {
    id: 11,
    title: 'Royal Birthday Celebration',
    category: 'Birthdays',
    location: 'Surat',
    date: 'May 2025',
    guests: '300',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
    description: 'Luxury birthday celebration with themed decor, live entertainment, and gourmet dining.',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    ],
  },
  {
    id: 12,
    title: 'Silver Jubilee Anniversary',
    category: 'Anniversaries',
    location: 'Ahmedabad',
    date: 'April 2025',
    guests: '250',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    description: '25th wedding anniversary event with elegant decor and live orchestra.',
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    ],
  },
  {
    id: 13,
    title: 'Celebrity Music Night',
    category: 'Entertainment',
    location: 'Vadodara',
    date: 'March 2025',
    guests: '1500',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop',
    description: 'Live entertainment event featuring celebrity performers and spectacular stage production.',
    gallery: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',
    ],
  },
]

export const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200', category: 'Wedding', alt: 'Garden wedding ceremony' },
  { id: 2, src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=1200', category: 'Wedding', alt: 'Floral wedding decor' },
  { id: 3, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200', category: 'Corporate', alt: 'Corporate conference' },
  { id: 4, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200', category: 'Product Launches', alt: 'Product launch event' },
  { id: 5, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200', category: 'Birthdays', alt: 'Birthday celebration' },
  { id: 6, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200', category: 'Anniversaries', alt: 'Anniversary gala' },
  { id: 7, src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200', category: 'Destination', alt: 'Destination wedding' },
  { id: 8, src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200', category: 'Destination', alt: 'Villa wedding' },
  { id: 9, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200', category: 'Wedding', alt: 'Wedding reception' },
  { id: 10, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200', category: 'Corporate', alt: 'Business summit' },
  { id: 11, src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200', category: 'Corporate', alt: 'Corporate networking' },
  { id: 12, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200', category: 'Entertainment', alt: 'Live concert' },
  { id: 13, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200', category: 'Exhibitions', alt: 'Trade exhibition' },
  { id: 14, src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200', category: 'Entertainment', alt: 'Music festival' },
  { id: 15, src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200', category: 'Entertainment', alt: 'Concert stage' },
  { id: 16, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200', category: 'Destination', alt: 'Beach wedding' },
]
