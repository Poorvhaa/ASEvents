'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Compass,
} from 'lucide-react'
import {
  SelectionRoadmap,
  CoordinationFlow,
  BeforeYouHireTable,
  EventDayCoordinationGrid,
  EventPlanningJourney,
  FinalHiringChecklist,
  EventTypesShowcase,
} from '@/components/blog/article-diagrams'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug } from '@/lib/data/blog'

const article = getBlogPostBySlug('how-to-choose-the-right-event-planner-for-your-event')

export function ArticleContent() {
  const { openModal } = useQuoteModal()

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'How to Choose the Right Event Planner for Your Event',
        url: window.location.href,
      }).catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Article link copied to clipboard!')
    }
  }

  return (
    <article className="pt-28 pb-20 bg-background text-foreground">
      {/* 1. Breadcrumbs */}
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
              How to Choose the Right Event Planner
            </span>
          </li>
        </ol>
      </nav>

      {/* 2. Article Header */}
      <header className="container mx-auto px-4 lg:px-8 max-w-4xl mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
            Planning Tips
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Comprehensive Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
          How to Choose the Right Event Planner for Your Event
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
          A Practical Guide to Planning a Memorable, Well-Managed Event — comparing experience,
          services, budget, communication, vendor coordination, and event-day execution.
        </p>

        {/* Metadata Bar */}
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
              <span>{article?.date}</span>
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

      {/* 3. Hero Image */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40">
          <Image
            src="/images/blog/how-to-choose-the-right-event-planner-for-your-event/hero.jpg"
            alt="Event planning consultation meeting reviewing venue layouts, decor, and timeline with client"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 text-white text-xs sm:text-sm">
            <span className="font-semibold text-primary block text-[11px] uppercase tracking-wider mb-0.5">
              AS Events • Expert Guidance
            </span>
            <span>Bridging creative vision with flawless logistics and vendor coordination.</span>
          </div>
        </div>
      </div>

      {/* 4. Main Article Content Container */}
      <main className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Core Highlight Callout Box */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary shadow-sm mb-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
            Core Philosophy
          </span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2">
            The Right Planner Makes the Difference
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            The right event planner should understand your vision, budget, guests, venue, vendors,
            timeline, and the level of support you need — from planning through event-day execution.
          </p>
        </div>

        {/* 8-Step Roadmap Visual */}
        <SelectionRoadmap />

        {/* Introduction */}
        <section className="prose prose-slate dark:prose-invert max-w-none mb-10 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p className="mb-4">
            Planning an important event is exciting, but it can also become overwhelming quickly.
            Venue selection, vendors, budget, guest lists, décor, entertainment, food, and the
            event-day schedule all require careful coordination.
          </p>
          <p className="mb-4">
            This is where the right event planner can make a significant difference. Not every
            planner works the same way, and not every planner is suitable for every celebration.
          </p>
          <p className="mb-6">
            The right choice depends on your event type, expectations, budget, location, style, and
            the level of support you need.
          </p>
        </section>

        {/* Coordination Flow Diagram */}
        <CoordinationFlow />

        {/* Section 1 */}
        <section id="section-1" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              1
            </span>
            Start by Defining Your Event
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Before contacting an event planner, clearly understand what you are planning:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-sm text-foreground/90">
            {[
              'What type of event are you hosting?',
              'How many guests are expected?',
              'Where will the event take place?',
              'What is your approximate budget?',
              'What style or theme do you want?',
              'What services do you need?',
              'Do you need complete planning or only event-day coordination?',
            ].map((q, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-card border border-border/60"
              >
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed p-4 rounded-xl bg-muted/40 border-l-2 border-primary">
            Planning a wedding is very different from organizing a corporate event, birthday
            celebration, anniversary, or destination event. A professional planner should understand
            your event and expectations before suggesting services.
          </p>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              2
            </span>
            Look for Experience With Your Type of Event
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Experience matters because every event has different requirements. For{' '}
            <Link
              href="/services#wedding-planning"
              className="text-primary underline hover:text-primary/80 font-medium"
            >
              weddings
            </Link>
            , you may need venue selection, décor, catering, photography, entertainment, guest
            management, vendor coordination, and a detailed timeline.{' '}
            <Link
              href="/services#corporate-events"
              className="text-primary underline hover:text-primary/80 font-medium"
            >
              Corporate events
            </Link>{' '}
            may require registration, stage production, branding, networking, team activities, or
            awards.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Choose a professional whose experience matches the kind of event you are planning.
          </p>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              3
            </span>
            Review Their Portfolio
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A portfolio can tell you much more than a sales conversation. Look for work that
            demonstrates creativity, organization, attention to detail, and the ability to adapt to
            different clients:
          </p>
          <ul className="space-y-2 mb-6 text-sm text-foreground/90">
            {[
              'Does the design style match your vision?',
              'Have they planned events similar to yours?',
              'Do they create different concepts for different clients?',
              'Do their events look organized as well as beautiful?',
              'Can they manage both intimate and large-scale events?',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mb-6">
            You can explore real examples in our{' '}
            <Link href="/portfolio" className="text-primary underline font-medium">
              Event Portfolio
            </Link>{' '}
            to see authentic setups, stage productions, and floral aesthetics.
          </p>

          {/* Checklist 1: Before You Hire Table */}
          <BeforeYouHireTable />
        </section>

        {/* Section 4 */}
        <section id="section-4" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              4
            </span>
            Understand Exactly What Is Included
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            One of the most important questions to ask is:{' '}
            <span className="font-semibold text-foreground">
              “What exactly is included in your service?”
            </span>{' '}
            Some planners provide planning and coordination, while others offer a more complete
            event-management experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              'Venue scouting and selection',
              'Event design and theme development',
              'Vendor selection and coordination',
              'Budget planning',
              'Catering coordination',
              'Entertainment coordination',
              'Photography and videography coordination',
              'Guest management',
              'Travel and accommodation coordination',
              'Event-day execution',
            ].map((srv, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border/60 text-xs sm:text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>{srv}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm italic">
            Make sure you understand what the planner will handle and what you will still need to
            arrange yourself. Review our comprehensive{' '}
            <Link href="/packages" className="text-primary underline font-medium not-italic">
              Event Packages
            </Link>{' '}
            for clear tier breakdowns.
          </p>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              5
            </span>
            Ask About Their Vendor Network
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A successful event often depends on a network of reliable vendors:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs sm:text-sm">
            {[
              'Caterers',
              'Decorators & Florists',
              'Photographers & Videographers',
              'DJs & Live Entertainers',
              'Makeup Artists',
              'Transportation Providers',
              'Venue Partners',
              'Production & Audio-Visual',
            ].map((vnd, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-muted/40 border border-border/40 text-center font-medium"
              >
                {vnd}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ask how the planner selects vendors, coordinates them, and manages communication before
            and during the event.
          </p>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              6
            </span>
            Discuss Your Budget Early
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Budget conversations should happen at the beginning. Tell your planner your approximate
            budget and your priorities. A professional planner can help you understand where your
            budget can have the greatest impact and where you may have flexibility.
          </p>
          <div className="p-4 rounded-xl bg-card border border-border/80 shadow-sm text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Key Budget Transparency Rule:</p>
            <p>
              Make sure you understand planning fees, vendor costs, deposits, payment schedules, and
              potential additional charges before signing any contract.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="section-7" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              7
            </span>
            Evaluate Their Communication
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Good communication is one of the most important parts of event planning:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
            {[
              'How quickly do they respond?',
              'Do they listen to your ideas?',
              'Do they ask relevant questions?',
              'Do they explain things clearly?',
              'Do they provide organized information?',
              'Are they comfortable discussing changes?',
            ].map((q, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg bg-card border border-border/60 flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm italic">
            You may work with your planner for weeks or months, so consistent communication matters.
          </p>
        </section>

        {/* Section 8 */}
        <section id="section-8" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              8
            </span>
            Make Sure They Can Handle Event-Day Execution
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Planning and executing an event are different responsibilities. On event day, many things
            happen simultaneously.
          </p>

          {/* Checklist 2: Event-Day Coordination Checklist */}
          <EventDayCoordinationGrid />

          <p className="text-muted-foreground text-base leading-relaxed mb-4 mt-6">
            On-site event execution entails dozens of live coordination touchpoints:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-4">
            {[
              'Vendor arrival and setup',
              'Décor installation',
              'Catering coordination',
              'Entertainment and production',
              'Photography and videography',
              'Guest arrival',
              'Stage activities and speeches',
              'Ceremonies and special moments',
              'Timing and transitions',
              'Unexpected issues',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-foreground/90">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed p-4 rounded-xl bg-card border border-border/80">
            <strong className="text-foreground">Pro-Tip:</strong> Ask whether the lead planner or
            their team will be present during the event and how they manage the event-day timeline.
          </p>
        </section>

        {/* Section 9 */}
        <section id="section-9" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              9
            </span>
            Consider Location and Destination Experience
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            For events outside your local area, destination experience can be especially important:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs sm:text-sm">
            {[
              'Venue research',
              'Local vendor coordination',
              'Guest travel',
              'Accommodation',
              'Transportation',
              'Local logistics',
              'Event documentation/permits',
              'Timeline coordination',
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-muted/30 border border-border/60 text-center font-medium"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Ask about experience working with local partners and coordinating guests and vendors
            across locations. Read more about our destination services on{' '}
            <Link
              href="/services#destination-weddings"
              className="text-primary underline font-medium"
            >
              Destination Wedding Planning
            </Link>
            .
          </p>
        </section>

        {/* Section 10 */}
        <section id="section-10" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              10
            </span>
            Read Reviews and Client Feedback
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Reviews can help you understand what it is like to work with the planner. Look for
            comments about communication, professionalism, organization, creativity, vendor
            management, event-day execution, problem solving, and overall client experience.
          </p>
          <p className="text-muted-foreground text-sm italic p-4 rounded-xl bg-card border border-border">
            Read the actual comments and look for experiences similar to your event.
          </p>
        </section>

        {/* Section 11 */}
        <section id="section-11" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              11
            </span>
            Questions to Ask Before Hiring an Event Planner
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience */}
            <div className="p-5 rounded-xl bg-card border border-border/80 shadow-sm">
              <h3 className="text-base font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Experience
              </h3>
              <ol className="space-y-2.5 text-xs sm:text-sm text-foreground/90 list-decimal list-inside">
                <li>How many events have you planned?</li>
                <li>Have you planned events similar to mine?</li>
                <li>Can I see examples of your previous work?</li>
              </ol>
            </div>

            {/* Services */}
            <div className="p-5 rounded-xl bg-card border border-border/80 shadow-sm">
              <h3 className="text-base font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Services
              </h3>
              <ol start={4} className="space-y-2.5 text-xs sm:text-sm text-foreground/90 list-decimal list-inside">
                <li>What services are included?</li>
                <li>Will you coordinate vendors?</li>
                <li>Will someone from your team be present on event day?</li>
                <li>Do you provide décor and entertainment coordination?</li>
              </ol>
            </div>

            {/* Budget */}
            <div className="p-5 rounded-xl bg-card border border-border/80 shadow-sm">
              <h3 className="text-base font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Budget
              </h3>
              <ol start={8} className="space-y-2.5 text-xs sm:text-sm text-foreground/90 list-decimal list-inside">
                <li>How do you structure your fees?</li>
                <li>What expenses are included?</li>
                <li>Are there additional charges I should know about?</li>
              </ol>
            </div>

            {/* Communication & Execution */}
            <div className="p-5 rounded-xl bg-card border border-border/80 shadow-sm">
              <h3 className="text-base font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Communication & Execution
              </h3>
              <ol start={11} className="space-y-2.5 text-xs sm:text-sm text-foreground/90 list-decimal list-inside">
                <li>Who will be my primary contact?</li>
                <li>How will changes be handled?</li>
                <li>What happens if a vendor has a problem?</li>
                <li>Do you create an event-day timeline?</li>
                <li>How do you handle unexpected situations?</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section id="section-12" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center justify-center font-sans font-bold shrink-0">
              12
            </span>
            Watch for Red Flags
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Be careful if an event planner:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              'Cannot clearly explain their services',
              'Avoids discussing the budget',
              'Provides unclear pricing or scope',
              'Has no meaningful portfolio',
              'Does not communicate consistently',
              'Makes promises they cannot explain',
              'Has no clear event-day plan',
              'Is unwilling to put important terms in writing',
            ].map((flag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-xs sm:text-sm text-foreground/90"
              >
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                <span>{flag}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm italic">
            You should feel comfortable understanding what you are paying for and what the planner
            will deliver.
          </p>
        </section>

        {/* Section 13 */}
        <section id="section-13" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              13
            </span>
            Choose Someone Who Understands Your Vision
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The right event planner should not simply impose their own style on your event. They
            should listen to your ideas and help turn them into a practical plan.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Whether you want a traditional wedding, a modern luxury celebration, a destination
            wedding, an intimate family gathering, a corporate event, a themed birthday, or an elegant
            anniversary celebration, your event should reflect your story, your guests, and your
            priorities.
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
              Guiding Principle
            </span>
            <h3 className="text-lg font-serif font-bold text-foreground mb-1">
              YOUR EVENT SHOULD FEEL PERSONAL
            </h3>
            <p className="text-muted-foreground text-sm">
              A good planning partnership turns your ideas into a practical, organized event
              experience.
            </p>
          </div>
        </section>

        {/* Section 14 */}
        <section id="section-14" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              14
            </span>
            Why Professional Event Planning Can Make a Difference
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Hiring a professional planner can help bring multiple pieces of an event together.
            Instead of communicating separately with numerous vendors, you can have an experienced
            team coordinating the overall plan:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs sm:text-sm">
            {[
              'Concept development',
              'Budget & planning',
              'Venue selection',
              'Vendor coordination',
              'Event design',
              'Timeline development',
              'Guest & logistics',
              'Event-day management',
              'Problem solving',
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-card border border-border/80 text-center font-medium"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Diagram 3: Event Planning Journey */}
          <EventPlanningJourney />
        </section>

        {/* Section 15 */}
        <section id="section-15" className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
              15
            </span>
            Final Checklist Before Hiring
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Use the interactive checklist below to evaluate each candidate planner during your
            initial interviews:
          </p>

          {/* Checklist 3: Final Hiring Checklist */}
          <FinalHiringChecklist />
        </section>

        {/* Event Types Showcase */}
        <EventTypesShowcase />

        {/* Final Thoughts & AS Events Consultation CTA */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                Final Thoughts
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Plan Your Unforgettable Event with AS Events
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Choosing the right event planner is about more than finding someone who can make an
                event look beautiful. You are choosing someone who may coordinate vendors, manage
                timelines, organize logistics, work within your budget, solve problems, and help
                turn your ideas into real experience.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Take the time to understand what each professional event planner offers, review
                previous work, ask detailed questions, and make sure the planner&apos;s approach
                matches your expectations.
              </p>
              <p className="text-primary font-medium text-sm sm:text-base mb-8">
                AS Events can help clients plan and coordinate meaningful celebrations and events.
                Contact AS Events to discuss your event requirements and planning needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button
                  onClick={() => openModal()}
                  className="bg-primary text-slate-950 font-bold hover:bg-primary/90 px-6 py-3 rounded-xl shadow-lg"
                >
                  <Sparkles size={16} className="mr-2" />
                  Request Event Consultation
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-white/10 hover:text-white rounded-xl"
                >
                  <Link href="/contact" className="flex items-center gap-1.5">
                    <span>Contact Us Directly</span>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>

              {/* Direct Details */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
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
