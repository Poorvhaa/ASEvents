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
  Plane,
  Briefcase,
  PartyPopper,
  Flame,
  CheckSquare,
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
    title: 'City Tier, Location & Season',
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

const hiddenCostItems = [
  { item: 'Taxes (GST)', desc: '18% on venue, decor, and AV production; 5% on pure outdoor catering.' },
  { item: 'Service Charges', desc: 'Discretionary venue or hotel banquet service levies (often 5% to 10%).' },
  { item: 'Overtime Penalties', desc: 'Hourly surcharges for setup delays or late-night teardown past curfew.' },
  { item: 'Security & Housekeeping', desc: 'Dedicated venue marshals, bag-check personnel, and washroom attendants.' },
  { item: 'Additional Power & Fuel', desc: 'Diesel consumption for synchronized generator backups during heavy loads.' },
  { item: 'Furniture & Linen Rentals', desc: 'Extra round tables, chiavari chairs, sofa lounges, and table skirting.' },
  { item: 'Guest Transportation', desc: 'Airport transfers, late-night shuttle vans, and valet driver staffing.' },
  { item: 'Shipping & Freight', desc: 'Transportation charges for specialized props, trussing, or bespoke decor pieces.' },
  { item: 'Vendor Accommodation & Meals', desc: 'Hotel rooms and hot meal packs for photography, DJ, and production crews.' },
  { item: 'Rehearsal Time', desc: 'Venue access fees for Sangeet dance run-throughs or corporate AV line-checks.' },
  { item: 'Technical Standby Staff', desc: 'Dedicated on-site sound engineers, LED video switchers, and electricians.' },
  { item: 'Live-Streaming Hardware', desc: 'High-speed dedicated bonded internet and multi-camera broadcast switchers.' },
  { item: 'Signage & Directional Displays', desc: 'Wayfinding easels, branded registration backdrops, and parking signboards.' },
  { item: 'Statutory Permits & Licenses', desc: 'PPL/IPRS/NOVEX music copyrights, local police permissions, and fire NOCs.' },
  { item: 'Refundable Caution Deposits', desc: 'Venue security deposits held against carpet tears or delayed vacancy.' },
  { item: 'Cancellation & Modification Terms', desc: 'Non-refundable advance booking policies and date-change penalty clauses.' },
]

const masterChecklistItems = [
  { step: '01', title: 'Event Brief', desc: 'Define occasion, key goals, target dates, and aesthetic direction.' },
  { step: '02', title: 'Budget Ceiling', desc: 'Establish non-negotiable financial limit before inquiring with venues.' },
  { step: '03', title: 'Guest Count Sizing', desc: 'Establish invited, expected, and guaranteed minimum headcount tiers.' },
  { step: '04', title: 'Venue Landed Cost', desc: 'Compare base rent plus mandatory catering, power, and overtime fees.' },
  { step: '05', title: 'Catering Inclusions', desc: 'Lock per-plate rates, live cooking stations, and dietary options.' },
  { step: '06', title: 'Décor & Ambience', desc: 'Prioritize focal zones (entrance, stage, tables) over vast open areas.' },
  { step: '07', title: 'AV & Technical Production', desc: 'Secure crystal-clear microphones, stage audio, and LED walls.' },
  { step: '08', title: 'Photography & Media', desc: 'Confirm shooting hours, crew size, deliverables, and copyright terms.' },
  { step: '09', title: 'Entertainment & Artists', desc: 'Verify rider requirements, sound checks, green rooms, and licenses.' },
  { step: '10', title: 'Transport & Logistics', desc: 'Coordinate airport transfers, parking marshals, and vendor freight.' },
  { step: '11', title: 'Planner Professional Fee', desc: 'Delineate management fee separately from third-party vendor charges.' },
  { step: '12', title: 'Taxes & Statutory Permits', desc: 'Factor in GST (18%/5%), music performance licenses, and fire NOC.' },
  { step: '13', title: 'Vendor Payment Schedules', desc: 'Log deposit deadlines and milestone payment criteria in contracts.' },
  { step: '14', title: 'Contingency Reserve', desc: 'Isolate 5% to 10% emergency buffer with strict approval authority.' },
  { step: '15', title: 'Final Reconciliation', desc: 'Reconcile actual bills, recover caution deposits, and archive receipts.' },
]

