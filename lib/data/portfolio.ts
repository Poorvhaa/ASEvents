export const portfolioCategories = [
  'All',
  'Wedding',
  'Corporate',
  'Birthdays',
  'Anniversaries',
  'Others',
] as const

export type PortfolioCategory = (typeof portfolioCategories)[number]

export const categorySlugMap = {
  wedding: 'Wedding',
  corporate: 'Corporate',
  birthdays: 'Birthdays',
  anniversaries: 'Anniversaries',
  others: 'Others',
} as const

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
  id: string
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
    category: 'Others',
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
  /*{
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
  }*/
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
    category: 'Others',
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
  /*{
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
  }*/
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
  
]

export const galleryImages: GalleryImage[] = [
  // Weddings
  { id: 'wedding-carnival-1', src: '/images/portfolio/weddings/carnival 1.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 1' },
  { id: 'wedding-carnival-2', src: '/images/portfolio/weddings/carnival 2.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 2' },
  { id: 'wedding-carnival-3', src: '/images/portfolio/weddings/carnival 3.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 3' },
  { id: 'wedding-carnival-4', src: '/images/portfolio/weddings/carnival 4.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 4' },
  { id: 'wedding-engagement', src: '/images/portfolio/weddings/engagement.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 5' },
  { id: 'wedding-haldi-1', src: '/images/portfolio/weddings/haldi 1.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 6' },
  { id: 'wedding-haldi-2', src: '/images/portfolio/weddings/haldi 2.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 7' },
  { id: 'wedding-haldi-3', src: '/images/portfolio/weddings/haldi 3.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 8' },
  { id: 'wedding-haldi-4', src: '/images/portfolio/weddings/haldi 4.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 9' },
  { id: 'wedding-mehendi-1', src: '/images/portfolio/weddings/mehendi 1.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 10' },
  { id: 'wedding-mehendi-2', src: '/images/portfolio/weddings/mehendi 2.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 11' },
  { id: 'wedding-mehendi-3', src: '/images/portfolio/weddings/mehendi 3.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 12' },
  { id: 'wedding-mehendi-4', src: '/images/portfolio/weddings/mehendi 4.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 13' },
  { id: 'wedding-sangeet-1', src: '/images/portfolio/weddings/sangeet 1.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 14' },
  { id: 'wedding-sangeet-2', src: '/images/portfolio/weddings/sangeet 2.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 15' },
  { id: 'wedding-sangeet-3', src: '/images/portfolio/weddings/sangeet 3.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 16' },
  { id: 'wedding-sangeet-4', src: '/images/portfolio/weddings/sangeet 4.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 17' },
  { id: 'wedding-wedding-1', src: '/images/portfolio/weddings/wedding 1.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 18' },
  { id: 'wedding-wedding-2', src: '/images/portfolio/weddings/wedding 2.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 19' },
  { id: 'wedding-wedding-3', src: '/images/portfolio/weddings/wedding 3.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 20' },
  { id: 'wedding-wedding-4', src: '/images/portfolio/weddings/wedding 4.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 21' },
  { id: 'wedding-wedding-5', src: '/images/portfolio/weddings/wedding 5.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 22' },
  { id: 'wedding-wedding-6', src: '/images/portfolio/weddings/wedding 6.jpg', category: 'Wedding', alt: 'Wedding event by AS Events 23' },

  // Corporate
  { id: 'corporate-corporate-1', src: '/images/portfolio/corporate/corporate 1.jpg', category: 'Corporate', alt: 'Corporate event by AS Events 1' },
  { id: 'corporate-corporate-2', src: '/images/portfolio/corporate/corporate 2.jpg', category: 'Corporate', alt: 'Corporate event by AS Events 2' },

  // Birthdays
  { id: 'birthdays-birthday-1', src: '/images/portfolio/birthdays/birthday 1.jpg', category: 'Birthdays', alt: 'Birthday celebration by AS Events 1' },
  { id: 'birthdays-birthday-2', src: '/images/portfolio/birthdays/birthday 2.jpg', category: 'Birthdays', alt: 'Birthday celebration by AS Events 2' },
  { id: 'birthdays-birthday-3', src: '/images/portfolio/birthdays/birthday 3.jpg', category: 'Birthdays', alt: 'Birthday celebration by AS Events 3' },
  { id: 'birthdays-birthday-4', src: '/images/portfolio/birthdays/birthday 4.jpg', category: 'Birthdays', alt: 'Birthday celebration by AS Events 4' },
  { id: 'birthdays-birthday-5', src: '/images/portfolio/birthdays/birthday 5.jpg', category: 'Birthdays', alt: 'Birthday celebration by AS Events 5' },

  // Anniversaries
  { id: 'anniversaries-anniversary-1', src: '/images/portfolio/anniversaries/anniversary 1.jpg', category: 'Anniversaries', alt: 'Anniversary celebration by AS Events' },

  // Others
  { id: 'others-baby-shower-1', src: '/images/portfolio/others/baby shower 1.jpg', category: 'Others', alt: 'Event celebration by AS Events 1' },
  { id: 'others-baby-shower-2', src: '/images/portfolio/others/baby shower 2.jpg', category: 'Others', alt: 'Event celebration by AS Events 2' },
]
