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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug } from '@/lib/data/blog'
import { ProcessFlow } from '@/components/blog/event-planner-role-diagrams'

const article = getBlogPostBySlug('what-does-an-event-planner-do')

const linkClass = 'text-primary underline hover:text-primary/80 font-medium'

function SectionHeading({ number, children }: { number: string; children: string }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 flex items-center gap-3">
      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center font-sans font-bold shrink-0">
        {number}
      </span>
      {children}
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

export function EventPlannerRoleContent() {
  const { openModal } = useQuoteModal()

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'What Does an Event Planner Do? A Complete Guide to Event Planning Services',
        url: window.location.href,
      }).catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Article link copied to clipboard!')
    }
  }

  return (
    <article className="pt-28 pb-20 bg-background text-foreground">
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
              What Does an Event Planner Do?
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
            Comprehensive Guide
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
          What Does an Event Planner Do? A Complete Guide to Event Planning Services
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
          From ideas to a coordinated celebration — how an event planner connects vision, venue,
          vendors, guests, and event-day execution.
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

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40">
          <Image
            src="/images/blog/what-does-an-event-planner-do/hero.jpg"
            alt="Reception florals and a neon sign reading Better Events Brighter Moments, from the AS Events planning guide"
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 text-white text-xs sm:text-sm">
            <span className="font-semibold text-primary block text-[11px] uppercase tracking-wider mb-0.5">
              AS Events • Event Planning Services
            </span>
            <span>Plan, design, coordinate, and celebrate — from the first idea to event day.</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary shadow-sm mb-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
            The Simple Answer
          </span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2">
            An event planner turns an idea into an organized event
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            The planner helps connect your vision with the venue, budget, vendors, design, guests,
            timeline, and event-day execution. This guide is for weddings, destination celebrations,
            corporate events, birthdays, anniversaries, and other special occasions.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            What Is an Event Planner?
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            An event planner is the person or team that helps turn an event idea into a practical
            plan and coordinates the details needed to deliver it. Instead of the host managing every
            supplier, deadline, design decision, guest detail, and event-day activity alone, the
            planner creates a structured process.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            AS Events presents its work around bespoke planning, venue curation, and event execution.
            Services include{' '}
            <Link href="/services#wedding-planning" className={linkClass}>
              Wedding Planning
            </Link>
            ,{' '}
            <Link href="/services#destination-weddings" className={linkClass}>
              Destination Weddings
            </Link>
            ,{' '}
            <Link href="/services#corporate-events" className={linkClass}>
              Corporate Events
            </Link>
            ,{' '}
            <Link href="/services#birthday-celebrations" className={linkClass}>
              Birthday Celebrations
            </Link>
            , and{' '}
            <Link href="/services#anniversary-events" className={linkClass}>
              Anniversary Events
            </Link>
            .
          </p>

          <h3 className="text-xl font-serif font-bold text-foreground mb-3">In simple words</h3>
          <BulletList
            items={[
              'You explain what you want.',
              'The planner understands your goals, date, guests, budget, and style.',
              'The planner builds the plan and coordinates the required services.',
              'The planner manages important details before and during the event.',
              'You can spend more time enjoying the event and your guests.',
            ]}
          />

          <ProcessFlow
            eyebrow="From client idea to event plan"
            title="VISION → BUDGET → VENUE → VENDORS → TIMELINE → EXECUTE"
            description="The planner connects the client's idea to the operational steps needed to deliver the event."
            steps={[
              { name: 'VISION', detail: 'Goals, style, and must-haves' },
              { name: 'BUDGET', detail: 'Priorities and a spending plan' },
              { name: 'VENUE', detail: 'Location, capacity, and access' },
              { name: 'VENDORS', detail: 'Food, décor, photo, and music' },
              { name: 'TIMELINE', detail: 'Tasks and deadlines' },
              { name: 'EXECUTE', detail: 'Coordinate on event day' },
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="1">Understanding the Client&apos;s Vision</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Good planning starts with listening. Before recommending a venue, décor concept, or
            vendor, the planner needs to understand what the client actually wants.
          </p>
          <BulletList
            items={[
              'Event type and purpose',
              'Preferred date and location',
              'Expected guest count',
              'Budget range and priorities',
              'Theme, style, colors, or atmosphere',
              'Food, entertainment, décor, photography, and other requirements',
              'Special moments or guest needs',
            ]}
          />
          <div className="p-5 rounded-2xl bg-muted/40 border border-border">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
              Practical example
            </span>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              A client wants an elegant 50th anniversary celebration for 100 guests. The planner
              turns that broad idea into practical questions about venue, dining, décor,
              entertainment, photography, guest flow, budget priorities, and timing.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading number="2">Creating the Event Plan</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Once the requirements are clear, the planner creates a working plan. Depending on the
            event, this can include a budget framework, timeline, vendor plan, venue plan, guest
            plan, design direction, and event-day schedule.
          </p>
          <ol className="space-y-2.5 mb-2 text-sm text-foreground/90">
            {[
              'Define the event goals and requirements.',
              'Create the initial budget and priorities.',
              'Research and shortlist venues and vendors.',
              'Confirm the design and event format.',
              'Book and coordinate the required services.',
              'Build the detailed event timeline.',
              'Confirm final details before the event.',
              'Coordinate execution on event day.',
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <SectionHeading number="3">Venue Selection and Coordination</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The venue affects guest capacity, layout, décor possibilities, catering, parking,
            production, access, setup time, and the overall experience. A planner can help compare
            options and coordinate venue-related details.
          </p>
          <BulletList
            items={[
              'Venue research and shortlisting',
              'Capacity and layout considerations',
              'Availability and scheduling',
              'Setup and breakdown timing',
              'Vendor access and loading arrangements',
              'Guest arrival and movement',
              'Coordination with venue representatives',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="4">Event Design and Theme Development</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Event design is more than choosing attractive decorations. The planner helps connect the
            theme, décor, furniture, lighting, stage or focal areas, signage, tables, and guest
            experience into one consistent look.
          </p>
          <figure className="mb-6">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border/40 shadow-lg">
              <Image
                src="/images/blog/what-does-an-event-planner-do/florals.jpg"
                alt="Pink and white rose centerpiece with a table card reading Good Events Create Great Memories"
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground mt-2">
              One design direction can carry through florals, lighting, tables, and guest details.
            </figcaption>
          </figure>
          <div className="p-5 rounded-2xl bg-muted/40 border border-border">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
              Practical example
            </span>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              For a modern birthday celebration, one design direction can be carried through the
              backdrop, tablescape, lighting, cake area, signage, seating, and photo area so the
              event feels connected rather than pieced together.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading number="5">Vendor Selection and Coordination</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Events often involve several vendors. Vendor coordination covers catering, décor,
            entertainment, photography, videography, and production — and it is more than collecting
            names. It means confirming requirements, timing, responsibilities, access, setup,
            communication, and changes so different teams can work together.
          </p>
          <ProcessFlow
            eyebrow="Vendor coordination in practice"
            title="SHORTLIST → CONFIRM → SCHEDULE → CONNECT → CHECK"
            description="Vendor coordination is a sequence, not a single booking."
            steps={[
              { name: 'SHORTLIST', detail: 'Find suitable providers' },
              { name: 'CONFIRM', detail: 'Scope, cost, and availability' },
              { name: 'SCHEDULE', detail: 'Setup and arrival timing' },
              { name: 'CONNECT', detail: 'Share event requirements' },
              { name: 'CHECK', detail: 'Confirm before event day' },
            ]}
          />
          <BulletList
            items={[
              'Catering',
              'Décor and floral services',
              'Photography and videography',
              'DJs and live entertainment',
              'Audio-visual and production teams',
              'Transportation',
              'Invitations and guest-management support',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="6">Budget Planning and Tracking</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            A useful event plan connects the client&apos;s budget with their priorities. The planner
            can organize expected costs, deposits, vendor commitments, and changes so the client can
            understand how decisions affect the overall plan.
          </p>
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">
            Questions to discuss early
          </h3>
          <BulletList
            items={[
              'What is the overall budget range?',
              'Which parts of the event matter most?',
              'Which services are essential?',
              'Where is there flexibility?',
              'What deposits or payment milestones apply?',
              'Are there venue or vendor restrictions that affect cost?',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="7">Guest Management</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Guests experience an event through many small details: invitations, arrival, seating,
            food service, directions, timing, entertainment, and transitions. Planning these details
            helps the event feel organized.
          </p>
          <BulletList
            items={[
              'Invitation and RSVP coordination',
              'Guest list organization',
              'Arrival or registration flow where applicable',
              'Seating and table planning',
              'Guest information and directions',
              'Special guest requirements',
              'Guest communication and concierge support for destination events',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="8">Destination Event Coordination</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            <Link href="/services#destination-weddings" className={linkClass}>
              Destination events
            </Link>{' '}
            add another layer of logistics because guests, venues, vendors, and schedules may be
            spread across locations. AS Events lists destination expertise, travel and accommodation
            coordination, local vendor partnerships, legal documentation assistance, multi-day
            planning, and guest concierge services.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            The goal is to connect the event plan with travel and location logistics so guests know
            where to go, vendors know when and where to work, and the event schedule remains
            practical.
          </p>
        </section>

        <section className="mb-12">
          <SectionHeading number="9">Corporate Event Planning</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            <Link href="/services#corporate-events" className={linkClass}>
              Corporate events
            </Link>{' '}
            often have objectives beyond celebration. They may support a conference, networking
            program, team activity, awards event, brand activation, or professional guest experience.
            Different event types have different details, but the planning framework stays connected.
          </p>
          <ProcessFlow
            eyebrow="Destination, corporate, and social events"
            title="GOAL → PEOPLE → PLACE → PRODUCTION → EXPERIENCE"
            description="The same core process applies whether the event is a destination celebration, a corporate program, or a social gathering."
            steps={[
              { name: 'GOAL', detail: 'Why is the event happening?' },
              { name: 'PEOPLE', detail: 'Guests, team, and speakers' },
              { name: 'PLACE', detail: 'Venue, travel, or access' },
              { name: 'PRODUCTION', detail: 'Food, décor, AV, and entertainment' },
              { name: 'EXPERIENCE', detail: 'Flow, timing, and special moments' },
            ]}
          />
          <BulletList
            items={[
              'Conference and summit planning',
              'Team-building events',
              'Award ceremonies',
              'Networking events',
              'Brand activation',
              'Audio-visual production',
              'Registration and attendee flow',
              'Stage and presentation coordination',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="10">Birthday and Anniversary Events</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Social events can be highly personal. A planner can coordinate the creative and
            operational details while keeping the event connected to the client&apos;s story — whether
            that is a{' '}
            <Link href="/services#birthday-celebrations" className={linkClass}>
              birthday celebration
            </Link>{' '}
            or an{' '}
            <Link href="/services#anniversary-events" className={linkClass}>
              anniversary event
            </Link>
            .
          </p>
          <BulletList
            items={[
              'Custom theme design',
              'Entertainment booking',
              'Catering coordination',
              'Photography and videography',
              'Invitations and RSVP management',
              'Party favors and gifts',
              'Renewal-of-vows ceremonies',
              'Memory-lane installations',
              'Custom video tributes',
              'Elegant dining and guest coordination',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="11">What Happens on Event Day?</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Event-day execution is where planning becomes real. Several activities may happen at the
            same time, so someone needs to keep the timeline, vendors, venue, program, and guest
            experience aligned.
          </p>
          <ProcessFlow
            eyebrow="Event-day coordination"
            title="VENUE → VENDORS → PROGRAM → GUESTS → BACKUP"
            description="The planner keeps venue, vendors, program, guests, and unexpected changes aligned."
            steps={[
              { name: 'VENUE', detail: 'Access and setup' },
              { name: 'VENDORS', detail: 'Arrival and timing' },
              { name: 'PROGRAM', detail: 'Cues and transitions' },
              { name: 'GUESTS', detail: 'Arrival and comfort' },
              { name: 'BACKUP', detail: 'Problems and changes' },
            ]}
          />
          <BulletList
            items={[
              'Vendor arrival and setup',
              'Décor installation',
              'Catering readiness',
              'Entertainment and production checks',
              'Photography and videography coordination',
              'Guest arrival',
              'Program transitions and special moments',
              'Timeline monitoring',
              'Problem-solving and communication',
              'Breakdown and final coordination',
            ]}
          />
          <div className="p-5 rounded-2xl bg-muted/40 border border-border">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
              Practical example
            </span>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              While guests are arriving, the catering team may be preparing service, the photographer
              may be capturing details, entertainment may be checking equipment, and décor teams may
              be completing final touches. The planner or event team coordinates these moving parts.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading number="12">Why Hire a Professional Event Planner?</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            The value of an event planner is often the organization and coordination they bring to a
            complicated process. A client may know exactly how they want the event to feel without
            wanting to manage every operational detail.
          </p>
          <BulletList
            items={[
              'A structured planning process',
              'Help comparing venues and services',
              'Vendor communication and coordination',
              'Support with event design',
              'Guest and logistics coordination',
              'A clearer event timeline',
              'Event-day management and problem solving',
            ]}
          />
        </section>

        <section className="mb-12">
          <SectionHeading number="13">
            What an Event Planner Does Not Automatically Mean
          </SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Event planning services can vary. A planner may coordinate a service without directly
            supplying that service. For example, coordinating photography is different from being the
            photographer. The same distinction can apply to catering, décor, entertainment,
            transportation, and production.
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
              Always confirm the scope
            </span>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Before booking, ask which services are included, which are coordinated through outside
              vendors, who will be present on event day, how fees are structured, and which
              responsibilities remain with the client.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading number="14">Questions to Ask Before Hiring</SectionHeading>
          <ol className="space-y-2.5 text-sm text-foreground/90">
            {[
              'What types of events do you regularly plan?',
              'What services are included in your package?',
              'Will you help with venue selection?',
              'How do you coordinate vendors?',
              'Who will be my main point of contact?',
              'Will your team be present on event day?',
              'How do you build and manage the event timeline?',
              'How do you handle changes or unexpected issues?',
              'How are planning fees and vendor costs structured?',
              'What information do you need to prepare a proposal?',
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <SectionHeading number="15">Simple Event Planning Checklist</SectionHeading>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            Start with the client&apos;s vision and move through the coordinated planning process.
          </p>
          <BulletList
            items={[
              'Event vision and goals confirmed',
              'Guest count estimated',
              'Budget range established',
              'Venue selected',
              'Vendors identified and coordinated',
              'Design and theme confirmed',
              'Invitations and RSVPs managed',
              'Event timeline prepared',
              'Special requirements confirmed',
              'Event-day responsibilities assigned',
              'Backup plan discussed',
              'Final details reviewed',
            ]}
          />
        </section>

        <section className="mt-16 pt-10 border-t border-border">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                Ready to Start Planning Your Event?
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Share your plans with AS Events
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                An event planner is more than someone who arranges decorations. The role is about
                turning an idea into a coordinated experience — budget, venues, vendors, design,
                guests, timeline, and event-day details. Share your event type, preferred date,
                guest count, location, and planning requirements with AS Events to discuss the next
                steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button
                  onClick={() => openModal()}
                  className="bg-primary text-slate-950 font-bold hover:bg-primary/90 px-6 py-3 rounded-xl shadow-lg"
                >
                  <Sparkles size={16} className="mr-2" />
                  Plan Your Event
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-white/10 hover:text-white rounded-xl"
                >
                  <Link href="/contact" className="flex items-center gap-1.5">
                    <span>Contact AS Events</span>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
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
