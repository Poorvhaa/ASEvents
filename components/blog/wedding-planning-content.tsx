'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Workflow,
  Users,
  ShieldCheck,
  CalendarCheck,
  Layers,
  Check,
  AlertCircle,
  ChevronDown,
  Building2,
  HeartHandshake,
  Timer,
  FileText,
  BadgeCheck,
  Coins,
  MapPin,
  Heart,
  Camera,
  Utensils,
  Music,
  Palette,
  Shirt,
  Compass,
  Smile,
  ListChecks,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, weddingPlanningFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('how-to-plan-a-successful-wedding')

const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

interface VisionStep {
  step: string
  title: string
  subtitle: string
  icon: any
  details: string[]
}

const visionSteps: VisionStep[] = [
  {
    step: 'Step 1',
    title: 'Define Your Wedding Vision',
    subtitle: 'Align your ideas before booking vendors or paying deposits',
    icon: Compass,
    details: [
      'Discuss preferred atmosphere: intimate, grand, modern, or traditional',
      'Agree on the lineup of functions: Haldi, Mehndi, Sangeet, Ceremony, Reception',
      'Determine geographic location: local city ballroom, heritage palace, or beach resort',
      'Clarify cultural, spiritual, and family traditions with both sides early',
    ],
  },
  {
    step: 'Step 2',
    title: 'Choose Top 3 Priorities',
    subtitle: 'Anchor your budget around what matters most to you both',
    icon: Heart,
    details: [
      'Select three non-negotiables (e.g., exceptional food, timeless photography, guest comfort)',
      'Use priorities to resolve budget trade-offs quickly and decisively',
      'Curate a focused mood board matching your season, venue, and realistic budget',
      'Treat inspiration images as creative direction rather than an expensive shopping list',
    ],
  },
  {
    step: 'Step 3',
    title: 'Plan the Guest Experience',
    subtitle: 'Ensure hospitality, accessibility, and effortless guest flow',
    icon: Users,
    details: [
      'Provide step-free access, comfortable seating, and shade for elderly relatives',
      'Coordinate dedicated accommodations and welcome transport for out-of-town guests',
      'Plan thoughtful spaces and dining arrangements for families with young children',
      'Build realistic travel and transition buffers between ceremony and banquet spaces',
    ],
  },
]

interface CeremonyItem {
  name: string
  purpose: string
  location: string
  duration: string
  food: string
  roles: string
  color: string
}

const ceremoniesList: CeremonyItem[] = [
  {
    name: 'Haldi',
    purpose: 'Auspicious purification ritual with turmeric, blessings, joyful music, and fun',
    location: 'Home courtyard, poolside terrace, or lawn',
    duration: '2 – 3 hours (morning)',
    food: 'Light traditional brunch, fresh juices, herbal coolers',
    roles: 'Close family members and cousins applying haldi and organizing games',
    color: 'border-amber-400/40 bg-amber-500/5',
  },
  {
    name: 'Mehndi',
    purpose: 'Intricate henna application, celebration, bonding, folk songs, and photography',
    location: 'Home, banquet terrace, or intimate lawn',
    duration: '3 – 4 hours (afternoon or early eve)',
    food: 'Live chaat counters, finger foods, high tea, sweet treats',
    roles: 'Bride, bridesmaids, sisters, and family elders hosting guest henna artists',
    color: 'border-emerald-400/40 bg-emerald-500/5',
  },
  {
    name: 'Sangeet',
    purpose: 'Energetic musical extravaganza, choreographed dances, DJ, and family performances',
    location: 'Grand ballroom, resort amphitheater, or club',
    duration: '4 – 5 hours (evening)',
    food: 'Multi-cuisine dinner stations, specialty cocktails/mocktails, late-night desserts',
    roles: 'Both families collaborating on musical sequences, emcee hosting, and stage tech',
    color: 'border-purple-400/40 bg-purple-500/5',
  },
  {
    name: 'Wedding Ceremony',
    purpose: 'Sacred wedding rituals (Mandap, Varmala, Pheras, Kanyadaan) and spiritual vows',
    location: 'Mandap pavilion, heritage courtyard, or temple hall',
    duration: '2 – 4 hours (based on traditions)',
    food: 'Authentic festive lunch or high tea suited to religious dietary customs',
    roles: 'Couple, parents, priest/officiant, and immediate elders performing sacred rites',
    color: 'border-rose-400/40 bg-rose-500/5',
  },
  {
    name: 'Reception',
    purpose: 'Formal grand celebration, felicitation, wedding portraits, speeches, and dinner',
    location: 'Pillarless luxury ballroom, palace lawn, or glass pavilion',
    duration: '3 – 4 hours (evening)',
    food: 'Elaborate multi-course dinner buffet, live counters, signature dessert salon',
    roles: 'Couple and both families receiving all extended relatives, friends, and colleagues',
    color: 'border-blue-400/40 bg-blue-500/5',
  },
]

