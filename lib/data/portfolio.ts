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
  width: number
  height: number
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
  { id: 'wedding-carnival-1', src: '/images/portfolio/weddings/carnival 1.jpg', width: 1024, height: 1536, category: 'Wedding', alt: 'Outdoor carnival entrance decorated with colorful masks and palm trees' },
  { id: 'wedding-carnival-2', src: '/images/portfolio/weddings/carnival 2.jpg', width: 1200, height: 1487, category: 'Wedding', alt: 'Pink and orange carnival seating area beneath colorful hanging decorations' },
  { id: 'wedding-carnival-3', src: '/images/portfolio/weddings/carnival 3.jpg', width: 736, height: 552, category: 'Wedding', alt: 'Colorful carnival lounge with patterned panels and hanging garlands' },
  { id: 'wedding-carnival-4', src: '/images/portfolio/weddings/carnival 4.jpg', width: 800, height: 1000, category: 'Wedding', alt: 'Outdoor seating beneath a canopy of pink and yellow fabric' },
  { id: 'wedding-engagement', src: '/images/portfolio/weddings/engagement.jpg', width: 1200, height: 800, category: 'Wedding', alt: 'Engagement stage with a cream sofa and red and white floral arch' },
  { id: 'wedding-haldi-1', src: '/images/portfolio/weddings/haldi 1.jpg', width: 1200, height: 1500, category: 'Wedding', alt: 'Haldi setup with two gold basins and hanging garlands against green panels' },
  { id: 'wedding-haldi-2', src: '/images/portfolio/weddings/haldi 2.jpg', width: 736, height: 589, category: 'Wedding', alt: 'Yellow and white haldi backdrop with a gold basin and cushioned seating' },
  { id: 'wedding-haldi-3', src: '/images/portfolio/weddings/haldi 3.jpg', width: 1200, height: 1959, category: 'Wedding', alt: 'Haldi seating beneath hanging baskets and a yellow floral canopy' },
  { id: 'wedding-haldi-4', src: '/images/portfolio/weddings/haldi 4.jpg', width: 736, height: 1104, category: 'Wedding', alt: 'Indoor haldi stage with yellow flowers and hanging marigold garlands' },
  { id: 'wedding-mehendi-1', src: '/images/portfolio/weddings/mehendi 1.jpg', width: 736, height: 804, category: 'Wedding', alt: 'Green mehendi seating beneath a draped canopy topped with white flowers' },
  { id: 'wedding-mehendi-2', src: '/images/portfolio/weddings/mehendi 2.jpg', width: 1200, height: 1159, category: 'Wedding', alt: 'Circular floral mehendi backdrop with white curtains and low seating' },
  { id: 'wedding-mehendi-3', src: '/images/portfolio/weddings/mehendi 3.jpg', width: 1080, height: 1075, category: 'Wedding', alt: 'Green outdoor mehendi swing beneath a fabric canopy' },
  { id: 'wedding-mehendi-4', src: '/images/portfolio/weddings/mehendi 4.jpg', width: 1200, height: 1600, category: 'Wedding', alt: 'Outdoor mehendi seating framed by orange garlands and colorful flowers' },
  { id: 'wedding-sangeet-1', src: '/images/portfolio/weddings/sangeet 1.jpg', width: 864, height: 865, category: 'Wedding', alt: 'White sofa beneath illuminated floral arches at an evening sangeet' },
  { id: 'wedding-sangeet-2', src: '/images/portfolio/weddings/sangeet 2.jpg', width: 735, height: 490, category: 'Wedding', alt: 'Outdoor sangeet stage with a geometric LED backdrop and dance floor' },
  { id: 'wedding-sangeet-3', src: '/images/portfolio/weddings/sangeet 3.jpg', width: 1024, height: 768, category: 'Wedding', alt: 'Outdoor sangeet stage with overhead lighting and rows of chairs' },
  { id: 'wedding-sangeet-4', src: '/images/portfolio/weddings/sangeet 4.jpg', width: 736, height: 920, category: 'Wedding', alt: 'Illuminated geometric entrance arches above a black and white walkway' },
  { id: 'wedding-wedding-1', src: '/images/portfolio/weddings/wedding 1.jpg', width: 1200, height: 861, category: 'Wedding', alt: 'Wedding stage with two ornate chairs, pink drapes, and floral garlands' },
  { id: 'wedding-wedding-2', src: '/images/portfolio/weddings/wedding 2.jpg', width: 736, height: 981, category: 'Wedding', alt: 'Wedding entrance lined with yellow drapes, flowers, and lanterns' },
  { id: 'wedding-wedding-3', src: '/images/portfolio/weddings/wedding 3.jpg', width: 736, height: 1104, category: 'Wedding', alt: 'Garden wedding mandap with hanging flowers and white guest seating' },
  { id: 'wedding-wedding-4', src: '/images/portfolio/weddings/wedding 4.jpg', width: 1080, height: 1074, category: 'Wedding', alt: 'Circular outdoor wedding mandap with floral canopy and gold pillars' },
  { id: 'wedding-wedding-5', src: '/images/portfolio/weddings/wedding 5.jpg', width: 1200, height: 1200, category: 'Wedding', alt: 'Wedding aisle beneath white drapes and chandeliers with floral arrangements' },
  { id: 'wedding-wedding-6', src: '/images/portfolio/weddings/wedding 6.jpg', width: 1200, height: 1207, category: 'Wedding', alt: 'Outdoor wedding entrance with cream drapes and a chandelier at dusk' },

  // Corporate
  { id: 'corporate-corporate-1', src: '/images/portfolio/corporate/corporate 1.jpg', width: 1200, height: 945, category: 'Corporate', alt: 'Gold and white 2026 celebration backdrop with balloons and floor fountains' },
  { id: 'corporate-corporate-2', src: '/images/portfolio/corporate/indian-corporate-event.jpg', width: 1024, height: 1024, category: 'Corporate', alt: 'Premium Indian corporate event setup with stage and banquet seating' },

  // Birthdays
  { id: 'birthdays-birthday-1', src: '/images/portfolio/birthdays/birthday 1.jpg', width: 964, height: 1200, category: 'Birthdays', alt: 'Outdoor birthday backdrop with neutral balloons and pampas grass' },
  { id: 'birthdays-birthday-2', src: '/images/portfolio/birthdays/birthday 2.jpg', width: 736, height: 981, category: 'Birthdays', alt: 'Circular birthday backdrop with sage green drapes and white flowers' },
  { id: 'birthdays-birthday-3', src: '/images/portfolio/birthdays/birthday 3.jpg', width: 756, height: 1008, category: 'Birthdays', alt: 'Poolside birthday backdrop with black and gold balloons' },
  { id: 'birthdays-birthday-4', src: '/images/portfolio/birthdays/birthday 4.jpg', width: 735, height: 808, category: 'Birthdays', alt: 'First birthday display with blue balloons, teddy bears, and a gold number one' },
  { id: 'birthdays-birthday-5', src: '/images/portfolio/birthdays/birthday 5.jpg', width: 563, height: 751, category: 'Birthdays', alt: 'Mickey Mouse birthday display with blue and white balloons' },

  // Anniversaries
  { id: 'anniversaries-anniversary-1', src: '/images/portfolio/anniversaries/anniversary 1.jpg', width: 1073, height: 1200, category: 'Anniversaries', alt: 'Anniversary backdrop with cream drapes, white flowers, and gold stands' },

  // Others
  { id: 'others-baby-shower-1', src: '/images/portfolio/others/baby shower 1.jpg', width: 1080, height: 810, category: 'Others', alt: 'Baby shower stage with red panels, floral decorations, and a green sofa' },
  { id: 'others-baby-shower-2', src: '/images/portfolio/others/baby shower 2.jpg', width: 1438, height: 1438, category: 'Others', alt: 'Outdoor baby shower display with pastel balloons and teddy bears' },
]
