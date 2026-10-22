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
  Utensils,
  Music,
  Camera,
  Info,
  TrendingDown,
  Calculator,
  Compass,
  DollarSign,
  Tag,
  Receipt,
  Scale,
  Percent,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, eventCostIndiaFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('how-much-does-event-planning-cost-in-india')

const linkClass =
  'text-primary underline hover:text-primary/80 font-medium transition-colors'

interface CostDriver {
  number: string
  title: string
  subtitle: string
  points: string[]
}

const costDrivers: CostDriver[] = [
  {
    number: '01',
    title: 'Location, City Tier & Season',
    subtitle: 'Geography and seasonal demand heavily influence vendor and venue rates',
    points: [
      'Tier 1 metros (Mumbai, Delhi NCR, Bengaluru) command premium venue rates compared to Tier 2 or 3 destinations.',
      'Peak wedding and festival months (November to February) create high demand for top venues and creative vendors.',
      'Off-peak and monsoon dates often offer negotiable venue rentals and flexible vendor scheduling.',
      'Accessibility, freight logistics, and out-of-station travel surcharges impact destination celebrations.',
    ],
  },
  {
    number: '02',
    title: 'Guest Count as the Master Multiplier',
    subtitle: 'Headcount dictates every per-person operational expenditure',
    points: [
      'Catering is calculated per plate, multiplying food and beverage costs with every added guest.',
      'Venue square footage requirements, table counts, linen rentals, and floral arrangements expand with guest volume.',
      'Transport coordination, airport transfers, hotel room blocks, and hospitality staffing scale directly with headcount.',
      'Guest welcome hampers, stationery, printed place cards, and personalized favors multiply per attendee.',
    ],
  },
  {
    number: '03',
    title: 'Event Scope & Technical Complexity',
    subtitle: 'The gap between a simple gathering and a multi-stage production',
    points: [
      'A simple floral entrance contrasts sharply with custom structural staging, curved LED backdrops, and motorized trussing.',
      'Sound reinforcement requirements shift drastically between a 50-person family dinner and a 1,000-person concert-grade Sangeet.',
      'Multiple ceremonial spaces (Haldi courtyard, Sangeet ballroom, Mandap lawn) require separate setup crews and equipment.',
      'Generators, heavy cabling, licensed pyrotechnics, and intelligent moving-head lighting add specialized technical costs.',
    ],
  },
  {
    number: '04',
    title: 'Service Scope & Professional Support',
    subtitle: 'Level of coordination, team size, and management responsibilities',
    points: [
      'Full-service end-to-end planning covers conceptualization, vendor sourcing, negotiation, budget oversight, and on-site execution.',
      'Partial planning or month-of coordination steps in after major venues and suppliers have already been booked.',
      'On-site event coordination focuses purely on managing schedules, vendors, and guest flow during the event days.',
      'Agency team size, dedicated event leads, and out-of-town management influence professional service pricing.',
    ],
  },
]

interface BudgetItem {
  category: string
  percentage: string
  amount: string
  description: string
  priority: string
}