interface ChecklistSection {
  title: string
  icon: any
  tasks: { name: string; tip: string }[]
}

const interactiveChecklistData: ChecklistSection[] = [
  {
    title: 'Phase 1: Foundation & Vision (9–12+ Months)',
    icon: Compass,
    tasks: [
      { name: 'Define overall wedding vision and scale with partner and family', tip: 'Discuss atmosphere, guest size, and must-have cultural elements.' },
      { name: 'Establish confirmed financial ceiling and funding contributions', tip: 'Keep promised contributions separate from tentative support.' },
      { name: 'Select top 3 experiential priorities', tip: 'Guides budget allocation between venue, catering, decor, and photography.' },
      { name: 'Draft preliminary guest lists across both families by function', tip: 'Differentiate attendance between Mehndi, Wedding, and Reception.' },
      { name: 'Shortlist and tour venues; inspect usable seating and weather backups', tip: 'Verify sound curfews, catering rules, and load-in access.' },
      { name: 'Lock wedding dates and sign written venue agreement', tip: 'Confirm deposit schedule, cancellation terms, and tax inclusions.' },
    ],
  },
  {
    title: 'Phase 2: Core Vendor Sourcing (6–9 Months)',
    icon: Building2,
    tasks: [
      { name: 'Hire professional wedding planner or coordination team', tip: 'Planners negotiate vendor scope and streamline multi-day logistics.' },
      { name: 'Book marquee wedding photographer and cinematographer', tip: 'Review full wedding galleries, drone coverage, and editing timelines.' },
      { name: 'Contract wedding decorator and production partner', tip: 'Request itemized material lists, 3D renders, and lighting schematics.' },
      { name: 'Confirm catering team and schedule preliminary tastings', tip: 'Plan separate menus for each function with Jain and dietary options.' },
      { name: 'Book entertainment, DJ, sound engineer, and ritual officiant / priest', tip: 'Confirm sound licenses, rider technical gear, and rehearsal dates.' },
    ],
  },
  {
    title: 'Phase 3: Design, Outfits & Hospitality (3–6 Months)',
    icon: Palette,
    tasks: [
      { name: 'Select and order bridal, groom, and family attire for all functions', tip: 'Allow 8 to 12 weeks for custom embroidery, tailoring, and trials.' },
      { name: 'Book hair, makeup, and draping artists with trial sessions', tip: 'Plan realistic getting-ready slots for early morning ceremonies.' },
      { name: 'Finalize invitation design and distribute Save-the-Dates', tip: 'Include itinerary, venue map links, dress codes, and RSVP deadlines.' },
      { name: 'Block hotel room allocations and arrange out-of-town guest transit', tip: 'Designate airport greeting teams and shared shuttle schedules.' },
      { name: 'Design custom floral concepts, stage backdrops, and wayfinding signage', tip: 'Explore repurposing elements across ceremonies to control waste.' },
    ],
  },
  {
    title: 'Phase 4: Finalization & Headcount (1–2 Months)',
    icon: CalendarCheck,
    tasks: [
      { name: 'Track incoming RSVPs and lock final meal guarantees with caterer', tip: 'Avoid paying for unconfirmed guests by updating numbers weekly.' },
      { name: 'Conduct final outfit fittings with footwear and accessories', tip: 'Break in wedding shoes to ensure all-day comfort.' },
      { name: 'Review complete ritual requirements and sacred items with the officiant', tip: 'Prepare pooja samagri checklist and assign family custodians.' },
      { name: 'Draft master day-of timeline with vendor load-in and ceremony buffers', tip: 'Circulate draft schedule to family leaders and key vendors for review.' },
      { name: 'Verify marriage registration legal requirements with local authorities', tip: 'Ensure all documentation, affidavits, and witnesses are prepared.' },
    ],
  },
  {
    title: 'Phase 5: Final Week & Wedding Days',
    icon: ShieldCheck,
    tasks: [
      { name: 'Reconfirm delivery schedules and on-site contacts for all vendors', tip: 'Ensure vendors have the name and phone number of your coordinator.' },
      { name: 'Assemble wedding-day emergency kit', tip: 'Pack safety pins, sewing kit, stain wipes, chargers, hairpins, and meds.' },
      { name: 'Review final payment balances and prepare scheduled disbursements', tip: 'Keep cash or digital authorization ready for contractual balances.' },
      { name: 'Assign single family contact per function to assist the coordinator', tip: 'Shields the couple from routine operational interruptions.' },
      { name: 'Relax, celebrate, and immerse yourselves in the sacred celebration', tip: 'Trust your prepared plan and professional team to manage the details.' },
    ],
  },
]

