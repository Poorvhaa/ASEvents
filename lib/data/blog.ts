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
    id: 111,
    title: 'How to Plan a Destination Wedding in India: A Step-by-Step Guide',
    slug: 'how-to-plan-a-destination-wedding-in-india',
    excerpt:
      'A practical India-focused destination wedding guide covering venues, budgets, accommodation, guest travel, vendors, Indian ceremonies and wedding-day coordination.',
    image: '/images/blog/how-to-plan-a-destination-wedding-in-india/hero.jpg',
    date: 'October 30, 2026',
    readTime: '18 min read',
    category: 'Weddings',
    tags: [
      'Weddings',
      'Destination',
      'Planning Tips',
      'Budget',
      'Event Management',
      'Luxury Events',
    ],
    featured: true,
    seoTitle:
      'How to Plan a Destination Wedding in India | Step-by-Step Guide',
    metaDescription:
      'Learn how to plan a destination wedding in India, including Rajasthan, Goa and Kerala venues, budgets, guest travel, vendors, ceremonies and wedding-day coordination.',
    primaryKeyword: 'how to plan a destination wedding in India',
    secondaryKeywords: [
      'destination wedding in India',
      'destination wedding planner India',
      'destination wedding planner in India',
      'destination wedding planning India',
      'Indian destination wedding',
      'destination wedding venues in India',
      'destination wedding budget India',
      'destination wedding checklist India',
      'India destination wedding guide',
      'destination wedding planning services',
      'destination wedding guest planning',
      'destination wedding itinerary',
      'destination wedding vendors India',
      'Rajasthan destination wedding',
      'Udaipur destination wedding',
      'Jaipur destination wedding',
      'Jodhpur destination wedding',
      'Goa destination wedding',
      'Kerala destination wedding',
      'Shimla destination wedding',
      'Manali destination wedding',
      'destination wedding venues Rajasthan',
      'destination wedding venues Goa',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/how-to-plan-a-destination-wedding-in-india',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Creative Director',
    },
  },
  {
    id: 110,
    title: 'Destination Wedding Planning: The Complete Guide for Couples',
    slug: 'destination-wedding-planning-complete-guide',
    excerpt:
      'A complete destination wedding planning guide covering venues, budgets, guest travel, legal checks, vendors, Indian ceremonies, timelines and wedding-day coordination.',
    image: '/images/blog/destination-wedding-planning-complete-guide/hero.jpg',
    date: 'October 25, 2026',
    readTime: '18 min read',
    category: 'Weddings',
    tags: [
      'Weddings',
      'Destination',
      'Planning Tips',
      'Budget',
      'Event Management',
      'Luxury Events',
    ],
    featured: true,
    seoTitle:
      'Destination Wedding Planning: Complete Guide for Couples | AS Event Management',
    metaDescription:
      'Explore destination wedding planning with practical ideas, budgeting guidance, venue checks, guest travel tips, timelines, legal considerations and planner advice.',
    primaryKeyword: 'destination wedding planning',
    secondaryKeywords: [
      'destination wedding planner',
      'destination wedding checklist',
      'destination wedding budget',
      'destination wedding ideas',
      'destination wedding venues',
      'destination wedding travel planning',
      'destination wedding planning guide',
      'Indian destination wedding',
      'destination wedding planning services',
      'destination wedding itinerary',
      'destination wedding costs',
      'destination wedding guest planning',
      'destination wedding vendor coordination',
      'destination wedding timeline',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/destination-wedding-planning-complete-guide',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Creative Director',
    },
  },
  {
    id: 109,
    title: 'Wedding Planner vs. DIY Wedding Planning: Which Is Right for You?',
    slug: 'wedding-planner-vs-diy-wedding-planning',
    excerpt:
      'Compare DIY wedding planning with professional wedding planning across cost, creative control, vendors, time commitment and wedding-day coordination.',
    image: '/images/blog/wedding-planner-vs-diy-wedding-planning/hero.jpg',
    date: 'October 23, 2026',
    readTime: '15 min read',
    category: 'Weddings',
    tags: [
      'Weddings',
      'Planning Tips',
      'Budget',
      'Event Management',
      'Luxury Events',
    ],
    featured: true,
    seoTitle:
      'Wedding Planner vs DIY: Costs, Pros & Cons for Indian Weddings | AS Event Management',
    metaDescription:
      'Compare wedding planner vs DIY wedding planning, including costs, creative control, time, vendor coordination and wedding-day support for Indian weddings.',
    primaryKeyword: 'wedding planner vs DIY',
    secondaryKeywords: [
      'DIY wedding planning',
      'professional wedding planner',
      'wedding planner vs planning yourself',
      'wedding planning services',
      'wedding planner benefits',
      'wedding planning costs',
      'day-of wedding coordinator',
      'wedding day coordinator',
      'wedding planning checklist',
      'Indian wedding planning',
      'wedding vendor coordination',
      'DIY wedding vs planner',
      'full-service wedding planner',
      'partial wedding planning',
      'wedding coordination services',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/wedding-planner-vs-diy-wedding-planning',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Event Management',
    },
  },
  {
    id: 108,
    title: 'How Much Does Event Planning Cost in India?',
    slug: 'how-much-does-event-planning-cost-in-india',
    excerpt:
      'Understand event planning costs in India, including venue, catering, décor, production, planner fees, hidden charges and practical budgeting examples.',
    image: '/images/blog/how-much-does-event-planning-cost-in-india/hero.jpg',
    date: 'October 22, 2026',
    readTime: '14 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Budget', 'Event Management', 'Weddings', 'Corporate'],
    featured: true,
    seoTitle:
      'Event Planning Cost in India (2026): Complete Budget Guide | AS Event Management',
    metaDescription:
      'Learn what affects event planning cost in India, compare wedding, corporate and private-event budgets, understand planner fees, hidden costs and how to build a realistic budget.',
    primaryKeyword: 'event planning cost in India',
    secondaryKeywords: [
      'event planning budget',
      'event management cost in India',
      'event planner cost India',
      'wedding event budget India',
      'corporate event planning cost',
      'birthday party planning cost',
      'event cost breakdown India',
      'how much does event planner charge in India',
      'event planner fees India',
      'wedding planner cost in India',
      'cost to hire event planner India',
      'event budget template India',
      '10 lakh event budget India',
      'event venue cost India',
      'catering cost per plate India',
      'event decor cost India',
      'hidden event costs India',
      'event planning cost guide',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/how-much-does-event-planning-cost-in-india',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Event Management',
    },
  },
  {
    id: 107,
    title: 'How to Plan a Successful Wedding: A Step-by-Step Wedding Planning Guide',
    slug: 'how-to-plan-a-successful-wedding',
    excerpt:
      'A practical step-by-step wedding planning guide covering budget, guest list, venue, vendors, ceremonies, décor, food, timeline and final wedding-day preparation.',
    image: '/images/blog/how-to-plan-a-successful-wedding/hero.jpg',
    date: 'October 21, 2026',
    readTime: '14 min read',
    category: 'Weddings',
    tags: ['Weddings', 'Planning Tips', 'Budget', 'Decor', 'Catering', 'Entertainment'],
    featured: true,
    seoTitle: 'How to Plan a Successful Wedding: Step-by-Step Guide | AS Event Management',
    metaDescription:
      'Learn how to plan a successful wedding with a practical guide to budget, guest list, venue, vendors, ceremonies, décor, food, timeline and wedding-day coordination.',
    primaryKeyword: 'how to plan a wedding',
    secondaryKeywords: [
      'wedding planning guide',
      'wedding planning checklist',
      'step-by-step wedding planning',
      'how to plan a successful wedding',
      'wedding planning timeline',
      'wedding planner',
      'wedding planning services',
      'wedding budget planning',
      'wedding venue selection',
      'wedding vendor planning',
      'Indian wedding planning',
      'destination wedding planning',
      'wedding guest list planning',
      'wedding day timeline',
      'Indian wedding planner',
      'Gujarati wedding planning',
      'North Indian wedding planning',
      'South Indian wedding planning',
      'interfaith wedding planning',
      'destination wedding planner',
      'wedding budget',
      'wedding guest experience',
      'wedding vendors',
      'wedding décor',
      'wedding catering',
      'wedding photography',
      'wedding entertainment',
      'wedding ceremony planning',
      'mehndi planning',
      'haldi planning',
      'sangeet planning',
      'wedding reception planning',
      'wedding logistics',
      'wedding coordination',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/how-to-plan-a-successful-wedding',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Event Management',
    },
  },
  {
    id: 106,
    title: 'How to Create an Event Budget: A Practical Guide for Any Event',
    slug: 'how-to-create-an-event-budget',
    excerpt:
      'A practical guide to event budget planning, including cost categories, hidden expenses, contingency funds, vendor comparisons, tracking, and final budget control.',
    image: '/images/blog/how-to-create-an-event-budget/hero.jpg',
    date: 'October 19, 2026',
    readTime: '12 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Budget', 'Event Management', 'Corporate', 'Weddings'],
    featured: true,
    seoTitle: 'How to Create an Event Budget: Step-by-Step Guide | AS Events',
    metaDescription:
      'Learn how to create an event budget with practical steps for venue, catering, vendors, hidden costs, contingency funds, tracking, and final budget control.',
    primaryKeyword: 'how to create an event budget',
    secondaryKeywords: [
      'event budget',
      'event budget planning',
      'event planning budget',
      'event management budget',
      'event budget checklist',
      'event costs',
      'event planning costs',
      'event budget template',
      'event budget spreadsheet',
      'event budget categories',
      'event budgeting guide',
      'event planning budget checklist',
      'event cost management',
      'event planner budget',
      'event budget tracking',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/how-to-create-an-event-budget',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Events',
    },
  },
  {
    id: 105,
    title: 'How Early Should You Hire an Event Planner?',
    slug: 'how-early-should-you-hire-an-event-planner',
    excerpt:
      'Learn how early to hire an event planner for weddings, corporate events, birthdays and destination celebrations, with booking timelines and planning tips.',
    image: '/images/blog/how-early-should-you-hire-an-event-planner/hero.jpg',
    date: 'October 16, 2026',
    readTime: '11 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Event Management', 'Weddings', 'Corporate', 'Budget'],
    featured: true,
    seoTitle: 'How Early Should You Hire an Event Planner? Booking Timeline Guide | AS Events',
    metaDescription:
      'Learn how early to hire an event planner for weddings, corporate events, birthdays and destination events, with practical booking timelines and planning tips.',
    primaryKeyword: 'how early should you hire an event planner',
    secondaryKeywords: [
      'when to hire an event planner',
      'how far in advance to book an event planner',
      'event planner booking timeline',
      'when should i book an event planner',
      'when to hire a wedding planner',
      'when to hire a corporate event planner',
      'event planning timeline',
      'last-minute event planner',
      'event management services',
    ],
    canonicalUrl:
      'https://www.aseventmanagement.com/blog/how-early-should-you-hire-an-event-planner',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Events',
    },
  },
  {
    id: 104,
    title: "Event Planner vs Event Manager: What's the Difference?",
    slug: 'event-planner-vs-event-manager',
    excerpt:
      'Learn the key differences between an event planner and event manager, from budgeting and vendor selection to event-day coordination and live execution.',
    image: '/images/blog/event-planner-vs-event-manager/hero.jpg',
    date: 'October 15, 2026',
    readTime: '10 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Event Management', 'Weddings', 'Corporate', 'Budget'],
    featured: true,
    seoTitle: 'Event Planner vs Event Manager: Key Differences Explained | AS Events',
    metaDescription:
      'Learn the difference between an event planner and event manager, including responsibilities, timelines, vendor coordination, event-day execution and which service you need.',
    primaryKeyword: 'event planner vs event manager',
    secondaryKeywords: [
      'event planner vs event manager difference',
      'difference between event planner and event manager',
      'event planner',
      'event manager',
      'event planning services',
      'event management services',
      'professional event planner',
      'professional event manager',
      'event coordinator',
      'event planning company',
      'event management company',
    ],
    canonicalUrl: 'https://www.aseventmanagement.com/blog/event-planner-vs-event-manager',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Events',
    },
  },
  {
    id: 103,
    title: 'Complete Event Planning Checklist: From the First Idea to Event Day',
    slug: 'complete-event-planning-checklist',
    excerpt:
      'A practical event planning guide covering the decisions that turn an idea into a coordinated, guest-ready event.',
    image: '/images/blog/complete-event-planning-checklist/complete-event-planning-checklist.jpg',
    date: 'October 12, 2026',
    readTime: '12 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Event Management', 'Weddings', 'Corporate', 'Budget'],
    featured: true,
    seoTitle: 'Complete Event Planning Checklist: From Idea to Event Day | AS Events',
    metaDescription:
      'Use this practical event planning checklist to organize your budget, venue, vendors, guest experience, timeline, event-day execution and post-event wrap-up.',
    primaryKeyword: 'event planning checklist',
    secondaryKeywords: [
      'event planning guide',
      'event checklist',
      'event management checklist',
      'event planner checklist',
    ],
    canonicalUrl: 'https://www.aseventmanagement.com/blog/complete-event-planning-checklist',
    author: {
      name: 'Apurv Shah',
      role: 'Founder & Lead Event Director, AS Events',
    },
  },
  {
    id: 102,
    title: 'What Does an Event Planner Do? A Complete Guide to Event Planning Services',
    slug: 'what-does-an-event-planner-do',
    excerpt:
      'From ideas to a coordinated celebration — how an event planner connects vision, venue, vendors, guests, and event-day execution.',
    image: '/images/blog/what-does-an-event-planner-do/hero.jpg',
    date: 'September 29, 2026',
    readTime: '11 min read',
    category: 'Planning Tips',
    tags: ['Planning Tips', 'Event Management', 'Weddings', 'Corporate', 'Budget'],
    featured: false,
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
    date: 'September 29, 2026',
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

/**
 * Safely parses an article date string into a timestamp (epoch ms).
 * Supported formats:
 *   - "Month DD, YYYY" (e.g. "October 23, 2026", "March 15, 2024")
 *   - "YYYY-MM-DD" / ISO timestamps
 *   - Native Date parseable strings
 * Returns 0 if missing or invalid, ensuring safe placement at the end without crashing.
 */
export function parseArticleDate(dateStr?: string): number {
  if (!dateStr || typeof dateStr !== 'string') return 0
  const trimmed = dateStr.trim()
  if (!trimmed) return 0

  // 1. "Month DD, YYYY" format
  const monthMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/)
  if (monthMatch) {
    const monthIndex = ARTICLE_MONTHS.findIndex(
      (m) => m.toLowerCase() === monthMatch[1].toLowerCase()
    )
    if (monthIndex >= 0) {
      return Date.UTC(
        parseInt(monthMatch[3], 10),
        monthIndex,
        parseInt(monthMatch[2], 10)
      )
    }
  }

  // 2. "YYYY-MM-DD" format
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (isoMatch) {
    return Date.UTC(
      parseInt(isoMatch[1], 10),
      parseInt(isoMatch[2], 10) - 1,
      parseInt(isoMatch[3], 10)
    )
  }

  // 3. Fallback to standard Date.parse
  const timestamp = new Date(trimmed).getTime()
  return isNaN(timestamp) ? 0 : timestamp
}