const sampleBudgetAllocation: BudgetItem[] = [
  {
    category: 'Venue & Space Rental',
    percentage: '25%',
    amount: '₹2,50,000',
    description: 'Banquet hall or lawn rental, basic lighting, power backup, security, and venue housekeeping charges.',
    priority: 'Essential Core',
  },
  {
    category: 'Food, Beverage & Catering',
    percentage: '30%',
    amount: '₹3,00,000',
    description: 'Multi-course menu, live cooking counters, dessert displays, service staff, glassware, and tableware rentals.',
    priority: 'Essential Core',
  },
  {
    category: 'Décor, Ambience & Floral',
    percentage: '12%',
    amount: '₹1,20,000',
    description: 'Stage backdrop, floral arrangements, entrance arch, table centerpieces, photo booths, and ambient drapery.',
    priority: 'Visual Impact',
  },
  {
    category: 'Sound, Lighting & AV Production',
    percentage: '6%',
    amount: '₹60,000',
    description: 'JBL/line-array speakers, digital audio console, wireless microphones, LED wall, and stage spotlights.',
    priority: 'Technical Backbone',
  },
  {
    category: 'Photography & Videography',
    percentage: '6%',
    amount: '₹60,000',
    description: 'Candid photographer, traditional coverage, cinematic highlights video, teaser reel, and raw master files.',
    priority: 'Long-term Memory',
  },
  {
    category: 'Event Planner Professional Fee',
    percentage: '8%',
    amount: '₹80,000',
    description: 'Dedicated planning team, vendor procurement, budget administration, timeline coordination, and event-day lead.',
    priority: 'Management & Control',
  },
  {
    category: 'Transport & Guest Logistics',
    percentage: '4%',
    amount: '₹40,000',
    description: 'Guest shuttles, airport/station pickups, vendor freight transport, and parking coordination.',
    priority: 'Hospitality Flow',
  },
  {
    category: 'Invitations, Stationery & Admin',
    percentage: '3%',
    amount: '₹30,000',
    description: 'Digital invitations, printed itineraries, welcome signage, place cards, and administrative expenses.',
    priority: 'Communication',
  },
  {
    category: 'Contingency / Emergency Reserve',
    percentage: '6%',
    amount: '₹60,000',
    description: 'Dedicated financial buffer for approved unexpected weather alterations, rush rentals, or overtime needs.',
    priority: 'Financial Safety',
  },
]

interface ChecklistPhase {
  phase: string
  timeframe: string
  badgeColor: string
  tasks: string[]
}

const budgetChecklistPhases: ChecklistPhase[] = [
  {
    phase: 'Phase 1: Foundation & Ceiling',
    timeframe: '6 to 12 Months Before',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    tasks: [
      'Define celebration purpose, core guest experience priorities, and spending ceiling.',
      'Estimate preliminary guest count range across close family, colleagues, and friends.',
      'Research dates, venue categories (hotel, resort, lawn), and off-peak vs peak availability.',
      'Draft preliminary category allocations before paying non-refundable deposits.',
      'Shortlist professional event planners and request scope-specific service proposals.',
    ],
  },
  {
    phase: 'Phase 2: Vendor Selection & Quoting',
    timeframe: '3 to 6 Months Before',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    tasks: [
      'Send identical written briefs to competing caterers, decorators, and AV suppliers.',
      'Confirm all proposals itemize taxes (GST), generator fuel, setup hours, and teardown terms.',
      'Finalize core vendor contracts and lock payment milestone schedules in writing.',
      'Log every deposit paid in a central tracking sheet with date, invoice number, and remaining balance.',
      'Review catering per-plate formulas and confirm minimum guaranteed guest commitments.',
    ],
  },
  {
    phase: 'Phase 3: Headcount Lock & Variance Audit',
    timeframe: '1 to 3 Months Before',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    tasks: [
      'Finalize RSVP confirmations and establish final guaranteed headcounts for catering and seating.',
      'Compare contracted vendor commitments against initial category estimates to measure variance.',
      'Reallocate surplus from under-budget categories to balance any approved scope upgrades.',
      'Confirm emergency contingency approval protocol (who holds authority to release reserves).',
      'Detail weather contingency plans and indoor backup spaces with venue management.',
    ],
  },
  {
    phase: 'Phase 4: Execution & Financial Settlement',
    timeframe: 'Final Week & Event Day',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    tasks: [
      'Reconfirm load-in access hours, delivery timing, sound restrictions, and municipal permissions.',
      'Distribute final master run-of-show and vendor emergency contact sheet to key stakeholders.',
      'Assign an authorized point person to verify on-site deliverables before signing completion dockets.',
      'Disburse scheduled final milestone payments upon verified performance.',
      'Reconcile invoices post-event, close outstanding security deposits, and archive receipts.',
    ],
  },
]

