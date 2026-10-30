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
  Sliders,
  DollarSign,
  Scale,
  Zap,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, weddingPlannerVsDiyFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('wedding-planner-vs-diy-wedding-planning')
const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

interface ComparisonRow {
  consideration: string
  diy: string
  planner: string
  highlight?: boolean
}

const comparisonTable: ComparisonRow[] = [
  {
    consideration: 'Upfront planning fee',
    diy: 'May avoid a planner fee; budget allocated directly to suppliers',
    planner: 'Pays an agreed professional service fee for planning/coordination',
  },
  {
    consideration: 'Time commitment',
    diy: 'Couple & family research, evaluate, follow up and confirm all tasks (100–250+ hours)',
    planner: 'Agreed responsibilities delegated; couple attends structured review meetings',
    highlight: true,
  },
  {
    consideration: 'Creative decisions',
    diy: 'Direct couple-led decisions communicated directly to each individual vendor',
    planner: 'Couple approves curated options, color palettes, and professional proposals',
  },
  {
    consideration: 'Vendor contracts',
    diy: 'Couple reviews clauses, tracks payment schedules, and ensures terms align independently',
    planner: 'Planner reviews scope, flags hidden charges, checks overtime clauses and coordinates contracts',
    highlight: true,
  },
  {
    consideration: 'Stress and backup',
    diy: 'Couple and appointed relatives troubleshoot problems, rain contingencies, and supplier delays',
    planner: 'Professional team executes pre-agreed contingency plans, escalation protocols, and backups',
    highlight: true,
  },
  {
    consideration: 'Wedding-day operations',
    diy: 'A reliable non-couple lead or family coordinator must be appointed to direct deliveries',
    planner: 'On-site coordination team manages vendor arrivals, sound-checks, timelines, and transitions',
  },
  {
    consideration: 'Best fit',
    diy: 'Simpler celebrations, single-venue events, ample free time, strong family organization',
    planner: 'Multi-function weddings, destination celebrations, large guest counts, busy professionals',
  },
]

interface DecisionCard {
  title: string
  question: string
  diyFit: string
  plannerFit: string
  icon: any
}

const decisionFactors: DecisionCard[] = [
  {
    title: '1. Available Time',
    question: 'How many hours per week can you realistically dedicate to planning?',
    diyFit: '10–15+ free hours weekly across 6–9 months, flexible work hours to take vendor calls during business hours.',
    plannerFit: 'Demanding work schedules, business travel, living in a different city or country from the wedding location.',
    icon: Timer,
  },
  {
    title: '2. Stress & Change Tolerance',
    question: 'How comfortable are you managing vendor problems and changing plans under time pressure?',
    diyFit: 'Calm under pressure, decisive, naturally enjoy detailed organization, spreadsheets, and supplier negotiation.',
    plannerFit: 'Prefer protecting emotional energy for rituals and guests; want an experienced buffer handling complications.',
    icon: ShieldCheck,
  },
  {
    title: '3. Event Complexity',
    question: 'How many functions, separate venues, suppliers, and guest movements are involved?',
    diyFit: 'Single-venue celebration, 1–2 events, under 150 guests, straightforward local vendor footprint.',
    plannerFit: 'Multi-day Indian wedding (Haldi, Mehendi, Sangeet, Ceremony, Reception), destination logistics, 200+ guests.',
    icon: Layers,
  },
]

interface HandoverTask {
  id: string
  title: string
  owner: string
  timing: string
  category: string
}

const handoverChecklist: HandoverTask[] = [
  { id: 'h1', title: 'Master Wedding Run-of-Show Timeline', owner: 'Coordinator / Captain', timing: '2 Weeks Before', category: 'Schedule' },
  { id: 'h2', title: 'Itemized Vendor Contact Directory with On-Site Leads', owner: 'Lead Coordinator', timing: '1 Week Before', category: 'Vendors' },
  { id: 'h3', title: 'Venue Access Permissions & Loading Dock Windows', owner: 'Venue Liaison', timing: '5 Days Before', category: 'Logistics' },
  { id: 'h4', title: 'Decorator & Production Load-In Deadlines', owner: 'Production Lead', timing: 'Day Before / Morning', category: 'Décor' },
  { id: 'h5', title: 'Sound-Check & Lighting Preset Sign-Off', owner: 'AV Lead / Sound Tech', timing: '3 Hours Before', category: 'Production' },
  { id: 'h6', title: 'Sacred Ritual (Pooja Samagri) & Mandap Milestones', owner: 'Family Ritual Custodian', timing: '2 Hours Before', category: 'Ceremony' },
  { id: 'h7', title: 'Bridal & Groom Makeup Timing & Photography Window', owner: 'HMUA & Photo Lead', timing: 'Morning of Event', category: 'Beauty & Media' },
  { id: 'h8', title: 'Guest Transportation, Bus Dispatches & Valet Desks', owner: 'Hospitality Lead', timing: 'Ongoing Across Day', category: 'Hospitality' },
  { id: 'h9', title: 'Banqueting, Catering Buffets & Live Counter Clearances', owner: 'Catering Lead / F&B', timing: '1 Hour Before Meal', category: 'Catering' },
  { id: 'h10', title: 'Contractual Balances & Pre-Authorized Disbursals', owner: 'Couple / Family Banker', timing: 'Morning / End of Day', category: 'Payments' },
  { id: 'h11', title: 'Emergency Contact Directory & Weather Contingency', owner: 'On-Site Lead', timing: 'Pre-Agreed', category: 'Contingency' },
  { id: 'h12', title: 'Decision-Maker Hierarchy & Pre-Approved Expense Limit', owner: 'Designated Representative', timing: 'Pre-Agreed', category: 'Governance' },
]

