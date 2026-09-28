export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  image: string
  date?: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  seoTitle?: string
  metaDescription?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  canonicalUrl?: string
  author?: {
    name: string
    role: string
  }
  content?: string
}

export const blogCategories = [
  'All',
  'Planning Tips',
  'Weddings',
  'Corporate',
  'Trends',
  'Inspiration',
] as const

export const blogTags = [
  'Planning Tips',
  'Event Management',
  'Luxury Events',
  'Weddings',
  'Corporate',
  'Destination',
  'Decor',
  'Catering',
  'Entertainment',
  'Budget',
] as const

export const blogPosts: BlogPost[] = [
  {
    id: 102,
    title: 'What Does an Event Planner Do? A Complete Guide to Event Planning Services',
    slug: 'what-does-an-event-planner-do',
    excerpt:
      'Learn what an event planner does, from defining your vision and budget to coordinating venues, vendors, guests, timelines, and event-day execution.',
    image: '/images/blog/what-does-an-event-planner-do/hero.jpg',
    date: 'September 18, 2026',
    readTime: '11 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Event Management', 'Weddings', 'Corporate', 'Budget'],
    featured: true,
    seoTitle:
      'What Does an Event Planner Do? A Complete Guide to Event Planning Services | AS Events',
    metaDescription:
      'Learn what an event planner does, from venue and vendor coordination to budgeting, design, guest management, timelines, and event-day execution.',
    primaryKeyword: 'what does an event planner do',
    secondaryKeywords: [
      'event planner services',
      'event planning services',
      'event management',
      'professional event planner',
    ],
    canonicalUrl: 'https://www.aseventmanagement.com/blog/what-does-an-event-planner-do',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Events',
    },
  },
  {
    id: 101,
    title: 'How to Choose the Right Event Planner for Your Event',
    slug: 'how-to-choose-the-right-event-planner-for-your-event',
    excerpt:
      'Learn how to choose the right event planner by comparing experience, services, budget, communication, vendor coordination, and event-day execution.',
    image: '/images/blog/how-to-choose-the-right-event-planner-for-your-event/hero.jpg',
    date: 'March 24, 2024',
    readTime: '10 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Event Management', 'Weddings', 'Corporate', 'Budget'],
    featured: true,
    seoTitle: 'How to Choose the Right Event Planner for Your Event | AS Events',
    metaDescription:
      'Learn how to choose the right event planner by comparing experience, services, budget, communication, vendor coordination, and event-day execution.',
    primaryKeyword: 'how to choose an event planner',
    secondaryKeywords: [
      'event planner',
      'event planning company',
      'professional event planner',
      'event management company',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/how-to-choose-the-right-event-planner-for-your-event',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Events',
    },
  },
  {
    id: 1,
    title: '10 Trends Shaping Luxury Weddings in 2024',
    slug: '10-trends-shaping-luxury-weddings-in-2024',
    excerpt:
      'Discover the latest trends in luxury wedding planning, from sustainable choices to immersive experiences that are defining modern celebrations.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Trends',
    tags: ['Luxury Events', 'Weddings'],
    featured: true,
  },
  {
    id: 2,
    title: 'Corporate Event Planning: A Complete Guide',
    slug: 'corporate-event-planning-a-complete-guide',
    excerpt:
      'Everything you need to know about planning successful corporate events that leave lasting impressions on attendees and stakeholders.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
    date: 'March 10, 2024',
    readTime: '12 min read',
    category: 'Corporate',
    tags: ['Corporate', 'Planning Tips'],
    featured: false,
  },
  {
    id: 3,
    title: 'Choosing the Perfect Destination Wedding Location',
    slug: 'choosing-the-perfect-destination-wedding-location',
    excerpt:
      'Expert tips on selecting the ideal destination for your dream wedding abroad, from beach paradises to historic European venues.',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200',
    date: 'March 5, 2024',
    readTime: '10 min read',
    category: 'Weddings',
    tags: ['Destination', 'Weddings'],
    featured: false,
  },
  {
    id: 4,
    title: 'The Art of Event Catering: Creating Memorable Dining Experiences',
    slug: 'the-art-of-event-catering-creating-memorable-dining-experiences',
    excerpt:
      'How to elevate your event with exceptional catering that delights guests and complements your celebration theme.',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=1200',
    date: 'February 28, 2024',
    readTime: '7 min read',
    category: 'Planning Tips',
    tags: ['Catering', 'Luxury Events'],
    featured: false,
  },
  {
    id: 5,
    title: 'Sustainable Event Planning: Eco-Friendly Celebrations',
    slug: 'sustainable-event-planning-eco-friendly-celebrations',
    excerpt:
      'How to create stunning events while minimizing environmental impact through sustainable practices and conscious choices.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
    date: 'February 20, 2024',
    readTime: '9 min read',
    category: 'Trends',
    tags: ['Trends', 'Planning Tips'],
    featured: false,
  },
  {
    id: 6,
    title: 'Entertainment Ideas That Wow Your Guests',
    slug: 'entertainment-ideas-that-wow-your-guests',
    excerpt:
      'From live bands to interactive experiences, discover entertainment options that take your event to the next level.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200',
    date: 'February 15, 2024',
    readTime: '6 min read',
    category: 'Inspiration',
    tags: ['Entertainment', 'Inspiration'],
    featured: false,
  },
  {
    id: 7,
    title: 'Budget-Friendly Tips for Luxury Events',
    slug: 'budget-friendly-tips-for-luxury-events',
    excerpt:
      'Learn how to achieve a high-end look and feel without breaking the bank with these smart planning strategies.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
    date: 'February 10, 2024',
    readTime: '8 min read',
    category: 'Planning Tips',
    tags: ['Budget', 'Planning Tips'],
    featured: false,
  },
  {
    id: 8,
    title: 'Decor Trends: Transforming Spaces into Experiences',
    slug: 'decor-trends-transforming-spaces-into-experiences',
    excerpt:
      'Explore the latest decor trends that are transforming event spaces into immersive, Instagram-worthy experiences.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
    readTime: '7 min read',
    category: 'Trends',
    tags: ['Decor', 'Trends'],
    featured: false,
    seoTitle: 'Decor Trends: Transforming Spaces into Experiences | AS Events',
    metaDescription:
      'Explore the latest decor trends that are transforming event spaces into immersive, Instagram-worthy experiences.',
  },
]

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

const ARTICLE_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

/** Converts a display date such as "March 24, 2026" to an IST ISO timestamp. */
export function toArticleIsoDate(displayDate?: string): string | undefined {
  if (!displayDate) return undefined
  const match = displayDate.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/)
  if (!match) return undefined
  const monthIndex = ARTICLE_MONTHS.findIndex(
    (month) => month.toLowerCase() === match[1].toLowerCase(),
  )
  if (monthIndex < 0) return undefined
  const month = String(monthIndex + 1).padStart(2, '0')
  const day = match[2].padStart(2, '0')
  return `${match[3]}-${month}-${day}T00:00:00+05:30`
}
