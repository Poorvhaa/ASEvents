'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Share2,
  ChevronRight,
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
  Compass,
  Layers,
  PartyPopper,
  Check,
  AlertCircle,
  ChevronDown,
  Building2,
  HeartHandshake,
  Timer,
  Hourglass,
  FileText,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, bookingTimelineFaqs } from '@/lib/data/blog'

const article = getBlogPostBySlug('how-early-should-you-hire-an-event-planner')

const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

interface TimelineRange {
  eventType: string
  planningRange: string
  recommendedBooking: string
  keyMilestones: string
}

const timelineData: TimelineRange[] = [
  {
    eventType: 'Small Birthday Party',
    planningRange: '1 – 3 months',
    recommendedBooking: '2 months before',
    keyMilestones: 'Theme concept, venue/home setup, catering orders, custom cake, entertainment.',
  },
  {
    eventType: 'Private Celebration & Anniversary',
    planningRange: '2 – 4 months',
    recommendedBooking: '3 months before',
    keyMilestones: 'Boutique venue contract, invitations, custom décor, photography, curated menu.',
  },
  {
    eventType: 'Corporate Event & Seminar',
    planningRange: '3 – 9 months',
    recommendedBooking: '4 – 6 months before',
    keyMilestones: 'Objectives, AV/tech staging, venue booking, catering, speaker & attendee logistics.',
  },
  {
    eventType: 'Wedding Celebration',
    planningRange: '9 – 18 months',
    recommendedBooking: '12 – 14 months before',
    keyMilestones: 'Budget blueprint, prime venue, major vendors, styling, invitations, run-of-show.',
  },
  {
    eventType: 'Large Conference & Summit',
    planningRange: '6 – 12+ months',
    recommendedBooking: '9 – 12 months before',
    keyMilestones: 'Multi-room venue, production contracts, ticketing, sponsors, hotel blocks, catering.',
  },
  {
    eventType: 'Destination Wedding / Event',
    planningRange: '12 – 18+ months',
    recommendedBooking: '14 – 16 months before',
    keyMilestones: 'Destination scouting, resort buyout, guest travel/visas, multi-day itinerary, local vendors.',
  },
  {
    eventType: 'Large Cultural Festival & Gala',
    planningRange: '9 – 18+ months',
    recommendedBooking: '12 months before',
    keyMilestones: 'Permits, high-capacity venue, headline artists, security, stagecraft, public promotions.',
  },
]

const idealTimelineStages = [
  {
    period: '12 – 18 Months Before',
    tag: 'Foundation & Concept',
    description:
      'Define event purpose, establish initial budget boundaries, estimate total guest count, choose target date, research venues, hire your professional event planner, and build the overarching creative concept.',
    actions: [
      'Define celebration goals and must-have guest experiences',
      'Establish a realistic financial blueprint and contingency reserve',
      'Select and contract your professional event planner',
      'Tour prospective venues and evaluate capacity, curfew, and catering policies',
    ],
  },
  {
    period: '9 – 12 Months Before',
    tag: 'Core Anchors',
    description:
      'Confirm the venue, book high-demand primary vendors (photographers, cinematographers, lead entertainment), initiate catering design, and formalize the master multi-month planning calendar.',
    actions: [
      'Execute venue contract and secure calendar dates',
      'Lock in key creative vendors who only take one event per date',
      'Develop floral, lighting, and décor aesthetic mood boards',
      'Begin destination travel and lodging block coordination if applicable',
    ],
  },
  {
    period: '6 – 9 Months Before',
    tag: 'Production & Communications',
    description:
      'Review technical AV and lighting requirements, create guest communication channels and save-the-dates, finalize spatial floor plans, and review expenditures against original budget benchmarks.',
    actions: [
      'Send save-the-dates for weddings, galas, and destination celebrations',
      'Finalize audio-visual specs, sound engineering, and staging blueprints',
      'Review structural floor plans and guest movement pathways',
      'Audit vendor milestones and track intermediate payments',
    ],
  },
  {
    period: '3 – 6 Months Before',
    tag: 'Details & Guest Logistics',
    description:
      'Issue formal invitations, conduct menu tastings, coordinate guest transportation and rooming allocations, review on-site event staff requirements, and draft the preliminary event-day run-of-show.',
    actions: [
      'Mail formal invitations with clear RSVP deadlines',
      'Conduct comprehensive catering tastings and approve final menus',
      'Draft preliminary minute-by-minute run-of-show and cue sheets',
      'Confirm specialty rental pieces, custom linens, and print stationery',
    ],
  },
  {
    period: '1 – 3 Months Before',
    tag: 'Confirmations & Walkthroughs',
    description:
      'Reconcile RSVPs, finalize seating charts, conduct a detailed physical venue walkthrough with key leads, confirm delivery schedules, and synchronize all vendor arrival windows.',
    actions: [
      'Audit final guest attendance counts and generate table layouts',
      'Perform detailed venue walkthrough with planner, decorator, and AV lead',
      'Distribute detailed load-in and load-out schedules to all vendor teams',
      'Finalize song selections, ceremonial cues, and speaker speaking slots',
    ],
  },
  {
    period: 'Final Weeks',
    tag: 'Rehearsals & Readiness',
    description:
      'Conduct final vendor confirmations, review emergency backup protocols, coordinate ceremony or technical rehearsals, verify deliveries, and assemble event command materials.',
    actions: [
      'Confirm final headcounts with caterer and venue operations',
      'Review weather backup plans and equipment contingencies',
      'Conduct rehearsal with core participants and family/VIP leads',
      'Distribute the final run-of-show contact sheet to all stakeholders',
    ],
  },
  {
    period: 'Event Day',
    tag: 'Live Execution',
    description:
      'Orchestrate venue load-in, manage vendor setup, direct event staff, maintain schedule fidelity, direct guest flow, handle real-time troubleshooting, and supervise safe strike and breakdown.',
    actions: [
      'Establish central on-site command center and oversee vendor arrivals',
      'Perform sound checks, lighting cues, and temperature/ambiance audits',
      'Guide guests seamlessly through arrival, program moments, and dining',
      'Manage breakdown, rental returns, and post-event venue handover',
    ],
  },
]