/**
 * Sorts blog posts descending by publication date (newest first).
 * Creates and returns a new sorted array, never mutating the original.
 * Secondary tie-breaker uses id descending.
 */
export function sortBlogPostsByDateDescending(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const timeA = parseArticleDate(a.date)
    const timeB = parseArticleDate(b.date)
    if (timeB !== timeA) {
      return timeB - timeA
    }
    return (b.id ?? 0) - (a.id ?? 0)
  })
}

export function getAllBlogPosts(): BlogPost[] {
  return sortBlogPostsByDateDescending(blogPosts)
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return sortBlogPostsByDateDescending(blogPosts.filter((post) => post.featured))
}

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

export const plannerVsManagerFaqs = [
  {
    question: 'What is the difference between an event planner and an event manager?',
    answer:
      'An event planner focuses on the creative, financial, and logistical preparation leading up to the celebration—such as event concept development, venue scouting, vendor sourcing, budget tracking, and master timelines. An event manager focuses on the live execution—supervising venue setup, coordinating vendors on event day, directing staff, managing the schedule, and troubleshooting live issues.',
  },
  {
    question: 'Is an event planner the same as an event manager?',
    answer:
      'In casual conversation, the two terms are often used interchangeably, but in the professional event industry, they denote two distinct disciplines. Event planning is primarily long-term preparatory architecture, while event management is operational logistics and real-time execution.',
  },
  {
    question: 'Do event planners manage events on the day?',
    answer:
      'Not always. Some independent planners conclude their service once the master plan, vendor contracts, and run-of-show are finalized. However, full-service event planning companies like AS Event Management provide integrated planning and event-day management to ensure seamless handover and flawless execution.',
  },
  {
    question: 'What does an event manager do on event day?',
    answer:
      'On event day, the event manager is the on-site conductor. They supervise venue access and vendor load-in, test audiovisual systems, coordinate catering timelines, direct event staff and security, cue keynote speakers or ceremonial entrances, resolve technical hiccups, and oversee venue breakdown and inventory wrap-up.',
  },
  {
    question: 'Can one person be both an event planner and event manager?',
    answer:
      'Yes, for smaller, more intimate gatherings like private dinner parties, milestone birthdays, or boutique social events, a skilled professional can successfully handle both planning and on-site coordination. For larger events like high-stakes corporate conferences or weddings with hundreds of guests, the workload requires separate dedicated specialists or an experienced team.',
  },
  {
    question: 'Which service do I need for my event?',
    answer:
      'If you have just an idea and need assistance selecting a venue, managing costs, and securing dependable vendors, you need an event planner. If you have already booked your vendors and finalized details but need a professional to run event-day operations so you can relax, you need an event manager. If you want stress-free coverage from concept to cleanup, you need a full event management service.',
  },
  {
    question: 'What is full event management?',
    answer:
      'Full event management is an end-to-end service that unifies strategic planning, creative design, vendor contract negotiations, guest management, and live on-site event coordination under one coordinated team. AS Event Management specializes in full-service delivery for weddings, corporate galas, and social celebrations.',
  },
]

