'use client'

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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug } from '@/lib/data/blog'

const article = getBlogPostBySlug('event-planner-vs-event-manager')

const linkClass = 'text-primary underline hover:text-primary/80 font-medium'

interface ComparisonRow {
  responsibility: string
  planner: string
  manager: string
  detail: string
}

const comparisonData: ComparisonRow[] = [
  {
    responsibility: 'Event Concept & Theme',
    planner: 'Primary',
    manager: 'Rare',
    detail: 'Planners shape the vision, creative mood boards, and aesthetic direction.',
  },
  {
    responsibility: 'Budget Planning & Allocation',
    planner: 'Primary',
    manager: 'Rare',
    detail: 'Planners build the financial blueprint and ensure costs remain on budget.',
  },
  {
    responsibility: 'Venue Research & Sourcing',
    planner: 'Primary',
    manager: 'Rare',
    detail: 'Planners scout, compare, and negotiate contracts for suitable event venues.',
  },
  {
    responsibility: 'Vendor Selection & Contracts',
    planner: 'Primary',
    manager: 'Coordination',
    detail: 'Planners source and hire; managers coordinate their on-site arrival and execution.',
  },
  {
    responsibility: 'Event Design & Styling',
    planner: 'Primary',
    manager: 'Execution Support',
    detail: 'Planners design color palettes and layouts; managers verify setup matches plans.',
  },
  {
    responsibility: 'Timeline Creation',
    planner: 'Master Plan',
    manager: 'Execution Schedule',
    detail: 'Planners build the multi-month pre-event roadmap; managers enforce day-of run-of-show.',
  },
  {
    responsibility: 'Setup & Breakdown Oversight',
    planner: 'Oversees/Plans',
    manager: 'Direct Execution',
    detail: 'Planners define logistics layouts; managers supervise load-in, staging, and strike.',
  },
  {
    responsibility: 'Event-Day Live Coordination',
    planner: 'Sometimes',
    manager: 'Primary',
    detail: 'Managers serve as central command on-site; planners often focus on client care.',
  },
  {
    responsibility: 'Real-Time Problem Solving',
    planner: 'Planning Stage',
    manager: 'Live On-Site',
    detail: 'Planners mitigate risks beforehand; managers resolve sudden live crises instantly.',
  },
]

