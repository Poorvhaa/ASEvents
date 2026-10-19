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
  Layers,
  Check,
  AlertCircle,
  ChevronDown,
  Building2,
  HeartHandshake,
  Timer,
  FileText,
  BadgeCheck,
  DollarSign,
  Calculator,
  Receipt,
  PieChart,
  Scale,
  AlertTriangle,
  ListChecks,
  Table as TableIcon,
  Coins,
  ShieldAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, eventBudgetFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('how-to-create-an-event-budget')

const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

interface BudgetCategory {
  name: string
  icon: any
  included: string
  planningTip: string
  typicalShare: string
}

const budgetCategories: BudgetCategory[] = [
  {
    name: 'Venue & Logistics',
    icon: Building2,
    included: 'Site rental fee, security, cleaning, setup/teardown hours, insurance, permits, and utilities.',
    planningTip: 'Always verify if overtime, trash disposal, load-in extensions, and equipment access are covered.',
    typicalShare: '15% – 25%',
  },
  {
    name: 'Food & Beverage',
    icon: Receipt,
    included: 'Plated meals, buffets, hors d’oeuvres, bar packages, service staff, barware, and dietary menus.',
    planningTip: 'Keep your headcount updated; service charges (18–24%) and catering taxes significantly impact totals.',
    typicalShare: '25% – 35%',
  },
  {
    name: 'Programming, AV & Tech',
    icon: Workflow,
    included: 'Sound systems, stage lighting, LED screens, streaming gear, projection, and on-site AV technicians.',
    planningTip: 'Request a dedicated technician line-item rather than assuming venue house systems run unassisted.',
    typicalShare: '10% – 15%',
  },
  {
    name: 'Décor, Floral & Styling',
    icon: Sparkles,
    included: 'Centerpieces, stage backdrops, entrance arches, floral arrangements, specialty linens, and ambient lighting.',
    planningTip: 'Repurpose ceremony flowers or stage florals for evening receptions to maximize visual impact.',
    typicalShare: '10% – 15%',
  },
  {
    name: 'Entertainment & Speakers',
    icon: Users,
    included: 'Live bands, DJs, master of ceremonies (emcee), keynote speakers, hospitality riders, and lodging.',
    planningTip: 'Review artist riders carefully for unexpected technical requirements, Green Room needs, or travel fees.',
    typicalShare: '8% – 12%',
  },
  {
    name: 'Marketing & Promotion',
    icon: FileText,
    included: 'Branding, invitations, event website, ticketing platforms, paid digital campaigns, signage, and badges.',
    planningTip: 'For private galas and weddings, prioritize luxury print/calligraphy; for summits, prioritize digital ads.',
    typicalShare: '3% – 7%',
  },
  {
    name: 'Staffing & Coordination',
    icon: HeartHandshake,
    included: 'Event planners, day-of coordinators, registration teams, security personnel, and guest ushers.',
    planningTip: 'Professional management saves thousands by negotiating vendor scope and preventing day-of crises.',
    typicalShare: '8% – 12%',
  },
  {
    name: 'Transportation & Logistics',
    icon: Timer,
    included: 'Guest shuttles, VIP transfers, valet parking, vendor delivery fees, and loading dock access passes.',
    planningTip: 'Schedule vendor load-in batches to prevent parking congestion and hourly delivery holding fees.',
    typicalShare: '3% – 5%',
  },
  {
    name: 'Administrative & Permits',
    icon: Calculator,
    included: 'Event insurance riders, music licensing (PPL/IPRS), municipal permits, and payment processing fees.',
    planningTip: 'Credit card and ticketing gateway fees (2–3.5%) add up quickly on large ticketed or paid events.',
    typicalShare: '2% – 4%',
  },
  {
    name: 'Contingency Reserve',
    icon: ShieldCheck,
    included: 'Dedicated safety buffer for unexpected operational needs, weather shifts, rush orders, and adjustments.',
    planningTip: 'Maintain a 10% to 15% reserve fund separate from operating expenses; never treat it as discretionary cash.',
    typicalShare: '10% – 15%',
  },
]

const hiddenCostItems = [
  'Taxes, service charges and gratuities (often 18% – 28% above base quote)',
  'Delivery, transportation and fuel surcharges',
  'Setup, load-in and late-night teardown labor fees',
  'Overtime penalties and extended venue operating hours',
  'Municipal permits, noise licenses and sound curfews',
  'Event liability insurance and third-party vendor certificates',
  'Equipment rental security deposits and replacement damage fees',
  'Last-minute printing, directional signage, badges and collateral',
  'Guest parking fees, valet staffing and shuttle waiting time',
  'Emergency day-of purchases and backup supplies',
  'Credit card merchant fees and ticketing payment gateway charges',
  'Power drops, electrical distribution and generator rentals',
]