export function WeddingPlannerVsDiyContent() {
  const { openModal } = useQuoteModal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({})

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }

  return (
    <article className="py-12 bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. Official Article Header with Monogram Logo & Single H1 */}
      {article && (
        <ArticleHeader
          post={article}
          badgeLabel="Wedding Planning Guide"
          shareTitle="Wedding Planner vs. DIY Wedding Planning | AS Event Management"
        />
      )}

      {/* 2. Featured Hero Image (16:10 aspect, clean, no embedded logos) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/60 bg-muted">
          <Image
            src="/images/blog/wedding-planner-vs-diy-wedding-planning/hero.jpg"
            alt="Couple comparing DIY wedding planning with professional wedding planner support"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3 italic">
          Weighing hands-on creative ownership against structured professional execution to create a joyful, memorable Indian wedding celebration.
        </p>
      </div>

      {/* 3. Core Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed text-base sm:text-lg">
        {/* Quick Answer Summary Box */}
        <section
          aria-labelledby="quick-answer-title"
          className="p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 id="quick-answer-title" className="text-base font-bold text-foreground">
              Quick Answer: Wedding Planner vs DIY
            </h2>
          </div>
          <p className="text-foreground/90 font-medium leading-relaxed mb-4">
            <strong>DIY wedding planning</strong> means the couple or family manages vendors, budgets, contracts, and timelines themselves. A <strong>professional wedding planner</strong> takes contractual responsibility for agreed planning, coordination, and on-site execution tasks.
          </p>
          <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-4">
            Neither option is automatically cheaper or universally better. The right choice depends on your available time, wedding complexity, support system, and how much event-day operational responsibility you want to delegate so you can fully enjoy celebrating with your loved ones.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-foreground/80 font-medium">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              <span><strong>DIY:</strong> Maximum creative ownership for simpler, smaller celebrations.</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              <span><strong>Hybrid:</strong> DIY creative decisions paired with event-day coordination.</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-card/60 border border-border/40">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              <span><strong>Full Planning:</strong> End-to-end management for multi-day &amp; destination weddings.</span>
            </div>
          </div>
        </section>

        {/* Section: What Does DIY Mean in Wedding Planning? */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            What Does DIY Mean in Wedding Planning?
          </h2>
          <p>
            DIY stands for &ldquo;Do It Yourself.&rdquo; In the context of <Link href="/services/wedding-planning" className={linkClass}>Indian wedding planning</Link>, it means the couple—frequently with enthusiastic support from close family and friends—takes direct responsibility for organizing the entire celebration instead of contracting a full-service wedding planner. You choose the venue, establish the budget ceiling, negotiate directly with suppliers, schedule payments, make design selections, and ensure every milestone stays on schedule.
          </p>
          <p>
            Crucially, <strong>DIY does not mean doing every wedding task with your own hands</strong>. You do not need to cook hundreds of banquet meals, sew your bridal lehengas, or construct a heavy floral mandap yourself. You can still hire premier caterers, floral decorators, choreographers, and cinematographers. What makes an event &ldquo;DIY&rdquo; is that the couple acts as the central project management team connecting those separate pieces together.
          </p>
          <p>
            For example, imagine a wedding featuring a home Haldi, a vibrant Mehendi at a banquet hall, and an evening Reception at an outdoor lawn. A DIY couple evaluates each layout, compares supplier proposals, pays separate advances, confirms arrival times, and delegates setup monitoring to cousins or siblings. If two suppliers disagree about setup access, the family must resolve the conflict. By contrast, hiring professional <Link href="/services" className={linkClass}>wedding planning services</Link> delegates that coordination under a defined written contract.
          </p>
        </section>

        {/* Section: DIY or Professional Wedding Planner? */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            DIY or Professional Wedding Planner?
          </h2>
          <p>
            DIY wedding planning is frequently a rewarding choice for couples planning an intimate, focused celebration who have generous free time, love research, and can reliably manage logistical details. A <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>professional wedding planner</Link> becomes invaluable when a celebration involves multiple rituals, hundreds of guests, hotel accommodations, production requirements, or demanding work careers that leave little room for daytime supplier follow-up.
          </p>
          <p>
            Neither option is automatically stress-free. DIY removes a planner fee but places the administrative and operational workload entirely on the couple and their family. Conversely, hiring a planner adds a professional fee but does not remove all couple involvement—major budget approvals and creative decisions still rest with the bride and groom.
          </p>
          <p>
            The secret is agreeing on the management framework before signing major venue contracts: decide early who owns the budget, who approves changes, who communicates with vendors, and who oversees operations on the wedding day.
          </p>
        </section>

        {/* Section 1: Why the Wedding Planner vs DIY Decision Matters */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            1. Why the Wedding Planner vs DIY Decision Matters
          </h2>
          <p>
            The joyful excitement of an engagement quickly transitions into a complex sequence of real decisions. Couples must set dates, estimate guest numbers, secure venues, finalize menus, book photographers, coordinate family outfits, design invitations, and disburse advances. Every choice directly influences the next: guest count dictates hall size, venue policies dictate catering terms, and ceremony timings dictate photographer coverage.
          </p>
          <p>
            In a DIY approach, you or trusted family members become the primary coordinators. You compare proposals, track milestone dates, and manage vendor communication. With professional <Link href="/services/wedding-planning" className={linkClass}>wedding planning services</Link>, you delegate agreed responsibilities while maintaining full authority over budget caps and stylistic themes.
          </p>

          {/* Infographic 1: Chain of Decisions */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/chain-of-decisions.jpg"
                alt="Wedding Planner vs DIY: It's not just a day — it's a chain of decisions"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 1: Wedding planning is a sequence of dependent decisions—from guest count and venue rules to sound-checks and ceremony milestones.
              </p>
            </div>
          </div>

          <p>
            Equally important is event-day execution: when vendors arrive at 6:00 AM, deliveries roll in, and unforeseen hiccups arise, someone must be available to coordinate while the couple is getting ready or participating in sacred rituals. Choosing between DIY and a professional planner determines who carries that operational mantle.
          </p>
        </section>

        {/* Section 2: The Appeal of DIY Wedding Planning */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            2. The Appeal of DIY Wedding Planning
          </h2>
          <p>
            DIY wedding planning holds strong appeal for couples who love curating aesthetic details and want every aspect of their celebration to reflect their personal touch. It offers distinct benefits when approached with realistic preparation.
          </p>

          {/* Infographic 2: Appeal of DIY */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/appeal-of-diy.jpg"
                alt="The Appeal of DIY Wedding Planning: Full Creative Control, Potential Cost Savings, and Meaningful Bonding"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 2: The three primary appeals of DIY wedding planning—creative freedom, fee savings, and shared family collaboration.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground">
              Full Creative Control
            </h3>
            <p>
              When planning independently, creative ideas flow directly from the couple to artisans and decorators without intermediary filters. You specify the exact marigold shade, design custom digital invitation suites, curate the Sangeet playlist, and tailor rituals. For couples with distinct design sensibilities, translating personal vision into actionable vendor briefs provides immense creative satisfaction.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground">
              Potential Cost Savings
            </h3>
            <p>
              Self-planning eliminates the professional fee charged by a full-service planning agency. For couples with a modest overall budget, saving that fee may free up capital for an elevated dining menu, an upgraded photography package, or luxurious bridal attire. However, as explored below in the true cost comparison, third-party expenses for venue, catering, and décor remain fixed regardless of who books them.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground">
              A Meaningful Bonding Experience
            </h3>
            <p>
              Collaborating on menu tastings, visiting heritage venues, and hand-crafting wedding favors can create cherished engagement memories. Working through compromises and budgets provides couples with early practice in shared decision-making. Families also enjoy uniting to organize traditional rituals like Haldi and Mehendi when tasks are clear and unhurried.
            </p>
          </div>
        </section>

        {/* Section 3: The Challenges and Hidden Work of DIY Planning */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            3. The Challenges and Hidden Work of DIY Planning
          </h2>
          <p>
            The flip side of DIY wedding planning is the sheer volume of logistical follow-up required. Many couples discover that the romantic excitement of curating Pinterest mood boards represents only 15% of the total workload; the remaining 85% is rigorous project administration.
          </p>

          {/* Infographic 3: DIY Invisible Workload */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/diy-invisible-workload.jpg"
                alt="What does DIY wedding planning actually require? The invisible workload: Research, Administration, Coordination, Execution"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 3: The four distinct workstreams of DIY wedding planning that demand ongoing personal time and energy.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">01. Research Workload</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Sourcing licensed vendors, reading contracts, comparing quotes line-by-line, verifying equipment inclusions, and visiting venues during business hours.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">02. Administration</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Tracking payment installments, monitoring guest RSVPs, securing police and sound permits, verifying power generator rentals, and updating spreadsheets.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Workflow className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">03. Coordination</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting disjointed suppliers: aligning décor installation hours with venue access, ensuring DJ sound-checks do not disturb rituals, and scheduling bus transfers.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">04. Execution</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Managing live event-day deliveries, directing staff, troubleshooting rain emergencies, ushering VIPs, and approving overtime charges on the spot.
              </p>
            </div>
          </div>

          <p>
            Without dedicated coordination, decision fatigue can set in during the final 30 days. When delivery delays occur or contracts overlap, the burden falls directly on the couple or designated family elders, pulling their attention away from the joy of the rituals.
          </p>
        </section>

        {/* Section 4: What a Professional Wedding Planner Can Do */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            4. What a Professional Wedding Planner Can Do
          </h2>
          <p>
            A professional wedding planner brings operational discipline, proven vendor networks, and project management structure to your wedding. Rather than dictating your taste, an experienced planner acts as an executive producer who translates your goals into structured milestones.
          </p>

          {/* Infographic 4: Planner Scope & Workflow */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/planner-scope-workflow.jpg"
                alt="What a professional wedding planner can manage: Vision, Vendor Sourcing, Planning, and Execution"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 4: Core service capabilities of professional wedding planning agencies.
              </p>
            </div>
          </div>

          <p>
            Typical full-service responsibilities include:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm sm:text-base text-foreground/90">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>Comprehensive budget allocation &amp; expense tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>Venue sourcing, contract review &amp; date negotiation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>Vetted supplier sourcing &amp; apples-to-apples price comparison</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>Theme design, 3D layouts &amp; production blueprints</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>Master run-of-show schedule for family and all vendors</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>On-site event execution, vendor lead-in &amp; emergency resolution</span>
            </li>
          </ul>

          {/* Infographic 5: Consultation Checklist */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/planner-consultation-checklist.jpg"
                alt="Event Planning Checklist: Deliverables, Staffing, Changes, Emergency support"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 5: Essential points to clarify before hiring: package deliverables, assigned on-site staff, change procedures, and live emergency support.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/60 bg-muted/20">
            <h4 className="font-serif font-bold text-foreground mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Boundaries of Professional Service
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A wedding planner coordinates and supervises suppliers but does not automatically disburse vendor payments from their own funds, guarantee third-party performance, or offer unlimited design revisions without pre-agreed terms. Always request a clear written scope of work detailing staffing numbers, meeting limits, and covered functions before signing.
            </p>
          </div>
        </section>

        {/* Section 5: Benefits of a Professional Wedding Planner */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            5. Benefits of a Professional Wedding Planner
          </h2>
          <p>
            Partnering with an experienced wedding planner provides valuable operational advantages that elevate both the planning journey and the celebration itself.
          </p>

          {/* Infographic 6: Planning Phases */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/planning-phases.jpg"
                alt="Four core phases of professional planning: Vision & Ideas, Vendor Sourcing, Planning & Coordination, Execution"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 6: The four systematic phases that professional planners execute to ensure flawless delivery.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground">
              Expertise and Steadier Problem-Solving
            </h3>
            <p>
              Seasoned planners recognize timing bottlenecks and venue constraints before they materialize. For example, if an evening Sangeet setup cannot begin until an afternoon corporate luncheon clears the hall, a planner coordinates early loading with production teams to prevent schedule slippage. When unexpected weather strikes an open lawn ceremony, a prepared team implements pre-arranged rain contingencies calmly without distressing the family.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground">
              Vendor Research and Industry Knowledge
            </h3>
            <p>
              Planners maintain ongoing relationships with caterers, decorators, audio engineers, and photographers. They understand fair market pricing and ensure that competing proposals are compared on an identical baseline: staffing ratios, equipment wattage, overtime rates, taxes, and cancellation clauses. This prevents couples from being misled by artificially low quotes that exclude crucial equipment or labor.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground">
              Budget Organization and Guest Experience
            </h3>
            <p>
              An organized budget framework links spending decisions: expanding the guest list from 250 to 350 affects catering, seating, valet staff, and invitation gifts simultaneously. A planner keeps these ripple effects visible. Furthermore, smooth guest hospitality—clear signage, shaded seating for grandparents, timely transitions between pheras and dinner—creates an effortless atmosphere that guests remember warmly.
            </p>
          </div>
        </section>

        {/* Section 6: Wedding Planner vs DIY: A Fair Comparison */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            6. Wedding Planner vs DIY: A Fair Comparison
          </h2>
          <p>
            To evaluate your choices objectively, consider how responsibilities are distributed under each planning model. Neither approach is universally superior; each aligns with different priorities, wedding formats, and personal availability.
          </p>

          {/* Responsive Comparison Table */}
          <div className="my-8 rounded-2xl border border-border/60 overflow-hidden shadow-xl bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-primary/10 border-b border-border/60">
                    <th className="py-4 px-4 sm:px-6 font-serif font-bold text-foreground text-sm uppercase tracking-wider w-1/4">
                      Consideration
                    </th>
                    <th className="py-4 px-4 sm:px-6 font-serif font-bold text-primary text-sm uppercase tracking-wider w-3/8">
                      DIY Wedding Planning
                    </th>
                    <th className="py-4 px-4 sm:px-6 font-serif font-bold text-foreground text-sm uppercase tracking-wider w-3/8">
                      Professional Wedding Planner
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {comparisonTable.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? 'bg-primary/[0.03] hover:bg-primary/[0.06] transition-colors' : 'hover:bg-muted/40 transition-colors'}
                    >
                      <td className="py-4 px-4 sm:px-6 font-bold text-foreground align-top">
                        {row.consideration}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-foreground/80 align-top">
                        {row.diy}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-foreground/90 font-medium align-top">
                        {row.planner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-muted/20 border-t border-border/40 text-xs text-muted-foreground text-center">
              Table 1: Responsibility comparison between DIY self-planning and hiring professional wedding planning services.
            </div>
          </div>

          <p>
            When examining this comparison, remember that the true deciding factor is often accountability: when multiple logistical issues occur simultaneously, who is empowered and available to solve them while you participate in the celebration?
          </p>
        </section>

        {/* Section 7: How to Compare the True Cost of Both Approaches */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            7. How to Compare the True Cost of Both Approaches
          </h2>
          <p>
            A common misconception is that DIY wedding planning eliminates event costs. In reality, you must distinguish between <strong>third-party wedding expenses</strong> (which exist under both models) and the <strong>professional planning fee</strong>.
          </p>

          {/* Infographic 7: True Cost Comparison */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/true-cost-comparison.jpg"
                alt="Compare the Full Cost, Not Only the Planner Fee: Third-Party Costs vs Planning Fee"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 7: Separating fixed third-party costs from professional planning and coordination fees.
              </p>
            </div>
          </div>

          <p>
            Third-party expenses include venue rental, catering per plate, floral and stage décor, AV and lighting production, photography and cinematography, bridal attire, invitations, and guest travel. These charges are billed directly by suppliers regardless of whether you or a planner booked them. To evaluate costs accurately, consider:
          </p>
          <ul className="space-y-2 text-foreground/85">
            <li className="flex items-start gap-2">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>The Value of Personal Time:</strong> A typical Indian wedding requires 150 to 300 hours of coordination. For busy professionals, taking time off work or spending evenings managing contracts represents a tangible personal investment.</span>
            </li>
            <li className="flex items-start gap-2">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Contractual Gaps &amp; Rush Fees:</strong> Missing generator requirements, unverified sound permissions, or overlooked load-in overtime can trigger emergency fees that surpass the cost of professional coordination.</span>
            </li>
          </ul>

          {/* Hypothetical ₹15 Lakh Budget Example */}
          <div className="p-6 sm:p-8 rounded-2xl border border-primary/30 bg-primary/5 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase">
              <Coins className="w-5 h-5" />
              <span>Hypothetical Example: Evaluating a ₹15 Lakh Wedding Budget</span>
            </div>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              Consider a couple working with an illustrative ₹15 Lakh wedding budget:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm font-medium">
              <div className="p-4 rounded-xl bg-card border border-border/60">
                <h5 className="font-bold text-foreground mb-2">DIY Allocation Scenario</h5>
                <ul className="space-y-1 text-muted-foreground text-xs sm:text-sm">
                  <li>• Venue &amp; Catering: ₹8,00,000</li>
                  <li>• Décor &amp; Florals: ₹3,50,000</li>
                  <li>• Photography &amp; Video: ₹1,80,000</li>
                  <li>• Outfits &amp; Jewelry: ₹1,20,000</li>
                  <li>• Contingency &amp; Misc: ₹50,000</li>
                  <li className="pt-2 font-bold text-foreground border-t border-border/40">• Total Outlay: ₹15,00,000</li>
                  <li className="text-primary text-xs italic">• Planning Fee: ₹0 (Couple manages 200+ hrs)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/60">
                <h5 className="font-bold text-foreground mb-2">Professional Allocation Scenario</h5>
                <ul className="space-y-1 text-muted-foreground text-xs sm:text-sm">
                  <li>• Venue &amp; Catering: ₹7,50,000</li>
                  <li>• Décor &amp; Production: ₹3,20,000</li>
                  <li>• Photography &amp; Video: ₹1,60,000</li>
                  <li>• Outfits &amp; Jewelry: ₹1,20,000</li>
                  <li>• Professional Planning / Coordination: ₹1,00,000</li>
                  <li className="pt-2 font-bold text-foreground border-t border-border/40">• Total Outlay: ₹15,00,000 (Within Cap)</li>
                  <li className="text-primary text-xs italic">• Outcome: Full on-site peace of mind</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic border-t border-primary/20 pt-3">
              <strong>Disclaimer:</strong> This is a purely hypothetical example provided for illustrative comparison only. It does not represent a standardized market quotation, fixed package rate, or universal wedding pricing for AS Event Management. For a comprehensive overview of real-world event budgeting in India, see our complete guide on <Link href="/blog/how-much-does-event-planning-cost-in-india" className={linkClass}>how much event planning costs in India</Link>.
            </p>
          </div>
        </section>

        {/* Section 8: The Middle Path: Partial Planning and Wedding-Day Coordination */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            8. The Middle Path: Partial Planning and Wedding-Day Coordination
          </h2>
          <p>
            Couples frequently assume their decision is all-or-nothing: either handle every single detail yourself or surrender everything to a full-service agency. In practice, the wedding industry offers a flexible, highly popular middle path: <strong>Hybrid Planning</strong>.
          </p>

          {/* Infographic 8: Hybrid Planning */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/hybrid-planning-option.jpg"
                alt="There is a third option: Hybrid Planning combining couple vision with professional execution"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 8: Hybrid planning empowers couples to retain personal creative decisions while delegating operational logistics.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border/60 bg-card space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-primary" />
                Partial Planning
              </h4>
              <p className="text-sm text-muted-foreground">
                Ideal for couples who have already booked their venue and core vendors but need an experienced partner to review contracts, manage budgets, source specialized production artisans, and structure the master timeline 2 to 3 months prior.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-primary" />
                Wedding-Day Coordination
              </h4>
              <p className="text-sm text-muted-foreground">
                Typically begins 4 to 6 weeks before the wedding. The coordinator conducts venue walkthroughs, consolidates vendor contracts, builds the minute-by-minute run-of-show, and manages all live logistics so family members can celebrate unburdened.
              </p>
            </div>
          </div>
          <p>
            For more details on when to engage coordination services, read our advice on <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>how early you should hire an event planner</Link>.
          </p>
        </section>

        {/* Section 9: Indian Weddings: When Complexity Changes the Answer */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            9. Indian Weddings: When Complexity Changes the Answer
          </h2>
          <p>
            Indian weddings are magnificent celebrations characterized by rich traditions, extended families, and multiple ceremonial events spread over several days. Each function carries unique staging, culinary, and logistical demands:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-border/60 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Ceremony 1</span>
              <h4 className="font-bold text-foreground mt-1">Haldi</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Lawn or courtyard venue; marigold florals, yellow dress code, water access, and casual brunch catering.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Ceremony 2</span>
              <h4 className="font-bold text-foreground mt-1">Mehendi</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Intimate lounge seating, specialized henna artists, folk music, interactive food counters, and custom favors.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Ceremony 3</span>
              <h4 className="font-bold text-foreground mt-1">Sangeet</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Extensive stage production, intelligent lighting, choreographed rehearsals, audio line-checks, and late evening dining.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Ceremony 4</span>
              <h4 className="font-bold text-foreground mt-1">Wedding / Pheras</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Sacred mandap construction, baraat procession, priest coordination, ceremonial pooja samagri, and emotional family transitions.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Ceremony 5</span>
              <h4 className="font-bold text-foreground mt-1">Reception</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Grand stage backdrop, multi-course banquet, formal guest flow, photographer portraits, and speech coordination.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/60 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Special Format</span>
              <h4 className="font-bold text-foreground mt-1">Destination Weddings</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Airport shuttles, room key allocations, hotel hospitality desks, out-of-town guest welcome hampers, and multi-venue changeovers.
              </p>
            </div>
          </div>

          <p>
            When ceremonies take place across multiple days or at separate venues, a delay in one function cascades into the next. For instance, if Mehendi runs 45 minutes late, sound-checks for Sangeet clash with hotel guest check-ins. If you are organizing a destination wedding or multi-ceremony celebration, explore our specialized <Link href="/services/destination-weddings" className={linkClass}>destination wedding planning services</Link> to ensure seamless transitions.
          </p>
        </section>

        {/* Section 10: How to Decide: Time, Stress and Complexity */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            10. How to Decide: Time, Stress and Complexity
          </h2>
          <p>
            To move from debate to a clear decision, evaluate your wedding plans against three objective criteria: <strong>Time</strong>, <strong>Stress Tolerance</strong>, and <strong>Event Complexity</strong>.
          </p>

          {/* Infographic 9: Decision Framework */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/decision-framework.jpg"
                alt="Three Questions to Choose Your Planning Approach: Time, Stress, Complexity"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 9: The three-pillar framework for choosing DIY, partial coordination, or full-service planning.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {decisionFactors.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="p-6 rounded-2xl border border-border/60 bg-card space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Icon className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm font-medium text-foreground/90 italic">{item.question}</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                      <strong className="text-primary block mb-1">Favors DIY Planning:</strong>
                      <span className="text-muted-foreground">{item.diyFit}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                      <strong className="text-foreground block mb-1">Favors Professional Planning:</strong>
                      <span className="text-muted-foreground">{item.plannerFit}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 11: A Practical Recommendation for Different Couples */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            11. A Practical Recommendation for Different Couples
          </h2>
          <p>
            Every couple brings a distinct combination of budget, schedule, and family support. Here is a practical roadmap to match your profile to the right planning approach:
          </p>

          {/* Infographic 10: Decision Flow */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/decision-flow.jpg"
                alt="A Simple Decision Guide: DIY Planning, Partial Planning, or Full-Service Planning"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 10: Simple roadmap guiding couples to the appropriate service tier based on wedding scale and availability.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <h4 className="font-bold text-foreground mb-1">Scenario A: The Organized, Local Celebration (DIY)</h4>
              <p className="text-sm text-foreground/85">
                Single banquet or community hall, guest count under 150, straightforward vendor count, ample personal free time, and an enthusiastic sibling or relative available to supervise setup on event day.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h4 className="font-bold text-foreground mb-1">Scenario B: The Busy Couple Seeking Creative Ownership (Hybrid)</h4>
              <p className="text-sm text-muted-foreground">
                2 to 3 functions, 150–350 guests. The couple personally chooses the aesthetic theme, bridal attire, and core caterer, but hires an event-day coordinator 6 weeks before to lock down timings and run on-site execution.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h4 className="font-bold text-foreground mb-1">Scenario C: The Multi-Day, Destination or Large Celebration (Full Planning)</h4>
              <p className="text-sm text-muted-foreground">
                4+ ceremonies, palace or resort destination, out-of-town guests requiring hospitality and shuttles, demanding professional careers. A full-service wedding planner handles the logistics from day one.
              </p>
            </div>
          </div>
          <p>
            For a step-by-step checklist to guide your milestones regardless of which approach you select, see our <Link href="/blog/complete-event-planning-checklist" className={linkClass}>complete event planning checklist</Link>.
          </p>
        </section>

        {/* Section 12: Planning Handover: Who Is in Charge on the Wedding Day? */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            12. Planning Handover: Who Is in Charge on the Wedding Day?
          </h2>
          <p>
            Regardless of whether you plan independently or hire an agency, an explicit <strong>operational handover</strong> is mandatory. On your wedding day, the bride and groom must not be taking calls about generator placements, parking permits, or flower delivery delays.
          </p>

          {/* Infographic 11: Planning Handover */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/planning-handover.jpg"
                alt="Who Handles Each Task—Before and on the Day?"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 11: Delineating pre-event planning ownership from on-site live execution responsibilities.
              </p>
            </div>
          </div>

          {/* Infographic 13: From Idea to Event Day */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/idea-to-event-day.jpg"
                alt="From idea to event day: Clear owners and deadlines (Brief & budget, Contracts, Confirmations, Event-day lead)"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 12: Establishing owners and deadlines across each milestone from initial brief to live execution.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-foreground text-lg flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" />
                Wedding-Day Handover Pack Checklist
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {Object.values(checkedTasks).filter(Boolean).length} of {handoverChecklist.length} Confirmed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Ensure this handover document is compiled and delivered to your on-site lead (or family captain) at least one week before the wedding:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 pt-2">
              {handoverChecklist.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  type="button"
                  className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all ${
                    checkedTasks[task.id]
                      ? 'bg-primary/10 border-primary/40 text-foreground'
                      : 'bg-muted/20 border-border/40 text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                      checkedTasks[task.id]
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-muted-foreground/40 bg-card'
                    }`}
                  >
                    {checkedTasks[task.id] && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-foreground block">
                      {task.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono block">
                      {task.owner} • {task.timing}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 13: Mistakes to Avoid With Either Planning Approach */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            13. Mistakes to Avoid With Either Planning Approach
          </h2>
          <p>
            Whether you choose to self-plan or hire full-service assistance, avoiding these common operational oversights will protect your budget, timeline, and emotional peace of mind:
          </p>

          {/* Infographic 12: Common Mistakes */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/common-mistakes.jpg"
                alt="Avoid These Common Planning Mistakes: Unclear budget, Verbal promises, No vendor lead, No backup plan, Incomplete contracts, Conflicting schedules"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 13: The most frequent wedding planning pitfalls and how proactive documentation prevents them.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                1. Relying on Verbal Agreements
              </h4>
              <p className="text-xs text-muted-foreground">
                Never accept verbal promises regarding setup timings, complimentary items, or overtime hours. Document every agreed inclusion in written email summaries or contract addendums.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                2. Overburdening Immediate Family
              </h4>
              <p className="text-xs text-muted-foreground">
                Assigning critical production roles to parents or siblings often ruins their ability to enjoy the wedding. Use paid staff or independent coordinators for high-stress operational tasks.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                3. Choosing Solely on Lowest Price
              </h4>
              <p className="text-xs text-muted-foreground">
                The lowest quotation frequently omits necessary equipment (power distribution, speaker stands, service waitstaff) that must be added later at inflated emergency rates.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-1.5">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                4. Hiring Without Scope Clarification
              </h4>
              <p className="text-xs text-muted-foreground">
                Assuming a &ldquo;full-service&rdquo; planner automatically covers guest hospitality, airport pickups, or post-event teardown without verifying contractual wording leads to bitter misunderstandings.
              </p>
            </div>
          </div>
          <p>
            For a deep dive into how planning responsibilities differ from operational coordination, read our comparison of <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>event planner vs event manager</Link>.
          </p>
        </section>

        {/* Section 14: Frequently Asked Questions */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            14. Frequently Asked Questions
          </h2>
          <p>
            Clear, authoritative answers to the most common questions couples ask when weighing DIY wedding planning against hiring professional support:
          </p>

          <div className="space-y-3 pt-2">
            {weddingPlannerVsDiyFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/60 bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    type="button"
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-foreground hover:text-primary transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-muted-foreground border-t border-border/40 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 15: Final Recommendation: Choose the Right Support, Not a Label */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
            15. Final Recommendation: Choose the Right Support, Not a Label
          </h2>
          <p>
            There is no single correct path in the wedding planner vs DIY debate. A DIY wedding can be intimate, delightfully unique, and budget-friendly when the celebration is manageable and the couple possesses the time and organization to execute it. Conversely, a professional wedding planner provides invaluable structure, industry foresight, and calm accountability when the guest count, multi-day functions, or venue logistics demand experienced leadership.
          </p>

          {/* Infographic 16: Celebrate Within Your Plan */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <div className="relative aspect-[16/6] w-full">
              <Image
                src="/images/blog/wedding-planner-vs-diy-wedding-planning/celebrate-within-plan.jpg"
                alt="Celebrate within your plan: Set priorities, Request full quotes, Monitor commitments, Enjoy the event"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 bg-muted/30 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center font-medium">
                Figure 14: Clear budgeting and proactive planning make room for joyful celebrations.
              </p>
            </div>
          </div>

          <p>
            Before committing to vendor advances, sit down together and answer five practical questions:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-foreground/90 font-medium">
            <li>What are our non-negotiable priorities for this celebration?</li>
            <li>What is our realistic total financial ceiling?</li>
            <li>How many hours per week can we honestly dedicate to vendor calls and follow-ups?</li>
            <li>Who will oversee deliveries, sound-checks, and emergency decisions on the actual wedding day?</li>
            <li>Which specific responsibilities would we most prefer to delegate to an expert?</li>
          </ol>
          <p>
            Use those answers to choose DIY planning, partial planning, day-of coordination, or full-service management. The best decision is not the one dictated by social expectations, but the one that ensures you and your families can celebrate every sacred ritual with confidence, presence, and joy.
          </p>
        </section>

        {/* Client-Conversion Call to Action */}
        <section className="p-8 sm:p-10 rounded-2xl border border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl relative overflow-hidden my-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Wedding Planning Support
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight mb-4">
              Not Sure Whether to Plan Your Wedding Yourself or Hire Professional Support?
            </h2>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-8">
              Share your wedding date, location, guest count, functions, planning progress and priorities with AS Event Management. Our team can help you understand whether DIY planning, partial coordination or professional wedding planning support may fit your needs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openModal()}
                type="button"
                className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <span>Discuss Your Wedding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-card border border-border/80 text-foreground font-bold text-sm hover:bg-muted/60 transition-all"
              >
                Contact AS Event Management
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