export const faqList = [
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

export function PlannerVsManagerContent() {
  const { openModal } = useQuoteModal()

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: "Event Planner vs Event Manager: What's the Difference?",
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
              Event Planner vs Event Manager
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
            Industry Comparison Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
          Event Planner vs Event Manager: What&apos;s the Difference?
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
          From concept design and budgeting to live execution and on-site problem solving — understand
          how event planners and event managers differ, and discover which service your celebration
          needs.
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
              <span>{article?.date || 'October 15, 2026'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-primary" />
              <span>10 min read</span>
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
            src="/images/blog/event-planner-vs-event-manager/hero.jpg"
            alt="Event planner vs event manager responsibilities comparison"
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3 italic">
          Comparing the architectural pre-event planning phase with live on-site event execution.
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
            Planner vs Manager: Blueprint vs Execution
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            An event planner focuses mainly on planning before the event—concept, budget, venue,
            vendors and design. An event manager focuses mainly on execution—staff, setup, schedule,
            vendors and real-time event-day coordination.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p className="mb-4">
            If you are organizing a high-profile corporate conference, a multi-day luxury wedding, or an
            exclusive social gathering, you will frequently hear the terms <em>event planner</em> and{' '}
            <em>event manager</em>. While many people use them interchangeably, they fulfill two distinct
            roles within professional event management.
          </p>
          <p className="mb-4">
            An event planner usually focuses on concept, budget, venue, vendors and pre-event
            preparation, while an event manager focuses more on live execution, logistics, staff,
            schedule control and event-day problem solving. In simple terms: one builds the master
            blueprint, while the other orchestrates the live build on event day.
          </p>
          <p>
            Understanding this distinction ensures you invest in the exact professional support your
            celebration requires—saving budget, avoiding logistical gaps, and guaranteeing that your
            event unfolds smoothly.
          </p>
        </section>

        {/* Section 1: What Is an Event Planner? */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              01
            </span>
            What Is an Event Planner?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            An event planner is the strategic and creative architect of your celebration. Their work
            commences months—and in many cases over a year—before guests arrive. Their primary mission is
            to translate your vision, style preferences, and financial expectations into an actionable,
            comprehensive plan.
          </p>

          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg border border-border/40 mb-6 bg-muted">
            <Image
              src="/images/blog/event-planner-vs-event-manager/event-planner-responsibilities.jpg"
              alt="Professional event planner preparing an event plan with decor and budget"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A professional event planner acts as your primary advisor, evaluating creative
            possibilities against practical financial limitations. They guide decisions across every
            touchpoint so that the overall celebration feels cohesive, memorable, and stress-free. For a
            deeper exploration of this role, read our guide on{' '}
            <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>
              what an event planner does from first idea to event day
            </Link>
            .
          </p>
        </section>

        {/* Section 2: What Does an Event Planner Handle? */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              02
            </span>
            What Does an Event Planner Handle?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            The event planner oversees all the preparatory components that turn an abstract idea into a
            structured, vendor-contracted reality:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: 'Event Concept & Theme',
                desc: 'Defining the overarching mood, aesthetic vision, color palettes, and guest journey.',
              },
              {
                title: 'Budget Planning & Control',
                desc: 'Drafting line-item expense allocations, negotiating rates, and avoiding costly budget overruns.',
              },
              {
                title: 'Venue Selection & Contracts',
                desc: 'Scouting suitable locations, analyzing venue floor plans, and negotiating favorable contract terms.',
              },
              {
                title: 'Vendor Procurement',
                desc: 'Curating trusted caterers, florists, photographers, audiovisual teams, and decorators.',
              },
              {
                title: 'Design & Visual Styling',
                desc: 'Building bespoke mood boards, lighting design, tablescapes, and spatial layouts.',
              },
              {
                title: 'Guest Experience & Invitations',
                desc: 'Managing guest lists, RSVP tracking, seating charts, and hospitality touchpoints.',
              },
              {
                title: 'Master Timeline Creation',
                desc: 'Mapping out deadlines from the initial contract signing right up to event week.',
              },
              {
                title: 'Pre-Event Preparation',
                desc: 'Managing administrative logistics, permits, insurance, and vendor confirmations.',
              },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl border border-border bg-card/60">
                <h3 className="font-semibold text-foreground text-sm mb-1 flex items-center gap-2">
                  <CheckCircle size={15} className="text-primary shrink-0" />
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Event Planner Responsibilities */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              03
            </span>
            Event Planner Responsibilities
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            In daily practice, an event planner operates as project director, financial custodian, and
            creative lead. Key responsibilities include:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-sm text-foreground/90">
            {[
              'Aligning client goals with realistic budgets',
              'Sourcing and vetting licensed, reputable vendors',
              'Coordinating multi-tier contract agreements',
              'Drafting contingency weather and backup plans',
              'Structuring detailed payment schedules',
              'Designing cohesive branding and decorative themes',
              'Reviewing dietary requirements with catering partners',
              'Delivering a finalized run-of-show master document',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: What Is an Event Manager? */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              04
            </span>
            What Is an Event Manager?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            An event manager is the on-site operations director. While the planner designs the
            blueprint, the event manager brings it to life on the ground. Their responsibility peaks
            during event week, on event day, and through post-event breakdown.
          </p>

          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg border border-border/40 mb-6 bg-muted">
            <Image
              src="/images/blog/event-planner-vs-event-manager/event-manager-responsibilities.jpg"
              alt="Event manager coordinating event-day execution and vendor logistics on-site"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Event managers excel at dynamic problem-solving, schedule enforcement, and team
            synchronization. When a generator falters, a guest count surges unexpectedly, or weather
            forces an outdoor reception indoors, the event manager calmly makes live executive
            decisions so guests experience seamless hospitality.
          </p>
        </section>

        {/* Section 5: What Does an Event Manager Handle? */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              05
            </span>
            What Does an Event Manager Handle?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            The event manager oversees live on-site operations from morning setup through late-night
            breakdown:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: 'On-Site Coordination',
                desc: 'Acting as central command for vendors, venue representatives, and security personnel.',
              },
              {
                title: 'Vendor Load-In & Setup',
                desc: 'Checking delivery timetables, directing equipment trucks, and inspecting booth installations.',
              },
              {
                title: 'Staff Supervision',
                desc: 'Briefing hospitality staff, coordinating ushers, and synchronizing banquet service teams.',
              },
              {
                title: 'Schedule & Program Control',
                desc: 'Keeping speeches, performances, ceremonial cues, and meal services strictly on time.',
              },
              {
                title: 'Live Crisis Management',
                desc: 'Troubleshooting technical glitches, equipment failures, or weather shifts in real time.',
              },
              {
                title: 'Guest-Flow & Crowd Direction',
                desc: 'Ensuring orderly arrivals, smooth registration, frictionless bar queues, and safe exits.',
              },
              {
                title: 'Breakdown & Strike Oversight',
                desc: 'Supervising rental returns, venue inventory checks, and site restoration after the party ends.',
              },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl border border-border bg-card/60">
                <h3 className="font-semibold text-foreground text-sm mb-1 flex items-center gap-2">
                  <CheckCircle size={15} className="text-primary shrink-0" />
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Event Manager Responsibilities */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              06
            </span>
            Event Manager Responsibilities
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            On the day of execution, an event manager is constantly on the move, safeguarding the
            client&apos;s peace of mind:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-sm text-foreground/90">
            {[
              'Verifying all vendor arrivals against the run-of-show',
              'Testing AV sound, microphones, and stage lighting',
              'Managing VIP arrivals and private green room staging',
              'Ensuring emergency exits and safety compliance',
              'Coordinating live cues for music, dining, and ceremonies',
              'Resolving unforeseen delays or supplier absences',
              'Serving as the point of contact so hosts enjoy their event',
              'Conducting post-event venue walk-throughs to protect deposits',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 7: Core Differences & Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              07
            </span>
            Event Planner vs Event Manager: Core Differences
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            The core difference between an event planner and an event manager lies in their operational
            timeline and focal priorities. While planners work in the realm of creative ideas, budgeting,
            and contracts, managers operate in the realm of logistics, timing, and direct physical
            execution.
          </p>

          <div className="relative aspect-[16/10] sm:aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40 mb-8 bg-muted">
            <Image
              src="/images/blog/event-planner-vs-event-manager/planner-vs-manager.jpg"
              alt="Event planner vs event manager comprehensive responsibilities comparison diagram"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mb-4">
            Side-by-Side Responsibility Breakdown
          </h3>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm mb-6">
            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-muted/70 border-b border-border text-foreground font-serif">
                  <th className="p-4 font-bold">Responsibility</th>
                  <th className="p-4 font-bold text-primary">Event Planner</th>
                  <th className="p-4 font-bold text-foreground">Event Manager</th>
                  <th className="p-4 font-bold text-muted-foreground">Operational Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonData.map((row) => (
                  <tr key={row.responsibility} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-semibold text-foreground">{row.responsibility}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/15 text-primary border border-primary/25">
                        {row.planner}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 text-slate-100 dark:bg-slate-800 border border-slate-700">
                        {row.manager}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground leading-relaxed">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-8 italic">
            Note: In comprehensive event management companies, both roles work in close partnership
            under unified leadership.
          </p>
        </section>

        {/* Section 8: The Event Planning Process */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              08
            </span>
            The Event Planning Process
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            An event is a connected journey that evolves through distinct stages. As the project advances
            from concept to execution, the responsibility shifts seamlessly from planning architecture
            to managerial coordination.
          </p>

          <div className="relative aspect-[16/4] sm:aspect-[16/3] w-full rounded-2xl overflow-hidden shadow-md border border-border/40 mb-6 bg-card">
            <Image
              src="/images/blog/event-planner-vs-event-manager/process-flow.jpg"
              alt="Event planning and event management workflow from idea to successful event"
              fill
              className="object-contain p-2"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 mb-6 text-center">
            {[
              { step: '01', title: 'IDEA', desc: 'Concept & Goals' },
              { step: '02', title: 'PLANNING', desc: 'Scope & Sourcing' },
              { step: '03', title: 'BUDGET', desc: 'Cost Allocation' },
              { step: '04', title: 'VENDORS', desc: 'Contracts & RFPs' },
              { step: '05', title: 'PREPARATION', desc: 'Timelines & Run-of-Show' },
              { step: '06', title: 'EVENT DAY', desc: 'Live Execution' },
              { step: '07', title: 'SUCCESS', desc: 'Memorable Event' },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded-xl border border-border bg-card/80">
                <span className="text-[10px] font-bold text-primary block">{s.step}</span>
                <span className="text-xs font-bold text-foreground block my-1">{s.title}</span>
                <span className="text-[11px] text-muted-foreground block leading-tight">{s.desc}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed">
            Need a practical step-by-step checklist to guide your timeline? Explore our companion guide:{' '}
            <Link href="/blog/complete-event-planning-checklist" className={linkClass}>
              Complete Event Planning Checklist: From the First Idea to Event Day
            </Link>
            .
          </p>
        </section>

        {/* Section 9: Can an Event Planner and Event Manager Be the Same Person? */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              09
            </span>
            Can an Event Planner and Event Manager Be the Same Person?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Yes, they can—but it depends directly on the scale, budget, and complexity of your
            celebration.
          </p>

          <div className="relative aspect-[16/10] sm:aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40 mb-8 bg-muted">
            <Image
              src="/images/blog/event-planner-vs-event-manager/same-person-comparison.jpg"
              alt="Can an event planner and event manager be the same person infographic"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Small &amp; Intimate Events
              </span>
              <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                One Person Handles Both Roles
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                For smaller gatherings—such as private dinner parties, milestone birthdays, or intimate
                anniversaries—one experienced professional can easily plan the theme, book the venue, and
                show up on the day to manage catering and guest arrivals.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Birthday Party', 'Private Dinner', 'Anniversary Celebration', 'Small Gathering'].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                Large &amp; Complex Celebrations
              </span>
              <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                Requires Separate Roles or a Dedicated Team
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                When an event involves hundreds of guests, multi-day schedules, concurrent vendor
                deliveries, and extensive production, expecting one person to oversee pre-planning and live
                on-site logistics creates dangerous bottlenecks. You need dedicated specialists working in
                synergy.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Luxury Wedding',
                  'Corporate Conference',
                  'Product Launch',
                  'Multi-Day Festival',
                  'Large Gala',
                ].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-100 dark:bg-slate-800 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mb-4">Real-World Case Examples</h3>
          <div className="space-y-4 mb-8">
            <div className="p-5 rounded-xl border border-border/80 bg-muted/20">
              <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1.5 flex items-center gap-2">
                <PartyPopper size={16} className="text-primary" />
                Wedding Example: Design vs Execution
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The wedding planner conceptualizes the mandap decor, curates floral color stories, books
                the bridal makeup artist, and negotiates catering menus. On wedding day, the event manager
                ensures the baraat procession starts punctually, manages guest transit, cues the bride’s
                entry music, and oversees the dinner buffet timing.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-muted/20">
              <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1.5 flex items-center gap-2">
                <Users size={16} className="text-primary" />
                Corporate Conference Example: Strategy vs Operations
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The corporate event planner secures keynote speakers, reserves hotel room blocks, manages
                sponsorship decks, and organizes attendee registration collateral. The event manager tests
                wireless presentation clickers, coordinates live video feeds, manages badge check-in
                turnstiles, and directs coffee-break turnaround times.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: Which Service Do You Need? */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              10
            </span>
            Which Service Do You Need?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Use this simple 3-step decision framework to identify the exact level of support you need:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl border-2 border-border hover:border-primary/50 transition-all bg-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
                  Option 01
                </span>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  Still Planning Everything?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  You have an idea and date, but you need professional guidance to select a venue, define
                  a realistic budget, and secure vetted vendors.
                </p>
              </div>
              <div className="pt-4 border-t border-border mt-auto">
                <span className="text-xs font-semibold text-foreground block mb-2">You Need:</span>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-bold">
                  Event Planner
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border-2 border-border hover:border-primary/50 transition-all bg-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
                  Option 02
                </span>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  Already Planned, Need Execution?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  You have booked your venue, chosen caterers, and purchased decor, but you need an
                  experienced director to run event-day operations so you can celebrate stress-free.
                </p>
              </div>
              <div className="pt-4 border-t border-border mt-auto">
                <span className="text-xs font-semibold text-foreground block mb-2">You Need:</span>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-slate-900 text-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-700">
                  Event Manager
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded-full bg-primary text-slate-950 text-[10px] font-bold">
                  Recommended
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
                  Option 03
                </span>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  Need Planning + Execution?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  You want comprehensive peace of mind from first vision to midnight breakdown—creative
                  concepts, budget management, vendor contracts, and on-site coordination.
                </p>
              </div>
              <div className="pt-4 border-t border-primary/20 mt-auto">
                <span className="text-xs font-semibold text-foreground block mb-2">You Need:</span>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-primary text-slate-950 text-xs font-bold">
                  Full Event Management Service
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Evaluating potential partners? Read our strategic checklist on{' '}
            <Link
              href="/blog/how-to-choose-the-right-event-planner-for-your-event"
              className={linkClass}
            >
              how to choose the right event planner for your event
            </Link>
            .
          </p>
        </section>

        {/* Section 11: When You Need Full Event Management */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              11
            </span>
            When You Need Full Event Management
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            For major life milestones and brand-defining corporate functions, the ideal choice is a
            comprehensive event management company that bridges both worlds. When planning and
            execution exist under one coordinated leadership:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: 'No Handover Misunderstandings',
                desc: 'The team executing the event on the day is the same team that crafted the master plan.',
              },
              {
                title: 'Strict Financial Discipline',
                desc: 'Vendor contracts and real-time execution costs are monitored under one centralized budget.',
              },
              {
                title: 'Unified Aesthetic Vision',
                desc: 'Lighting, floral designs, stage sets, and tablescapes align precisely with initial renderings.',
              },
              {
                title: 'Complete Host Relaxation',
                desc: 'Hosts and corporate leadership can focus entirely on their guests while professionals run the show.',
              },
            ].map((f) => (
              <div key={f.title} className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Explore our curated{' '}
            <Link href="/services" className={linkClass}>
              event services
            </Link>
            , browse our tailored{' '}
            <Link href="/packages" className={linkClass}>
              event packages
            </Link>
            , and review real celebration showcases in our{' '}
            <Link href="/portfolio" className={linkClass}>
              event portfolio
            </Link>
            .
          </p>
        </section>

        {/* Section 12: Frequently Asked Questions */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              12
            </span>
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Clear answers to common questions about event planners, event managers, and full-service
            event coordination:
          </p>

          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div key={faq.question} className="p-5 rounded-2xl border border-border bg-card shadow-sm">
                <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    {index + 1}. {faq.question}
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 13: Conclusion */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              13
            </span>
            Conclusion
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Understanding the difference between an event planner and an event manager is the first step
            toward a successful celebration. An event planner designs the creative blueprint, establishes
            the budget, and contracts the vendors. An event manager takes the reins on event day,
            directing staff, coordinating logistics, and ensuring flawless execution.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Whether you are organizing a dream wedding, an executive corporate conference, or a milestone
            birthday party, choosing the right professional support transforms stress into celebration.
            With AS Event Management, you never have to choose between planning strategy and operational
            excellence—you gain an integrated team that delivers both seamlessly.
          </p>
        </section>

        {/* Section 14: Conversion CTA */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                AS Events • Professional Event Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Not Sure Whether You Need Planning or Event-Day Management?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Share your event type, date, guest count, location and current planning stage with AS
                Events. We can help you understand whether you need planning support, event-day management
                or a complete event management service.
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