export function WeddingPlanningContent() {
  const { openModal } = useQuoteModal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})

  const toggleTask = (key: string) => {
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <article className="py-12 bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. Standardized Official Header with Monogram Logo & Single H1 */}
      {article && (
        <ArticleHeader
          post={article}
          badgeLabel="Comprehensive Planning Guide"
          shareTitle="How to Plan a Successful Wedding | AS Event Management"
        />
      )}

      {/* 2. Featured Hero Image (16:10 aspect, clean, no embedded logos) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/60 bg-muted">
          <Image
            src="/images/blog/how-to-plan-a-successful-wedding/hero.jpg"
            alt="Couple consulting with a wedding planner while reviewing wedding design ideas"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3 italic">
          Thoughtful planning and clear coordination transform multi-day wedding celebrations into unforgettable, stress-free family milestones.
        </p>
      </div>

      {/* 3. Core Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed text-base sm:text-lg">
        {/* Quick Answer Summary Box */}
        <section
          aria-labelledby="quick-roadmap-title"
          className="p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase mb-3">
            <Lightbulb className="w-4 h-4" />
            <h2 id="quick-roadmap-title" className="text-base font-bold text-foreground">
              Quick Wedding Planning Roadmap
            </h2>
          </div>
          <p className="text-foreground/90 font-medium leading-relaxed mb-4">
            A successful wedding starts with clear priorities, a realistic budget, an organized guest plan, dependable vendors and a practical timeline.
          </p>
          <ol className="grid sm:grid-cols-3 gap-3 text-sm text-foreground/80 font-medium">
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              <span>Define your wedding vision</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              <span>Set the budget</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              <span>Build the guest list</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
              <span>Choose date and venue</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
              <span>Book key vendors</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">6</span>
              <span>Plan ceremonies and design</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">7</span>
              <span>Finalize food, décor and entertainment</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">8</span>
              <span>Build the wedding-day timeline</span>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">9</span>
              <span>Confirm final-week details</span>
            </li>
          </ol>
        </section>

        {/* Introduction */}
        <section className="space-y-4">
          <p>
            Your wedding should feel like a celebration of your story, not an endless list of exhausting decisions. Yet
            even a relatively intimate celebration can involve several functions, multiple vendors, a substantial guest
            list, and dozens of strict deadlines. This guide explains{' '}
            <strong className="text-foreground">how to plan a wedding</strong> thoughtfully—from the very first family
            conversations to the last guest departure—while keeping the experience deeply personal, beautifully
            organized, and financially realistic.
          </p>
          <p>
            Use this guide as an adaptable <strong className="text-foreground">wedding planning checklist</strong>.
            Gujarati, North Indian, South Indian, interfaith, destination, and contemporary weddings each celebrate with
            unique ceremonies, dietary traditions, and cultural expectations. The goal is to craft a customized plan that
            honors your heritage and serves your family, rather than forcing your wedding into someone else’s rigid
            template. If you are exploring comprehensive support, partnering with a professional{' '}
            <Link href="/services#wedding-planning" className={linkClass}>
              wedding planner
            </Link>{' '}
            provides the logistical expertise, vendor network, and emotional calm needed for an effortless journey.
          </p>
        </section>

        {/* Section 1: Vision, Priorities & Guest Experience */}
        <section aria-labelledby="section-1-title" className="space-y-6">
          <h2 id="section-1-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            1. Start with Your Wedding Vision, Priorities and Guest Experience
          </h2>
          <p>
            Before contacting venues or paying non-refundable deposits, sit down together and agree on what a successful
            wedding truly means to you and your partner. One couple may dream of a vibrant traditional ceremony
            surrounded by hundreds of extended relatives; another may envision a smaller, design-focused destination
            gathering featuring extraordinary culinary artistry and personalized guest details.
          </p>
          <p>
            Have open conversations covering the overarching atmosphere, likely lineup of functions, preferred
            geographies, religious rituals, and the degree of involvement each family desires. A clear conversation now
            prevents conflicting assumptions, last-minute scope changes, and family tension after contracts have already
            been signed.
          </p>

          {/* 3-Step Vision Cards */}
          <div className="grid md:grid-cols-3 gap-6 my-6">
            {visionSteps.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border/70 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                      <Icon className="w-3.5 h-3.5" />
                      {v.step}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{v.subtitle}</p>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      {v.details.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Infographic Image: Vision and priorities */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/wedding-vision-priorities.jpg"
              alt="Build your wedding vision and guest experience planning diagram"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          <p>
            Turn that unified vision into three clear non-negotiable priorities. For example, your top three might be
            convenient step-free access for grandparents, timeless cinematic photography, and an unhurried ceremony
            schedule. When budget choices arise later, these priorities will tell you immediately where to invest and
            where to simplify.
          </p>
          <p>
            Guest hospitality must receive top priority from day one. Consider whether out-of-town guests require airport
            transfers, how elderly relatives will navigate outdoor lawns, what dietary options are required for Jain or
            vegan attendees, and whether transit between venues is seamless. A visually spectacular wedding is only
            successful if your loved ones can arrive, celebrate, dine, and rest in complete comfort.
          </p>
        </section>

        {/* Section 2: Realistic Wedding Budget & Cost Control */}
        <section aria-labelledby="section-2-title" className="space-y-6">
          <h2 id="section-2-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            2. Set a Realistic Wedding Budget and Control Costs
          </h2>
          <p>
            A realistic <strong className="text-foreground">wedding budget</strong> is grounded in funds that the couple
            and contributing families have actually agreed to spend. Keep confirmed financial contributions completely
            distinct from hoped-for support. Establish a firm financial ceiling early, then allocate it across the
            essential categories: venue, catering, guest accommodations, décor, photography, attire, jewelry,
            entertainment, transportation, invitations, ceremony materials, and professional coordination.
          </p>
          <p>
            In Indian weddings, expense distribution varies widely based on guest count, geographic region, and personal
            preferences rather than rigid generic percentages. Review our detailed guide on{' '}
            <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>
              how to create an event budget
            </Link>{' '}
            for practical spreadsheets, category trackers, and expense formulas.
          </p>

          {/* Budget Photography Workspace Visual */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/wedding-budget-cost-control.jpg"
              alt="Wedding planning budget and vendor checklist"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Coins className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-foreground">Essential Rules for Wedding Cost Control</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Demand itemized written quotes:</strong> Ensure proposals include taxes, service charges, power backup, and overtime.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Account for decor labor:</strong> Verify whether styling quotes cover transport, rigging, installation, and late-night teardown.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Maintain a 10%–15% contingency buffer:</strong> Protect your finances against unexpected weather shifts or guest count surges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Conduct weekly budget audits:</strong> Compare contracted numbers against preliminary estimates as RSVPs lock in.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Guest List, Date & Venue */}
        <section aria-labelledby="section-3-title" className="space-y-6">
          <h2 id="section-3-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            3. Create Your Guest List, Select a Date and Choose the Right Venue
          </h2>
          <p>
            Your guest list directly determines your required hall capacity, catering minimums, room blocks, and print
            materials. Draft a master guest list together with both families before signing any venue contract.
            Categorize attendees into immediate family, extended relatives, close friends, professional colleagues, and
            tentative additions.
          </p>
          <p>
            Critically, estimate attendance for each ceremony separately. An intimate Mehndi or Haldi gathering might
            host 80 guests, a high-energy Sangeet 200, and the Wedding Ceremony and Reception 350 to 500 guests. Keeping
            guest responses in a unified master tracking sheet with designated family coordinators ensures seamless RSVP
            management.
          </p>

          {/* Infographic: Guest List, Date & Venue */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/guest-list-venue-selection.jpg"
              alt="Indian wedding guest list, venue and date planning guide"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 my-6">
            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Key Date Selection Factors
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• <strong>Auspicious Timings (Muhurat):</strong> Align dates with cultural or Vedic calendars.</li>
                <li>• <strong>Family Availability:</strong> Confirm key relatives, elders, and travelers can attend.</li>
                <li>• <strong>School & Work Calendars:</strong> Avoid major exam seasons and corporate quarter-ends.</li>
                <li>• <strong>Seasonal Weather:</strong> Account for monsoon risks, summer heat, or winter frost.</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Critical Venue Inspection Criteria
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• <strong>Usable Seating Capacity:</strong> Mandap and stage setups reduce advertised space by 20–30%.</li>
                <li>• <strong>Weather Backups:</strong> Ensure banquet halls or weatherproof marquees exist for outdoor lawns.</li>
                <li>• <strong>Power Backup & AC:</strong> Verify silent generator capacity for intensive lighting and cooling.</li>
                <li>• <strong>Access Policies:</strong> Check vendor setup hours, outside catering rules, and sound curfews.</li>
              </ul>
            </div>
          </div>
          <p>
            If you are evaluating picturesque destination locations across Rajasthan, Goa, Gujarat, or international
            resorts, explore our dedicated{' '}
            <Link href="/services#destination-weddings" className={linkClass}>
              destination wedding planning services
            </Link>{' '}
            for hospitality logistics, room block negotiations, and cross-border vendor management.
          </p>
        </section>

        {/* Section 4: Vendors & Ceremonies */}
        <section aria-labelledby="section-4-title" className="space-y-6">
          <h2 id="section-4-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            4. Choose Trustworthy Wedding Vendors and Plan the Ceremonies
          </h2>
          <p>
            A dependable vendor collective does far more than supply services: they coordinate timing, solve unexpected
            challenges, and protect the atmosphere of your celebration. Prioritize booking high-demand vendors whose
            dates fill 9 to 12 months in advance—especially caterers, photographers, venue decorators, sound technicians,
            and celebrity entertainers.
          </p>
          <p>
            Always request portfolios featuring real weddings of comparable scale. Confirm the exact name of the lead
            supervisor who will be physically present on-site during your wedding, and verify equipment redundancy,
            overtime rates, and cancellation policies before making deposit payments. For guidance on booking timelines,
            read our guide on{' '}
            <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>
              how early to hire an event planner
            </Link>.
          </p>

          {/* Infographic: Vendors & Ceremonies */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/vendors-and-ceremonies.jpg"
              alt="Trusted wedding vendors and ceremony planning guide for haldi, mehndi, sangeet, and reception"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground pt-2">
            Structuring the Multi-Day Wedding Ceremonies
          </h3>
          <p>
            Indian weddings are renowned for rich multi-day rituals. Rather than squeezing sacred customs between vendor
            schedules, design a distinct operational flow for each celebration:
          </p>

          <div className="space-y-4 my-6">
            {ceremoniesList.map((c, i) => (
              <div key={i} className={`p-5 rounded-xl border ${c.color} space-y-2`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {c.name}
                  </h4>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card border border-border/60 text-muted-foreground">
                    {c.duration} • {c.location}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 font-medium">{c.purpose}</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                  <div><strong>Catering Focus:</strong> {c.food}</div>
                  <div><strong>Family & Host Roles:</strong> {c.roles}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4 py-1">
            Note: Legal marriage registration is an essential official process distinct from cultural ceremonies. Confirm
            documentation, affidavits, local registrar office appointments, and witness requirements well in advance.
          </p>
        </section>

        {/* Section 5: Design, Outfits, Food & Entertainment */}
        <section aria-labelledby="section-5-title" className="space-y-6">
          <h2 id="section-5-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            5. Design the Celebration: Outfits, Décor, Food and Entertainment
          </h2>
          <p>
            Once major dates, venues, and anchor vendors are confirmed, dive into the creative design layers that give
            your wedding warmth, elegance, and distinct character.
          </p>

          {/* Infographic: Design, Outfits, Food & Entertainment */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/wedding-design-food-entertainment.jpg"
              alt="Wedding décor, catering and entertainment planning"
              width={1600}
              height={1067}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 my-6">
            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Shirt className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Outfits & Beauty Styling</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• <strong>Function-by-Function Attire:</strong> Balance color coordination across ceremonies with comfort for heavy embroidery.</li>
                <li>• <strong>Tailoring Timelines:</strong> Allow 8–12 weeks for bespoke tailoring, alterations, and jewelry pairing.</li>
                <li>• <strong>Hair & Makeup Trials:</strong> Test looks with your dupatta draping and lighting conditions.</li>
                <li>• <strong>Getting-Ready Schedule:</strong> Allocate 3+ hours for bridal styling before early morning rituals.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Palette className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Décor & Guest Spaces</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• <strong>Comprehensive Space Design:</strong> Design welcome arches, mandap pavilions, photo zones, and dining areas.</li>
                <li>• <strong>Lighting & Atmosphere:</strong> Incorporate warm architectural up-lighting, fairy lights, and pin-spots.</li>
                <li>• <strong>Smart Element Repurposing:</strong> Transition stage florals or lounge furniture between functions to optimize budget.</li>
                <li>• <strong>Signage & Wayfinding:</strong> Provide clear directional signs for restrooms, dining halls, and ritual areas.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Utensils className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Culinary Excellence</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• <strong>Curated Menu Profiles:</strong> Contrast street-food chaat at Mehndi with royal thalis or multi-cuisine reception spreads.</li>
                <li>• <strong>Dietary Accommodations:</strong> Ensure dedicated Jain, vegetarian, and allergen-safe preparation lines.</li>
                <li>• <strong>Hydration & Service Staff:</strong> Maintain continuous water replenishment and adequate servers per table.</li>
                <li>• <strong>Live Food Counters:</strong> Interactive counters entertain guests while serving fresh, hot delicacies.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Music className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Entertainment & Flow</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>• <strong>Sound Restrictions:</strong> Verify outdoor decibel limits and strict 10:00 PM neighborhood curfews.</li>
                <li>• <strong>Sangeet Rehearsals:</strong> Run technical stage rehearsals and sound checks prior to guest arrivals.</li>
                <li>• <strong>Balanced Programming:</strong> Leave generous pauses for family conversation rather than unbroken performances.</li>
                <li>• <strong>Engaging Emcee:</strong> A professional host keeps transitions smooth and audience energy warm.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Checklist & Master Timeline */}
        <section aria-labelledby="section-6-title" className="space-y-6">
          <h2 id="section-6-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            6. Build a Practical Wedding Planning Checklist and Timeline
          </h2>
          <p>
            A <strong className="text-foreground">wedding planning checklist</strong> is only effective when every single
            task has an assigned owner, clear deliverables, and a firm deadline. Maintain one master digital document
            with signed contracts, floor plans, vendor contacts, and payment milestones. Having one single source of truth
            prevents conflicting versions circulating across extended family WhatsApp groups.
          </p>

          {/* Interactive Responsive Checklist */}
          <div className="my-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" />
                Interactive Wedding Checklist
              </h3>
              <span className="text-xs text-muted-foreground">Click items to mark progress</span>
            </div>

            <div className="grid gap-6">
              {interactiveChecklistData.map((sec, sIdx) => {
                const Icon = sec.icon
                return (
                  <div key={sIdx} className="p-5 sm:p-6 rounded-2xl bg-card border border-border/70 space-y-3">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base pb-2 border-b border-border/50">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{sec.title}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {sec.tasks.map((t, tIdx) => {
                        const key = `${sIdx}-${tIdx}`
                        const isDone = completedTasks[key]
                        return (
                          <li
                            key={tIdx}
                            onClick={() => toggleTask(key)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                              isDone ? 'bg-primary/5 text-muted-foreground line-through' : 'hover:bg-muted/50'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isDone ? 'bg-primary border-primary text-slate-950' : 'border-border bg-background'
                            }`}>
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs sm:text-sm">
                              <span className="font-semibold text-foreground block">{t.name}</span>
                              <span className="text-xs text-muted-foreground">{t.tip}</span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Infographic: Checklist & Timeline */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/wedding-checklist-and-timeline.jpg"
              alt="Comprehensive wedding planning checklist and milestone timeline"
              width={1600}
              height={1067}
              className="w-full h-auto object-cover"
            />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground pt-4">
            Building the Master Wedding-Day Timeline
          </h3>
          <p>
            On the wedding day itself, time moves faster than anticipated. Build a master minute-by-minute itinerary
            outlining vendor load-in, room readiness, makeup styling, bridal portraits, baraat arrival, ritual milestones,
            dining service, and teardown. Always incorporate 30- to 45-minute buffer periods between segments to absorb
            traffic delays, extended photo sessions, or spontaneous family moments without derailing the evening.
          </p>
        </section>

        {/* Section 7: Final Checks & When a Planner Can Help */}
        <section aria-labelledby="section-7-title" className="space-y-6">
          <h2 id="section-7-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            7. Final Checks and When a Wedding Planner Can Help
          </h2>
          <p>
            During the final 7 to 10 days before the wedding, shift from planning to execution readiness. Reconfirm all
            bookings in writing, reconcile final guest headcounts with catering and seating, review remaining balances,
            and distribute venue entry passes and parking instructions.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 my-6">
            <div className="flex items-center gap-2 text-primary font-bold">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-foreground">The Essential Wedding Day Emergency Kit</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Keep a dedicated kit in the bridal and groom suites containing safety pins, sewing kit with varied thread,
              double-sided fabric tape, stain remover wipes, spare jewelry fasteners, compact mirror, breath mints, phone
              chargers, power banks, bottled water, pain relievers, band-aids, and blotting paper.
            </p>
          </div>

          {/* Infographic: Final Checks & Planner Help */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg my-8 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-successful-wedding/final-checks-wedding-planner.jpg"
              alt="Final week wedding checks and professional wedding planning service models"
              width={1600}
              height={1067}
              className="w-full h-auto object-cover"
            />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground pt-2">
            Choosing the Right Planning Support Model
          </h3>
          <p>
            While many couples enjoy planning early creative details, professional wedding planning services become
            invaluable when managing multi-day festivities, extensive vendor rosters, large guest counts, or destination
            logistics. Understanding the difference between planning models ensures you select the exact level of support
            needed:
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-6">
            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Full-Service Planning
              </div>
              <h4 className="text-base font-bold text-foreground">Complete End-to-End Execution</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Comprehensive support from initial concept, budget modeling, venue scouting, and custom decor design to
                complete vendor contracting, guest hospitality, and multi-day live on-site management.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Partial Planning
              </div>
              <h4 className="text-base font-bold text-foreground">Targeted Guidance & Sourcing</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Ideal for couples who have booked their venue but require professional guidance navigating technical AV,
                complex catering negotiations, theme styling, and timeline structure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Event Coordination
              </div>
              <h4 className="text-base font-bold text-foreground">Live On-Site Delivery</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Focuses on the final 4 to 6 weeks, auditing existing vendor contracts, assembling the master timeline,
                supervising setup load-in, directing ceremony flow, and troubleshooting day-of emergencies.
              </p>
            </div>
          </div>

          <p>
            For a detailed comparison of roles and responsibilities, explore our guide on{' '}
            <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>
              event planner vs event manager
            </Link>{' '}
            and learn{' '}
            <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>
              how to choose the right event planner for your event
            </Link>.
          </p>
        </section>

        {/* Section 8: Conclusion */}
        <section aria-labelledby="section-8-title" className="space-y-4 pt-4 border-t border-border/60">
          <h2 id="section-8-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            8. Conclusion
          </h2>
          <p>
            A truly successful wedding is never measured by how expensive or extravagant the floral arches were; it is
            defined by how deeply meaningful the celebration felt and how thoroughly cherished your family and guests
            felt throughout the days spent together.
          </p>
          <p>
            By anchoring your plans around a shared vision, setting a disciplined budget with room for unexpected needs,
            selecting dependable vendor partners, and honoring cultural rituals with thoughtful pacing, you liberate
            yourselves from last-minute panic. With deliberate preparation, you can step back, embrace your loved ones,
            and savor every sacred, joyful second of the celebration.
          </p>
        </section>

        {/* FAQ Accordion Section */}
        <section aria-labelledby="faq-section-title" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase">
            <HelpCircle className="w-5 h-5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 id="faq-section-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Frequently Asked Questions About Planning a Wedding
          </h2>
          <div className="space-y-3">
            {weddingPlanningFaqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border/70 bg-card overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors text-base sm:text-lg"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Related Guides Section */}
        <section aria-labelledby="related-guides-title" className="space-y-4 pt-6 border-t border-border/60">
          <h3 id="related-guides-title" className="text-xl font-serif font-bold text-foreground">
            Explore Related Event Planning Resources
          </h3>
          <p className="text-sm text-muted-foreground">
            Continue organizing your celebration with our practical planning guides:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/complete-event-planning-checklist" className={linkClass}>
                Complete Event Planning Checklist
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>
                How Early Should You Hire an Event Planner?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>
                How to Create an Event Budget
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>
                Event Planner vs Event Manager: What&apos;s the Difference?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>
                What Does an Event Planner Do?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>
                How to Choose the Right Event Planner
              </Link>
            </li>
          </ul>
        </section>

        {/* Conversion CTA Block with Strict Contrast Requirements */}
        <section
          aria-labelledby="cta-heading"
          className="p-8 sm:p-10 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl relative overflow-hidden text-center my-12"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Personalized Wedding Consultation
            </div>

            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Planning Your Wedding and Need Professional Support?
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Share your wedding date, location, guest count, functions, priorities and current planning stage with AS Event Management. Our team can help you understand the right planning support for your celebration.
            </p>

            {/* CTA Buttons: Primary (gold/tan bg + dark text) | Secondary (dark navy bg + white text) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 text-sm sm:text-base"
              >
                Plan Your Wedding
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-950 text-white border border-primary font-bold hover:bg-slate-900 transition-all text-sm sm:text-base"
              >
                Contact AS Event Management
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border/60 text-xs sm:text-sm text-muted-foreground">
              <a
                href="tel:+919510324143"
                className="flex items-center gap-2 hover:text-primary transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 95103 24143</span>
              </a>
              <a
                href="mailto:as.eventmanagement2829@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>as.eventmanagement2829@gmail.com</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