const bookingChecklistItems = [
  'Event type (wedding, conference, birthday, gala, private party)',
  'Preferred event date or 2–3 acceptable date windows',
  'Location or preferred geographic area / city',
  'Estimated guest count (minimum and maximum range)',
  'Target budget and priority expenditure categories',
  'Core event goals and desired emotional tone or atmosphere',
  'Aesthetic theme, color palette, or visual preferences',
  'Venue status (not started, shortlisted, or already contracted)',
  'Key vendors already contracted (if any)',
  'Remaining vendor disciplines still needed',
  'Catering and culinary preferences (seated, buffet, stations, dietary)',
  'Entertainment, artist, or speaker requirements',
  'Audio-visual, stagecraft, and lighting complexity',
  'Guest travel, accommodation, or shuttle logistics',
  'Special decor, floral styling, or structural installations',
  'Desired level of planner involvement (full, partial, or coordination)',
]

export function BookingTimelineContent() {
  const { openModal } = useQuoteModal()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: 'How Early Should You Hire an Event Planner? Booking Timeline Guide',
          url: window.location.href,
        })
        .catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Article link copied to clipboard!')
    }
  }

  return (
    <article className="pt-28 pb-20 bg-background text-foreground">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 lg:px-8 max-w-4xl mb-6">
        <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight size={14} className="text-muted-foreground/60" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight size={14} className="text-muted-foreground/60" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              How Early Should You Hire an Event Planner?
            </span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-4 lg:px-8 max-w-4xl mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
            Planning Tips
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Booking &amp; Timeline Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
          How Early Should You Hire an Event Planner?
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
          A practical guide to event planner booking, recommended planning timelines, lead times for
          weddings and corporate events, and how early professional involvement protects your budget
          and peace of mind.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/60 text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                AS
              </div>
              <span className="font-medium text-foreground">Apurv Shah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-primary" />
              <span>{article?.date || 'October 16, 2026'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-primary" />
              <span>11 min read</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 bg-card"
          >
            <Share2 size={14} />
            Share Article
          </button>
        </div>
      </header>

      {/* Featured / Hero Visual */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-12">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40 bg-muted">
          <Image
            src="/images/blog/how-early-should-you-hire-an-event-planner/hero.jpg"
            alt="How early should you hire an event planner booking timeline and planning concept"
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3 italic">
          Master event planning booking roadmap: mapping venue lead times, vendor coordination, and
          milestone timelines.
        </p>
      </div>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Quick Answer Box */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary shadow-sm mb-10">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
            <Lightbulb size={16} />
            <span>Quick Answer</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2">
            When Should You Hire an Event Planner?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            As a general rule, you should hire an event planner as soon as you have an approximate
            date and budget—typically <strong>9 to 18 months</strong> before weddings and destination
            celebrations, <strong>3 to 9 months</strong> before corporate events and conferences, and{' '}
            <strong>1 to 4 months</strong> before private parties. Booking early secures premier
            venues, avoids expensive rush surcharges, secures first-choice creative vendors, and
            ensures your entire event is engineered cohesively within your financial framework from day
            one.
          </p>
        </div>

        {/* Section 1: The Booking Dilemma */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              01
            </span>
            How Early Should You Hire an Event Planner?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
            Planning a milestone event is an exhilarating experience, but it can quickly transition
            from an inspiring dream into a complex logistical labyrinth. Between securing a venue,
            managing guest lists, negotiating vendor contracts, formulating a realistic budget,
            arranging sound and lighting production, designing floral décor, and ensuring every single
            moving part synchronizes on event day, the workload can become overwhelming.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
            This is why one of the most common questions hosts ask is: <em>when should I hire an event
            planner?</em>
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
            There is no universal deadline. The ideal event planner booking window depends on the
            event type, number of guests, destination logistics, budget scale, level of custom
            fabrication, number of third-party vendors, and how much operational responsibility you
            wish to retain yourself. A boutique 40-person birthday dinner may be effortlessly
            organized within a few weeks, while a multi-day luxury wedding, corporate summit, or
            festival requires many months of disciplined architectural planning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-card border border-border mb-6">
            {[
              {
                title: 'Event Scale & Guests',
                desc: 'Larger guest counts demand earlier venue buyouts and complex hospitality logistics.',
              },
              {
                title: 'Date Desirability',
                desc: 'Peak wedding weekends and festive dates book 12 to 18 months in advance.',
              },
              {
                title: 'Custom Production',
                desc: 'Bespoke staging, floral installations, and customized branding require longer lead times.',
              },
              {
                title: 'Vendor Availability',
                desc: 'Top photographers, master caterers, and renowned artists take only one booking per date.',
              },
              {
                title: 'Destination Factors',
                desc: 'Guest travel arrangements, hotel room blocks, and local permits require early alignment.',
              },
              {
                title: 'Personal Delegation',
                desc: 'Whether you want full-service guidance from day one or support only with final execution.',
              },
            ].map((factor, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-background border border-border/60">
                <h3 className="font-semibold text-foreground text-sm mb-1">{factor.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{factor.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            The timing of your booking directly dictates the caliber of choices available to you.
            Starting early provides the leverage to thoroughly compare venues, negotiate transparent
            contracts, develop a coherent design aesthetic, build a stress-free schedule, and prepare
            resilient backup plans. While waiting until the final months does not guarantee failure, it
            undeniably compresses decisions and multiplies stress.
          </p>
        </section>

        {/* Section 2: Why Early Involvement Is Key */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              02
            </span>
            Why Early Involvement Is Key
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Event planning is a deeply interconnected system rather than a random collection of
            isolated tasks. Every downstream decision is anchored to an upstream decision. Your venue
            determines your maximum guest capacity, catering kitchen access, floor plan boundaries,
            sound limits, lighting possibilities, parking flow, and baseline expenditure. If you book
            a venue before hiring a planner, you may discover restrictive policies that undermine your
            original vision.
          </p>

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg border border-border/40 mb-6 bg-muted">
            <Image
              src="/images/blog/how-early-should-you-hire-an-event-planner/early-planning-benefits.jpg"
              alt="Why early involvement is key in event planning and coordination"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Bringing a professional planner in during the formative stages creates room to anticipate
            and neutralize bottlenecks before they become costly mistakes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: 'Preferred Vendor & Venue Access',
                icon: Building2,
                desc: 'Premier venues, celebrated photographers, top-tier caterers, and renowned entertainers maintain limited calendars and routinely book 9 to 18 months in advance.',
              },
              {
                title: 'Budget Optimization & Cost Control',
                icon: ShieldCheck,
                desc: 'Early planning prevents rush delivery surcharges, allows multi-vendor bidding, and ensures expenditures are prioritized around your highest-impact memories.',
              },
              {
                title: 'Unified Aesthetic & Experience',
                icon: Compass,
                desc: 'Venue architecture, floral design, tablescapes, lighting schemes, culinary presentation, and music can be engineered together into a seamless visual identity.',
              },
              {
                title: 'Stress Elimination & Phased Decisions',
                icon: CalendarCheck,
                desc: 'Instead of cramming fifty urgent decisions into the final three weeks, milestones are distributed comfortably across months, preserving the joy of hosting.',
              },
              {
                title: 'Contingency & Risk Architecture',
                icon: Workflow,
                desc: 'Robust backup options for seasonal weather disruptions, AV system failures, transportation delays, or vendor cancellations can be drafted without haste.',
              },
              {
                title: 'Contract Negotiation Leverage',
                icon: FileText,
                desc: 'A seasoned planner evaluates hidden attrition clauses, corkage charges, overtime fees, and load-in penalties before you sign binding agreements.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-semibold text-foreground text-base">{pillar.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              )
            })}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            To explore how planning differs from event-day operations, review our comprehensive breakdown on{' '}
            <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>
              Event Planner vs Event Manager: What&apos;s the Difference?
            </Link>
            .
          </p>
        </section>

        {/* Section 3: Determining Your Needs */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              03
            </span>
            Determining Your Needs: When Should I Book an Event Planner?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The precise answer to <em>when should I book an event planner</em> hinges on the exact
            scope of responsibilities you intend to delegate. If you desire guidance through the entire
            lifecycle—sculpting the concept, managing the budget, scouting venues, hiring vendors, and
            curating design—involving a planner from the outset is invaluable.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Conversely, if you have already contracted the venue, chosen the caterer, and booked the
            photographer, you may not require full-scale planning. A partial planning package or
            dedicated event management service may be the ideal fit.
          </p>

          <div className="p-6 rounded-2xl bg-muted/40 border border-border mb-6">
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <BadgeCheck size={18} className="text-primary" />
              Pre-Booking Self-Assessment
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Before reaching out to planners, evaluate where your event stands today:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Estimated attendance and guest demographics</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Total comfortable budget range</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Venue contracting status</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Vendors booked vs. vendors needed</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Audio-visual, lighting, and production complexity</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Desired personal workload on the event day</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Weddings */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              04
            </span>
            When to Hire an Event Planner for a Wedding
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Weddings represent some of the most emotionally significant and detail-dense celebrations
            a host will ever organize. Multiple ceremonies, custom wardrobe changes, elaborate floral
            mandaps or arches, bespoke stationery, luxury catering, musical choreography, and intricate
            family dynamics must all converge flawlessly on a single date.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            For most couples, beginning the planning conversation <strong>9 to 18 months</strong> prior
            to the wedding date provides the necessary breathing room. For multi-day luxury weddings,
            destination celebrations in locations like Udaipur, Goa, or Jaipur, or events planned during
            peak wedding seasons (November through February), booking <strong>12 to 18+ months</strong>{' '}
            in advance is strongly recommended.
          </p>

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg border border-border/40 mb-6 bg-muted">
            <Image
              src="/images/blog/how-early-should-you-hire-an-event-planner/wedding-planning-timeline.jpg"
              alt="Wedding planner booking timeline from 12 to 18 months before event day"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border mb-6">
            <h3 className="font-semibold text-foreground text-base mb-3">
              How Early Wedding Planning Protects Your Experience:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Prevents booking a venue before knowing guest count and budget</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Secures premier photographers and makeup artists with limited calendars</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Allows ample time for custom decor rendering, fabric sourcing, and tasting sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Structures wedding payments across 12 months rather than sudden lump sums</span>
              </li>
            </ul>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            Planning a multi-day celebration? Discover how our team organizes every stage from concept
            to closeout in our{' '}
            <Link href="/blog/complete-event-planning-checklist" className={linkClass}>
              Complete Event Planning Checklist: From the First Idea to Event Day
            </Link>
            .
          </p>
        </section>

        {/* Section 5: Corporate Events */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              05
            </span>
            When to Hire a Corporate Event Planner
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Corporate events require a distinct approach because the gathering must deliver on strict
            business objectives, reinforce brand reputation, and ensure high return on investment (ROI).
            Whether you are organizing an annual industry summit, executive retreat, product launch,
            gala dinner, or international conference, the stakes are exceptionally high.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Corporate events involve complex staging, keynote speaker management, technical AV
            streaming, ticketing, sponsor exhibits, branded environments, simultaneous translation,
            executive VIP security, and multi-track agendas. A corporate event planner integrates these
            demanding components into one synchronistic timeline.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-wider text-primary font-bold block mb-1">
                Standard Corporate Gatherings
              </span>
              <h3 className="font-semibold text-foreground text-base mb-2">3 – 9 Months Ahead</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ideal for internal sales kickoffs, milestone anniversary galas, regional award ceremonies,
                and executive seminars with up to 250 attendees.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-wider text-primary font-bold block mb-1">
                Large Conventions &amp; Expos
              </span>
              <h3 className="font-semibold text-foreground text-base mb-2">6 – 12+ Months Ahead</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Necessary for multi-day conventions, international dealer meets, exhibitions, and
                conferences requiring convention center buyouts, hotel room blocks, and complex AV rigging.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Birthdays & Private Events */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              06
            </span>
            When to Hire a Planner for a Birthday or Private Event
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Not every celebration demands a year of lead time. Milestone birthdays (such as 18th, 30th,
            50th, or 75th celebrations), anniversaries, private dinners, engagement parties, and
            cocktail soirées often operate on shorter planning runways. The complexity of the concept
            should dictate your timeline rather than the event title alone.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            An intimate dinner party for 30 guests at a private estate can be flawlessly arranged within
            <strong> 4 to 6 weeks</strong>. However, a luxury 200-guest themed birthday involving a
            rented ballroom, celebrity DJ, custom immersive décor, professional mixology stations, and
            cinematography will require <strong>2 to 4 months</strong> of coordination.
          </p>

          <div className="p-5 rounded-2xl bg-muted/30 border border-border">
            <h3 className="font-semibold text-foreground text-base mb-2">
              Private Event Checklist Managed by AS Events:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
              <span>• Creative theme styling</span>
              <span>• Venue sourcing</span>
              <span>• Curated gourmet menus</span>
              <span>• Lighting &amp; Sound</span>
              <span>• Custom cake &amp; desserts</span>
              <span>• Artists &amp; DJs</span>
              <span>• Digital invitations &amp; RSVP</span>
              <span>• Event-day supervision</span>
            </div>
          </div>
        </section>

        {/* Section 7: Different Event Planning Services */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              07
            </span>
            Understanding Different Event Planning Services
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Every host approaches an event with unique availability, organizational skills, and
            delegation goals. Professional event companies structure services into distinct tiers so
            you only pay for the exact level of support you need. Understanding these service tiers
            clarifies exactly how early you need to book:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: 'Full-Service Planning',
                tag: 'Booking: 9 – 18 Months Ahead',
                desc: 'End-to-end guidance from initial concept, budget creation, and venue sourcing to vendor contracting, full styling, and live management.',
              },
              {
                title: 'Partial Planning',
                tag: 'Booking: 3 – 6 Months Ahead',
                desc: 'Designed for hosts who have locked in their venue and initial vendors, but need expert assistance with design, missing vendor gaps, and logistics.',
              },
              {
                title: 'Event Management',
                tag: 'Booking: 2 – 4 Months Ahead',
                desc: 'Focuses heavily on operational execution, schedule synchronization, staff briefing, and live oversight of pre-contracted vendors.',
              },
              {
                title: 'Event-Day Coordination',
                tag: 'Booking: 1 – 3 Months Ahead',
                desc: 'Takes over 4–6 weeks prior to the event to audit timelines, confirm vendor load-ins, run rehearsals, and oversee live execution so the host can celebrate.',
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-colors"
              >
                <span className="text-xs font-semibold text-primary block mb-1">{tier.tag}</span>
                <h3 className="font-semibold text-foreground text-base mb-2">{tier.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            Compare our service tiers and inclusions on our dedicated{' '}
            <Link href="/services" className={linkClass}>
              Event Services
            </Link>{' '}
            and{' '}
            <Link href="/packages" className={linkClass}>
              Event Packages
            </Link>{' '}
            pages.
          </p>
        </section>

        {/* Section 8: Full-Service Event Planning */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              08
            </span>
            Full-Service Event Planning
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Full-service event planning delivers total peace of mind from day one. A dedicated planner
            serves as your trusted advisor, financial steward, creative director, and operational
            general. Services include budget development, venue scouting, vendor contract negotiations,
            theme rendering, floor plans, stationery curation, guest RSVP management, run-of-show
            scheduling, and seamless on-site execution.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Because a full-service planner guides every formative decision, booking <strong>12 months
            or more in advance</strong> is ideal. This generous timeline allows your planner to build
            your celebration systematically, pit competing proposals against each other to capture best
            pricing, and craft bespoke elements without the pressure of looming deadlines.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            This approach is indispensable for high-profile weddings, multi-day corporate conferences,
            destination celebrations, and large-scale public galas.
          </p>
        </section>

        {/* Section 9: Partial Planning & Event Management (FIXED & EXPANDED) */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              09
            </span>
            Partial Planning and Event Management Services
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Not every host starts from a blank canvas. Many clients take the initial initiative to book
            their dream venue, choose a trusted family caterer, or select a favorite photographer, but
            quickly realize that connecting all the remaining dots is a full-time job. This is where
            partial planning and event management provide tailored, high-value intervention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground text-base mb-2 flex items-center gap-2">
                <Workflow size={18} className="text-primary" />
                Partial Planning Services
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Partial planning bridges the gap between independent planning and full-service support.
                You retain creative control over the decisions you enjoy, while delegating complex,
                time-consuming tasks:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• Sourcing and negotiating missing vendor disciplines (AV, decor, artists)</li>
                <li>• Refining and harmonizing design palettes with venue realities</li>
                <li>• Reviewing signed vendor contracts for logistical gaps or timing traps</li>
                <li>• Creating the master production schedule and floor plans</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground text-base mb-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                Event Management Services
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Event management focuses primarily on technical coordination and live operational
                execution. It assumes the major contracts are signed and steps in 4 to 8 weeks before:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• Conducting thorough on-site technical walkthroughs with vendors</li>
                <li>• Constructing the minute-by-minute event-day run-of-show</li>
                <li>• Managing load-in logistics, vendor access, and parking flow</li>
                <li>• Serving as the single point of contact on event day for all staff</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            By booking partial planning or event management <strong>3 to 6 months</strong> prior to
            your celebration, you safeguard all the time and capital already invested, ensuring your hard
            work culminates in a flawless experience.
          </p>
        </section>

        {/* Section 10: Event Day Coordination */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              10
            </span>
            Event Day Coordination
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Often colloquially called &quot;day-of coordination,&quot; this service is designed for
            clients who have thoroughly enjoyed planning their own event but recognize that hosting and
            managing are mutually exclusive. On your event day, you should be sipping champagne, greeting
            guests, or networking with executives—not fielding calls from delivery drivers lost in
            traffic or troubleshooting a blown microphone fuse.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Professional coordination begins approximately <strong>4 to 6 weeks before the event</strong>.
            The coordinator reviews all vendor agreements, audits load-in schedules, verifies power and
            sound requirements, and conducts a venue walkthrough. On event day, they serve as central
            command—supervising setup, enforcing timeline cues, directing staff, and silently resolving
            hiccups behind the scenes.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            We recommend booking your coordinator <strong>2 to 4 months in advance</strong> to ensure
            their date availability, even though their hands-on work begins closer to event day.
          </p>
        </section>

        {/* Section 11: Too Late Risks */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              11
            </span>
            What Happens If You Hire an Event Planner Too Late?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Hiring a professional late in the timeline does not mean your event will collapse—seasoned
            event directors can perform remarkable turnarounds. However, delayed booking limits your
            strategic options and introduces avoidable friction:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              {
                title: 'Restricted Venue Availability',
                desc: 'Your first-choice luxury ballroom or garden lawn is frequently booked 12+ months out.',
              },
              {
                title: 'Limited Creative Vendors',
                desc: 'Acclaimed photographers, cinematographers, and entertainers cannot duplicate their time.',
              },
              {
                title: 'Premature Budget Exhaustion',
                desc: 'Without early planner guidance, budgets are frequently overspent on the venue and catering.',
              },
              {
                title: 'Rush Surcharges',
                desc: 'Express fabrication fees for custom stage backdrops, printing, and rentals add substantial cost.',
              },
              {
                title: 'Severe Decision Compression',
                desc: 'Dozens of critical decisions get crammed into 2–3 stressful weeks, causing host fatigue.',
              },
              {
                title: 'Truncated Contingency Windows',
                desc: 'Less time remains to negotiate alternative outdoor rain setups or backup equipment.',
              },
            ].map((risk, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <h3 className="font-semibold text-foreground text-sm mb-1 flex items-center gap-1.5">
                  <AlertCircle size={15} className="text-destructive shrink-0" />
                  {risk.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{risk.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            Booking early allows you to act proactively rather than reactively, preserving budget
            efficiency and mental calm throughout the journey.
          </p>
        </section>

        {/* Section 12: Last-Minute Planning */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              12
            </span>
            Can You Hire an Event Planner at the Last Minute?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            <strong>Yes.</strong> Last-minute event planning is entirely possible. Whether you have
            suddenly been tasked with organizing a company conference on short notice, or you are four
            weeks from your wedding and realize that self-coordinating is impossible, an experienced
            planner can step in to stabilize the event.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            When brought in late, an event professional conducts immediate triage: auditing contracted
            vendors, standardizing the run-of-show, identifying critical operational oversights,
            establishing single-point communication, and taking over event-day load-in.
          </p>
          <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 text-foreground mb-4">
            <p className="text-sm font-medium leading-relaxed">
              <strong>AS Events Rapid Response:</strong> Even with only 2 to 4 weeks remaining,
              professional coordination can transform a chaotic setup into a polished, punctual
              celebration. Transparency regarding completed items and remaining gaps is key.
            </p>
          </div>
        </section>

        {/* Section 13: An Ideal Event Planning Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              13
            </span>
            An Ideal Event Planning Timeline
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            While every celebration should be calibrated to its unique size and complexity, the
            following 7-stage master sequence represents a proven, professional framework:
          </p>

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg border border-border/40 mb-8 bg-muted">
            <Image
              src="/images/blog/how-early-should-you-hire-an-event-planner/event-planning-milestones.jpg"
              alt="Ideal event planning timeline infographic showing milestones from 18 months to event day"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <div className="space-y-6 mb-8">
            {idealTimelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-primary">
                    Stage {idx + 1} • {stage.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                    {stage.period}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  {stage.period} Roadmap
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {stage.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-border/60">
                  {stage.actions.map((act, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 14: Booking Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              14
            </span>
            Event Planner Booking Checklist
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Before scheduling your initial consultation with a prospective event planning company,
            prepare the information below. Having these details ready makes your consultation markedly
            more productive and empowers the planner to provide an accurate proposal:
          </p>

          <div className="p-6 rounded-2xl bg-card border border-border mb-6">
            <h3 className="font-semibold text-foreground text-base mb-4 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              16 Key Information Points for Your First Meeting:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              {bookingChecklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 15: How to Choose */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              15
            </span>
            How to Choose the Right Professional Event Planner
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Selecting an event planner is about far more than just finding someone who happens to be
            unbooked on your chosen date. Event planning requires intense communication, mutual trust,
            and shared aesthetic taste.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: 'Relevant Event Portfolio',
                desc: 'Verify experience in your specific event category—a stellar wedding planner may not excel at technical corporate expos, and vice-versa.',
              },
              {
                title: 'Transparent Pricing Structure',
                desc: 'Ensure total clarity regarding flat management fees, percentage commissions, and whether vendor discounts are passed directly to you.',
              },
              {
                title: 'Vendor Network Strength',
                desc: 'Top planners maintain established relationships with dependable caterers, AV production houses, and venues, yielding better terms.',
              },
              {
                title: 'Communication Protocol',
                desc: 'Clarify how frequently you will meet, response time expectations, and who your direct day-of point of contact will be.',
              },
              {
                title: 'On-Site Staffing Ratio',
                desc: 'Ask how many coordinators and logistical assistants will be physically present on event day to ensure flawless supervision.',
              },
              {
                title: 'Contingency Capabilities',
                desc: 'Examine past examples of how the company resolved live crises—such as sudden monsoon downpours or power disruptions.',
              },
            ].map((crit, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground text-sm mb-1">{crit.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{crit.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-base leading-relaxed">
            For an exhaustive list of interview questions and evaluation criteria, read our dedicated guide on{' '}
            <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>
              How to Choose the Right Event Planner for Your Event
            </Link>
            .
          </p>
        </section>

        {/* Section 16: Which Service Do You Need */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              16
            </span>
            Which Event Planning Service Do You Need?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Selecting the ideal service tier is straightforward once you identify your current planning stage:
          </p>
          <div className="space-y-4 mb-6">
            {[
              {
                stage: 'Still in early concept with nothing booked?',
                recommendation: 'Full-Service Event Planning',
                reason:
                  'You receive comprehensive guidance from initial budgeting and venue curation to styling, contracting, and live execution.',
              },
              {
                stage: 'Venue contracted and some vendors booked?',
                recommendation: 'Partial Event Planning',
                reason:
                  'Fills remaining vendor gaps, audits contracts, refines aesthetic design, and synchronizes logistics into one master plan.',
              },
              {
                stage: 'Planning fully complete, but need professional day-of command?',
                recommendation: 'Event-Day Coordination (Month-Of)',
                reason:
                  'Takes over 4–6 weeks prior to the celebration to orchestrate vendor arrivals, construct the run-of-show, and direct event day.',
              },
              {
                stage: 'Organizing a large, multi-day, or high-stakes corporate affair?',
                recommendation: 'Comprehensive Event Management',
                reason:
                  'Deploy an experienced on-site operations team capable of managing multi-room setups, live streaming, staff, and crisis control.',
              },
            ].map((decision, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                    Your Situation
                  </span>
                  <h3 className="font-serif font-bold text-foreground text-base mb-1">
                    {decision.stage}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-xl">
                    {decision.reason}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-block px-3.5 py-1.5 rounded-xl bg-primary/15 text-primary text-xs font-bold border border-primary/30">
                    {decision.recommendation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 17: Booking Timeline Summary Table */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              17
            </span>
            How Far in Advance Should You Book an Event Planner?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Use the reference table below to benchmark recommended lead times and booking horizons
            across different event formats:
          </p>

          <div className="rounded-2xl border border-border overflow-hidden shadow-sm mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/80 text-foreground font-semibold border-b border-border text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Event Type</th>
                    <th className="py-3.5 px-4 sm:px-6">Planning Range</th>
                    <th className="py-3.5 px-4 sm:px-6">Recommended Booking</th>
                    <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Key Focus Areas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {timelineData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20 hover:bg-muted/30 transition-colors'}
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-foreground">
                        {row.eventType}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-primary font-semibold">
                        {row.planningRange}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-muted-foreground">
                        {row.recommendedBooking}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-xs text-muted-foreground hidden md:table-cell">
                        {row.keyMilestones}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * Note: Popular seasonal holiday periods, auspicious wedding dates, and major convention
            weeks demand earlier booking due to limited venue and vendor capacity.
          </p>
        </section>

        {/* Section 18: FAQ Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
            <HelpCircle size={16} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            Frequently Asked Questions: Booking Timelines
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            Expert answers to common questions about booking timelines, lead times, and planner
            involvement:
          </p>

          <div className="space-y-4">
            {bookingTimelineFaqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-foreground text-base sm:text-lg hover:text-primary transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-sans font-bold shrink-0">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-border/40 text-muted-foreground text-sm sm:text-base leading-relaxed">
                      <p className="mt-4 pl-9">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 19: Conclusion */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              19
            </span>
            Conclusion: Plan Early, Celebrate Completely
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The short answer to <em>“how early should I hire an event planner?”</em> is simple: as soon
            as you recognize that you want your celebration to be exceptional, organized, and free from
            exhausting stress. While a boutique birthday dinner may only require a few weeks of
            preparation, weddings, conferences, destination celebrations, and galas benefit immensely
            from multi-month architectural planning.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Hiring a professional planner early transforms your planning process from a reactive scramble
            into a joyful, structured creative journey. You secure the finest venues, negotiate with
            leverage, protect your budget, and guarantee that every creative element connects seamlessly.
          </p>
          <p className="text-foreground font-serif font-bold text-lg sm:text-xl italic mt-6 p-6 rounded-2xl bg-muted/40 border-l-4 border-primary">
            &ldquo;Your event should be something you experience and enjoy — not something you spend
            the entire day managing.&rdquo;
          </p>
        </section>

        {/* Section 20: High-Conversion CTA Section */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                AS Events • Professional Event Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Planning an Upcoming Event and Wondering When to Start?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Share your event date, expected guest count, location, and current progress with AS Event
                Management. We will help you identify the perfect booking window, evaluate vendor lead
                times, and tailor the ideal planning or management service for your celebration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button
                  onClick={() => openModal()}
                  className="bg-primary text-slate-950 hover:bg-primary/90 hover:text-slate-950 font-bold px-6 h-11 rounded-xl shadow-lg"
                >
                  <Sparkles size={16} className="text-slate-950 mr-1.5" />
                  Plan Your Event
                </Button>
                <Button
                  asChild
                  className="bg-slate-950 text-white border border-primary hover:bg-slate-800 hover:text-white font-bold px-6 h-11 rounded-xl"
                >
                  <Link href="/contact" className="text-white hover:text-white flex items-center gap-1.5">
                    <span>Contact AS Events</span>
                    <ArrowRight size={16} className="text-white" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-800 text-xs text-slate-300">
                <a
                  href="tel:+919510324143"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-primary" />
                  +91 95103 24143
                </a>
                <a
                  href="mailto:as.eventmanagement2829@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-primary" />
                  as.eventmanagement2829@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </article>
  )
}