export const bookingTimelineFaqs = [
  {
    question: 'When should I hire an event planner?',
    answer:
      'The best time to hire an event planner is as soon as you have an approximate date and budget, particularly for large, complex, customized, or date-sensitive events. Involving a planner early gives them the opportunity to help with the foundation of the event—securing preferred venues, establishing realistic budgets, and sourcing trusted vendors before availability tightens.',
  },
  {
    question: 'How early should I hire a wedding planner?',
    answer:
      'Many weddings benefit from approximately 9 to 18 months of planning. Larger celebrations, high-demand peak wedding seasons, or destination weddings often require 12 to 18+ months to secure preferred venues and key vendors such as photographers, caterers, and decorators.',
  },
  {
    question: 'Can I hire an event planner three months before my event?',
    answer:
      'Yes. Depending on planner availability, an event professional can provide partial planning, event management services, or event-day coordination even when the event is approaching rapidly, stepping in to audit contracts, organize timelines, and coordinate final logistics.',
  },
  {
    question: 'Can an event planner help with a small party?',
    answer:
      'Yes. While a small private gathering or intimate birthday may require fewer planning hours, professional assistance still provides significant value by streamlining vendor sourcing, custom décor styling, catering coordination, and event-day hospitality.',
  },
  {
    question: 'What does an event planner do before an event?',
    answer:
      'Pre-event planning responsibilities include concept development, budgeting, venue research and contract negotiation, vendor sourcing, floor plan design, guest management workflows, master schedule creation, and thorough logistical preparation.',
  },
  {
    question: 'What does an event planner do on event day?',
    answer:
      'On event day, the planner or on-site event manager coordinates vendor load-in, supervises setup, directs event staff, manages schedule cues and transitions, handles guest flow, troubleshoots live issues in real time, and oversees breakdown.',
  },
  {
    question: 'What is the difference between event planning and event management?',
    answer:
      'Event planning emphasizes pre-event preparation, budgeting, creative design, and vendor contracting, while event management focuses heavily on live on-site execution, staff coordination, and operational control. In practice, full-service companies like AS Events provide both.',
  },
  {
    question: 'What is event-day coordination?',
    answer:
      'Event-day coordination is professional support designed for clients who have handled most of the preparatory planning themselves but want an experienced professional to manage live setup, vendor deliveries, timeline execution, and issue resolution on the day so the host can relax.',
  },
  {
    question: 'Should I hire an event planner before choosing a venue?',
    answer:
      'Yes. Involving a planner before or during venue research is highly beneficial because planners evaluate guest capacity limits, hidden facility fees, acoustic properties, kitchen infrastructure, and curfew rules before you sign a binding contract.',
  },
  {
    question: 'How do I choose the right professional event planner?',
    answer:
      'Look for relevant portfolio experience with your specific event type, clear and prompt communication, structured planning methodologies, transparent pricing, strong vendor relationships, and a clearly defined service agreement.',
  },
]