const checklistData = [
  {
    category: 'Venue & Facilities',
    items: 'Base rental, damage deposit, cleaning fees, security guard mandate, load-in/load-out labor hours, power supply.',
    status: 'Essential',
  },
  {
    category: 'Catering & Beverages',
    items: 'Menu pricing per head, tasting fees, bar packages, bartending labor, cake cutting, glassware rentals, gratuity.',
    status: 'Essential',
  },
  {
    category: 'Technology & Audiovisual',
    items: 'PA systems, wireless mics, display screens, stage lights, live streaming, high-speed Wi-Fi, technicians.',
    status: 'High Priority',
  },
  {
    category: 'Marketing & Signage',
    items: 'Invitations, event website, badges, digital marketing, welcome banners, stage backdrops, print programs.',
    status: 'Medium Priority',
  },
  {
    category: 'Staffing & Management',
    items: 'Professional event planner, floor managers, registration hosts, security team, hospitality coordinators.',
    status: 'Essential',
  },
  {
    category: 'Décor & Styling',
    items: 'Floral centerpieces, stage décor, custom fabric draping, lounge furniture, lighting trusses, tabletop styling.',
    status: 'High Priority',
  },
  {
    category: 'Entertainment & Talent',
    items: 'Artist performance fees, rider hospitality, travel & hotel accommodations, DJ equipment, sound check time.',
    status: 'High Priority',
  },
  {
    category: 'Transportation & Access',
    items: 'Guest shuttles, VIP car services, parking validation, loading dock access, equipment freight trucks.',
    status: 'Medium Priority',
  },
  {
    category: 'Administrative & Legal',
    items: 'Liability insurance policy, entertainment licensing, merchant payment fees, contracts, office supplies.',
    status: 'Essential',
  },
  {
    category: 'Contingency Fund',
    items: '10% – 15% dedicated reserve buffer for weather contingencies, headcount surges, and emergency fixes.',
    status: 'Essential',
  },
]

const budgetTimelineSteps = [
  {
    timeframe: '12+ Months Before',
    badge: 'Foundation & Feasibility',
    title: 'Define Financial Ceiling & Core Objectives',
    description:
      'Identify every funding source (company allocation, sponsorship, personal funds), establish a firm financial ceiling, draft preliminary guest counts, and begin researching primary venues.',
  },
  {
    timeframe: '9 – 12 Months Before',
    badge: 'Venue & Anchor Contracts',
    title: 'Lock In Major Space & Primary Vendors',
    description:
      'Contract the venue, secure key anchor vendors (planner, production partner, marquee caterer), and record all initial deposit milestones and contract payment terms.',
  },
  {
    timeframe: '6 – 9 Months Before',
    badge: 'Category Allocations',
    title: 'Refine AV, Décor, Entertainment & Staffing',
    description:
      'Gather detailed written vendor proposals for audiovisual, styling, musicians, photographers, and guest hospitality. Compare quotes by total scope rather than headline rates.',
  },
  {
    timeframe: '3 – 6 Months Before',
    badge: 'Mid-Point Variance Review',
    title: 'Audit Committed Costs & Adjust Allocations',
    description:
      'Review actual signed contracts against preliminary estimates. If catering or production came in higher than anticipated, rebalance flexible categories or tap contingency cautiously.',
  },
  {
    timeframe: '1 – 3 Months Before',
    badge: 'Final Specifications',
    title: 'Finalize Floor Plans, Orders & Interim Balances',
    description:
      'Confirm detailed equipment orders, rental quantities, guest seating arrangements, print deliverables, and payment schedules for secondary milestone installments.',
  },
  {
    timeframe: 'Final 2 – 4 Weeks Before',
    badge: 'Headcount & Readiness',
    title: 'Lock Final Headcount & Balance Schedule',
    description:
      'Submit firm RSVP numbers to catering, verify load-in delivery windows to prevent overtime labor, review the contingency balance, and prepare scheduled final balance transfers.',
  },
  {
    timeframe: 'Event Day',
    badge: 'Live Operational Control',
    title: 'Supervise Deliveries & On-Site Expenditures',
    description:
      'Manage approved day-of purchases through the designated master budget owner. Guard against unplanned vendor add-ons without prior written consent.',
  },
  {
    timeframe: 'Post-Event Wrap-Up',
    badge: 'Reconciliation & ROI',
    title: 'Reconcile Final Invoices & Analyze Variance',
    description:
      'Audit all final vendor invoices, release security deposits, verify incidental charges, compute final variance percentages, and document financial lessons for future events.',
  },
]

