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
  Printer,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug } from '@/lib/data/blog'
import {
  IdeaBriefDiagram,
  BudgetDiagram,
  BackwardTimelineDiagram,
  VenueDecisionDiagram,
  VendorTeamDiagram,
  GuestJourneyDiagram,
  DesignConceptDiagram,
  RunOfShowDiagram,
  RiskPlanDiagram,
  FinalWeekDiagram,
  CommandCenterDiagram,
  EventDayChecklistDiagram,
  CloseoutDiagram,
  CompleteWorkflowDiagram,
  QuickReferenceDiagram,
} from '@/components/blog/checklist-diagrams'

const article = getBlogPostBySlug('complete-event-planning-checklist')

const linkClass = 'text-primary underline underline-offset-2 hover:text-primary/80 font-medium'

const quickReference = [
  { name: 'Event purpose', detail: 'Purpose and format defined' },
  { name: 'Guest count', detail: 'Estimated attendance, and why those guests are invited' },
  { name: 'Budget', detail: 'Categories created, including a contingency reserve' },
  { name: 'Venue', detail: 'Selected and confirmed, with layout and access checked' },
  { name: 'Vendors', detail: 'Core partners contracted, with scope and contacts recorded' },
  { name: 'Design', detail: 'Concept approved before décor is purchased' },
  { name: 'RSVP and communication', detail: 'Guest communications and RSVP plan ready' },
  { name: 'Run-of-show', detail: 'Program timing, owners and cues written down' },
  { name: 'Risk plan', detail: 'Weather, technical and backup plans documented' },
  { name: 'Vendor briefing', detail: 'Final briefing completed from one master schedule' },
  { name: 'Event-day command', detail: 'Lead coordinator and escalation path assigned' },
  { name: 'Post-event closeout', detail: 'Wrap-up, returns, thanks and review planned' },
]

function SectionHeading({ number, children }: { number: string; children: string }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-start gap-3">
      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0 mt-1">
        {number}
      </span>
      <span>{children}</span>
    </h2>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-sm text-foreground/90">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30">
          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function PracticalTip({ children }: { children: string }) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary mb-2">
      <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
        Practical tip
      </span>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{children}</p>
    </div>
  )
}