export const eventBudgetFaqs = [
  {
    question: 'What is an event budget?',
    answer:
      'An event budget is a financial plan that estimates, tracks, and controls the money required to deliver an event. It normally includes expected income, planned expenses, committed costs, actual spending, payment schedules, and contingency funds.',
  },
  {
    question: 'What should an event budget include?',
    answer:
      'An event budget should include all major event cost categories such as venue and logistics, catering, technology and AV production, staffing, entertainment, décor, marketing, transportation, administrative expenses, and a dedicated contingency reserve.',
  },
  {
    question: 'How do I start event budget planning?',
    answer:
      'Start by identifying the total available funding and the primary objectives of the event. Next, estimate the guest count, establish spending priorities, research realistic vendor pricing, and build a master tracking spreadsheet before signing binding contracts.',
  },
  {
    question: 'Why is a contingency fund important?',
    answer:
      'Unexpected expenses can arise even with meticulous planning. A contingency reserve provides financial protection for approved, unplanned costs—such as weather alterations, rush delivery fees, or technical additions—without disrupting essential event categories.',
  },
  {
    question: 'How can I avoid event budget creep?',
    answer:
      'Avoid budget creep by documenting full vendor quotes upfront, requesting itemized proposals, recording every scope modification immediately, tracking committed spending, conducting regular reviews, and requiring formal approval before increasing expenses.',
  },
  {
    question: 'Should estimated and actual event costs be tracked separately?',
    answer:
      'Yes. Tracking estimated, quoted, contracted, and actual costs side by side allows planners to measure variance, spot trends early, and reallocate funds across categories before final balances come due.',
  },
  {
    question: 'Can an event planner help with budgeting?',
    answer:
      'Yes. A professional event planner provides realistic market pricing, negotiates vendor contracts, uncovers hidden venue fees, structures payment milestones, tracks commitments, and prevents costly planning oversights.',
  },
  {
    question: 'Is the cheapest vendor always the best choice?',
    answer:
      'No. Compare total scope, reliability, included services, equipment quality, setup labor, and contractual terms. A vendor with a lower headline price may ultimately cost more if essential services, delivery, or teardown fees are excluded.',
  },
  {
    question: 'How often should an event budget be reviewed?',
    answer:
      'Review frequency should match event complexity and proximity. Early in planning, monthly or bi-weekly reviews are often sufficient; as the event nears and major vendor contracts and final headcounts are confirmed, weekly or real-time reviews are recommended.',
  },
  {
    question: 'What is the difference between an event budget and an event management budget?',
    answer:
      'An event budget is the overarching financial blueprint establishing total funding and category allocations. An event management budget focuses on operational execution, tracking real-time commitments, deposit schedules, vendor milestones, variance control, and day-of operational spending.',
  },
]