const sampleSpreadsheetRows = [
  {
    category: 'Venue & Logistics',
    vendor: 'Grand Heritage Ballroom',
    description: 'Main hall rental, load-in block & cleanup',
    estimated: '₹4,50,000',
    quoted: '₹4,75,000',
    contracted: '₹4,60,000',
    actual: '₹4,60,000',
    deposit: '₹2,30,000',
    balance: '₹2,30,000',
    dueDate: '10 Days Prior',
    variance: '+₹10,000',
    status: 'Contracted',
  },
  {
    category: 'Catering & Dining',
    vendor: 'Royal Gourmet Banquets',
    description: '350 Guests dinner buffet + live counters',
    estimated: '₹7,00,000',
    quoted: '₹7,65,000',
    contracted: '₹7,35,000',
    actual: 'Pending Final RSVP',
    deposit: '₹2,50,000',
    balance: '₹4,85,000',
    dueDate: 'Event Eve',
    variance: '+₹35,000',
    status: 'In Progress',
  },
  {
    category: 'Audiovisual & Staging',
    vendor: 'Acoustic Waves Pro',
    description: 'LED wall, sound rig, intelligent lighting',
    estimated: '₹3,00,000',
    quoted: '₹3,20,000',
    contracted: '₹2,90,000',
    actual: '₹2,90,000',
    deposit: '₹1,50,000',
    balance: '₹1,40,000',
    dueDate: 'Event Day',
    variance: '-₹10,000',
    status: 'Contracted',
  },
  {
    category: 'Décor & Florals',
    vendor: 'Artisan Floral Creations',
    description: 'Stage styling, table centers & entrance',
    estimated: '₹3,50,000',
    quoted: '₹3,80,000',
    contracted: '₹3,40,000',
    actual: 'Pending',
    deposit: '₹1,00,000',
    balance: '₹2,40,000',
    dueDate: '1 Week Prior',
    variance: '-₹10,000',
    status: 'Contracted',
  },
  {
    category: 'Contingency Reserve',
    vendor: 'Reserved Financial Buffer',
    description: '12% safety reserve fund',
    estimated: '₹2,50,000',
    quoted: 'N/A',
    contracted: '₹2,50,000',
    actual: '₹35,000 Used',
    deposit: 'In Reserve',
    balance: '₹2,15,000',
    dueDate: 'Day of Event',
    variance: 'On Budget',
    status: 'Active Reserve',
  },
]