const plannerQuestions = [
  { q: 'What planning stages are included in your scope?', a: 'Confirm whether the fee covers concept design, vendor procurement, negotiations, and on-site event execution, or purely day-of coordination.' },
  { q: 'Is there a dedicated event-day lead assigned to our celebration?', a: 'Ensure you know who will physically direct operations, cues, and emergencies on the ground throughout the event.' },
  { q: 'How many team members will be on-site on event day?', a: 'Ask for the exact crew headcount assigned to manage guest hospitality, vendor load-in, backstage timing, and stage coordination.' },
  { q: 'Which specific vendors and services are included or excluded?', a: 'Clarify whether decor fabrication, sound equipment, or guest transportation are handled directly or contracted through third-party vendors.' },
  { q: 'How are changes in guest count or schedule priced?', a: 'Understand the formula and notice period required if guest numbers increase or if ceremonial timings shift.' },
  { q: 'What is the payment schedule and milestone breakdown?', a: 'Request explicit dates for advance deposits and progress milestones tied to deliverable completions rather than arbitrary calendar dates.' },
  { q: 'What is your cancellation and date-change policy?', a: 'Review written terms regarding non-refundable deposits, postponement fees, and force majeure event disruptions.' },
  { q: 'What travel, stay, and per diem expenses apply for out-of-town events?', a: 'Clarify planner flights, hotel accommodations, airport transfers, and crew daily food allowances upfront to prevent unexpected bills.' },
  { q: 'How are emergencies, weather delays, or vendor defaults handled?', a: 'Evaluate their documented backup protocols for sudden rain on outdoor lawns, generator failure, or delayed sound technicians.' },
  { q: 'Who owns and shares the master vendor list and run-of-show schedule?', a: 'Ensure you receive transparent access to all vendor contact details, setup arrival schedules, and minute-by-minute cue sheets.' },
  { q: 'Do you receive vendor commissions or referral kickbacks?', a: 'Ask whether vendor recommendations are based strictly on merit and client value or on undisclosed supplier referral fees.' },
  { q: 'Can the client review and retain copies of all vendor contracts and invoices?', a: 'Verify that original vendor invoices are shared directly with the client for transparent financial accountability.' },
  { q: 'How frequently is the central budget ledger updated and shared?', a: 'Confirm whether financial status updates happen weekly, bi-weekly, or in real-time as quotes and deposits are confirmed.' },
  { q: 'Who has the authority to approve extra expenditures or budget reallocations?', a: 'Establish a strict governance rule so that no vendor or planner commits extra client funds without formal written sign-off.' },
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
                There is <strong>no fixed nationwide price</strong> for event planning in India. Total cost depends on the city, venue, date, guest count, number of functions, catering, décor, production, logistics and the level of professional planning support required.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Two celebrations with the exact same guest count can have drastically different budgets depending on whether you choose a local banquet hall or a luxury five-star palace resort. Use local itemized quotations to establish a realistic final budget.
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
            Every realistic event budget starts with an explicit event brief: the occasion, intended outcome, expected guest attendance, preferred dates, and desired scale. Rather than a mysterious single price tag, the total investment is governed by four deeply interconnected cost drivers:
          </p>

          {/* Infographic Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/cost-drivers-breakdown.jpg"
              alt="Event planning budget and cost guide for events in India: 01 City and season, 02 Guest count, 03 Event complexity, 04 Service scope"
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
            Understanding how these drivers interact helps you avoid unexpected surprises. For example, selecting a luxury five-star hotel doesn&apos;t just increase venue rental; it often requires using mandatory in-house catering with higher per-plate minimums and strict vendor royalty charges for external decorators. For a structured breakdown of early timelines, explore our{' '}
            <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>
              guide on how early to hire an event planner
            </Link>.
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

          <p className="text-muted-foreground leading-relaxed">
            When reviewing venue options, <strong>compare the TOTAL landed cost, not only advertised venue rental</strong>. A bare-hall quote that appears inexpensive often requires significant add-on expenses for external generators, vendor kitchen royalties, setup and teardown access fees, furniture rentals, cleaning staff, and overnight security.
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
                  Quotes a tempting base rental of ₹1,00,000. However, the contract excludes generator diesel (₹35,000), security caution deposit (₹50,000), outside caterer kitchen royalty (₹40,000), and air-conditioning beyond 4 hours (₹12,000/hr).
                </p>
                <div className="font-medium text-foreground pt-1">
                  Effective Landed Venue Cost: ₹2,00,000+
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
              Always request itemized venue terms detailing load-in hours, sound curfew times, vendor royalties, and GST rates (typically 18%) before signing. Check out our{' '}
              <Link href="/blog/complete-event-planning-checklist" className={linkClass}>
                complete event planning checklist
              </Link>{' '}
              for key venue inspection items.
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
            Guest count is not just a number on the invitation; it is the single most powerful multiplier in event planning. Headcount dictates food and beverage bills, venue capacity, dining table counts, chair rentals, linen quantities, hospitality staff ratios, parking space, and guest transfers.
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
              <strong>Hypothetical Arithmetic Illustration:</strong> As a simple illustration from planning practice, an extra 25 guests at an assumed all-in per-person food and service estimate of ₹1,500 would add <strong>₹37,500</strong> directly to the catering budget alone, before accounting for additional seating, table centerpieces, favors, or transport.
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
            In Indian celebrations, culinary hospitality is at the heart of the guest experience. Whether planning regional traditional feasts, lavish multi-cuisine buffets, artisanal live cooking counters, or corporate banquet spreads, food typically represents 25% to 35% of total event spending.
          </p>

          {/* Catering Diagram Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/catering-cost-breakdown.jpg"
              alt="Catering cost breakdown: 01 Guest count x per-plate rate, 02 Menu choices & live counters, 03 Service staff & rentals, 04 Taxes, minimums & extra charges"
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
              Total Catering Cost = (Expected Billable Guests × Agreed Per-Guest Rate) + Agreed Extras &amp; Specialty Counters + Staffing &amp; Tableware Rentals + Applicable Taxes/Charges
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Specialized Dietary Needs:</strong> Account for pure vegetarian spreads, strict Jain preparations, allergy-aware items, and dedicated children&apos;s meals.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Service Styles:</strong> Balance plated sit-down service, multi-station buffets, and roaming canapé trays against kitchen staffing limits.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Infrastructure Rentals:</strong> Include kitchen prep tables, warming chafers, luxury chinaware, cutlery, glassware, and clean linen rentals.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span><strong>Beverage Logistics &amp; Taxes:</strong> Factor in drinking water dispensers, ice chillers, corkage fees, bartending permits, and 5% to 18% GST.</span>
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
                Must Have
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
                Nice to Have
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
                Optional
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
            For corporate seminars, allocate funds to dependable AV, presentation switchers, and high-speed delegate Wi-Fi over elaborate floral arrangements. For a wedding reception or Sangeet, prioritize professional sound engineering and dynamic stage lighting over excessive peripheral props. For an in-depth breakdown of budget allocations, read our{' '}
            <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>
              guide on how to create an event budget
            </Link>.
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
            Weddings, corporate conferences, private celebrations, and destination events each operate on distinct cost architectures. Rather than quoting a misleading national average, evaluate expenses within the relevant category:
          </p>

          {/* Event Types Comparison Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/event-types-cost-breakdown.jpg"
              alt="Different event types and budget considerations for celebrations across India"
              width={1400}
              height={933}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {/* Wedding Card */}
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Flame className="w-5 h-5 text-primary" />
                <h3 className="text-base font-serif font-bold">
                  Weddings &amp; Multi-Day Celebrations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Indian weddings frequently comprise multiple ceremonies across several days: Haldi, Mehendi, Sangeet, Mandap rituals, and a Grand Reception. In your budget, treat each function as a distinct mini-event with its own venue layout, catering requirements, sound setup, and guest hospitality flow. Learn more about our bespoke{' '}
                <Link href="/services/wedding-planning" className={linkClass}>
                  wedding planning services
                </Link>{' '}
                and our comprehensive{' '}
                <Link href="/blog/how-to-plan-a-successful-wedding" className={linkClass}>
                  guide to planning a successful wedding
                </Link>.
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground">
                <strong>Pricing Note:</strong> Online figures like <em>₹5 Lakh to ₹25 Lakh</em> for example smaller or mid-scale weddings represent <strong>hypothetical planning scenarios only</strong>, not guaranteed commercial benchmarks.
              </div>
            </div>

            {/* Corporate Card */}
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-base font-serif font-bold">
                  Corporate Conferences &amp; Product Launches
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Corporate event budgets center on measurable business outcomes: stakeholder communication, lead generation, or team recognition. Spending is focused heavily on dependable AV technology, digital stage backdrops, delegate registration platforms, high-speed Wi-Fi, executive dining, and branded collateral. Explore our dedicated{' '}
                <Link href="/services/corporate-events" className={linkClass}>
                  corporate event management services
                </Link>.
              </p>
              <div className="p-3 rounded-xl bg-muted/60 border border-border/60 text-xs text-muted-foreground">
                <strong>Focus:</strong> Reliability and audience flow take precedence over elaborate floral styling.
              </div>
            </div>

            {/* Private Celebrations Card */}
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <PartyPopper className="w-5 h-5 text-primary" />
                <h3 className="text-base font-serif font-bold">
                  Birthdays, Anniversaries &amp; Social Parties
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Social gatherings allow hosts to maintain personal connections while strictly bounding complexity. Broad illustrative scenarios like <em>₹20,000 to ₹1 Lakh</em> for intimate home parties or <em>₹1 Lakh to ₹5 Lakh</em> for banquet setups are preliminary scoping bands only. Explore our{' '}
                <Link href="/services/birthday-celebrations" className={linkClass}>
                  birthday party planning
                </Link>{' '}
                and{' '}
                <Link href="/services/anniversary-events" className={linkClass}>
                  anniversary celebration services
                </Link>.
              </p>
              <div className="p-3 rounded-xl bg-muted/60 border border-border/60 text-xs text-muted-foreground">
                <strong>Focus:</strong> For kids&apos; parties, prioritize safety and fun schedules; for anniversaries, focus on accessibility and comfort.
              </div>
            </div>

            {/* Destination Events Card */}
            <div className="p-5 rounded-2xl bg-card border border-border/60 space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Plane className="w-5 h-5 text-primary" />
                <h3 className="text-base font-serif font-bold">
                  Destination Events &amp; Logistics
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Destination celebrations in Udaipur, Goa, Jaipur, or international retreats add extensive logistics: guest hotel room blocks, airport shuttle fleets, local vendor scouting, freight haulage, out-of-town crew per diems, and regional municipal clearances. Discover our specialized{' '}
                <Link href="/services/destination-weddings" className={linkClass}>
                  destination wedding management services
                </Link>.
              </p>
              <div className="p-3 rounded-xl bg-muted/60 border border-border/60 text-xs text-muted-foreground">
                <strong>Focus:</strong> Hospitality desks, welcome kits, and local vendor negotiation dominate the logistics budget.
              </div>
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
            An event planner&apos;s professional fee compensates for planning expertise, contract negotiations, vendor vetting, run-of-show scheduling, and on-site event execution. It is crucial to understand that <strong>an event planner fee is separate from the total event budget</strong> unless a written turnkey contract explicitly bundles them. For more on responsibilities, read our comparison of{' '}
            <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>
              event planners vs event managers
            </Link>{' '}
            and overview of{' '}
            <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>
              what an event planner does
            </Link>.
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
                Commonly advertised around <strong>10% to 15%</strong> of the overall managed budget for full-scale weddings. <em>Note: This is an example published model, not a universal industry standard.</em> Ensure the contract states exactly which expenses (venue rent, guest rooms, alcohol) are included in the percentage calculation base.
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
            <strong>Can a planner save you money?</strong> An experienced planner frequently saves clients money by eliminating duplicate vendor rentals, negotiating fair wholesale rates, avoiding hidden hotel penalty fees, and steering you away from unreliable suppliers. However, their core value is delivering a seamless, stress-free celebration where your investment produces maximum impact. Read our advice on{' '}
            <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>
              how to choose the right event planner
            </Link>.
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
            To visualize how event funds are allocated, consider an <strong>Illustrative ₹10 Lakh Event Budget Example</strong> for a hypothetical mid-sized celebration with a hard spending ceiling of ₹10,00,000.
          </p>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong>Important Note:</strong> This is a hypothetical planning example, not a current market quotation or universal recommended allocation. Actual distribution will depend on your guest count, city, venue standards, and occasion.
            </div>
          </div>

          {/* Sample 10 Lakh Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/sample-10-lakh-budget-overview.jpg"
              alt="Illustrative 10 lakh event budget breakdown example"
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
                  Illustrative ₹10,00,000 Event Budget Allocation
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
            Unbudgeted expenses are the primary reason event estimates derail. Before signing vendor contracts, review this comprehensive 16-point checklist to uncover hidden liabilities:
          </p>

          {/* Hidden Expenses Diagram Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/hidden-expenses-checklist.jpg"
              alt="Hidden expenses checklist for Indian event planning"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Scannable Checklist Grid */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {hiddenCostItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-card border border-border/70 hover:border-primary/40 transition-colors shadow-sm flex items-start gap-3"
              >
                <div className="p-1 rounded-md bg-primary/10 text-primary shrink-0 mt-0.5">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">
                    {item.item}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
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
            An event budget is a living operational control document, not a spreadsheet created once and abandoned. A rigorous framework tracks costs across six progressive financial stages:
          </p>

          {/* Track Spending Image */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/track-spending-real-time.jpg"
              alt="Track spending in real time: 01 Estimate, 02 Vendor quote, 03 Committed, 04 Paid, 05 Balance, 06 Actual"
              width={1400}
              height={547}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Responsive Process Flow */}
          <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
            <h3 className="text-base font-serif font-semibold text-foreground">
              The 6-Stage Real-Time Financial Ledger
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-xs">
              <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                <span className="font-mono font-bold text-primary block">01</span>
                <span className="font-semibold text-foreground block">Estimate</span>
                <span className="text-[11px] text-muted-foreground block">Target Cap</span>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                <span className="font-mono font-bold text-primary block">02</span>
                <span className="font-semibold text-foreground block">Vendor Quote</span>
                <span className="text-[11px] text-muted-foreground block">Written Offer</span>
              </div>
              <div className="p-3 rounded-xl bg-background border border-primary/40 space-y-1 shadow-sm">
                <span className="font-mono font-bold text-primary block">03</span>
                <span className="font-semibold text-foreground block">Committed</span>
                <span className="text-[11px] text-muted-foreground block">Signed Contract</span>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                <span className="font-mono font-bold text-primary block">04</span>
                <span className="font-semibold text-foreground block">Paid</span>
                <span className="text-[11px] text-muted-foreground block">Logged Deposits</span>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                <span className="font-mono font-bold text-primary block">05</span>
                <span className="font-semibold text-foreground block">Balance</span>
                <span className="text-[11px] text-muted-foreground block">Due Milestones</span>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                <span className="font-mono font-bold text-primary block">06</span>
                <span className="font-semibold text-foreground block">Actual</span>
                <span className="text-[11px] text-muted-foreground block">Reconciled Final</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic pt-1">
              <strong>Explaining Variance:</strong> If stage lighting was estimated at ₹60,000 but the vendor quote comes in at ₹75,000, you have a ₹15,000 variance. You must either reduce another optional line item, negotiate a narrower lighting scope, or formally approve a revised category cap. Never bury variance in miscellaneous!
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
              alt="Event planner discussing budget and vendor quotations with clients"
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
                <li>• <strong>Same-Scope Comparisons:</strong> Always compare vendor proposals against identical written requirements.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-destructive/30 space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                Never Compromise On These Items
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Guest Safety &amp; Fire Egress:</strong> Never compromise on fire exits, crowd control, or licensed electrical distribution.</li>
                <li>• <strong>Generator Backup Power:</strong> Never risk power failure during key ceremonial moments or high-stakes corporate speeches.</li>
                <li>• <strong>Sound &amp; Audio Quality:</strong> Cheap audio that feeds back or muffles vows will ruin the guest experience instantly.</li>
                <li>• <strong>Catering Hygiene &amp; Clean Water:</strong> High food hygiene and temperature management are fundamental to hospitality.</li>
                <li>• <strong>Required Municipal Permits:</strong> Always secure sound clearances, police NOCs, and copyright licenses.</li>
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
            A comprehensive 15-item budget checklist to keep your financial planning organized from initial concept through to final post-event reconciliation:
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {masterChecklistItems.map((chk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-card border border-border/70 shadow-sm space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary">
                    {chk.step}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    {chk.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  {chk.desc}
                </p>
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
            A quotation is only meaningful when you know precisely what it covers. Before signing an event management agreement, interview candidates across these 14 essential accountability questions:
          </p>

          {/* Consultation Photo */}
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
            <Image
              src="/images/blog/how-much-does-event-planning-cost-in-india/hiring-event-planner-consultation.jpg"
              alt="Event planner discussing budget and vendor quotations with clients"
              width={1400}
              height={933}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 14 Specific Questions Accordion / List */}
          <div className="space-y-3 pt-2">
            {plannerQuestions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-card border border-border/60 space-y-1"
              >
                <div className="flex items-start gap-2.5 font-semibold text-xs sm:text-sm text-foreground">
                  <span className="text-primary font-mono shrink-0">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                  </span>
                  <span>{item.q}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground pl-6 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
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
            The right answer to how much event planning costs in India is not a single number: it is a transparent plan based on your celebration, your guests, and your spending limit. Define your priorities, request comparable written quotations, separate the planner&apos;s professional fee from supplier charges, and track estimates against commitments.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you are preparing a wedding, corporate conference, birthday, or family celebration, focus on the experience you want guests to remember. Explore our full range of{' '}
            <Link href="/services" className={linkClass}>
              event planning services
            </Link>
            , browse curated{' '}
            <Link href="/packages" className={linkClass}>
              event packages
            </Link>
            , or view past celebrations in our{' '}
            <Link href="/portfolio" className={linkClass}>
              event portfolio
            </Link>
            .
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
                How to Create an Event Budget: A Practical Guide for Any Event
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
                How to Choose the Right Event Planner for Your Event
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
              Share your event type, location, preferred date, guest count and priorities with AS Event Management. Our team can help you define the scope, understand the services required and prepare for meaningful vendor discussions.
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