export function EventCostIndiaContent() {
  const { openModal } = useQuoteModal()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {article && <ArticleHeader post={article} />}

      <div className="space-y-10 sm:space-y-12">
        {/* Quick Answer Summary Callout Box */}
        <section
          aria-labelledby="quick-answer-heading"
          className="p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20 shadow-md relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2
                id="quick-answer-heading"
                className="text-lg sm:text-xl font-serif font-bold text-foreground"
              >
                Quick Answer: How Much Does Event Planning Cost in India?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                There is <strong>no single nationwide fixed rate</strong> for event planning in India. Two celebrations with identical guest headcounts can have completely different budgets based on city tier, season, venue category, and production complexity. An intimate celebration at a local banquet hall differs dramatically from a multi-day luxury wedding or high-stakes corporate conference.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Professional event planner fees in India typically range from <strong>fixed project management fees</strong> for clear scopes to <strong>percentage-based models (often 10% to 15% of managed spend in full-service weddings)</strong> or <strong>service-specific coordination retainers</strong>. Rather than trusting arbitrary online price promises, establishing an accurate event budget begins with defining your specific event brief and requesting itemized, local supplier quotations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: What Determines Event Planning Cost in India */}
        <section aria-labelledby="section-1-heading" className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Coins className="w-3.5 h-3.5" />
              Section 1
            </div>
            <h2
              id="section-1-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              1. What Determines Event Planning Cost in India?
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Every realistic event budget starts with an explicit event brief: the occasion, intended outcome, expected guest attendance, preferred dates, and desired scale. Rather than a mysterious single price tag, the total investment is governed by four deeply interconnected cost drivers.
          </p>

          {/* Infographic Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/cost-drivers-breakdown.jpg"
              alt="Where the budget goes: 01 City and season, 02 Guest count, 03 Event complexity, 04 Service scope"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 Cost Driver Cards */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {costDrivers.map((driver) => (
              <div
                key={driver.number}
                className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-serif font-bold text-primary">
                    {driver.number}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {driver.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  {driver.subtitle}
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground pt-1">
                  {driver.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Understanding how these drivers interact helps you avoid unexpected surprises. For example, selecting a luxury five-star hotel doesn&apos;t just increase venue rental; it often requires using mandatory in-house catering with higher per-plate minimums and strict vendor royalty charges for external decorators.
          </p>
        </section>

        {/* Section 2: Venue Rental and Location */}
        <section aria-labelledby="section-2-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Section 2
            </div>
            <h2
              id="section-2-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              2. Venue Rental and Location: Compare the Full Proposal
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            The venue controls virtually every operational parameter of your event: usable floor space, stage sightlines, kitchen accessibility, loading bay timing, air conditioning hours, sound decibel curfews, and municipal safety clearances.
          </p>

          {/* Practical Comparison Box */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              The Venue Quotation Trap: Bare Hall vs. Inclusive Package
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consider a 150-person evening social reception evaluating two competing venue options:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  Venue A: Low Rental Illusion
                </div>
                <p className="text-muted-foreground">
                  Quotes a tempting base rental of ₹1,00,000. However, the contract excludes generator diesel (₹35,000), security deposit (₹50,000), outside caterer kitchen royalty (₹40,000), and air-conditioning beyond 4 hours (₹12,000/hr).
                </p>
                <div className="font-medium text-foreground pt-1">
                  Effective Venue Cost: ₹2,00,000+
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Venue B: Transparent Proposal
                </div>
                <p className="text-muted-foreground">
                  Quotes ₹2,20,000 upfront. Includes full banquet hall access, 8 hours of climate control, dual diesel generators with fuel, green rooms, basic stage, banquet tables, and dedicated housekeeping crew.
                </p>
                <div className="font-medium text-foreground pt-1">
                  Predictable Total: ₹2,20,000
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Always request itemized venue terms detailing load-in hours, sound curfew times, vendor royalties, and GST rates (typically 18%) before signing.
            </p>
          </div>
        </section>

        {/* Section 3: Guest Count */}
        <section aria-labelledby="section-3-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Section 3
            </div>
            <h2
              id="section-3-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              3. Guest Count: The Most Important Variable to Control
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Guest count is not simply a headcount; it is the master multiplier of your entire event budget. Every additional attendee compounds food consumption, table linens, chair rentals, floral centerpieces, service waiters, welcome kits, and transportation requirements.
          </p>

          {/* 3-Headcount Framework */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/60 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Initial Invited Count
              </h3>
              <p className="text-xs text-muted-foreground">
                Total guest list of all invited family, friends, or delegates. Typically sees 15% to 25% attrition depending on travel distance and dates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-primary/30 text-center space-y-2 shadow-md">
              <div className="w-10 h-10 rounded-full bg-primary text-slate-950 mx-auto flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Realistic Expected Count
              </h3>
              <p className="text-xs text-muted-foreground">
                Active RSVPs who have reconfirmed attendance. This realistic number is used to size venue seating, transport, and room allocations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Guaranteed Minimum
              </h3>
              <p className="text-xs text-muted-foreground">
                The strict contract number given to caterers and venues 7 to 14 days prior. You are billed for this count even if fewer guests attend.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-muted-foreground flex items-start gap-3">
            <Calculator className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <strong>The Math of Guest Creep:</strong> Adding just 25 last-minute guests at an illustrative catering estimate of ₹1,800/plate adds ₹45,000 immediately to food, plus ₹15,000 in additional table rentals, linens, and favors—increasing total spend by ₹60,000 without prior budgeting.
            </div>
          </div>
        </section>

        {/* Section 4: Catering and Food */}
        <section aria-labelledby="section-4-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5" />
              Section 4
            </div>
            <h2
              id="section-4-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              4. Catering and Food: Calculate the Real Serving Cost
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            In Indian celebrations, culinary hospitality is the single most remembered element. Whether planning a traditional regional feast, a lavish multi-cuisine buffet, live artisanal cooking counters, or corporate banquet spreads, food normally accounts for 25% to 35% of overall event investment.
          </p>

          {/* Catering Diagram Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/catering-cost-breakdown.jpg"
              alt="Food calculate carefully: 01 Guest count x per-plate rate, 02 Menu choices & live counters, 03 Service staff & rentals, 04 Taxes, minimums & extra charges"
              width={1400}
              height={788}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Catering Formula Callout */}
          <div className="p-6 rounded-2xl bg-card border border-primary/20 shadow-md space-y-4">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              The Practical Event Catering Formula
            </h3>
            <div className="p-4 rounded-xl bg-background border border-border font-mono text-xs sm:text-sm text-foreground overflow-x-auto">
              Total Catering Cost = (Guaranteed Guests × Agreed Per-Plate Rate) + Specialty Live Counters + Serving Staff &amp; Chafing Rentals + Applicable GST (5% to 18%)
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Menu Curating:</strong> Focus on 4-5 signature high-quality items rather than 20 mediocre dishes that drive up waste.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Corporate Programs:</strong> Align food breaks with keynotes to prevent cold food and long registration bottlenecks.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Staff Ratio:</strong> Ensure a minimum of 1 server per 20–25 banquet guests for seamless hospitality.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Beverage Logistics:</strong> Clarify corkage fees, bartending licenses, and ice/chiller inclusions in writing.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Décor, Entertainment and Technology */}
        <section aria-labelledby="section-5-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5" />
              Section 5
            </div>
            <h2
              id="section-5-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              5. Décor, Entertainment and Technology: Choose What Serves the Event
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Great décor and technical production create the emotional atmosphere of an event. However, over-decorating without considering operational flow can waste money and cause delays. A smart budget establishes a clear hierarchy of needs:
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Level 1: Must-Haves
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Operational Foundation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Crystal-clear sound systems, wireless microphones, warm ambient lighting, comfortable seating, clear directional signage, and stable power backup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Level 2: Nice-to-Haves
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Aesthetic Elevators
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Themed entrance arches, customized stage backdrops, dynamic uplighting, curated live acoustic musicians, and interactive photo installations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Level 3: Optional Luxury
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                Show-Stopping Splurges
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Motorized trussing, curved seamless LED walls, imported floral ceiling canopies, celebrity artists, cold pyrotechnics, and drone light shows.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            For corporate seminars, allocate funds to dependable AV and high-speed delegate Wi-Fi over elaborate floral arrangements. For a wedding reception or Sangeet, prioritize professional sound engineering and dynamic stage lighting over excessive peripheral props.
          </p>
        </section>

        {/* Section 6: Event Planning Costs by Event Type */}
        <section aria-labelledby="section-6-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              Section 6
            </div>
            <h2
              id="section-6-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              6. Event Planning Costs by Event Type
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Weddings, corporate conferences, and private milestone celebrations operate on vastly different cost architectures. Rather than quoting a misleading national average, evaluate expenses within the relevant category:
          </p>

          {/* Event Types Comparison Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/event-types-cost-breakdown.jpg"
              alt="Different events, different needs: Wedding functions, Corporate outcomes, Private celebrations, Destination logistics"
              width={1400}
              height={933}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Weddings &amp; Multi-Day Celebrations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Indian weddings frequently comprise multiple ceremonies across several days (Haldi, Mehendi, Sangeet, Wedding Mandap ceremony, and Grand Reception). In your budget planning, treat each ceremony as a distinct sub-event before rolling up shared expenses like venue rent, hotel room blocks, and planner retainers.
              </p>
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground">
                <strong>Pricing Note:</strong> While online blogs frequently quote figures like <em>₹5 Lakh to ₹25 Lakh</em> for example smaller or mid-scale celebrations, these must be understood strictly as <strong>hypothetical planning scenarios</strong>, not guaranteed commercial benchmarks. Destination weddings in Udaipur, Goa, or Jaipur involve hotel buyouts and guest logistics that scale significantly higher.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Corporate Conferences &amp; Product Launches
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Corporate budgets center on brand objectives: stakeholder engagement, lead generation, or employee recognition. Spending focuses on premium tech production (microphones, teleprompters, digital backdrops), delegate registration software, executive catering, keynote speaker logistics, and branded collateral.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Birthdays, Anniversaries &amp; Private Parties
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Private celebrations allow hosts to maintain personal connections while strictly bounding complexity. Broad illustrative scenarios like <em>₹20,000 to ₹1 Lakh</em> for intimate home parties or <em>₹1 Lakh to ₹5 Lakh</em> for banquet setups are preliminary scoping bands only. Always establish current vendor quotes before committing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: How Much Does an Event Planner Charge in India? */}
        <section aria-labelledby="section-7-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              Section 7
            </div>
            <h2
              id="section-7-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              7. How Much Does an Event Planner Charge in India?
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            An event planner&apos;s professional fee compensates for planning expertise, contract negotiations, vendor vetting, run-of-show scheduling, and on-site event execution. It is crucial to understand that <strong>an event planner fee is separate from the total event budget</strong> unless a written turnkey contract explicitly bundles them.
          </p>

          {/* Planner Fee Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/planner-fee-structure.jpg"
              alt="How an event planner charges: 01 Percentage model, 02 Fixed project fee, 03 Selected services, 04 Retainer and terms"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 4 Fee Models */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Percent className="w-4 h-4" />
                Percentage-Based Model
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Commonly advertised around <strong>10% to 15%</strong> of the overall managed budget for full-scale weddings. <em>Note: This is an example model, not a universal industry standard.</em> Ensure the contract states exactly which expenses (venue rent, guest rooms, liquor) are included in the percentage calculation base.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <DollarSign className="w-4 h-4" />
                Fixed Project Fee
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                An agreed lump-sum professional fee for clearly defined scope, deliverables, team size, and event days. Offers financial predictability for hosts whose guest count and ceremony scale are stable.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Workflow className="w-4 h-4" />
                Service-Specific / Partial Planning
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Ideal for hosts who have already locked their venue and caterer but require professional assistance for décor design, artist bookings, or day-of event coordination.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Timer className="w-4 h-4" />
                Retainer &amp; Milestone Terms
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                An advance deposit securing the planner&apos;s calendar, followed by milestone disbursements tied to specific deliverables (vendor finalization, floor plans, event day).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs sm:text-sm text-muted-foreground">
            <strong>Can a planner save you money?</strong> An experienced planner frequently saves clients money by eliminating duplicate vendor rentals, negotiating fair wholesale rates, avoiding hidden hotel penalty fees, and steering you away from unreliable suppliers. However, their core value is delivering a seamless, stress-free celebration where your investment produces maximum impact.
          </div>
        </section>

        {/* Section 8: Example ₹10 Lakh Event Planning Budget */}
        <section aria-labelledby="section-8-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              Section 8
            </div>
            <h2
              id="section-8-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              8. Example: A ₹10 Lakh Event Planning Budget
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            To visualize how event funds are allocated, consider a <strong>hypothetical mid-sized celebration with a hard ceiling of ₹10,00,000</strong>.
          </p>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong>Important Disclaimer:</strong> The breakdown below represents an <em>illustrative planning scenario</em> designed to demonstrate relative category proportions and contingency allocation. It is not an off-the-shelf commercial quotation or a nationwide fixed price promise.
            </div>
          </div>

          {/* Sample 10 Lakh Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/sample-10-lakh-budget-overview.jpg"
              alt="Example budget: INR 10 lakh - Illustration only, not a market quote"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Interactive Responsive Table */}
          <div className="rounded-2xl border border-border/80 overflow-hidden shadow-lg bg-card">
            <div className="p-4 sm:p-5 bg-muted/40 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-foreground text-base sm:text-lg">
                  Illustrative ₹10,00,000 Event Budget Breakdown
                </h3>
                <p className="text-xs text-muted-foreground">
                  Hypothetical distribution across 9 core planning categories
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                Total Ceiling: ₹10,00,000 (100%)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-muted/60 text-foreground font-semibold border-b border-border/60">
                  <tr>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center">Share (%)</th>
                    <th className="py-3 px-4 text-right">Illustrative Amount</th>
                    <th className="py-3 px-4 hidden md:table-cell">Scope Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  {sampleBudgetAllocation.map((item, idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">
                        {item.category}
                        <div className="text-[11px] text-muted-foreground md:hidden pt-0.5">
                          {item.description}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        {item.percentage}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-foreground">
                        {item.amount}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-xs">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-primary/10 font-bold text-foreground text-sm border-t-2 border-primary/40">
                    <td className="py-4 px-4">TOTAL EVENT BUDGET</td>
                    <td className="py-4 px-4 text-center">100%</td>
                    <td className="py-4 px-4 text-right font-mono text-primary text-base">
                      ₹10,00,000
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-xs italic text-muted-foreground">
                      Fully reconciled planning scenario including contingency
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 9: Hidden Event Costs */}
        <section aria-labelledby="section-9-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              Section 9
            </div>
            <h2
              id="section-9-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              9. Hidden Event Costs That Can Change the Final Bill
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Hidden expenses and surprise surcharges are the primary reasons early event estimates derail. A comprehensive quote audit examines proposals across four distinct layers:
          </p>

          {/* Hidden Expenses Diagram Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/hidden-expenses-checklist.jpg"
              alt="Hidden expenses to verify: 01 Taxes and permissions, 02 Vendor travel and stay, 03 Power and overtime, 04 Breakdown and refunds"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Receipt className="w-4 h-4 text-primary" />
                1. Taxes &amp; Statutory Permissions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Confirm whether vendor prices include GST (18% on venue/production, 5% on pure catering). Inquire about music licensing (PPL, IPRS, NOVEX) and local police/fire NOC permits required for amplified music.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                2. Vendor Travel &amp; Accommodation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Out-of-city photographers, makeup artists, and DJs require flight tickets, local cab transfers, driver allowances, and crew meal rooms on-site during production hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Timer className="w-4 h-4 text-primary" />
                3. Overtime, Fuel &amp; Generator Surcharges
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Venues bill steep hourly penalties for late teardown. Diesel generators consume significant fuel during multi-hour high-draw lighting and air-conditioning setups.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                4. Security Deposits &amp; Damage Waivers
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Venues require refundable caution money (₹25,000 to ₹1,00,000) against potential carpet damage, wall nailing, or delayed load-out. Clarify refund refundability timelines in writing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: Track the Budget */}
        <section aria-labelledby="section-10-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              Section 10
            </div>
            <h2
              id="section-10-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              10. Track the Budget: Estimate, Quote, Commitment and Actual
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            An event budget is a living operational control document, not a spreadsheet created once and abandoned. A rigorous framework tracks costs across six progressive financial statuses:
          </p>

          {/* Track Spending Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/track-spending-real-time.jpg"
              alt="Track spending in real time: 01 Estimate, 02 Vendor quote, 03 Committed, 04 Paid and balance"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-semibold text-foreground">
              The 6-Stage Real-Time Financial Ledger
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-background border border-border">
                <span className="font-bold text-primary block mb-1">1. Initial Estimate</span>
                Preliminary allocation target established during project inception.
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border">
                <span className="font-bold text-primary block mb-1">2. Vendor Quote</span>
                Formal written quote submitted after reviewing event brief.
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border">
                <span className="font-bold text-primary block mb-1">3. Committed Amount</span>
                Legally binding contract amount agreed upon signing.
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border">
                <span className="font-bold text-primary block mb-1">4. Paid Advances</span>
                Deposits and progress payments recorded with invoice references.
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border">
                <span className="font-bold text-primary block mb-1">5. Outstanding Balance</span>
                Remaining financial liability due upon milestone completion.
              </div>
              <div className="p-3.5 rounded-xl bg-background border border-border">
                <span className="font-bold text-primary block mb-1">6. Final Actual</span>
                Post-event reconciled expenditure including all adjustments.
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              <strong>Managing Variance:</strong> If stage lighting was budgeted at ₹60,000 but the chosen vendor quotes ₹75,000, the ₹15,000 variance must be rebalanced by reducing an optional decor item or formally approving a higher category cap. Never hide variance in an unmonitored miscellaneous line.
            </p>
          </div>
        </section>

        {/* Section 11: Ways to Reduce Event Costs */}
        <section aria-labelledby="section-11-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <TrendingDown className="w-3.5 h-3.5" />
              Section 11
            </div>
            <h2
              id="section-11-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              11. Ways to Reduce Event Costs Without Losing Quality
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Smart cost optimization focuses on what guests truly perceive: delicious hot food, prompt hospitality, crystal clear acoustics, and a warm atmosphere. Trimming expenses should never make the event feel cheap or disorganized:
          </p>

          {/* Photo of planner reviewing budget */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/food-budget-planning.jpg"
              alt="Event planner carefully calculating food budget and vendor checklists"
              width={1400}
              height={933}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Strategic Areas to Optimize
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Non-Peak Dates:</strong> Consider weekday evenings or non-peak months for significant venue fee negotiations.</li>
                <li>• <strong>Unified Venues:</strong> Host ceremonies and banquets within the same resort to eliminate separate transport and repeated setups.</li>
                <li>• <strong>Focal Point Décor:</strong> Concentrate premium florals on the entrance arch and main stage rather than sparsely dressing vast peripheral areas.</li>
                <li>• <strong>Refined Menu Choices:</strong> Eliminate low-demand live stations to cut waste and improve kitchen speed.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-destructive/30 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                Never Compromise On These Items
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Guest Safety &amp; Egress:</strong> Never compromise on fire safety, emergency exits, or licensed electrical distribution.</li>
                <li>• <strong>Generator Backup:</strong> Never risk power failure during key ceremonial moments or high-stakes corporate speeches.</li>
                <li>• <strong>Sound Quality:</strong> Cheap audio that feeds back or muffles vows will ruin the guest experience instantly.</li>
                <li>• <strong>Catering Hygiene:</strong> High food hygiene and temperature management are fundamental to guest hospitality.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 12: Step-by-Step Event Budget Checklist */}
        <section aria-labelledby="section-12-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <CalendarCheck className="w-3.5 h-3.5" />
              Section 12
            </div>
            <h2
              id="section-12-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              12. Step-by-Step Event Budget Checklist
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            A chronological timeline keeps financial decisions structured, avoiding the frantic rushed bookings that inflate vendor charges:
          </p>

          <div className="space-y-4">
            {budgetChecklistPhases.map((phase, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-card border border-border/70 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground">
                    {phase.phase}
                  </h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${phase.badgeColor}`}
                  >
                    {phase.timeframe}
                  </span>
                </div>
                <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted-foreground">
                  {phase.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 13: Questions to Ask Before Hiring an Event Planner */}
        <section aria-labelledby="section-13-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              Section 13
            </div>
            <h2
              id="section-13-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              13. Questions to Ask Before Hiring an Event Planner
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            A quote is only meaningful when you know precisely what it covers. Before signing an event management agreement, interview candidates across three critical accountability pillars:
          </p>

          {/* Consultation Photo */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/hiring-event-planner-consultation.jpg"
              alt="Event planner consultation: 01 Deliverables, 02 Staffing, 03 Changes, 04 Emergency support"
              width={1400}
              height={933}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground">
                1. Deliverables &amp; Staffing
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Will there be a dedicated on-site event lead throughout production?</li>
                <li>• Exactly how many crew members will manage guest hospitality and cueing?</li>
                <li>• What specific stages (design, sourcing, on-day) are covered in the fee?</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground">
                2. Procurement &amp; Invoices
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Do you share original vendor invoices directly with the client?</li>
                <li>• Do you accept supplier commissions or referral kickbacks?</li>
                <li>• Can the client independently approve or replace recommended suppliers?</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-2">
              <h3 className="font-semibold text-foreground">
                3. Financial Reporting
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• How frequently is the central budget ledger shared and updated?</li>
                <li>• What formal approval process is required before committing extra spend?</li>
                <li>• What is the protocol and backup plan for weather or vendor defaults?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 14: Frequently Asked Questions */}
        <section aria-labelledby="section-14-heading" className="space-y-6 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              Section 14
            </div>
            <h2
              id="section-14-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              14. Frequently Asked Questions
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Straightforward answers to the most common questions regarding event planning investments, budgeting, and fee structures in India:
          </p>

          <div className="space-y-3">
            {eventCostIndiaFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-card border border-border/60 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base"
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
                    <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 15: Conclusion */}
        <section aria-labelledby="section-15-heading" className="space-y-4 pt-6 border-t border-border/40">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Section 15
            </div>
            <h2
              id="section-15-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-foreground"
            >
              15. Conclusion: Plan the Experience, Not Just the Price
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            The right answer to how much event planning costs in India is never a single static number. It is a structured, transparent financial roadmap built around your occasion, your aesthetic vision, your guest count, and your defined spending ceiling.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By prioritizing essential guest experiences, requesting comparable itemized written proposals, keeping the professional planner fee clearly identified, and tracking expenses from estimate through to actual execution, you ensure that every rupee spent delivers meaningful hospitality and memorable moments.
          </p>
        </section>

        {/* Related Articles Section */}
        <section
          aria-labelledby="related-guides-title"
          className="space-y-4 pt-6 border-t border-border/60"
        >
          <h3
            id="related-guides-title"
            className="text-xl font-serif font-bold text-foreground"
          >
            Explore Related Event Planning Resources
          </h3>
          <p className="text-sm text-muted-foreground">
            Continue organizing your celebration with our practical planning guides:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/how-to-create-an-event-budget"
                className={linkClass}
              >
                How to Create an Event Budget
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/how-to-plan-a-successful-wedding"
                className={linkClass}
              >
                How to Plan a Successful Wedding
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/complete-event-planning-checklist"
                className={linkClass}
              >
                Complete Event Planning Checklist
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/how-early-should-you-hire-an-event-planner"
                className={linkClass}
              >
                How Early Should You Hire an Event Planner?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/event-planner-vs-event-manager"
                className={linkClass}
              >
                Event Planner vs Event Manager: What&apos;s the Difference?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/what-does-an-event-planner-do"
                className={linkClass}
              >
                What Does an Event Planner Do?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              <Link
                href="/blog/how-to-choose-the-right-event-planner-for-your-event"
                className={linkClass}
              >
                How to Choose the Right Event Planner
              </Link>
            </li>
          </ul>
        </section>

        {/* High-Contrast Conversion CTA Block */}
        <section
          aria-labelledby="cta-heading"
          className="p-8 sm:p-10 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl relative overflow-hidden text-center my-12"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Personalized Budget &amp; Scope Consultation
            </div>

            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground"
            >
              Need Help Building a Realistic Event Plan and Budget?
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Share your event vision, guest count, city, and priorities with AS Event Management. Our team can help you build a clear, transparent planning scope and realistic budget roadmap tailored to your celebration.
            </p>

            {/* CTA Buttons: Primary (gold/tan bg + dark text) | Secondary (dark navy bg + white text) */}
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