export const weddingPlanningFaqs = [
  {
    question: 'How do I start planning a wedding?',
    answer:
      'Start by agreeing on your shared wedding vision, core atmosphere, approximate scale, cultural requirements, and top three priorities before committing deposits. Establishing your priorities early helps you evaluate venues, vendors, and budgets without getting overwhelmed.',
  },
  {
    question: 'When should we set the wedding budget?',
    answer:
      'Set your wedding budget at the very start of the planning process. Define confirmed financial contributions from all parties, establish a clear spending ceiling, allocate funds across major categories, and reserve a dedicated contingency fund before signing any vendor or venue contracts.',
  },
  {
    question: 'Should we create the guest list before booking the venue?',
    answer:
      'Yes. Drafting your guest count across immediate family, extended relatives, and friends—with separate estimates for each ceremony—is critical before selecting a venue. Usable capacity, catering minimums, and seating comfort depend directly on realistic guest attendance.',
  },
  {
    question: 'How do we choose wedding vendors?',
    answer:
      'Prioritize high-demand vendors whose dates book early, such as catering, photography, production, and decor. Review portfolios of events similar in style and scale, speak with recent references, confirm dedicated on-site supervisors, and ensure contracts detail scope, overtime, backup plans, and cancellation terms.',
  },
  {
    question: 'How do we plan multiple Indian wedding functions?',
    answer:
      'Create an individual planning outline for each celebration—including haldi, mehndi, sangeet, the main wedding ritual, and the reception. Detail the purpose, location, timing, required materials, family roles, food service, and officiant requirements for each event to prevent rushed schedules.',
  },
  {
    question: 'When can a wedding planner help?',
    answer:
      'Professional wedding planning is especially valuable when managing multi-day celebrations, complex logistics, large guest lists, destination events, or when families have limited time to coordinate vendors. Planners offer full-service planning, partial planning, or day-of event coordination based on your needs.',
  },
  {
    question: 'How do we create a wedding-day timeline?',
    answer:
      'Build a master timeline outlining vendor load-in, dressing and beauty times, photography sessions, guest arrivals, ritual milestones, dining service, and teardown. Include realistic buffer times between events to accommodate travel delays, family portraits, and cultural traditions comfortably.',
  },
]

