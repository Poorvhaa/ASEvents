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



