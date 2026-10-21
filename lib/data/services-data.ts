export interface ServiceWhatWeHandleItem {
  icon: string
  title: string
  description: string
  deliverables: string[]
}

export interface ServiceWhyChooseItem {
  title: string
  description: string
}

export interface ServiceProcessStep {
  number: string
  title: string
  description: string
}

export interface ServiceOptionItem {
  title: string
  subtitle: string
  description: string
  highlights: string[]
}

export interface ServiceGalleryImage {
  src: string
  alt: string
  title: string
  category: string
}

export interface ServiceFAQItem {
  question: string
  answer: string
}

export interface RelatedServiceItem {
  slug: string
  title: string
  description: string
  image: string
  badgeText: string
}

export interface ServiceDetailData {
  slug: string
  canonicalUrl: string
  title: string
  metaDescription: string
  serviceType: string
  quoteEventType: string
  eyebrow: string
  h1: string
  heroDescription: string
  heroImage: {
    src: string
    alt: string
  }
  intro: {
    whatIsIt: string
    whoIsItFor: string
    whyItMatters: string
    ourApproach: string
  }
  whatWeHandle: ServiceWhatWeHandleItem[]
  whyChooseUs: ServiceWhyChooseItem[]
  processSteps: ServiceProcessStep[]
  serviceOptionsHeading: string
  serviceOptionsDescription: string
  serviceOptions: ServiceOptionItem[]
  galleryHeading: string
  galleryDescription: string
  galleryImages: ServiceGalleryImage[]
  faqs: ServiceFAQItem[]
  relatedServices: RelatedServiceItem[]
}