export const eventCostIndiaFaqs = [
  {
    question: 'What is included in event planning cost in India?',
    answer:
      'The total event cost in India may include venue and space rental, food and catering, décor and ambience, sound, lighting and AV production, photography and videography, entertainment, event staffing, transportation, taxes, and a dedicated contingency reserve. Professional planner fees are separate unless a written full-service package explicitly bundles them.',
  },
  {
    question: 'Is an event planner fee the same as an event budget?',
    answer:
      'No. An event planner fee compensates the professional team for their time, expertise, vendor coordination, timeline design, budget administration, and on-site execution. The event budget is the total financial amount required to produce the event, covering all third-party vendors, venue fees, rentals, catering, permits, and contingency reserves.',
  },
  {
    question: 'Is DIY event planning always cheaper than hiring an event planner?',
    answer:
      'Not necessarily. While DIY planning avoids a professional coordination fee, venue, catering, décor, and technical rental costs remain identical. Moreover, self-planning requires substantial personal time and carries risks of vendor miscommunications, contract oversights, uncoordinated timelines, or rush charges that can quickly erode any perceived savings.',
  },
  {
    question: 'How much should I reserve for unexpected event costs?',
    answer:
      'There is no universal fixed percentage, but allocating 5% to 10% of your total budget as an emergency contingency reserve is practical. The required reserve depends on event complexity, outdoor weather contingencies, travel logistics, and quotation certainty. Keep this reserve isolated and define who holds authority to approve release of contingency funds.',
  },
  {
    question: 'What should I compare when vendors send different quotes?',
    answer:
      'Ensure each vendor is quoting the exact same written brief, date, guest count, and service scope. Compare itemized inclusions such as taxes, service hours, setup and teardown labor, transport, power, cancellation terms, and overtime rates. Evaluate vendor reliability and demonstrated execution standards rather than selecting solely on the lowest headline price.',
  },
  {
    question: 'Does booking an event planner early always save money?',
    answer:
      'Early planning provides time to evaluate competing proposals, secure preferred venues before peak dates sell out, and avoid premium rush surcharges. While discounts are not guaranteed, early planning prevents hurried decisions and allows thorough contractual review, ensuring you lock in transparent rates with clear inclusions.',
  },
  {
    question: 'Can one planner manage a wedding, corporate event and birthday party?',
    answer:
      'Experienced full-service event management companies frequently produce diverse celebrations. However, ensure the agency has specialized production expertise for your specific event type—such as multi-day ritual coordination for weddings, strict AV and run-of-show precision for corporate conferences, or safe and engaging setups for milestone private parties.',
  },
  {
    question: 'Should I choose an all-inclusive event package or individual vendors?',
    answer:
      'An all-inclusive package simplifies billing and single-point coordination when itemized deliverables and vendor quality are clear. Sourcing individual vendors allows tailored customization but requires dedicated contract and timeline supervision. Review the complete final cost and contractual accountability of both options before committing.',
  },
]