export function ChecklistArticleContent() {
  const { openModal } = useQuoteModal()

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: 'Complete Event Planning Checklist: From the First Idea to Event Day',
          url: window.location.href,
        })
        .catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Article link copied to clipboard!')
    }
  }

  const printChecklist = () => {
    document.body.classList.add('print-checklist-only')
    const cleanup = () => {
      document.body.classList.remove('print-checklist-only')
      window.removeEventListener('afterprint', cleanup)
    }
    window.addEventListener('afterprint', cleanup)
    window.print()
  }

  return (
    <article className="pt-28 pb-20 bg-background text-foreground">
      <style>{`
        @media print {
          body.print-checklist-only * { visibility: hidden; }
          body.print-checklist-only #quick-reference,
          body.print-checklist-only #quick-reference * { visibility: visible; }
          body.print-checklist-only #quick-reference {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
          }
          body.print-checklist-only #quick-reference .no-print { display: none !important; }
        }
      `}</style>

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
            <span className="text-foreground font-medium truncate max-w-[220px] sm:max-w-none">
              Complete Event Planning Checklist
            </span>
          </li>
        </ol>
      </nav>

      <header className="container mx-auto px-4 lg:px-8 max-w-4xl mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
            Planning Tips
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Practical Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
          Complete Event Planning Checklist: From the First Idea to Event Day
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
          A practical event planning guide for the decisions that turn an idea into a coordinated,
          guest-ready event.
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
              <span>{article?.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-primary" />
              <span>12 min read</span>
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

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40">
          <Image
            src="/images/blog/complete-event-planning-checklist/complete-event-planning-checklist.jpg"
            alt="Professional event setup for complete event planning checklist"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary shadow-sm mb-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
            How to use this guide
          </span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2">
            One checklist, from the first idea through the wrap-up
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Use this event planning checklist to organize your budget, venue, vendors, guest
            experience, timeline, event-day execution and post-event wrap-up. It is an event
            management guide you can adapt, not a script you have to follow line by line.
          </p>
        </div>

        <section className="mb-12 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p className="mb-4">
            An event planning checklist is useful when it connects decisions instead of collecting
            them. Venue, food, design, guests and timing only work when they belong to the same
            plan. This event planning guide follows that sequence, from the reason for the event to
            the closeout after guests leave.
          </p>
          <p className="mb-4">
            The framework can be adapted for{' '}
            <Link href="/services#wedding-planning" className={linkClass}>
              wedding planning
            </Link>
            ,{' '}
            <Link href="/services#destination-weddings" className={linkClass}>
              destination weddings
            </Link>
            ,{' '}
            <Link href="/services#corporate-events" className={linkClass}>
              corporate events
            </Link>
            ,{' '}
            <Link href="/services#birthday-celebrations" className={linkClass}>
              birthday celebrations
            </Link>
            ,{' '}
            <Link href="/services#anniversary-events" className={linkClass}>
              anniversary events
            </Link>{' '}
            and other social occasions. AS Events focuses on planning, venue curation, vendor
            coordination and execution across those{' '}
            <Link href="/services" className={linkClass}>
              event planning services
            </Link>
            .
          </p>
          <p>
            If you want a partner to hold the whole sequence together, compare{' '}
            <Link href="/packages" className={linkClass}>
              event packages
            </Link>{' '}
            after you know which decisions matter most for your occasion.
          </p>
        </section>

        <section id="event-idea" className="mb-12">
          <SectionHeading number="1">Start With the Event Idea</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Every successful event begins with a clear reason for existing. Write down the occasion,
            the people you want to bring together, the feeling you want guests to leave with, and
            the practical result you want to achieve. A birthday may be about one person. A
            corporate event may be about learning or networking. A wedding may be about celebrating
            a relationship. The planning choices should follow that purpose.
          </p>
          <IdeaBriefDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">What to decide first</h3>
          <BulletList
            items={[
              'Event type and occasion',
              'Approximate guest count',
              'Preferred date or date range',
              'Location or destination',
              'Desired atmosphere and style',
              'Comfortable budget range',
              'Must-have experiences',
            ]}
          />
          <PracticalTip>
            The clearer the brief, the fewer unnecessary decisions you will make later.
          </PracticalTip>
        </section>

        <section id="event-budget" className="mb-12">
          <SectionHeading number="2">Build a Realistic Event Budget</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A professional event planning budget is more than a venue number. It is a map of the
            money required to create the experience. Separate major categories, record deposits and
            payment dates, and keep a contingency amount for changes or unexpected requirements.
          </p>
          <BudgetDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Budget categories</h3>
          <BulletList
            items={[
              'Venue and venue-related charges',
              'Food and beverage',
              'Décor, florals and furniture',
              'Photography and videography',
              'Entertainment and artists',
              'Audio-visual, lighting and production',
              'Invitations, signage and stationery',
              'Transportation, accommodation or guest logistics',
              'Contingency reserve',
            ]}
          />
          <PracticalTip>
            Never approve a vendor simply because the headline price looks low. Compare scope,
            inclusions, timing and quality.
          </PracticalTip>
        </section>

        <section id="planning-timeline" className="mb-12">
          <SectionHeading number="3">Work Backward From Event Day</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A strong event planning timeline starts with the final date and works backward. Major
            commitments such as the venue, core vendors and guest logistics usually need earlier
            decisions than décor details or final confirmations. These event planning steps keep
            the event planning process from drifting into separate lists.
          </p>
          <BackwardTimelineDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Planning checkpoints</h3>
          <BulletList
            items={[
              'Set the event date and non-negotiable deadlines',
              'Book the venue and major vendors',
              'Develop the design and guest plan',
              'Build the detailed program and vendor schedule',
              'Confirm quantities, arrivals, payments and special requirements',
              'Run the final briefing and rehearsal where appropriate',
            ]}
          />
          <PracticalTip>Use one master timeline instead of separate lists that can drift apart.</PracticalTip>
        </section>

        <section id="venue" className="mb-12">
          <SectionHeading number="4">Choose the Right Venue</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The right venue is not simply the prettiest space. It must work for capacity, guest
            movement, production, food service, access and the overall experience. Ask what is
            included, what has restrictions, and what must be brought in. Use this event venue
            checklist on the walk-through, then compare the space with celebrations in the{' '}
            <Link href="/portfolio" className={linkClass}>
              event portfolio
            </Link>
            .
          </p>
          <VenueDecisionDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">
            Venue walk-through checklist
          </h3>
          <BulletList
            items={[
              'Guest capacity and comfortable seating',
              'Arrival, parking and accessibility',
              'Load-in and vendor access',
              'Power, sound and lighting requirements',
              'Catering rules and kitchen access',
              'Rain or weather backup for outdoor events',
              'Setup and breakdown windows',
              'Restrictions on décor, music or vendors',
            ]}
          />
          <PracticalTip>Walk through the venue as a guest, then walk through it again as a vendor.</PracticalTip>
        </section>

        <section id="vendors" className="mb-12">
          <SectionHeading number="5">Build the Vendor Team</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Vendors work best when everyone understands the same plan. Give each critical partner a
            clear scope, contact person, arrival time, setup responsibility and handoff point. A
            professional event planner does not only book vendors. The work is to connect their
            efforts into one system. That coordination is a large part of{' '}
            <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>
              what an event planner does
            </Link>
            .
          </p>
          <VendorTeamDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Core vendor map</h3>
          <BulletList
            items={[
              'Venue',
              'Catering',
              'Décor and florals',
              'Photography and videography',
              'Entertainment',
              'Audio-visual and lighting',
              'Transportation and logistics',
              'Specialty vendors',
            ]}
          />
          <PracticalTip>Create one vendor contact sheet and keep it current.</PracticalTip>
        </section>

        <section id="guest-journey" className="mb-12">
          <SectionHeading number="6">Design the Guest Journey</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Think about the event from the guest&apos;s point of view. Where do they park? Who
            welcomes them? How do they know where to sit? When do they eat? Where do they take
            photos? What happens between program moments? Small gaps can make an otherwise
            beautiful event feel disorganized. These event planning tips are really guest-flow
            questions.
          </p>
          <GuestJourneyDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Guest journey questions</h3>
          <BulletList
            items={[
              'Arrival and welcome',
              'Registration or seating',
              'Wayfinding and signage',
              'Food and beverage flow',
              'Program transitions',
              'Restroom and accessibility needs',
              'VIP or special guest support',
              'Departure and transportation',
            ]}
          />
          <PracticalTip>
            If a guest has to ask three people where to go next, the event flow needs another look.
          </PracticalTip>
        </section>

        <section id="design-concept" className="mb-12">
          <SectionHeading number="7">Create the Design Concept</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Good event design is a system, not a pile of decorations. Start with a visual
            direction, then make décor, lighting, furniture, signage and floral choices support the
            same story. The AS Events portfolio shows wedding, corporate, birthday, anniversary and
            other event setups, and how the design can change by occasion.
          </p>
          <DesignConceptDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Design checklist</h3>
          <BulletList
            items={[
              'Choose a focused color palette',
              'Define the main focal area',
              'Plan guest sightlines',
              'Coordinate tables and furniture',
              'Plan lighting for different event phases',
              'Create consistent signage',
              'Use décor to support the event purpose',
            ]}
          />
          <PracticalTip>
            A simple, consistent concept usually looks more intentional than too many unrelated ideas.
          </PracticalTip>
        </section>

        <section id="run-of-show" className="mb-12">
          <SectionHeading number="8">Build the Run-of-Show</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The run-of-show is the event&apos;s operating script. It tells the team what happens,
            when it happens, who owns the cue, and what must be ready before the next moment. It is
            especially important for ceremonies, speeches, entertainment and corporate programs.
            This is the event planning workflow that the room actually follows.
          </p>
          <RunOfShowDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Include these fields</h3>
          <BulletList
            items={[
              'Time',
              'Activity',
              'Location',
              'Owner',
              'Vendor cue',
              'Technical requirement',
              'Guest movement',
              'Backup action',
            ]}
          />
          <PracticalTip>
            Build enough buffer into the schedule to absorb small delays without moving the entire event.
          </PracticalTip>
        </section>

        <section id="risk-plan" className="mb-12">
          <SectionHeading number="9">Plan for Risk and the Unexpected</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A professional event plan assumes that something may change. Weather, traffic, vendor
            delays, technical issues, guest needs or timing changes can happen. The goal is not to
            eliminate every risk. It is to decide in advance what the team will do.
          </p>
          <RiskPlanDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Risk checklist</h3>
          <BulletList
            items={[
              'Weather backup',
              'Backup vendor contacts',
              'Power and technical contingency',
              'Emergency contacts and venue procedures',
              'Extra time for key transitions',
              'Dietary and accessibility requirements',
              'Backup transportation where needed',
              'Decision-maker identified for urgent issues',
            ]}
          />
          <PracticalTip>A backup plan is useful only if the team knows who can activate it.</PracticalTip>
        </section>

        <section id="final-week" className="mb-12">
          <SectionHeading number="10">The Final Week</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The final week should reduce uncertainty. Do not use it to discover that a vendor
            misunderstood the setup or that a key item has never been assigned. Confirm the details
            and put the whole team on the same page.
          </p>
          <FinalWeekDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Final-week actions</h3>
          <BulletList
            items={[
              'Confirm every critical vendor',
              'Reconfirm guest count and special requirements',
              'Review floor plans and setup instructions',
              'Finalize the run-of-show',
              'Confirm payments and required documents',
              'Prepare signage, an emergency kit and printed schedules',
              'Brief the event-day team',
            ]}
          />
          <PracticalTip>
            One final master document should be more trusted than five different versions of the schedule.
          </PracticalTip>
        </section>

        <section id="command-center" className="mb-12">
          <SectionHeading number="11">Event-Day Command Center</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Event day is where planning becomes live coordination. Someone must keep the master view
            while vendors and guests focus on their own roles. The lead coordinator should know what
            is happening now, what happens next, and what could affect the next 30 to 60 minutes.
            That event coordination checklist is the command view, not another copy of every vendor
            contract.
          </p>
          <CommandCenterDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Command-center priorities</h3>
          <BulletList
            items={[
              'Venue readiness',
              'Vendor check-ins',
              'Guest arrival and hospitality',
              'Program cues',
              'Production and technical status',
              'Timing and transitions',
              'Issue escalation',
              'Backup-plan activation',
            ]}
          />
          <PracticalTip>
            Calm communication is a planning tool. Give the team clear instructions rather than creating unnecessary urgency.
          </PracticalTip>
        </section>

        <section id="event-day" className="mb-12">
          <SectionHeading number="12">The Practical Event-Day Checklist</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Use a short event day checklist for the final physical check. A long plan is valuable,
            but a quick visual checklist is easier to use while moving around the venue.
          </p>
          <EventDayChecklistDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Before guests arrive</h3>
          <BulletList
            items={[
              'Venue room setup complete',
              'Décor and signage placed',
              'Catering ready for service',
              'Audio, microphones and screens tested',
              'Lighting checked',
              'Vendor team checked in',
              'Program cues reviewed',
              'Emergency and backup materials accessible',
            ]}
          />
          <PracticalTip>
            The best checklist is short enough to use and specific enough to prevent missed details.
          </PracticalTip>
        </section>

        <section id="closeout" className="mb-12">
          <SectionHeading number="13">Close the Event Professionally</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The work does not end when the last guest leaves. Close the venue, return rentals,
            reconcile documents, confirm vendor wrap-up and capture lessons while the event is still
            fresh.
          </p>
          <CloseoutDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Post-event checklist</h3>
          <BulletList
            items={[
              'Confirm venue closeout',
              'Check rented equipment and décor',
              'Collect final documents and receipts',
              'Confirm outstanding vendor items',
              'Thank clients and partners',
              'Archive the final run-of-show and vendor list',
              'Record lessons for the next event',
            ]}
          />
          <PracticalTip>
            A short post-event review can improve the next event more than another hour of brainstorming.
          </PracticalTip>
        </section>

        <section id="master-checklist" className="mb-12">
          <SectionHeading number="14">The Complete Event Planning Checklist</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Use the complete sequence as your master event management checklist: define the purpose,
            establish money and timing, secure the venue, coordinate vendors, design the guest
            experience, build the program, prepare contingencies, confirm the final details, execute,
            and close out. An event planner checklist is most useful when each task has an owner.
          </p>
          <CompleteWorkflowDiagram />
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">Master sequence</h3>
          <BulletList
            items={[
              'Idea, then the event brief',
              'Budget, then priorities',
              'Venue, then guest flow',
              'Vendors, then responsibilities',
              'Design, then experience',
              'Program, then timing',
              'Risk, then backups',
              'Final week, then confirmation',
              'Event day, then execution',
              'Post-event, then review',
            ]}
          />
          <PracticalTip>
            Every task should connect back to one of three goals: guest experience, operational readiness or budget control.
          </PracticalTip>
        </section>

        <section id="quick-reference" className="mb-12 scroll-mt-28">
          <SectionHeading number="15">Quick Reference: Print This Page</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Keep this final event checklist with your planning documents. Tick items as they are
            completed and assign an owner to anything that is still open.
          </p>
          <QuickReferenceDiagram />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="text-xl font-serif font-bold text-foreground">Master checklist</h3>
            <button
              type="button"
              onClick={printChecklist}
              className="no-print inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-950 bg-primary hover:bg-primary/90 px-4 py-2.5 rounded-xl"
            >
              <Printer size={16} className="text-slate-950" />
              Print this checklist
            </button>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {quickReference.map((item) => (
              <li key={item.name} className="min-w-0 print:break-inside-avoid">
                <label className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card h-full cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 shrink-0 accent-[#C5A880]"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground text-sm">{item.name}</span>
                    <span className="block text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {item.detail}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <PracticalTip>
            For larger or more complex events, expand each line into its own task list and assign a responsible person and deadline.
          </PracticalTip>
        </section>

        <section className="mb-12 p-6 rounded-2xl border border-border bg-card">
          <h2 className="text-xl font-serif font-bold text-foreground mb-3">Related planning guides</h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
            Two companion articles go further on the role itself and on hiring. Read{' '}
            <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>
              what an event planner does, from vision through event-day execution
            </Link>
            , then{' '}
            <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>
              how to choose the right event planner for your event
            </Link>
            .
          </p>
        </section>

        <section className="mt-16 pt-10 border-t border-border">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                Ready to start planning your event?
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Turn Your Event Checklist Into a Complete Plan
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Planning an event involves dozens of connected decisions. AS Events can help
                coordinate the venue, vendors, guest experience, timeline and event-day execution so
                the plan works as one complete system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button
                  onClick={() => openModal()}
                  className="bg-primary text-slate-950 hover:bg-primary/90 hover:text-slate-950 font-bold px-6 h-11 rounded-xl shadow-lg"
                >
                  <Sparkles size={16} className="text-slate-950" />
                  Plan Your Event
                </Button>
                <Button
                  asChild
                  className="bg-slate-950 text-white border border-primary hover:bg-slate-800 hover:text-white font-bold px-6 h-11 rounded-xl"
                >
                  <Link href="/contact" className="text-white hover:text-white">
                    Contact AS Events
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