export const servicesData: Record<string, ServiceDetailData> = {
  'wedding-planning': {
    slug: 'wedding-planning',
    canonicalUrl: 'https://www.aseventmanagement.com/services/wedding-planning',
    title: 'Wedding Planning Services in Vadodara | AS Event Management',
    metaDescription:
      'Professional wedding planning services in Vadodara and across Gujarat. From venue selection and mandap decor to day-of coordination and guest hospitality.',
    serviceType: 'Wedding Planning & Management',
    quoteEventType: 'Wedding',
    eyebrow: 'Vadodara & Gujarat Wedding Management',
    h1: 'Wedding Planning Services Designed Around Your Celebration',
    heroDescription:
      'From traditional rituals and vibrant sangeets to grand wedding receptions, we orchestrate every ceremony with meticulous detail, bespoke décor, and seamless vendor coordination across Gujarat.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      alt: 'Elegant Indian wedding celebration stage decorated with floral arrangements and ambient lighting',
    },
    intro: {
      whatIsIt:
        'Our wedding planning service is a comprehensive, turnkey management solution for couples and families. We handle every dimension of Indian weddings — from initial concept design and budget structuring to ceremony logistics, hospitality, vendor coordination, and on-site event management.',
      whoIsItFor:
        'Designed for families planning multi-day celebrations, modern couples seeking a cohesive aesthetic vision, and NRI clients organizing their dream wedding in Vadodara, Ahmedabad, Surat, and across Gujarat.',
      whyItMatters:
        'An Indian wedding encompasses multiple distinct functions, strict astrological muhurats, dozens of specialized suppliers, and hundreds of cherished guests. Professional coordination transforms complex logistics into an effortless, joy-filled celebration where host families can truly immerse themselves.',
      ourApproach:
        'At AS Event Management, our approach combines aesthetic sophistication with rigorous operational discipline. We curate transparent budgets, maintain open communication with families, and ensure every muhurat and ritual unfolds on schedule without chaos.',
    },
    whatWeHandle: [
      {
        icon: 'MapPin',
        title: 'Venue Scouting & Contracting',
        description:
          'Identifying and evaluating heritage palaces, banquet lawns, luxury hotels, and private farmhouses across Vadodara and Gujarat that fit your guest count and aesthetic.',
        deliverables: [
          'Venue audits and feasibility checks',
          'Contract negotiation and date blocking',
          'Capacity and parking layout design',
        ],
      },
      {
        icon: 'Palette',
        title: 'Theme, Mandap & Floral Décor',
        description:
          'Crafting bespoke visual identities for each ceremony, featuring handcrafted mandaps, fresh floral architecture, designer entry walkways, and mood lighting.',
        deliverables: [
          '3D decor concept renders & moodboards',
          'Custom mandap design & sacred fire sanctum',
          'Thematic floral centerpieces & entrance arches',
        ],
      },
      {
        icon: 'Users',
        title: 'Vendor Curation & Management',
        description:
          'Sourcing and orchestrating trusted wedding specialists, including premier catering teams, fine art photographers, bridal stylists, mehendi artists, and live dhol.',
        deliverables: [
          'Vetted vendor shortlisting & tastings',
          'Contract management & milestone tracking',
          'Sound, lighting, and power backup crew',
        ],
      },
      {
        icon: 'Calendar',
        title: 'Multi-Day Ceremony Coordination',
        description:
          'Seamless scheduling and execution for all pre-wedding and wedding rituals, ensuring smooth transitions between venues and timing adherence.',
        deliverables: [
          'Ganesh Sthapana, Mandvo & Grah Shanti',
          'Vibrant Haldi, Mehendi & Poolside Fiesta',
          'Sangeet, Baraat, Pheras & Grand Reception',
        ],
      },
      {
        icon: 'HeartHandshake',
        title: 'Guest Hospitality & Concierge',
        description:
          'Delivering warm, personalized hospitality to every attendee, from airport and railway station greetings to room allocations and dedicated assistance desks.',
        deliverables: [
          'Hotel room block assignments & check-in',
          'Welcome hampers & itinerary cards',
          'Dedicated transport fleet coordination',
        ],
      },
      {
        icon: 'Clock',
        title: 'Day-of Show Direction & Shadowing',
        description:
          'On-site event directors and personal assistants dedicated to the bride, groom, and family elders to ensure uninterrupted support from morning till vidaai.',
        deliverables: [
          'Personal shadow assistants for the couple',
          'Strict muhurat adherence & cue management',
          'Catering line supervision & guest dining flow',
        ],
      },
    ],
    whyChooseUs: [
      {
        title: 'Established Gujarat Vendor Network',
        description:
          'Deep relationships with top-tier decorators, caterers, floral suppliers, and audio engineers across Vadodara, Ahmedabad, and Surat ensure quality and reliability.',
      },
      {
        title: 'Dedicated Wedding Director',
        description:
          'A senior planner is assigned directly to your wedding from the very first consultation through the final guest send-off, serving as your single point of contact.',
      },
      {
        title: 'Transparent, Itemized Budgeting',
        description:
          'Clear financial planning with honest vendor quotes and no surprise markups, empowering families to allocate funds where they matter most.',
      },
      {
        title: 'Calm, Stress-Free Execution',
        description:
          'Our discreet on-ground production team anticipates challenges before they arise, handling unexpected timeline shifts so your family remains relaxed.',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Discovery & Vision Session',
        description:
          'We explore your family traditions, cultural nuances, guest headcount, preferred dates, and budget priorities.',
      },
      {
        number: '02',
        title: 'Venue Selection & Date Blocking',
        description:
          'We present curated venues in Vadodara or nearby Gujarat destinations, conduct site visits, and secure booking contracts.',
      },
      {
        number: '03',
        title: 'Concept & Theme Development',
        description:
          'Our designers create customized moodboards, color palettes, stage layouts, and floral design proposals for each function.',
      },
      {
        number: '04',
        title: 'Vendor Contracting & Food Tastings',
        description:
          'We finalize caterers, photographers, entertainment artists, and bridal stylists, coordinating tastings and trial sessions.',
      },
      {
        number: '05',
        title: 'Master Itinerary & Production Blueprints',
        description:
          'We assemble minute-by-minute run-sheets, seating charts, transport rosters, and technical stage specifications.',
      },
      {
        number: '06',
        title: 'Flawless Ceremony Day Execution',
        description:
          'Our full crew manages every vendor, cues music and lighting, directs processions, and ensures families celebrate with peace of mind.',
      },
    ],
    serviceOptionsHeading: 'Signature Wedding Functions We Coordinate',
    serviceOptionsDescription:
      'Every Indian wedding is a rich tapestry of ceremonies. Here is how we customize each milestone.',
    serviceOptions: [
      {
        title: 'The Sacred Pheras & Mandap Ceremony',
        subtitle: 'Devotional Sanctum & Timeless Rituals',
        description:
          'The emotional center of your wedding day. We construct authentic, spiritually resonant mandaps adorned with fragrant flowers, comfortable seating for elders, sacred havankund arrangements, and subtle sound systems for priest chants.',
        highlights: [
          'Vedic priest alignment & ritual item preparation',
          'Baraat procession management with live brass bands & dhol',
          'Varmala stage reveals with cold pyros & flower showers',
          'Dignified, tearful Vidaai logistics & departure coordination',
        ],
      },
      {
        title: 'Sangeet & Cocktail Extravaganza',
        subtitle: 'High-Energy Music, Stage & Lighting',
        description:
          'A night of show-stopping family performances, DJ beats, and celebratory cocktails. We build state-of-the-art concert stages, coordinate family dance rehearsals with choreographers, and program dynamic intelligent lighting.',
        highlights: [
          'Custom LED backdrop screens with personalized motion graphics',
          'Professional sound engineering & acoustic tuning',
          'Choreographer alignment & backstage cueing for performances',
          'Bespoke cocktail bar setups & curated gourmet finger foods',
        ],
      },
      {
        title: 'Haldi & Mehendi Fiesta',
        subtitle: 'Vibrant Colors, Folk Traditions & Interactive Fun',
        description:
          'Playful daytime festivities filled with yellow marigolds, colorful canopy tents, traditional Gujarati garba beats, and artisanal mehendi lounges that keep guests entertained throughout the afternoon.',
        highlights: [
          'Handmade floral jewelry counters & flower bar for guests',
          'Special floral brass urli setup for couple haldi rituals',
          'Live Gujarati street food & live chaat counters',
          'Interactive folk dance troupes & acoustic dhol musicians',
        ],
      },
      {
        title: 'Grand Wedding Reception',
        subtitle: 'Royal Banquets & Formal Celebrations',
        description:
          'An elegant evening welcoming extended guests, dignitaries, and friends. We organize red-carpet arrival foyers, sophisticated photo backdrops, sit-down royal dining experiences, and smooth guest felicitation lines.',
        highlights: [
          'Editorial photo backdrop walls for family portraits',
          'Buffet and sit-down dining flow supervision',
          'Live instrumental string quartets or soft classical ensembles',
          'Guest gift distribution & personalized thank-you favors',
        ],
      },
    ],
    galleryHeading: 'Wedding Visual Inspiration',
    galleryDescription:
      'Glimpses into bespoke wedding stages, mandap styling, and celebratory moments created by AS Event Management.',
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        alt: 'Magnificent garden wedding mandap featuring cascading florals and warm lighting',
        title: 'Royal Garden Wedding',
        category: 'Mandap Décor',
      },
      {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
        alt: 'Forest-themed evening reception dining setup with fairy lights and elegant table styling',
        title: 'Enchanted Forest Reception',
        category: 'Reception Banquets',
      },
      {
        src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
        alt: 'Gourmet wedding dining tablescape with crystal centerpieces and delicate floral arrangements',
        title: 'Luxury Dining Architecture',
        category: 'Hospitality & Dining',
      },
      {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
        alt: 'Warm candlelit wedding celebration table setting with golden accents',
        title: 'Candlelit Celebration',
        category: 'Floral Styling',
      },
    ],
    faqs: [
      {
        question: 'How early should we hire a wedding planner in Vadodara?',
        answer:
          'We recommend engaging our team 6 to 9 months before your planned wedding date. Peak wedding dates in Gujarat see rapid venue and vendor bookings, and early planning secures premier locations, the best pricing, and thoughtful concept development without last-minute rush.',
      },
      {
        question: 'Can you help with venue selection in Vadodara and across Gujarat?',
        answer:
          'Yes. We conduct complete venue scouting across Vadodara, Ahmedabad, Anand, Surat, and surrounding regions. We assess lawn capacities, indoor ballroom acoustics, parking facilities, guest room availability, and negotiate favorable commercial terms on your behalf.',
      },
      {
        question: 'Can you coordinate multiple wedding functions across different venues?',
        answer:
          'Multi-day, multi-venue celebrations are our specialty. We manage logistics across various properties — such as holding the Haldi at a private home, Sangeet at a luxury banquet hall, and Pheras on an expansive open lawn — with dedicated teams at each site.',
      },
      {
        question: 'Do you work with vendors our family has already selected?',
        answer:
          'Absolutely. While we maintain a curated roster of trusted regional partners, we are delighted to collaborate with your chosen family caterer, personal makeup artist, or preferred photographer. We integrate them seamlessly into the master timeline.',
      },
      {
        question: 'Can wedding planning services be customized to our budget?',
        answer:
          'Yes. All of our wedding management services are modular and customized. We tailor our scope to match your specific guest count, number of functions, and level of decor complexity while maintaining complete budget transparency.',
      },
    ],
    relatedServices: [
      {
        slug: 'destination-weddings',
        title: 'Destination Weddings',
        description:
          'Extend your celebration into an unforgettable getaway across palaces, fort resorts, and scenic getaways in India.',
        image:
          'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Getaway Celebrations',
      },
      {
        slug: 'anniversary-events',
        title: 'Anniversary Events',
        description:
          'Honor milestone years of love and partnership with romantic vow renewals and elegant family gatherings.',
        image:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Milestone Love',
      },
      {
        slug: 'corporate-events',
        title: 'Corporate Events',
        description:
          'Plan high-impact conferences, product reveals, and annual galas executed with technical precision.',
        image:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Business Solutions',
      },
    ],
  },

  'destination-weddings': {
    slug: 'destination-weddings',
    canonicalUrl: 'https://www.aseventmanagement.com/services/destination-weddings',
    title: 'Destination Wedding Planner in Gujarat | AS Event Management',
    metaDescription:
      'Plan your dream destination wedding across Gujarat, Rajasthan, and premier Indian destinations with AS Event Management. Comprehensive travel, venue & decor logistics.',
    serviceType: 'Destination Wedding Planning',
    quoteEventType: 'Destination Wedding',
    eyebrow: 'Bespoke Celebrations Across India',
    h1: 'Destination Wedding Planning Across Premier Venues in India',
    heroDescription:
      'Turn your wedding into an unforgettable multi-day celebration. We orchestrate destination weddings across royal heritage palaces, coastal getaways, and scenic luxury resorts with comprehensive travel, guest, and production management.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
      alt: 'Scenic destination wedding venue overlooking tranquil water with bespoke floral arrangements',
    },
    intro: {
      whatIsIt:
        'Our destination wedding planning service is a turnkey travel, hospitality, and event production solution. We take care of destination scouting, room block negotiations, travel logistics, local vendor integration, and multi-day experiential curation so you can host your loved ones with poise.',
      whoIsItFor:
        'Perfect for couples looking to gather close friends and extended family for a 2-to-3-day celebration away from home, NRI families seeking an authentic Indian palace wedding, and hosts desiring an intimate retreat.',
      whyItMatters:
        'Planning a celebration far from home presents unique hurdles: negotiating hotel room block contracts, arranging regional transport fleets, understanding local venue noise curfews, and ensuring remote production quality without budget escalation.',
      ourApproach:
        'AS Event Management bridges local knowledge with rigorous on-ground planning. We conduct thorough site reconnaissance, install a 24/7 hospitality desk for guests, and coordinate with vetted local suppliers to ensure flawless delivery without remote stress.',
    },
    whatWeHandle: [
      {
        icon: 'Compass',
        title: 'Destination Scouting & Venue Selection',
        description:
          'Auditing heritage forts, palace properties, lakefront resorts, and boutique luxury estates across Gujarat, Rajasthan, and Western India to match your style.',
        deliverables: [
          'Detailed venue reconnaissance & capacity audits',
          'Hotel room block negotiations & buyout terms',
          'Outdoor lawn permissions and sound curfew rules',
        ],
      },
      {
        icon: 'Hotel',
        title: 'Guest Hospitality & Room Management',
        description:
          'Managing all out-of-town guest arrangements, from RSVP tracking and room allocations to custom welcome hampers and round-the-clock concierge support.',
        deliverables: [
          'Guest RSVP portals & personalized rooming lists',
          'Curated destination welcome hampers & survival kits',
          'Dedicated on-site hospitality desk throughout the stay',
        ],
      },
      {
        icon: 'Plane',
        title: 'Travel & Fleet Logistics',
        description:
          'Coordinating flight and train arrival rosters, private bus coaches, luxury VIP transfers, and on-demand local shuttles between hotels and ceremony venues.',
        deliverables: [
          'Airport & station pickup logistics with branded signboards',
          'Air-conditioned fleet coordination for guest transfers',
          'Luggage tagging & direct room bell-desk delivery',
        ],
      },
      {
        icon: 'Sparkles',
        title: 'Local Vendor Sourcing & Regional Production',
        description:
          'Partnering with top-tier regional florists, equipment providers, and generators while bringing core creative directors to ensure uncompromised quality.',
        deliverables: [
          'Vetted local supplier curation to optimize budgets',
          'Stage, sound, and lighting infrastructure setup',
          'Redundant power generation & backup electrical rigs',
        ],
      },
      {
        icon: 'Calendar',
        title: 'Multi-Day Thematic Celebrations',
        description:
          'Designing varied experiential celebrations across each day — from sunset cocktail sundowners and vibrant pool parties to royal sangeets and sunrise brunches.',
        deliverables: [
          'Welcome Sundowner & ice-breaking evening',
          'Carnival Mehendi with regional crafts & folk artists',
          'Royal Mandap ceremony & farewell celebratory banquet',
        ],
      },
      {
        icon: 'ShieldCheck',
        title: 'On-Site Management & Contingency Planning',
        description:
          'Stationing our event production crew 48 hours prior to guest arrival to manage weather protections, security coordination, and immediate problem-solving.',
        deliverables: [
          'Weather contingency & waterproof covering setups',
          'Emergency medical & pharmacy coordination on standby',
          'Full-time on-site show callers and logistical directors',
        ],
      },
    ],
    whyChooseUs: [
      {
        title: 'In-Depth Regional Expertise',
        description:
          'Extensive familiarity with heritage palaces, lakeside resorts, and luxury properties across Gujarat and neighbouring Rajasthan states.',
      },
      {
        title: 'Unified Hospitality Concierge',
        description:
          'Our guest relations team ensures your relatives and out-of-town guests feel like royalty from the moment they land until departure.',
      },
      {
        title: 'Honest Vendor Contracting',
        description:
          'We negotiate directly with property managers and regional suppliers, eliminating unnecessary remote markups and protecting your budget.',
      },
      {
        title: 'Complete On-Ground Stationing',
        description:
          'Our technical and creative leads arrive days in advance, overseeing construction, lighting tests, and room drops before your first guest arrives.',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Destination & Vision Match',
        description:
          'We evaluate guest count, preferred travel distance from Gujarat, seasonal weather patterns, and total investment.',
      },
      {
        number: '02',
        title: 'Venue Scouting & Property Audits',
        description:
          'We visit prospective resort properties, audit room standards, inspect lawn drainage, and review catering capabilities.',
      },
      {
        number: '03',
        title: 'Contracting & Group Room Block',
        description:
          'We lock in favorable group rates, meal inclusion packages, function spaces, and check-in/check-out policies.',
      },
      {
        number: '04',
        title: 'Production Design & Logistics Plan',
        description:
          'We adapt decor to local wind and architectural factors, assemble transportation grids, and establish the hospitality schedule.',
      },
      {
        number: '05',
        title: 'RSVP Management & Welcome Packs',
        description:
          'We coordinate guest arrival itineraries, assemble personalized welcome hampers, and brief resort staff on event rules.',
      },
      {
        number: '06',
        title: 'Turnkey On-Site Show Running',
        description:
          'Our production team manages all consecutive events, handling guest movement, vendor cues, and meal services around the clock.',
      },
    ],
    serviceOptionsHeading: 'Destination Wedding Settings We Specialize In',
    serviceOptionsDescription:
      'From royal heritage architecture to peaceful lakefronts, discover the premier destination styles we manage.',
    serviceOptions: [
      {
        title: 'Heritage Palaces & Royal Fort Resorts',
        subtitle: 'Grand Architecture & Aristocratic Elegance',
        description:
          'Celebrate amidst carved stone courtyards, grand archways, and royal courtyards across Gujarat and Rajasthan. We enhance heritage settings with authentic brass lamps, traditional floral chandeliers, and royal procession baraats.',
        highlights: [
          'Royal horse, camel, and vintage car baraat setups',
          'Traditional Rajasthani and Gujarati folk performance troupes',
          'Authentic royal banquet dining with regional delicacies',
          'Courtyard illumination and architectural facade projection mapping',
        ],
      },
      {
        title: 'Lakeside & Riverside Luxury Resorts',
        subtitle: 'Waterfront Romance & Serene Sunsets',
        description:
          'Say your vows with tranquil water as your natural backdrop. We construct floating stages, over-water floral mandaps, and sunset cocktail decks that maximize panoramic natural beauty.',
        highlights: [
          'Floating or water-facing mandap structures with safety engineering',
          'Sunset cocktail sundowners with acoustic live music',
          'Fairy-lit waterfront dining setups under open starry skies',
          'Boat arrival coordination for the couple or procession',
        ],
      },
      {
        title: 'Boutique Farmhouses & Private Villa Buyouts',
        subtitle: 'Intimate Exclusivity for Close Circles',
        description:
          'For intimate destination gatherings of 80 to 200 guests, renting a private luxury estate offers unmatched privacy and warmth. Families can enjoy the freedom of having the entire property dedicated solely to their celebration.',
        highlights: [
          'Complete property privacy with custom house rules',
          'Poolside mehendi and evening barbecue bonfire gatherings',
          'Flexible ceremony timings without hotel ballroom restrictions',
          'Personalized family dining tailored to home-cooked traditions',
        ],
      },
      {
        title: 'Scenic Retreats Within Gujarat',
        subtitle: 'Accessible Luxury Close to Home',
        description:
          'Gujarat offers magnificent destination properties in Vadodara, Kevadia, Sasan Gir, Mount Abu border, and Ahmedabad outskirts, combining destination wonder with easy driving accessibility for elder family members.',
        highlights: [
          'Zero air travel stress for senior family members and children',
          'Seamless local language communication and regional catering',
          'Favorable logistical costs compared to interstate travel',
          'Rich cultural alignment with Gujarati wedding rituals and muhurats',
        ],
      },
    ],
    galleryHeading: 'Destination Wedding Inspiration',
    galleryDescription:
      'A showcase of bespoke destination settings, seaside vows, and open-air multi-day festivities managed by AS Event Management.',
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Scenic destination wedding couple embracing at sunset by the waterfront',
        title: 'Waterfront Sunset Celebration',
        category: 'Destination Weddings',
      },
      {
        src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
        alt: 'Open air luxury resort courtyard styled with floral centerpieces and chandeliers',
        title: 'Resort Courtyard Banquet',
        category: 'Resort Architecture',
      },
      {
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
        alt: 'Coastal destination wedding location with serene water views and romantic decor',
        title: 'Coastal Romance',
        category: 'Scenic Venues',
      },
      {
        src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800',
        alt: 'Twilight destination evening setup with glowing lanterns and fairy lights',
        title: 'Twilight Festivities',
        category: 'Atmospheric Lighting',
      },
    ],
    faqs: [
      {
        question: 'How far in advance should we start planning a destination wedding?',
        answer:
          'We recommend initiating plans 9 to 12 months ahead. Securing full hotel buyouts, preferred wedding dates, and advantageous group flight or room rates requires adequate advance notice, especially during peak winter wedding months.',
      },
      {
        question: 'Can you coordinate guest travel and hotel accommodation end-to-end?',
        answer:
          'Yes. We handle guest RSVP tracking, room block allocations, airport and train station greeting teams, transport fleets, luggage deliveries, and run an on-site hospitality desk throughout the multi-day celebration.',
      },
      {
        question: 'Do you work with local vendors at the destination or bring your team?',
        answer:
          'We leverage a hybrid approach: our core directors, technical leads, and chief stylists travel to the destination to maintain our high production standards, while we source infrastructure, heavy sound, and floral bulk locally to keep costs sensible.',
      },
      {
        question: 'How do you handle unexpected weather contingencies at outdoor destinations?',
        answer:
          'Every outdoor event space we plan includes a pre-approved Plan B. We arrange waterproof clear canopies or secure secondary indoor ballroom access so celebrations transition smoothly without dampening the spirit.',
      },
      {
        question: 'Can we plan a destination wedding within Gujarat?',
        answer:
          'Absolutely. Gujarat is home to spectacular heritage estates, riverside retreats near the Statue of Unity, and palace-style banquets in Vadodara and Ahmedabad that offer a destination experience without the stress of flights.',
      },
    ],
    relatedServices: [
      {
        slug: 'wedding-planning',
        title: 'Wedding Planning',
        description:
          'Comprehensive local wedding management across Vadodara and Gujarat with bespoke decor and day-of flow.',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Classic Celebrations',
      },
      {
        slug: 'corporate-events',
        title: 'Corporate Events',
        description:
          'Conferences, annual meetings, and corporate offsite retreats executed with executive precision.',
        image:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Corporate Solutions',
      },
      {
        slug: 'anniversary-events',
        title: 'Anniversary Events',
        description:
          'Celebrate silver, golden, and ruby wedding anniversaries with meaningful family gatherings.',
        image:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Milestone Celebrations',
      },
    ],
  },

  'corporate-events': {
    slug: 'corporate-events',
    canonicalUrl: 'https://www.aseventmanagement.com/services/corporate-events',
    title: 'Corporate Event Management in Vadodara | AS Event Management',
    metaDescription:
      'Premier corporate event management in Vadodara and Gujarat. Professional conferences, product launches, annual corporate galas, seminars, and corporate hospitality.',
    serviceType: 'Corporate Event Management',
    quoteEventType: 'Corporate Event',
    eyebrow: 'Vadodara & Gujarat Corporate Event Solutions',
    h1: 'Corporate Event Management Delivered with Precision & Impact',
    heroDescription:
      'From high-profile industry summits and annual corporate galas to milestone product launches, we engineer seamless business events that elevate your brand prestige and engage delegates with technical excellence.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
      alt: 'Professional corporate conference hall with audience seated under modern stage lighting',
    },
    intro: {
      whatIsIt:
        'Our corporate event management service provides strategic planning, audio-visual engineering, and on-site show direction for businesses, pharmaceutical companies, industrial leaders, and institutions in Vadodara and across Gujarat.',
      whoIsItFor:
        'Tailored for corporate marketing directors, HR heads, executive boards, and associations hosting annual general meetings, dealer meets, executive summits, product reveals, and festive corporate galas.',
      whyItMatters:
        'A business event directly reflects your corporate reputation. Punctual stage flow, flawless audio-visual fidelity, fast delegate check-in, and premium hospitality communicate competence and brand leadership to stakeholders.',
      ourApproach:
        'AS Event Management approaches business events with meticulous project management discipline. We deploy dual-redundant technical systems, maintain timed run-of-show sheets, coordinate professional staging, and provide transparent corporate billing.',
    },
    whatWeHandle: [
      {
        icon: 'Presentation',
        title: 'Conferences, Summits & Seminars',
        description:
          'End-to-end management for multi-track conventions, including keynote stages, breakout rooms, digital attendee kits, and speaker coordination.',
        deliverables: [
          'Stage backdrops, podium branding & green rooms',
          'Multi-microphone audio balance & acoustic management',
          'Keynote presentation cueing & digital timing clocks',
        ],
      },
      {
        icon: 'Megaphone',
        title: 'Product Launches & Brand Reveals',
        description:
          'Designing high-impact unveilings that captivate media, partners, and customers using intelligent lighting, LED reveals, and dramatic staging.',
        deliverables: [
          'High-resolution LED wall setups & unveiling mechanics',
          'Media briefing zones, press kits & photo backdrops',
          'Experience zones for hands-on product demonstration',
        ],
      },
      {
        icon: 'Trophy',
        title: 'Annual Corporate Galas & Award Nights',
        description:
          'Celebrating company milestones and employee achievements with red-carpet arrivals, custom award presentations, live entertainment, and banquets.',
        deliverables: [
          'Custom trophy fabrication & stage presentation flow',
          'Professional corporate emcees & celebrity artists',
          'Curated sit-down banquets & executive cocktail dinners',
        ],
      },
      {
        icon: 'Monitor',
        title: 'Audio-Visual & Technical Staging',
        description:
          'State-of-the-art technical production including 4K LED displays, digital line-array sound, stage lighting, live webcasting, and teleprompters.',
        deliverables: [
          'Dual-redundant A/V systems to prevent technical drops',
          'Live video switching & multi-camera recording',
          'Uninterrupted generator power & technical crews',
        ],
      },
      {
        icon: 'QrCode',
        title: 'Delegate Registration & QR Check-In',
        description:
          'Fast, organized attendee management with pre-registered QR code scanning, instant badge printing, and real-time attendance reporting.',
        deliverables: [
          'Branded registration counters & queue management',
          'Instant badge printing & lanyard distribution',
          'Post-event attendance analytics and CSV exports',
        ],
      },
      {
        icon: 'Coffee',
        title: 'Executive Catering & Hospitality',
        description:
          'Coordinating breakfast setups, working business lunches, networking tea breaks, and gala dinners tailored to executive dietary standards.',
        deliverables: [
          'Multi-cuisine buffet & live culinary station design',
          'Punctual tea/coffee break transitions between sessions',
          'VIP dignitary lounge service & protocol hospitality',
        ],
      },
    ],
    whyChooseUs: [
      {
        title: 'Corporate Punctuality & Discipline',
        description:
          'We adhere strictly to timed run-sheets, ensuring keynotes, award segments, and meal breaks start and finish precisely on schedule.',
      },
      {
        title: 'Technical Redundancy & Zero Downtime',
        description:
          'Our audio, visual, and power systems incorporate backup routing, ensuring presentations continue without awkward interruptions.',
      },
      {
        title: 'GST-Compliant Transparent Invoicing',
        description:
          'Complete corporate accountability with formal proposals, milestone deliverables, itemized budgets, and GST invoices.',
      },
      {
        title: 'Experienced On-Ground Show Callers',
        description:
          'Our stage managers and technical directors have orchestrated corporate gatherings across Gujarat, keeping proceedings polished.',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Briefing & Goal Alignment',
        description:
          'We define the event purpose, target audience, stage requirements, branding guidelines, and key deliverable milestones.',
      },
      {
        number: '02',
        title: 'Venue Selection & Technical Audit',
        description:
          'We audit banquet acoustics, ceiling rigging limits, three-phase power availability, and delegate parking capacities.',
      },
      {
        number: '03',
        title: 'Stage Renders & Creative Blueprints',
        description:
          'Our designers produce 3D stage layouts, entrance branding, digital screen graphics, and lighting plots for client sign-off.',
      },
      {
        number: '04',
        title: 'Vendor Contracting & Speaker Briefings',
        description:
          'We confirm audio-visual engineers, caterers, emcees, and photographers while coordinating presentation formats with speakers.',
      },
      {
        number: '05',
        title: 'Technical Dry Run & Rehearsals',
        description:
          'A comprehensive technical test checks audio levels, clickers, video playback, award cueing, and stage lighting transitions.',
      },
      {
        number: '06',
        title: 'Precision Event Day Management',
        description:
          'Our backstage crew and show caller execute the schedule smoothly, managing delegate flow, speaker cues, and catering transitions.',
      },
    ],
    serviceOptionsHeading: 'Corporate Event Formats We Specialize In',
    serviceOptionsDescription:
      'Explore the tailored business event solutions we deliver for enterprises and growing companies in Gujarat.',
    serviceOptions: [
      {
        title: 'Conferences & Leadership Summits',
        subtitle: 'Knowledge Sharing & Industry Leadership',
        description:
          'Multi-speaker symposiums requiring crisp sound, legible display graphics, live audience Q&A, and comfortable delegate arrangements. We construct professional stages that keep the spotlight on leadership ideas.',
        highlights: [
          'Curved or flat high-definition LED backdrops for presentations',
          'Catch-box wireless audience microphones for engaging Q&A',
          'Dedicated speaker readiness lounge & green room management',
          'Simultaneous live-streaming for remote branch offices',
        ],
      },
      {
        title: 'Product Launches & Dealer Meets',
        subtitle: 'Excitement, Media Buzz & Commercial Momentum',
        description:
          'Unveiling a new automobile, industrial machine, pharmaceutical line, or consumer brand requires theatrical impact. We engineer reveal curtains, laser sequences, countdown visuals, and interactive product demo booths.',
        highlights: [
          'Motorized drop curtains, cold pyrotechnics & confetti cannons',
          'Interactive demonstration zones with custom display plinths',
          'VIP dealer recognition awards & celebration dinners',
          'Press conference staging with branded media backdrops',
        ],
      },
      {
        title: 'Annual Corporate Galas & Town Halls',
        subtitle: 'Company Culture, Recognition & Entertainment',
        description:
          'Bringing employees and leadership together to review accomplishments and celebrate teamwork. We balance corporate addresses with vibrant entertainment, dance performances, and festive dinners.',
        highlights: [
          'Red-carpet entrance photo zones with branded photobooths',
          'Choreographed employee performance staging & rehearsal support',
          'Dynamic awards presentation with bespoke walk-up sting music',
          'Multi-cuisine dining buffets and festive evening cocktails',
        ],
      },
      {
        title: 'Executive Boardroom & Offsite Retreats',
        subtitle: 'High-Level Strategy & Confidential Discussions',
        description:
          'Intimate, high-stakes leadership meetings at luxury boutique resorts or dedicated conference centers. We provide discreet coordination, premium acoustic privacy, and executive dining.',
        highlights: [
          'Confidential meeting environments with secure technical feeds',
          'Ergonomic boardroom setups with individual delegate audio',
          'Team building activities that foster cross-department synergy',
          'Private fine dining arrangements with customized menus',
        ],
      },
    ],
    galleryHeading: 'Corporate Event Production',
    galleryDescription:
      'Glimpses into our corporate stages, conference halls, and technical audio-visual productions in Vadodara and across Gujarat.',
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
        alt: 'Corporate tech summit with audience seated beneath modern stage lighting and large display',
        title: 'Tech Summit 2024',
        category: 'Conferences',
      },
      {
        src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800',
        alt: 'Auditorium stage with professional lighting and presentation screen',
        title: 'Executive Auditorium Staging',
        category: 'Stage Design',
      },
      {
        src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800',
        alt: 'Keynote business presentation in progress with crisp audio-visual projection',
        title: 'Keynote Speaker Session',
        category: 'Technical Production',
      },
      {
        src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
        alt: 'Corporate expo hall and delegate interaction zone with branded booths',
        title: 'Corporate Exhibition Zone',
        category: 'Brand Experience',
      },
    ],
    faqs: [
      {
        question: 'What types of corporate events do you manage in Vadodara and Gujarat?',
        answer:
          'We manage national conferences, product unveils, annual general meetings (AGMs), employee award nights, dealer conclaves, medical symposiums, and executive leadership retreats across Vadodara, Ahmedabad, Surat, and nearby industrial hubs.',
      },
      {
        question: 'Can you provide complete audio-visual and stage infrastructure?',
        answer:
          'Yes. We supply 4K LED video walls, line-array audio systems, wireless lapel and podium microphones, intelligent stage lighting, confidence monitors, teleprompters, and redundant generator power.',
      },
      {
        question: 'Can you assist with delegate registration and on-site check-in?',
        answer:
          'Yes. We set up fast-track QR code check-in kiosks, thermal badge printing, branded lanyards, and provide real-time digital attendance reporting for corporate recordkeeping.',
      },
      {
        question: 'Do you provide formal corporate billing and GST tax invoices?',
        answer:
          'Yes, AS Event Management operates as a fully compliant business. We provide formal corporate proposals, purchase order alignments, milestone invoicing, and GST-compliant tax invoices.',
      },
      {
        question: 'How do you prevent audio-visual or technical glitches during events?',
        answer:
          'We utilize dual-redundant systems on critical video signals, dedicated sound backup channels, and test all slide presentations during a mandatory technical rehearsal before delegates arrive.',
      },
    ],
    relatedServices: [
      {
        slug: 'wedding-planning',
        title: 'Wedding Planning',
        description:
          'Exquisite multi-day wedding celebrations with bespoke mandap styling, catering, and guest logistics.',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Celebration Services',
      },
      {
        slug: 'birthday-celebrations',
        title: 'Birthday Celebrations',
        description:
          'Milestone birthday celebrations crafted with imaginative themes, entertainment, and customized decor.',
        image:
          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Private Celebrations',
      },
      {
        slug: 'anniversary-events',
        title: 'Anniversary Events',
        description:
          'Silver and golden jubilee celebrations honoring enduring love with refined dining and tributes.',
        image:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Milestone Events',
      },
    ],
  },

  'birthday-celebrations': {
    slug: 'birthday-celebrations',
    canonicalUrl: 'https://www.aseventmanagement.com/services/birthday-celebrations',
    title: 'Birthday Event Planner in Vadodara | AS Event Management',
    metaDescription:
      'Celebrate milestone birthdays in Vadodara with AS Event Management. Custom themes, luxury decor, entertainment, catering coordination, and party management.',
    serviceType: 'Birthday Event Planning',
    quoteEventType: 'Birthday Celebration',
    eyebrow: 'Creative Birthday Celebrations in Vadodara',
    h1: 'Bespoke Birthday Party Planning & Luxury Celebrations',
    heroDescription:
      'Celebrate life’s meaningful milestones in unforgettable style. From whimsical first birthdays to glamorous 18th, 21st, 50th, and golden jubilees, we bring creative concepts to life with sophisticated styling and seamless coordination.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
      alt: 'Festive birthday party atmosphere with colorful balloons and celebratory lighting',
    },
    intro: {
      whatIsIt:
        'Our birthday planning service provides complete design, entertainment curation, gourmet catering alignment, and on-site party management. We transform milestone birthdays into elevated, memorable celebrations tailored to the personality and passions of the honoree.',
      whoIsItFor:
        'Ideal for parents organizing a joyful 1st birthday, young adults celebrating their sweet 16 or 21st milestone, and children arranging a grand 50th, 60th, or 75th celebration for their beloved parents in Vadodara and Gujarat.',
      whyItMatters:
        'Hosting a birthday party often leaves hosts exhausted by managing food refills, wrangling entertainers, coordinating decor setup, and cleaning up. Professional planning ensures the host actually enjoys the party alongside their guests.',
      ourApproach:
        'We blend refined aesthetics with vibrant energy. Avoiding tacky or generic decorations, we craft tailored color palettes, custom backdrops, engaging entertainment, and smooth dining flow for all age groups.',
    },
    whatWeHandle: [
      {
        icon: 'Palette',
        title: 'Bespoke Theme & Visual Styling',
        description:
          'Custom thematic backdrops, organic balloon arches, neon signage, custom character props, and fresh floral touches created specifically for your concept.',
        deliverables: [
          'Personalized 3D backdrop & entrance arch design',
          'Organic balloon installations & ambient uplighting',
          'Thematic table centerpieces & personalized place settings',
        ],
      },
      {
        icon: 'MapPin',
        title: 'Venue Selection & Layout Planning',
        description:
          'Sourcing intimate banquet halls, open lawns, rooftop terraces, private villas, or transforming your home garden into a celebratory paradise.',
        deliverables: [
          'Venue capacity match & date reservation',
          'Activity zones, lounge seating & dining floorplans',
          'Weather shade setups for daytime outdoor celebrations',
        ],
      },
      {
        icon: 'Music',
        title: 'Live Entertainment & Interactive Fun',
        description:
          'Curating age-appropriate entertainers — from professional live DJs, acoustic bands, and interactive illusionists to creative craft stations and games hosts.',
        deliverables: [
          'Professional party emcees & energetic game coordinators',
          'Live DJs with customized music playlists',
          'Photobooths with instant printouts and custom digital frames',
        ],
      },
      {
        icon: 'UtensilsCrossed',
        title: 'Designer Cakes & Gourmet Catering',
        description:
          'Coordinating showstopper multi-tier cakes, customized dessert grazing tables, mocktail bars, and multi-cuisine menus loved by children and adults alike.',
        deliverables: [
          'Bespoke multi-tier fondant cake design & delivery',
          'Themed dessert bar with cupcakes, cakepops & macarons',
          'Live street food counters, chaat stations & kids favorites',
        ],
      },
      {
        icon: 'Camera',
        title: 'Photography & Memory Keepsakes',
        description:
          'Capturing raw emotional reactions, candid laughs, cake cutting moments, and family portraits with professional event photographers.',
        deliverables: [
          'Candid event photojournalism & family portraits',
          'Fast highlight reels for social media sharing',
          'Digital high-resolution albums delivered post-party',
        ],
      },
      {
        icon: 'Gift',
        title: 'Custom Invitations & Return Favors',
        description:
          'Designing digital motion video invitations and sourcing personalized return gifts and bespoke packaging matching the party theme.',
        deliverables: [
          'Animated WhatsApp video invitations & RSVP management',
          'Customized return favor packaging with honoree branding',
          'Thoughtful age-tailored gifts that guests actually appreciate',
        ],
      },
    ],
    whyChooseUs: [
      {
        title: 'Aesthetic Refinement',
        description:
          'We maintain a chic, premium aesthetic across all birthday events, avoiding cheap plastic decor in favor of bespoke craftsmanship.',
      },
      {
        title: 'Cross-Generational Enjoyment',
        description:
          'We thoughtfully balance entertainment for the honoree’s peers with comfortable lounge seating and gourmet food for senior family members.',
      },
      {
        title: 'Stress-Free Host Experience',
        description:
          'Our on-site manager takes care of guest welcomes, cake-cutting cues, food replenishment, and cleanup, allowing you to be a guest at your own party.',
      },
      {
        title: 'Tailored to All Ages',
        description:
          'Whether it is a soft pastel 1st birthday, an energetic teen dance party, or a dignified golden milestone gala, our execution adapts perfectly.',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Theme & Persona Brainstorm',
        description:
          'We learn about the birthday person’s passions, hobbies, favorite colors, guest count, and the desired party vibe.',
      },
      {
        number: '02',
        title: 'Venue & Date Confirmation',
        description:
          'We match your theme with an ideal Vadodara venue — from boutique banquets to lush private lawns — and lock in the date.',
      },
      {
        number: '03',
        title: 'Visual Concept Design',
        description:
          'We prepare custom moodboards, backdrop renders, cake design concepts, and entertainment line-ups for your review.',
      },
      {
        number: '04',
        title: 'Vendor Booking & Menu Tastings',
        description:
          'We secure the cake artisan, caterer, music artists, and photographers, tailoring the food menu to guest dietary preferences.',
      },
      {
        number: '05',
        title: 'On-Site Setup & Staging',
        description:
          'On the day of the event, our team installs decor hours before start time, tests sound systems, and inspects dessert tables.',
      },
      {
        number: '06',
        title: 'Seamless Party Hosting & Flow',
        description:
          'We guide the evening schedule — greeting guests, coordinating the cake reveal, managing entertainment, and distributing favors.',
      },
    ],
    serviceOptionsHeading: 'Milestone Birthdays We Plan',
    serviceOptionsDescription:
      'Every milestone represents a special chapter. Discover how we tailor celebrations for different generations.',
    serviceOptions: [
      {
        title: '1st Birthday Grand Celebrations',
        subtitle: 'Gentle Wonder & Joyful Family Memories',
        description:
          'A milestone for the baby and a celebration of gratitude for parents. We create dreamlike pastel wonderlands, soft play playpen zones, gentle sensory entertainment, and photogenic family portrait corners.',
        highlights: [
          'Safe baby play areas with soft flooring and ball pits',
          'Whimsical themes: Hot Air Balloon, Woodland, Prince/Princess, or Safari',
          'Professional cake smash photography setups',
          'Comfortable seating and kid-friendly menu selections',
        ],
      },
      {
        title: 'Sweet 16, 18th & 21st Milestone Bashes',
        subtitle: 'Vibrant Energy, DJ Music & Trendy Aesthetics',
        description:
          'Step into adulthood with high-energy style. We build festival-style lighting, dynamic DJ booths, neon photo walls, mocktail bars, and modern lounge seating where friends can dance and celebrate.',
        highlights: [
          'Neon signage with custom personalized hashtags',
          'Professional DJ sound and club-style intelligent lighting',
          'Custom non-alcoholic mocktail bars with signature drinks',
          'Instagram-ready editorial photo zones with instant prints',
        ],
      },
      {
        title: '50th, 60th & 75th Golden Milestones',
        subtitle: 'Dignified Celebration of Life & Family Legacy',
        description:
          'Honoring a lifetime of wisdom and devotion with family and longtime friends. We create nostalgic memory corridors, heartfelt family video montages, soulful live music, and elegant banquet dining.',
        highlights: [
          'Nostalgic photo gallery walls charting the honoree’s life journey',
          'Live ghazal singers, retro Bollywood band, or soulful acoustic ensembles',
          'Emotional video retrospectives with family messages from abroad',
          'Comfortable, accessible seating with attentive banquet dining',
        ],
      },
      {
        title: 'Surprise Birthday Celebrations',
        subtitle: 'Discreet Coordination & Genuine Wonder',
        description:
          'Planning a surprise requires tactical secrecy. We coordinate guest arrivals, hidden parking, lighting blackouts, and dramatic entry moments that catch the guest of honor completely by joyful surprise.',
        highlights: [
          'Secret RSVP channels and discreet arrival briefings for guests',
          'Coordinated surprise entry cue with music, lighting, and confetti',
          'Memory book stations where guests leave heartfelt notes',
          'Smooth transition into celebratory drinks, dinner, and dancing',
        ],
      },
    ],
    galleryHeading: 'Birthday Celebration Gallery',
    galleryDescription:
      'A collection of bespoke birthday themes, organic balloon installations, and joyful celebrations coordinated by AS Event Management.',
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
        alt: 'Festive birthday celebration balloons and party lighting setup',
        title: 'Sweet 16 Extravaganza',
        category: 'Teen Milestones',
      },
      {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
        alt: 'Luxury birthday celebration banquet with candlelit table settings and floral decor',
        title: 'Royal Golden Birthday Gala',
        category: 'Adult Milestones',
      },
      {
        src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800',
        alt: 'Chic event lighting and celebratory party ambiance',
        title: 'Evening Birthday Soirée',
        category: 'Thematic Lighting',
      },
      {
        src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',
        alt: 'Live entertainment and energetic party stage setup for celebrations',
        title: 'Live DJ & Party Stage',
        category: 'Entertainment',
      },
    ],
    faqs: [
      {
        question: 'Can you create custom birthday themes for both children and adults?',
        answer:
          'Yes. We design completely personalized themes. For kids, we craft whimsical concepts like fairy gardens or space expeditions. For adults, we produce chic monochromatic galas, retro Gatsby nights, or sophisticated floral brunches.',
      },
      {
        question: 'How far in advance should we book a birthday party planner in Vadodara?',
        answer:
          'We suggest reaching out 3 to 6 weeks before the event. For major weekend dates, custom fabricated backdrops, or popular banquet venues in Vadodara, booking 2 months in advance ensures optimal selection.',
      },
      {
        question: 'Can you help us find a suitable birthday venue in Vadodara?',
        answer:
          'Yes. We have access to top boutique banquet spaces, private open-air lawns, hotel terraces, and farmhouses across Vadodara that suit your expected guest count and budget.',
      },
      {
        question: 'Do you arrange custom designer cakes and dessert tables?',
        answer:
          'Yes. We partner with premier patisseries to deliver multi-tier customized fondant cakes, thematic dessert grazing tables, cupcakes, and personalized treats that match the visual theme.',
      },
      {
        question: 'Can birthday packages be customized based on guest count?',
        answer:
          'All of our services are fully scalable. Whether you are hosting an intimate family dinner for 25 guests or a grand milestone extravaganza for 300+ attendees, we adjust our scope to match your needs.',
      },
    ],
    relatedServices: [
      {
        slug: 'anniversary-events',
        title: 'Anniversary Events',
        description:
          'Celebrate silver, golden, and ruby milestone wedding anniversaries with elegant dining and tributes.',
        image:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Love Milestones',
      },
      {
        slug: 'wedding-planning',
        title: 'Wedding Planning',
        description:
          'Full-scale wedding planning and ceremony coordination across Vadodara and Gujarat.',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Weddings',
      },
      {
        slug: 'corporate-events',
        title: 'Corporate Events',
        description:
          'Professional conferences, business meetings, and annual functions managed with corporate rigor.',
        image:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Corporate',
      },
    ],
  },

  'anniversary-events': {
    slug: 'anniversary-events',
    canonicalUrl: 'https://www.aseventmanagement.com/services/anniversary-events',
    title: 'Anniversary Event Planning in Gujarat | AS Event Management',
    metaDescription:
      'Celebrate milestone anniversaries in Vadodara and Gujarat with AS Event Management. Silver, golden, ruby anniversaries, vow renewals, and romantic banquets.',
    serviceType: 'Anniversary Event Planning',
    quoteEventType: 'Anniversary',
    eyebrow: 'Vadodara & Gujarat Anniversary Planning',
    h1: 'Celebrate Your Journey Together with an Elegant Anniversary Event',
    heroDescription:
      'Honor years of love, partnership, and cherished memories. From intimate romantic dinners and vow renewals to silver (25th) and golden (50th) jubilee celebrations, we craft milestone experiences filled with warmth, elegance, and storytelling.',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
      alt: 'Romantic evening anniversary dinner table with glowing candlelight and white floral centerpieces',
    },
    intro: {
      whatIsIt:
        'Our anniversary event planning service is a personalized celebration of lifelong partnership. We curate romantic venue styling, retrospective multimedia storytelling, vow renewal ceremonies, live acoustic entertainment, and refined multi-course dining.',
      whoIsItFor:
        'Created for couples celebrating milestone anniversaries, devoted adult children planning a surprise celebration for their parents, and multi-generational families gathering to commemorate a legacy of love in Gujarat.',
      whyItMatters:
        'A milestone anniversary is more than an ordinary party — it is an emotional honoring of resilience, shared joys, and family heritage. It requires thoughtful storytelling, comfortable accommodations for elders, and a warm, unhurried atmosphere.',
      ourApproach:
        'AS Event Management approaches anniversary celebrations with deep emotional sensitivity and refined taste. We highlight personal milestones through custom archival displays, nostalgic music, and dignified hospitality that allows couples to relive their best moments.',
    },
    whatWeHandle: [
      {
        icon: 'Sparkles',
        title: 'Romantic & Elegant Venue Styling',
        description:
          'Creating warm, intimate atmospheres with floating candles, fragrant floral architecture, custom table runners, and soft ambient illumination.',
        deliverables: [
          'Candlelit dining setups & floral canopy backdrops',
          'Custom couple monogram lighting & entrance arches',
          'Silver and gold metallic accent integration',
        ],
      },
      {
        icon: 'Heart',
        title: 'Vow Renewal Ceremonies',
        description:
          'Designing meaningful ceremonial setups where couples can exchange heartfelt renewed vows, exchange rings or garlands, and receive family blessings.',
        deliverables: [
          'Ceremonial stage & floral exchange altar design',
          'Soft acoustic instrumental musical accompaniment',
          'Printed commemorative vow booklets & symbolic keepsakes',
        ],
      },
      {
        icon: 'Film',
        title: 'Memory Lane Tributes & Retrospectives',
        description:
          'Curating archival photographs and vintage family videos into stunning physical timeline tunnels and multimedia documentary tribute reels.',
        deliverables: [
          'Interactive photo timeline walls spanning decades',
          'Professionally edited video retrospectives with family audio',
          'Vintage heirloom display tables with original wedding artifacts',
        ],
      },
      {
        icon: 'Music',
        title: 'Live Acoustic & Nostalgic Entertainment',
        description:
          'Booking soulful live singers, classical instrumentalists, ghazal artists, or retro bands playing the couple’s favorite love songs from their era.',
        deliverables: [
          'Live violinists, cellists, or soulful ghazal performers',
          'First dance coordination with custom lighting stings',
          'Curated background music respecting comfortable conversation sound levels',
        ],
      },
      {
        icon: 'UtensilsCrossed',
        title: 'Fine Dining & Banquet Experiences',
        description:
          'Collaborating with premier chefs to assemble multi-course royal feasts, traditional Gujarati banquet menus, and custom anniversary cakes.',
        deliverables: [
          'Custom multi-course plated or royal buffet dining',
          'Bespoke multi-tier anniversary cake cutting ceremony',
          'Signature welcome drinks & dessert grazing stations',
        ],
      },
      {
        icon: 'Users',
        title: 'Multi-Generational Guest Hospitality',
        description:
          'Ensuring every attendee — from grandchildren to elder relatives — enjoys comfortable seating, attentive service, and an inclusive celebration.',
        deliverables: [
          'Ergonomic, elder-friendly lounge seating arrangements',
          'Thoughtful seating floorplans for smooth family mingling',
          'Toast and speech scheduling with clear wireless microphones',
        ],
      },
    ],
    whyChooseUs: [
      {
        title: 'Heartfelt Storytelling',
        description:
          'We weave the couple’s real love story, wedding memories, and family milestones into every visual and audio element of the event.',
      },
      {
        title: 'Elder-Friendly Thoughtfulness',
        description:
          'We prioritize comfortable seating, non-slip flooring, gentle acoustics, and accessible venue flow so senior guests feel cherished.',
      },
      {
        title: 'Surprise Party Expertise',
        description:
          'Children planning surprise celebrations for their parents can rely on our discreet communication and flawless arrival execution.',
      },
      {
        title: 'Elegant, Dignified Aesthetic',
        description:
          'We craft timeless, romantic environments with warm lighting, classic florals, and subtle luxury that never feel loud or overcrowded.',
      },
    ],
    processSteps: [
      {
        number: '01',
        title: 'Story & Milestone Session',
        description:
          'We meet to learn about the couple’s marriage story, key life milestones, family members, favorite music, and celebration scale.',
      },
      {
        number: '02',
        title: 'Venue Matchmaking',
        description:
          'We select an intimate boutique courtyard, luxury banquet, or garden lawn in Vadodara that provides the ideal ambiance.',
      },
      {
        number: '03',
        title: 'Archival Collection & Media Production',
        description:
          'We gather archival wedding photos and family home clips, producing the video retrospective and physical memory wall.',
      },
      {
        number: '04',
        title: 'Decor & Entertainment Curation',
        description:
          'We finalize candlelit floral concepts, book musicians, select the cake design, and curate the banquet menu.',
      },
      {
        number: '05',
        title: 'On-Site Atmosphere Setup',
        description:
          'Our crew transforms the venue with warm lighting, delicate table settings, sound tuning, and photo displays.',
      },
      {
        number: '06',
        title: 'Warm, Unhurried Celebration',
        description:
          'We coordinate guest welcomes, cue tribute videos and toasts, orchestrate the cake cutting, and guide the dining experience.',
      },
    ],
    serviceOptionsHeading: 'Milestone Anniversary Celebrations We Create',
    serviceOptionsDescription:
      'From silver jubilees to golden milestones, celebrate enduring love with tailored elegance.',
    serviceOptions: [
      {
        title: 'Silver Jubilee (25th Anniversary)',
        subtitle: 'Celebrating 25 Years of Partnership & Family',
        description:
          'A vibrant celebration with grown children, lifelong friends, and extended family. We blend modern chic styling with silver accents, energetic music, renewal of vows, and joyful dancing.',
        highlights: [
          'Silver metallic and crystal floral design accents',
          'Vow renewal ceremony and exchange of custom rings',
          'Live band with popular hits from the couple’s wedding decade',
          'Toast and speech segment honoring family and friends',
        ],
      },
      {
        title: 'Golden Jubilee (50th Anniversary)',
        subtitle: 'Honoring Half a Century of Timeless Love',
        description:
          'A rare, majestic milestone honoring a patriarch and matriarch surrounded by multiple generations. We design warm golden decor, commemorative video tributes, and regal banquet hospitality.',
        highlights: [
          'Regal gold and warm ivory floral styling with gentle lighting',
          'Multi-generational photo tributes spanning 50 years',
          'Soulful classical instrumental or vintage ghazal performances',
          'Comfortable plush sofa lounges designed for elderly couples',
        ],
      },
      {
        title: 'Surprise Anniversary Parties by Children',
        subtitle: 'A Gift of Gratitude from Loving Family',
        description:
          'Adult children often want to surprise their parents with an unforgettable celebration. We handle all secret planning, gathering old friends, and timing an emotional grand reveal.',
        highlights: [
          'Secret planning channels to keep the event completely confidential',
          'Compiling surprise video messages from relatives living abroad',
          'Choreographed arrival reveal with music, flowers, and family hugs',
          'Personalized photo guestbook where all guests write memories',
        ],
      },
      {
        title: 'Intimate Romantic Vow Renewals',
        subtitle: 'A Private Celebration for Close Circles',
        description:
          'For couples desiring an intimate evening of 15 to 40 close relatives. We organize private candlelit courtyard dinners, bespoke five-course dining, and romantic violin melodies.',
        highlights: [
          'Private heritage courtyard or garden gazebo buyout',
          'Plated fine dining service with personalized engraved menus',
          'Intimate vow exchange with family blessings and toasts',
          'Bespoke memory album gift prepared for the couple',
        ],
      },
    ],
    galleryHeading: 'Anniversary Celebration Inspiration',
    galleryDescription:
      'A collection of romantic table styling, anniversary galas, and heartfelt milestones crafted by AS Event Management.',
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
        alt: 'Elegant anniversary banquet table with floral centerpieces and ambient warm lighting',
        title: 'Golden Anniversary Gala',
        category: 'Milestone Banquets',
      },
      {
        src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
        alt: 'Romantic table setting with fine china and delicate floral arrangements',
        title: 'Romantic Fine Dining',
        category: 'Dining Architecture',
      },
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
        alt: 'Couple celebration in an illuminated garden setting',
        title: 'Garden Evening Soirée',
        category: 'Evening Celebrations',
      },
      {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
        alt: 'Fairy lit outdoor celebration reception with canopy trees and glowing lights',
        title: 'Fairy-Lit Milestone Celebration',
        category: 'Atmospheric Styling',
      },
    ],
    faqs: [
      {
        question: 'Do you manage both intimate anniversary gatherings and large galas?',
        answer:
          'Yes. We organize intimate celebrations for 20 to 50 close family members as well as grand silver and golden jubilee galas for 250+ guests across Vadodara and Gujarat.',
      },
      {
        question: 'Can you arrange a formal vow renewal ceremony?',
        answer:
          'Yes. We build romantic ceremonial altars, coordinate customized vow booklets, arrange background music, and organize garland or ring exchange rituals with family blessings.',
      },
      {
        question: 'Can you organize a surprise anniversary party for our parents?',
        answer:
          'Yes, surprise anniversary events are one of our specialties. We collaborate discreetly with children and relatives to keep all arrangements secret until the celebratory grand reveal.',
      },
      {
        question: 'How do you incorporate family memories and photos into the event?',
        answer:
          'We construct physical memory lane timelines, display vintage wedding portraits in brass frames, and produce cinematic video retrospectives that highlight the couple’s journey over the decades.',
      },
      {
        question: 'Can you provide live acoustic music or nostalgic singers?',
        answer:
          'Yes. We source live violinists, acoustic guitar duos, ghazal artists, or retro bands playing classic Bollywood or romantic songs from the couple’s wedding era at comfortable sound levels.',
      },
    ],
    relatedServices: [
      {
        slug: 'birthday-celebrations',
        title: 'Birthday Celebrations',
        description:
          'Milestone birthday celebrations crafted with imaginative themes, entertainment, and customized decor.',
        image:
          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Private Celebrations',
      },
      {
        slug: 'wedding-planning',
        title: 'Wedding Planning',
        description:
          'Exquisite multi-day wedding celebrations with bespoke mandap styling, catering, and guest logistics.',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Wedding Services',
      },
      {
        slug: 'destination-weddings',
        title: 'Destination Weddings',
        description:
          'Turn your celebration into an unforgettable getaway across palaces and luxury resorts in India.',
        image:
          'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
        badgeText: 'Getaway Celebrations',
      },
    ],
  },
}