export const weddingPlannerVsDiyFaqs = [
  {
    question: 'What does DIY stand for in wedding planning?',
    answer:
      'DIY stands for "Do It Yourself." In wedding planning, it means the couple and family take overall responsibility for organizing the celebration—selecting vendors, comparing proposals, managing the budget, and setting schedules—instead of hiring a full-service wedding planner. DIY does not mean cooking the food or building stages yourself; you still hire professional suppliers, but you retain management and coordination control.',
  },
  {
    question: 'Is DIY wedding planning always cheaper?',
    answer:
      'Not necessarily. While DIY planning avoids a professional planner’s service fee, third-party expenses for the venue, catering, décor, photography, and music remain identical. Additionally, self-planning requires substantial personal time and risks vendor miscommunications, contract oversights, uncoordinated schedules, or last-minute rush fees that can quickly offset perceived savings.',
  },
  {
    question: 'Can a wedding planner still give us creative control?',
    answer:
      'Yes, absolutely. A professional wedding planner acts as an operational partner rather than an artistic substitute. In a well-structured collaboration, the couple defines the aesthetic vision, selects traditions, approves all vendor choices, and retains final authority on spending, while the planner organizes proposals, coordinates logistics, and executes approved decisions.',
  },
  {
    question: 'Is a planner necessary for a small wedding?',
    answer:
      'Not automatically. A smaller, straightforward celebration with a single venue and limited vendor team can work wonderfully as DIY if the couple has the time and dependable family help. Even then, many couples hire a day-of wedding coordinator so parents and relatives can enjoy rituals and celebrate rather than directing deliveries and troubleshooting setups.',
  },
  {
    question: 'What if our families want to help?',
    answer:
      'Family involvement can make planning deeply personal and joyful, especially for traditional Indian rituals. To keep it positive, assign relatives defined responsibilities matching their strengths, set realistic deadlines, and avoid placing high-pressure operational duties on close family members during sacred ceremonies when they should be participating fully.',
  },
  {
    question: 'Does hiring a wedding planner guarantee lower spending?',
    answer:
      'No. While an experienced planner helps structure budgets, spot missing contract clauses, and prevent costly logistical errors, professional planning carries a service fee. Final spending depends on your guest count, venue choice, catering style, and production scope rather than hiring a planner alone.',
  },
  {
    question: 'What is the difference between full planning and day-of coordination?',
    answer:
      'Full planning begins months before the event and covers venue sourcing, budget design, vendor vetting, contract negotiations, design curation, and end-to-end execution. Day-of coordination (or month-of coordination) typically begins 4 to 6 weeks before the wedding to consolidate existing vendor agreements, build the master schedule, confirm arrival windows, and manage on-site logistics on event day.',
  },
  {
    question: 'When should couples hire a coordinator?',
    answer:
      'Couples should contact a coordinator as soon as they know they will need operational support—ideally 2 to 6 months before the wedding. Even a wedding-day coordinator requires several weeks beforehand to review existing contracts, verify venue load-in rules, assemble the master schedule, and establish emergency backup plans.',
  },
  {
    question: 'How do we choose the right service for an Indian destination wedding?',
    answer:
      'Map your celebration’s logistical requirements first: number of functions (Haldi, Mehendi, Sangeet, Ceremony, Reception), guest room allocations, airport transfers, hotel hospitality desks, and multi-venue changeovers. If the operational demands exceed your family’s bandwidth, hire a planner with verified destination expertise to manage local suppliers and guest hospitality.',
  },
]