export function EventBudgetContent() {
  const { openModal } = useQuoteModal()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({})
  const [copied, setCopied] = useState(false)

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <article className="min-h-screen bg-background text-foreground pt-24 pb-20">
      {article && (
        <ArticleHeader
          post={article}
          badgeLabel="Financial Control & Cost Management"
        />
      )}

      {/* 3. Hero Visual */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/60 bg-muted">
          <Image
            src="/images/blog/how-to-create-an-event-budget/hero.jpg"
            alt="Event budget planning workspace with cost tracking and checklist"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3 italic">
          Structured financial management transforms creative concepts into realistic, well-executed celebrations.
        </p>
      </div>

      {/* 4. Article Core Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed text-base sm:text-lg">
        {/* Quick Answer Snippet */}
        <section
          aria-labelledby="quick-answer-title"
          className="p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase mb-3">
            <Lightbulb className="w-4 h-4" />
            <h2 id="quick-answer-title" className="text-base font-bold text-foreground">
              Quick Answer: How to Create an Event Budget
            </h2>
          </div>
          <p className="text-foreground/90 font-medium leading-relaxed">
            A strong event budget starts with the total available funding, then separates costs into categories such
            as venue, catering, technology, staffing, décor, entertainment, transportation, marketing and contingency.
            Track estimated, quoted, committed and actual costs throughout the planning process to maintain complete
            financial control.
          </p>
          <p className="text-sm text-muted-foreground mt-3 leading-normal">
            Within professional event management, an event budget is a planning and decision-making tool that helps
            organize expected costs, committed spending, actual expenses, payment timing, and contingency funds.
          </p>
        </section>

        {/* Section 1: Why an Event Budget Matters */}
        <section aria-labelledby="section-1-title" className="space-y-4">
          <h2 id="section-1-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            1. Why an Event Budget Matters
          </h2>
          <p>
            Whether you are organizing a corporate summit, an intimate anniversary gathering, an extravagant wedding,
            or an industry exhibition, financial clarity influences every single planning decision. Venue selection
            dictates catering rules and logistics. Guest count determines table styling, dining portions, and staffing.
            Audiovisual staging impacts attendee engagement. A strong{' '}
            <strong className="text-foreground">event budget</strong> brings these intertwined decisions together so
            the celebration remains realistic, beautiful, and completely stress-free.
          </p>
          <p>
            An event budget is far more than an Excel sheet containing numbers. It is an active decision-making tool. A
            well-structured <strong className="text-foreground">event management budget</strong> illuminates what you
            can comfortably afford, where your resources create the greatest experiential impact, what money is already
            contractually committed, and where you still hold financial flexibility.
          </p>
          <p>
            Importantly, budgeting is not about compromising quality or pinching pennies. The true goal of{' '}
            <strong className="text-foreground">event budget planning</strong> is intentionality: allocating funds
            deliberately so that guest comfort, sensory elegance, and operational safety are protected without incurring
            unexpected post-event debts. Hiring a{' '}
            <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>
              professional event planner
            </Link>{' '}
            ensures that market pricing is verified and contracts are negotiated effectively from day one.
          </p>
        </section>

        {/* Section 2: Setting Your Financial Parameters */}
        <section aria-labelledby="section-2-title" className="space-y-4">
          <h2 id="section-2-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            2. Setting Your Financial Parameters
          </h2>
          <p>
            Before browsing venues, sampling catering menus, or committing to styling vendors, you must establish
            unambiguous financial boundaries. Starting with an explicit spending parameter prevents the common pitfall
            of falling in love with costly concepts early, only to face painful cuts as the event date approaches.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 my-6">
            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Coins className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Determine Total Funding Sources</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Itemize confirmed funds separately from projected income. A corporate event may operate on a fixed
                marketing allocation; a public gala may depend on ticket tiers and corporate sponsorships; a wedding may
                involve family contributions. Separate guaranteed capital from speculative receipts.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-foreground">Hard Ceiling vs. Working Budget</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Establish a hard financial ceiling—the absolute maximum amount you are willing and able to spend. Keep
                your working operational budget 10% to 15% below this ceiling. This preserves an untouched contingency
                fund for unexpected permits, overtime fees, or sudden weather adjustments.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground pt-2">Define Your Core Event Objectives</h3>
          <p>
            Your core purpose must guide where money flows. If the objective is corporate relationship building,
            acoustics, venue intimacy, cocktail hospitality, and seamless dining deserve top priority. If the goal is a
            high-energy celebration, world-class entertainment, dynamic lighting, and immersive stagecraft take
            precedence. If the gathering is educational, speaker comfort, crystal-clear projection, and pristine Wi-Fi
            must be prioritized over elaborate floral arrangements.
          </p>
        </section>

        {/* Section 3: Identifying and Categorizing Event Costs */}
        <section aria-labelledby="section-3-title" className="space-y-6">
          <h2 id="section-3-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            3. Identifying and Categorizing Event Costs
          </h2>
          <p>
            One of the most essential habits in event cost management is organizing expenditures into clear,
            standardized categories. This structure allows planners to benchmark proposals against industry norms, spot
            missing logistical items, and explain numbers clearly to executive committees or family stakeholders.
          </p>

          {/* Visual: Categories Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {budgetCategories.map((cat, idx) => {
              const IconComp = cat.icon
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-card border border-border/70 hover:border-primary/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <IconComp className="w-4 h-4" />
                        <h3 className="text-base font-bold text-foreground">{cat.name}</h3>
                      </div>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {cat.typicalShare}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      <strong className="text-foreground">Includes:</strong> {cat.included}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40 text-xs text-foreground/80 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-primary font-medium">Pro Tip:</strong> {cat.planningTip}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="my-6">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/60 bg-muted">
              <Image
                src="/images/blog/how-to-create-an-event-budget/budget-categories.jpg"
                alt="Event planning budget categories and financial control"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 italic">
              Segmenting total capital across dedicated cost centers prevents surprise shortfalls in critical categories.
            </p>
          </div>
        </section>

        {/* Section 4: Hidden and Often-Forgotten Event Costs */}
        <section aria-labelledby="section-4-title" className="space-y-6">
          <h2 id="section-4-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            4. Hidden and Often-Forgotten Event Costs
          </h2>
          <p>
            Budgets rarely fail because planners forgot to rent the ballroom or hire the caterer. They fail because
            dozens of auxiliary charges were omitted from initial estimates. When requesting quotes, insist on full
            out-the-door pricing including logistical surcharges, teardown hours, and tax obligations.
          </p>

          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-500 font-bold mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-bold text-foreground">Watch Out for These 12 Common Hidden Charges</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/90">
              {hiddenCostItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Always insert a dedicated line item for incidental expenses rather than relying on memory. When negotiating
            vendor contracts, verify whether load-in, elevator usage, overtime staff fees, and cleanup are included.
          </p>
        </section>

        {/* Section 5: The Essential Event Budget Checklist */}
        <section aria-labelledby="section-5-title" className="space-y-6">
          <h2 id="section-5-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            5. The Essential Event Budget Checklist
          </h2>
          <p>
            An <strong className="text-foreground">event budget checklist</strong> translates your high-level vision
            into an actionable audit tool. Use this responsive framework to verify that every necessary contract item is
            accounted for before committing funds.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border/70 shadow-sm bg-card">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b border-border/70 text-foreground font-semibold">
                  <th className="p-3 sm:p-4 w-12 text-center">Check</th>
                  <th className="p-3 sm:p-4 min-w-[140px]">Budget Category</th>
                  <th className="p-3 sm:p-4 min-w-[260px]">What to Include in Estimates</th>
                  <th className="p-3 sm:p-4 min-w-[110px]">Priority Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {checklistData.map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="p-3 sm:p-4 text-center">
                      <input
                        type="checkbox"
                        checked={!!checkedItems[idx]}
                        onChange={() => toggleCheck(idx)}
                        aria-label={`Toggle ${row.category}`}
                        className="w-4 h-4 rounded text-primary border-border focus:ring-primary cursor-pointer"
                      />
                    </td>
                    <td className="p-3 sm:p-4 font-bold text-foreground">{row.category}</td>
                    <td className="p-3 sm:p-4 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {row.items}
                    </td>
                    <td className="p-3 sm:p-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block ${
                          row.status === 'Essential'
                            ? 'bg-primary/10 text-primary font-semibold'
                            : row.status === 'High Priority'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Customize this checklist according to your event scope. A luxury wedding requires photography, attire, and
            guest accommodations; a corporate conference requires badging systems, speaker honorariums, and staging.
            For full operational execution, consult our{' '}
            <Link href="/blog/complete-event-planning-checklist" className={linkClass}>
              Complete Event Planning Checklist
            </Link>
            .
          </p>
        </section>

        {/* Section 6: How to Build an Event Planning Budget Step by Step */}
        <section aria-labelledby="section-6-title" className="space-y-6">
          <h2 id="section-6-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            6. How to Build an Event Planning Budget Step by Step
          </h2>
          <p>
            Follow this proven five-step methodology to transform conceptual figures into a realistic, working event
            plan that keeps costs firmly in line:
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border/70 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Step 1: Set the Total Budget</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Establish the total approved spending ceiling. Separate guaranteed funds from speculative ticket sales
                  or vendor sponsorships. Never treat uncertain revenue as confirmed cash in hand.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/70 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Step 2: Establish Non-Negotiable Priorities</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rank the core elements that most directly support your event purpose. If guest dining is paramount,
                  allocate resources there first; this creates an objective hierarchy when vendor quotes exceed preliminary goals.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/70 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Step 3: Research Market Rates &amp; Real Costs</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Request itemized written estimates from venues and vendors. Document deposit schedules, validity dates,
                  cancellation policies, and exact inclusions before signing binding commitments.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/70 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Step 4: Allocate Preliminary Amounts</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Assign target funding brackets to every category, holding a 10% to 15% reserve. As real vendor proposals
                  materialize, refine preliminary amounts to reflect actual quoted figures.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/70 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                5
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  Step 5: Compare Estimated and Actual Costs Continually
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As vendor agreements are executed, substitute estimated lines with contracted values. Maintain original
                  projections so you can measure financial variance throughout the planning lifecycle.
                </p>
              </div>
            </div>
          </div>

          <div className="my-6">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/60 bg-muted">
              <Image
                src="/images/blog/how-to-create-an-event-budget/budget-process.jpg"
                alt="Step-by-step event budget planning guide and methodology"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 italic">
              A structured step-by-step methodology ensures seamless transitions from preliminary estimates to final invoice reconciliation.
            </p>
          </div>
        </section>

        {/* Section 7: Master Event Budget Tracking Spreadsheet */}
        <section aria-labelledby="section-7-title" className="space-y-6">
          <h2 id="section-7-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            7. Create a Master Event Budget Tracking Spreadsheet
          </h2>
          <p>
            A dedicated tracking spreadsheet serves as your central source of truth. The platform matters far less than
            the discipline of recording entries. Whether you utilize Google Sheets, Microsoft Excel, or specialized
            event budgeting software, maintain these critical tracking parameters:
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm my-4">
            <div className="p-3 rounded-lg bg-card border border-border/60">
              <strong className="text-foreground block font-bold mb-1">Estimated Cost:</strong>
              Your initial planned expenditure.
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/60">
              <strong className="text-foreground block font-bold mb-1">Quoted Cost:</strong>
              Vendor’s formal written proposal.
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/60">
              <strong className="text-foreground block font-bold mb-1">Contracted Cost:</strong>
              The legally agreed financial commitment.
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/60">
              <strong className="text-foreground block font-bold mb-1">Actual Paid Cost:</strong>
              Final disbursed or invoiced amount.
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/60">
              <strong className="text-foreground block font-bold mb-1">Deposit Paid:</strong>
              Initial cash advance disbursed.
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/60">
              <strong className="text-foreground block font-bold mb-1">Balance Due &amp; Date:</strong>
              Remaining liability and cutoff date.
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground pt-2">Sample Master Budget Tracker Layout</h3>
          <div className="overflow-x-auto rounded-xl border border-border/70 shadow-sm bg-card">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-muted/70 border-b border-border text-foreground font-semibold">
                  <th className="p-3">Category</th>
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Estimated</th>
                  <th className="p-3">Contracted</th>
                  <th className="p-3">Deposit Paid</th>
                  <th className="p-3">Balance Due</th>
                  <th className="p-3">Variance</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sampleSpreadsheetRows.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/20">
                    <td className="p-3 font-semibold text-foreground">{r.category}</td>
                    <td className="p-3 text-muted-foreground">{r.vendor}</td>
                    <td className="p-3">{r.estimated}</td>
                    <td className="p-3 font-medium text-foreground">{r.contracted}</td>
                    <td className="p-3 text-primary">{r.deposit}</td>
                    <td className="p-3">{r.balance}</td>
                    <td className={`p-3 font-mono font-medium ${r.variance.startsWith('+') ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {r.variance}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-xs bg-muted text-foreground/80">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 8: The Importance of a Contingency Fund */}
        <section aria-labelledby="section-8-title" className="space-y-4">
          <h2 id="section-8-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            8. The Importance of a Contingency Fund
          </h2>
          <p>
            Unexpected costs are completely normal in live event production. Bad weather requires waterproof canopy
            rentals. Additional VIP guests require extra table arrangements. Audio systems require auxiliary power
            generators. A contingency fund provides financial breathing room so your event team can resolve surprises
            without compromising critical elements.
          </p>

          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 space-y-3 my-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-lg font-bold text-foreground">
                Planning Guideline: 10% to 15% Contingency Reserve
              </h3>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              A commonly used planning range is <strong className="text-primary font-bold">10% to 15%</strong> of the
              working budget. <em className="text-foreground">Please note:</em> this must be treated strictly as a{' '}
              <strong className="text-foreground">planning guideline, NOT a universal rule</strong>. Events with
              significant outdoor exposure, multi-day itineraries, custom stage construction, or international shipping
              often warrant an 18% to 20% reserve, whereas routine corporate meetings in fully equipped facilities may
              require only 8% to 10%.
            </p>
            <div className="p-3 rounded-lg bg-background/80 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Golden Rule:</strong> The contingency fund is an emergency safety
              cushion, never a slush fund for routine overspending or discretionary upgrades. Every allocation requires
              written approval from the master budget owner.
            </div>
          </div>
        </section>

        {/* Section 9: Managing the Budget in Real Time */}
        <section aria-labelledby="section-9-title" className="space-y-4">
          <h2 id="section-9-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            9. Managing the Budget in Real Time
          </h2>
          <p>
            An event management budget must be monitored dynamically throughout the planning lifecycle, not merely
            consulted at kick-off and post-mortem. Set an audit cadence aligned with your timeline: monthly reviews during
            early concept stages, bi-weekly reviews 3 to 6 months out, and weekly or real-time audits during the final month.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            <div className="p-5 rounded-xl bg-card border border-border/70 space-y-2">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                Analyze Variance Strategically
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Variance is the differential between planned and actual costs. A negative variance in one category is
                manageable if compensated by savings in another. The crucial test is whether the event objective is
                preserved without breaching the overall ceiling.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/70 space-y-2">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                Track Cash Flow &amp; Deposit Due Dates
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Two budgets can have identical bottom-line figures but drastically divergent cash flow schedules. Stagger
                milestone payments so your liquidity is never jeopardized during peak deposit cycles.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: How to Compare Vendor Quotes */}
        <section aria-labelledby="section-10-title" className="space-y-4">
          <h2 id="section-10-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            10. How to Compare Vendor Quotes
          </h2>
          <p>
            Evaluating vendor proposals purely by their headline price is a dangerous pitfall. One provider may appear
            cheaper simply because their bid excludes setup labor, freight, generator fuel, or mandatory cleanup fees.
            Another quote may seem higher upfront but represents an all-inclusive, risk-free package.
          </p>

          <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 text-center font-bold text-primary text-base sm:text-lg my-4">
            &ldquo;Compare total expected value and deliverables, not merely the headline price.&rdquo;
          </div>

          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/90 my-4">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Compare identical scopes of work and equipment specs</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Confirm all taxes, service fees, and gratuity policies</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Verify delivery, setup, and late-night strike charges</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Inspect deposit milestones and cancellation terms</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Record quote expiry dates to guard against price hikes</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Identify hourly overtime rates for staff and equipment</span>
            </li>
          </ul>
        </section>

        {/* Section 11: Cost Control Without Reducing Quality */}
        <section aria-labelledby="section-11-title" className="space-y-6">
          <h2 id="section-11-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            11. Practical Ways to Control Event Costs Without Reducing Quality
          </h2>
          <p>
            Effective cost control is not about austerity; it is about eliminating waste in low-impact areas while
            investing heavily in the moments guests will remember. Practice these ten battle-tested strategies:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/90">
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Prioritize High-Touch Moments:</strong>
                Invest in guest touchpoints (sound, dining, hospitality) over background embellishments.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Solicit Multiple Proposals:</strong>
                Gather 3 comparable quotes for every primary category to establish true market benchmarks.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Negotiate Package Scope:</strong>
                Ask vendors for complimentary additions or package bundling rather than aggressive price slashes.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Lock Guest Headcounts Early:</strong>
                Avoid ordering buffer meals; update RSVPs rigorously to prevent catering waste.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Use In-House Equipment:</strong>
                Leverage venue-provided projectors, tables, and sound gear if technical specifications are adequate.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Repurpose Decorative Assets:</strong>
                Transition floral installations from entryways to dining backdrops between event phases.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Streamline Delivery Windows:</strong>
                Schedule vendor load-in back-to-back to eliminate costly overtime and standby crew billing.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Audit Software &amp; Gateway Fees:</strong>
                Review recurring subscription tools, ticketing platforms, and credit card processing margins.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Isolate Contingency Reserves:</strong>
                Keep the contingency fund strictly fenced away from general operating line items.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Require Formal Scope Approvals:</strong>
                Prohibit verbal add-ons; require a written cost-impact assessment before approving change orders.
              </div>
            </div>
          </div>

          <div className="my-6">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/60 bg-muted">
              <Image
                src="/images/blog/how-to-create-an-event-budget/cost-control-breakdown.jpg"
                alt="Event budget cost control and financial management"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 italic">
              Strategic cost control preserves unforgettable attendee experiences while eliminating unneeded operational waste.
            </p>
          </div>
        </section>

        {/* Section 12: Event Budget Planning Timeline */}
        <section aria-labelledby="section-12-title" className="space-y-6">
          <h2 id="section-12-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            12. Event Budget Planning Timeline
          </h2>
          <p>
            Budgeting is an evolving discipline that changes in focus as your date approaches. Use this chronological
            framework to align financial actions with production milestones:
          </p>

          <div className="space-y-4">
            {budgetTimelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-card border border-border/70 hover:border-primary/50 transition-all flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <div className="sm:w-48 shrink-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
                    {step.badge}
                  </span>
                  <span className="text-sm font-bold text-foreground font-mono">{step.timeframe}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 13: Who Should Manage the Event Budget? */}
        <section aria-labelledby="section-13-title" className="space-y-4">
          <h2 id="section-13-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            13. Who Should Manage the Event Budget?
          </h2>
          <p>
            While planning input is collaborative, <strong className="text-foreground">exactly one person or role must own the master budget</strong>.
            Depending on your organizational structure, that owner may be your professional event planner, corporate
            project lead, or wedding director. When multiple parties independently authorize expenses, budgets disintegrate quickly.
          </p>
          
          <div className="p-6 rounded-xl bg-muted/30 border border-border/70 space-y-3">
            <h3 className="text-lg font-bold text-foreground">Establish Clear Financial Controls</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Expense Authorization:</strong> Only the designated owner can sign purchase orders or approve contract riders.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Contingency Release:</strong> Require explicit dual-signoff before releasing any reserve funds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Invoice Centralization:</strong> Direct all vendor invoices to a single inbox to eliminate duplicate disbarments.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 14: Final Event Budget Review Before Event Day */}
        <section aria-labelledby="section-14-title" className="space-y-4">
          <h2 id="section-14-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            14. Final Event Budget Review Before Event Day
          </h2>
          <p>
            Conduct a rigorous pre-event financial audit 7 to 10 days before showtime. This structured review verifies
            that every contractual commitment and outstanding payment is locked down:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/90 my-4">
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Venue contract, damage deposits &amp; overtime rates locked</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Catering headcount, dietary lists &amp; service fees confirmed</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>AV technical rider, staging power &amp; crew schedule verified</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Entertainment travel, rider fees &amp; green room closed</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Décor rentals, floral counts &amp; teardown times scheduled</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Staffing hours, security personnel &amp; valet coverage booked</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Marketing, collateral &amp; directional signage printed</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Transportation shuttles, permits &amp; parking vouchers active</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>All payment balances &amp; cashier checks scheduled</span>
            </div>
            <div className="p-3.5 rounded-lg bg-card border border-border/60 flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Remaining contingency reserve audited and accessible</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Crucial reminder: If any vendor was verbally promised an additional payment or tip, enter it immediately as
            a committed expense to avoid day-of cash shortfalls.
          </p>
        </section>

        {/* Section 15: Frequently Asked Questions */}
        <section aria-labelledby="section-15-title" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-2 text-primary font-bold">
            <HelpCircle className="w-5 h-5" />
            <h2 id="section-15-title" className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              15. Frequently Asked Questions About Event Budget Planning
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Clear answers to common questions about budgeting, vendor quote comparisons, cost management, and contingency reserves.
          </p>

          <div className="space-y-3">
            {eventBudgetFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-card overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 font-bold text-foreground flex items-center justify-between gap-4 hover:text-primary transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Conclusion & Related Guides */}
        <section className="space-y-4 pt-6 border-t border-border/60">
          <h3 className="text-xl font-serif font-bold text-foreground">
            Building Financial Confidence for Your Next Event
          </h3>
          <p>
            An accurate event budget is the cornerstone of exceptional event management. By clearly categorizing costs,
            proactively identifying hidden expenses, building a 10% to 15% contingency buffer, and tracking commitments
            in real time, you protect your celebration from financial surprises.
          </p>
          <p>
            Explore our related event planning guides to continue organizing your upcoming occasion:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/complete-event-planning-checklist" className={linkClass}>
                Complete Event Planning Checklist: From Idea to Event Day
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>
                How Early Should You Hire an Event Planner? Booking Timeline Guide
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
                What Does an Event Planner Do? A Complete Guide to Event Planning Services
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>
                How to Choose the Right Event Planner for Your Event
              </Link>
            </li>
          </ul>
        </section>

        {/* Conversion CTA Block */}
        <section
          aria-labelledby="cta-heading"
          className="p-8 sm:p-10 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl relative overflow-hidden text-center my-12"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Complimentary Budget Consultation
            </div>

            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Need Help Building a Realistic Event Budget?
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Share your event type, date, guest count, location, priorities and expected budget with AS Events. We can
              help you organize costs, compare vendors, track commitments and build a practical event plan.
            </p>

            {/* CTA Buttons with strict contrast specifications */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-slate-950 font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 text-sm sm:text-base"
              >
                Plan Your Event
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-950 text-white border border-primary font-bold hover:bg-slate-900 transition-all text-sm sm:text-base"
              >
                Contact AS Events
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