export const destinationWeddingPlanningFaqs = [
  {
    question: 'Are destination weddings always more expensive?',
    answer:
      'No. Overall costs depend on guest count, destination, lodging, number of functions, travel logistics, vendor choices, and which expenses the couple covers. While guest travel, private transfers, and luxury resort buyouts can increase costs, a smaller guest list at a scenic destination may compare favorably to a large local wedding. Couples should compare complete, itemized budgets rather than general impressions.',
  },
  {
    question: 'How early should we begin destination wedding planning?',
    answer:
      'Most couples benefit from starting 12 to 18 months in advance, especially for multi-day celebrations or destinations requiring international travel, room blocks, and complex supplier coordination. However, this is a flexible planning guideline rather than a universal rule—actual timelines depend on venue availability, seasonal weather, and legal lead times.',
  },
  {
    question: 'Do we need a destination wedding planner?',
    answer:
      'While some couples successfully organize simple gatherings or work directly with an experienced on-site venue coordinator, hiring a professional destination wedding planner is strongly recommended for celebrations with multiple venues, remote suppliers, language barriers, large guest lists, or multi-day cultural rituals. Planners provide local supplier relationships, contract vetting, contingency oversight, and dedicated wedding-day management.',
  },
  {
    question: 'Can we legally marry in another country?',
    answer:
      'In many destinations, yes, but eligibility criteria, mandatory documentation, translations, apostilles, residency periods, and legal recognition at home vary significantly by country and nationality. Requirements vary by destination and personal circumstances. Always consult official government authorities and local consulates before making travel commitments. Many couples opt for a legal civil registration in their home country paired with a symbolic or traditional ceremony at the destination.',
  },
  {
    question: 'What should guests know before booking flights?',
    answer:
      'Guests need confirmed ceremony dates, recommended arrival airports, transfer options, room block deadlines and booking codes, expected dress codes for each function, local weather expectations, accessibility considerations, and guidance on passport, visa, or health requirements. Couples should also communicate clearly which expenses are hosted and which are the guest’s personal responsibility.',
  },
  {
    question: 'What is the most important backup plan?',
    answer:
      'The most essential contingency is a fully vetted, physically usable indoor or covered Plan B space with adequate capacity for all guests, lighting, and sound equipment. In addition, couples should establish a written weather decision deadline, designate a single coordinator with decision authority, and prepare contingency protocols for supplier delays, travel disruptions, and medical needs.',
  },
]

export const destinationWeddingIndiaFaqs = [
  {
    question: 'How much does a destination wedding cost in India?',
    answer:
      'There is no single reliable price because destination wedding costs depend on the city, venue, dates, guest count, number of nights, accommodation standard, number of functions and supplier choices. Ask for a complete itemised estimate that includes rooms, food, event spaces, travel, production, taxes, fees and a contingency. Comparing packages on the same guest and room-night assumptions is much more useful than relying on a promotional starting rate.',
  },
  {
    question: 'How far in advance should we start destination wedding planning?',
    answer:
      'Start as early as practical when you have popular dates, a large guest list or international travellers. First establish the broad budget, likely guest count and destination shortlist; then check venues and accommodation capacity before confirming other suppliers. Booking windows vary, so allow enough time for venue inspection, family discussions, travel planning and a careful review of contracts rather than following an inflexible calendar.',
  },
  {
    question: 'Which are popular destinations for Indian destination weddings?',
    answer:
      'Couples often consider heritage settings around Udaipur, Jaipur or Jodhpur, coastal celebrations in Goa, tropical or backwater surroundings in Kerala and hill destinations around Shimla or Manali. The best choice is not necessarily the most photographed location. Compare guest travel, room capacity, weather alternatives, supplier capabilities, ceremony requirements and total confirmed cost for your chosen dates.',
  },
  {
    question: 'Who pays for guests’ travel and accommodation at a destination wedding?',
    answer:
      'There is no universal rule. Some hosts cover certain rooms or transfers, some arrange group rates and others ask guests to pay for their own travel or stay. Whatever you decide, communicate the arrangement early and clearly. Specify what is included, how to book rooms, how airport transfers work and whom guests should contact with questions so that nobody makes assumptions.',
  },
  {
    question: 'What should we confirm before booking destination wedding venues?',
    answer:
      'Check real seating capacity, room availability, the spaces allocated to each function, indoor weather backup, power supply, food policies, outside-vendor rules, sound limits, staff access and accessibility. Get written pricing for accommodation, meals, event areas, taxes, deposits, cancellations and schedule changes. A site visit or live operational walkthrough can help identify issues hidden by promotional photographs.',
  },
  {
    question: 'Do we need a destination wedding planner in India?',
    answer:
      'A planner is not mandatory, but professional coordination may be especially useful for multi-day weddings, far-away venues, complex vendor arrangements and many out-of-town guests. Compare the actual scope rather than the service name. Ask who manages budgets, accommodation, transport, ceremonies, supplier briefings and on-site changes, and obtain a written proposal before deciding.',
  },
  {
    question: 'How many functions should we include in our destination wedding itinerary?',
    answer:
      'Include the celebrations that matter to your families and fit the time, budget and guest experience you want. Haldi, mehndi, sangeet, wedding ceremony and reception are common examples, but there is no requirement to host them all. Leave time for travel, outfit changes, meals and rest; confirm ritual needs with relevant family members or ceremony leaders before locking the schedule.',
  },
  {
    question: 'What is the best way to manage weather and last-minute changes?',
    answer:
      'Ask for a workable indoor or covered alternative before signing the venue contract. Confirm when and who decides to move a function, how decor and technical equipment will be transferred and how guests will be informed. Reserve some budget flexibility, appoint one operational decision-maker and share a current run sheet with suppliers and family coordinators.',
  },
]
