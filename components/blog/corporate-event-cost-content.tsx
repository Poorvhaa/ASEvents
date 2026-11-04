'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Check,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  FileSpreadsheet,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Target,
  Award,
  BarChart3,
  Briefcase,
  Layers,
  Compass,
  Video,
  MonitorPlay,
  MessageSquare,
  Radio,
  Building2,
  FileText,
  Workflow,
  ClipboardList,
  MapPin,
  Utensils,
  Plane,
  Receipt,
  PieChart,
  Sliders,
  CheckSquare,
  Square,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, corporateEventCostFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('how-much-does-corporate-event-planning-cost-in-india')
const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

export function CorporateEventCostContent() {
  const { openModal } = useQuoteModal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  if (!article) return null

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const toggleCheckbox = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const budgetChecklistItems = [
    'Business objective and measurable KPIs confirmed with executive leadership',
    'Event type and format determined by audience purpose (meeting, launch, conference, convention)',
    'Expected total delegate attendance estimated with realistic arrival attrition',
    'Minimum guaranteed headcount confirmed with venue and catering providers',
    'Venue rental structure checked (hall rental vs. F&B minimum vs. per-delegate package)',
    'Setup, rehearsal, and dismantling access hours verified to avoid overtime penalties',
    'Catering menu locked with meal-by-meal pricing and drinking water provisions',
    'Dietary requirements collected early (vegetarian, Jain, vegan, and allergen protocols)',
    'Speaker and technical crew meals budgeted explicitly to avoid day-of additions',
    'Registration workflow, confirmation emails, badges, and check-in desks planned',
    'AV technical rider finalized (screen size, audio coverage, stage lighting, and power backup)',
    'Dedicated AV operating technicians and setup labor included in vendor quotation',
    'Stage backdrop, registration branding, and directional signs quoted with installation',
    'Speaker honorariums, travel, accommodation, and recording permissions confirmed in writing',
    'Event photography, videography, or livestreaming infrastructure quoted separately',
    'Delegate hotel room-nights calculated using actual occupancy assumptions (single vs. twin)',
    'Airport transfers and shuttle vehicles booked with clear operating hours and toll policies',
    'Professional planner scope, deliverables, lead manager, and on-site crew documented',
    'Management fee structure clarified (fixed project fee or verified percentage base)',
    'Statutory GST (18%) and local municipal or music licensing fees accounted for',
    'Contingency reserve (10–15%) calculated on a clearly defined base without masking known costs',
    'Staged payment schedule, deposit deadlines, and cancellation liabilities mapped to cash flow',
    'Final post-event invoice reconciliation and budget variance review protocol established',
  ]

  const keyCostDrivers = [
    {
      icon: Users,
      title: 'Delegate Count',
      desc: 'Drives catering, badges, seating, transport, and hotel room blocks. Fixed stage and design costs remain steady as attendance expands.',
    },
    {
      icon: MapPin,
      title: 'Location & Venue',
      desc: 'Metropolitan luxury ballrooms have higher hall rates; remote resort destinations increase flight, shuttle, and lodging commitments.',
    },
    {
      icon: Target,
      title: 'Event Format',
      desc: 'A strategic board retreat needs intimate executive hospitality; a product launch demands high-impact LED displays and stage effects.',
    },
    {
      icon: Layers,
      title: 'Customisation',
      desc: 'Bespoke stage architecture, immersive brand installations, and themed entrance tunnels require specialized fabrication and labor.',
    },
    {
      icon: MonitorPlay,
      title: 'AV & Production',
      desc: 'High-lumen LED walls, multi-camera streaming, line-array audio, stage lighting, and backup hardware significantly shape expenditure.',
    },
    {
      icon: Utensils,
      title: 'Catering Scope',
      desc: 'High-tea breaks, plated executive lunches, multi-cuisine gala buffets, and crew meals require transparent per-head and service pricing.',
    },
    {
      icon: Plane,
      title: 'Travel & Lodging',
      desc: 'Flights, airport transfers, room-night allocations, single supplements, early check-in allowances, and speaker transit.',
    },
    {
      icon: Briefcase,
      title: 'Planning Scope',
      desc: 'Full-service creative direction, vendor procurement, run-sheet management, on-site floor teams, and post-event financial auditing.',
    },
  ]

  return (
    <article className="pt-28 pb-16 sm:pb-24 bg-background">
      <ArticleHeader
        post={article}
        badgeLabel="Corporate Event Budget Guide"
        shareTitle="How Much Does Corporate Event Planning Cost in India?"
      />

      {/* Featured Hero Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-muted">
          <Image
            src={article.image}
            alt="Corporate conference with speaker presenting to business delegates in India"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-foreground/90 text-base sm:text-lg leading-relaxed">
        {/* Quick Answer Box */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg">
          <div className="flex items-center gap-2.5 mb-3 text-primary font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Quick Answer</span>
          </div>
          <p className="text-foreground font-semibold text-lg sm:text-xl mb-3">
            There is no single fixed corporate event planning cost in India. The final budget depends on the business objective, event type, city, venue, delegate count, catering, production, travel, staffing and planning scope.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Build an itemized budget and compare equivalent written proposals instead of relying only on headline package prices.
          </p>
        </div>

        {/* Introduction */}
        <section className="space-y-4">
          <p>
            Understanding the true <strong>corporate event planning cost in India</strong> is essential for finance directors, marketing heads, and corporate event committees seeking maximum business return without unexpected budget overruns. Whether you are organizing a half-day leadership workshop for 25 executives or a national three-day dealer conference for 500 delegates, event expenditure varies widely based on geographic market, venue tier, production ambition, and operational scope.
          </p>
          <p>
            A short internal seminar and a multi-day commercial convention require entirely different production crews, audio-visual infrastructure, catering services, and delegate logistics. For this reason, there is no single national price that reliably covers every corporate function. The most dependable path to an accurate budget is to build an itemized cost model that separates venue hire, delegate hospitality, audio-visual staging, travel, and professional event management fees.
          </p>
          <p>
            This comprehensive guide breaks down the core cost drivers behind corporate events in India, explains what each major spending category involves, provides illustrative budget benchmarks by event format, details a full 100-delegate conference worked scenario, and shares proven cost-control strategies. For broader operational context, explore our <Link href="/blog/corporate-event-planning-complete-guide" className={linkClass}>complete corporate event planning guide</Link>, our step-by-step tutorial on <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>how to create an event budget</Link>, and our nationwide overview of <Link href="/blog/how-much-does-event-planning-cost-in-india" className={linkClass}>how much does event planning cost in India</Link>.
          </p>
        </section>

        {/* Scannable Key Cost Drivers Section */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <Sliders className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Key Cost Drivers in Corporate Event Planning
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every business event budget in India is shaped by eight primary variables. Evaluating each driver early ensures your financial allocations support your strategic goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keyCostDrivers.map((driver, idx) => {
              const Icon = driver.icon
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-foreground text-base sm:text-lg">
                      {driver.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {driver.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 1: Key Factors Influencing Corporate Event Cost */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Key Factors Influencing Corporate Event Cost
            </h2>
          </div>

          {/* Factor 1: Scale and Number of Attendees */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              1. Scale and Number of Attendees
            </h3>
            <p>
              Delegate numbers directly govern variable expenditures: catering covers, welcome kits, printed identification badges, shuttle transport, and hotel room nights. However, total event spend does not scale in a linear fashion. Core stage architecture, presentation graphics, lighting trussing, and primary audio systems are largely fixed overheads whether 60 or 150 people sit in the audience.
            </p>
            <p>
              Cost escalations occur when delegate counts cross venue capacity thresholds. Expanding beyond a hall’s maximum seating may force your team into a higher-tier ballroom, mandate supplementary repeater video monitors, require duplicate registration check-in counters, and demand additional on-site security guards.
            </p>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs sm:text-sm text-foreground/90 leading-relaxed">
              <strong>Professional Planning Rule:</strong> Build your preliminary financial model around a realistic median headcount and a separate minimum guarantee. Confirm the exact contractual deadline by which final catering numbers become legally binding, and clarify how late registrations are priced. Always include guest speakers, event committee members, technical operators, and on-site support crew in your meal calculations.
            </div>
          </div>

          {/* Factor 2: Location and Venue */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              2. Location and Venue
            </h3>
            <p>
              Destination city, municipal taxes, neighbourhood prestige, hotel property star classification, seasonality, and calendar availability significantly influence venue pricing. High-demand business hotels in central business districts across Mumbai, Delhi NCR, and Bengaluru command premium banquet tariffs. Conversely, hosting an event at a heritage palace or resort destination in Udaipur, Jaipur, or Goa may offer scenic appeal, but travel expenses, chartered airport transfers, and guest room commitments can increase the bottom line.
            </p>
            <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 my-4 bg-muted">
              <Image
                src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/venue-inspection.jpg"
                alt="Corporate event venue inspection and cost planning"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p>
              Corporate planners must always evaluate the <strong>Total Delivered Cost</strong> rather than looking at bare hall rental alone. A venue with a lower base fee might lack freight loading docks, have insufficient three-phase power, provide restricted rigging points, or enforce exorbitant outside-vendor royalties that erase initial savings.
            </p>
            <p>
              Always evaluate physical seating capacity within your chosen floor plan: a hall capable of seating 300 delegates theatre-style may accommodate fewer than 160 participants in a clustered cabaret or classroom layout. Inquire about acoustic insulation, dedicated breakout rooms, freight elevators, parking bays, high-density Wi-Fi bandwidth, accessibility ramps, and early setup access windows.
            </p>
          </div>

          {/* Factor 3: Type and Purpose of the Event */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              3. Type and Purpose of the Event
            </h3>
            <p>
              The business purpose of the gathering dictates its technical and experiential requirements far more than headcount alone. Compare the distinct operational profiles of standard corporate formats:
            </p>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Training Workshop:</strong> Focuses on acoustic clarity, functional working desks, reliable breakout Wi-Fi, and facilitator technology.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Product Launch:</strong> Demands dynamic theatrical reveal mechanics, synchronized lighting, rehearsed audio cues, high-resolution product demo staging, and dedicated media facilities.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Annual Awards Evening:</strong> Requires formal stage management, professional emcees, entertainment, walk-up music cues, polished trophy presentation protocols, and an upscale gala dinner.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Industry Convention:</strong> Involves concurrent breakout tracks, expansive trade exhibition stalls, badge scanning funnels, and multi-day hospitality coordination.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Investor Presentation &amp; Town Hall:</strong> An intimate investor meeting requires premium hospitality and flawless executive acoustics, while an internal town hall may utilize an existing corporate auditorium.</span>
              </li>
            </ul>
          </div>

          {/* Factor 4: Customisation and Theme */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              4. Customisation and Theme
            </h3>
            <p>
              Custom stage fabrication, kinetic architectural backdrops, specialized lighting trusses, and bespoke interactive exhibition displays require original 3D design, construction materials, skilled carpentered labor, and extensive on-site build time. Request individual line-item quotations for every major scenic build.
            </p>
            <p>
              For recurring quarterly roadshows or regional sales summits, investing in modular, reusable corporate branding structures pays off over multiple cities, provided transit freight and regional warehouse storage fees are budgeted properly.
            </p>
          </div>
        </section>

        {/* Section 2: Venue, Catering and Delegate Experience */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <Building2 className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Venue, Catering and Delegate Experience
            </h2>
          </div>

          {/* 5. Venue Hire and Access */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              5. Venue Hire and Access
            </h3>
            <p>
              When evaluating hotel and convention center quotations, distinguish between the three prevalent commercial pricing structures used across India:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-lg bg-background border border-border/80">
                <strong className="block text-primary mb-1">Hall Rental Only</strong>
                Fixed fee for physical space usage. Food, beverages, tables, and equipment are billed separately or contracted through approved outside vendors.
              </div>
              <div className="p-4 rounded-lg bg-background border border-border/80">
                <strong className="block text-primary mb-1">F&amp;B Minimum Commitment</strong>
                The venue waives or discounts hall rent if the event achieves a guaranteed minimum food and beverage billing amount.
              </div>
              <div className="p-4 rounded-lg bg-background border border-border/80">
                <strong className="block text-primary mb-1">Per-Delegate Package</strong>
                A bundled per-head rate covering the conference hall, working lunch, two tea/coffee breaks, standard projector, and basic house furniture.
              </div>
            </div>
            <p>
              Scrutinize the contracted operating hours carefully. If your business conference begins at 8:30 AM, production and staging vendors will require load-in access the prior evening. Confirm charges for overnight setup access, venue electrician attendance, supplementary generator power, housekeeping, outside vendor permissions, and venue security.
            </p>
          </div>

          {/* 6. Catering and Refreshments */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              6. Catering and Refreshments
            </h3>
            <p>
              Corporate catering costs correlate directly with the number of planned refreshment breaks, menu complexity, beverage service, and service staff ratios. A full-day conference typically includes morning registration refreshments, mid-morning tea/coffee, a business buffet lunch, afternoon high-tea, and an optional evening cocktail reception.
            </p>
            <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 my-4 bg-muted">
              <Image
                src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/corporate-catering.jpg"
                alt="Corporate conference catering and networking area"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p>
              Obtain meal-by-meal pricing and clarify mineral water allowances, live food stations, tableware, and any separate venue catering royalties. In Indian corporate settings, capturing detailed dietary preferences—including pure vegetarian, Jain preparations, halal requirements, and allergen sensitivities—is mandatory. Ensure speaker schedules, staggered crew lunches, and late attendee arrivals are factored into the service flow.
            </p>
          </div>

          {/* 7. Registration and Business Hospitality */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              7. Registration and Business Hospitality
            </h3>
            <p>
              Registration constitutes the attendee&apos;s initial touchpoint and requires its own dedicated budget allocation. Depending on scale, this includes invitation design, digital confirmation workflows, registration portal licensing, customized badge printing, lanyard procurement, and trained check-in hostesses. Anticipate morning arrival surges by provisioning sufficient check-in desks to prevent queues.
            </p>
            <p>
              Prioritize useful hospitality over excessive merchandise. High-speed Wi-Fi, clear acoustic distribution, legible signage, accessible seating, and comfortable networking lounge furniture create greater professional value than costly gift hampers. When corporate gifts are necessary, include packaging, delivery freight, and a 5–10% contingency buffer for extra guests.
            </p>
          </div>

          {/* 8. Compare Packages Without Double Counting */}
          <div className="p-6 rounded-xl bg-primary/5 border-2 border-primary/30 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <AlertCircle className="w-5 h-5 text-primary shrink-0" />
              <span>Package Callout: Check Package Inclusions Before Adding Vendor Costs</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Before approving external audio-visual or staging quotations, cross-reference your hotel contract&apos;s inclusion list. If your venue package already includes a standard ceiling projector, motorized drop-down screen, basic podium microphone, or house chairs, do not add these line items twice to your ledger. Only budget for an external rental if the existing equipment does not meet technical specifications and a formal upgrade is necessary.
            </p>
          </div>
        </section>

        {/* Section 3: Production, Branding and Programme Costs */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <MonitorPlay className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Production, Branding and Programme Costs
            </h2>
          </div>

          {/* 9. Audio-Visual Equipment and Technology */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              9. Audio-Visual Equipment and Technology
            </h3>
            <p>
              Technical production represents a substantial portion of any business conference budget. AV costs are determined by ballroom dimensions, ceiling height, throw distances, ambient daylight, and presentation complexity. A small boardroom presentation requires little more than a 75-inch smart display and wireless clicker; a national sales conference requires a seamless P2.6 or P3 LED video wall, digital mixing consoles, wireless lapel microphones, stage wash lighting, and backup laptops.
            </p>
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/70 my-4 bg-muted">
              <Image
                src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/av-production.jpg"
                alt="Corporate event AV production and technology setup"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <p>
              For hybrid events, quote multi-camera video switching, broadcast streaming engineers, dedicated bonded internet lines, and real-time remote audio feeds separately. Scrutinize low equipment-only quotes: they often omit certified system engineers, transport logistics, setup crews, and overtime fees.
            </p>
          </div>

          {/* 10. Décor and Corporate Branding */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              10. Décor and Corporate Branding
            </h3>
            <p>
              Corporate event branding should emphasize clean wayfinding, brand consistency, and stage legibility. Key budget priorities include the primary stage backdrop, registration desk wrap, directional standees, media photo opportunity backdrops, and branded presentation title slides.
            </p>
            <p>
              Review printing quality, matte finishes to prevent camera glare, fire-retardant fabric compliance, on-site installation, and post-event disposal in your vendor quotation.
            </p>
          </div>

          {/* 11. Entertainment and Speakers */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              11. Entertainment and Speakers
            </h3>
            <p>
              Engage professional speakers, keynotes, or entertainment acts based strictly on audience relevance and program synergy. Secure written engagement contracts outlining preparation calls, slide rehearsals, business-class airfare, hotel suite accommodations, hospitality riders, and content recording permissions.
            </p>
            <p className="text-muted-foreground text-sm">
              <em>Note on Speaker Fees:</em> Celebrity speakers and industry personalities vary widely based on calendar demand, exclusivity, and engagement duration. There is no universal benchmark price; negotiate each booking directly and consider respected industry practitioners or seasoned panel moderators who often deliver superior subject-matter depth at sustainable fees.
            </p>
          </div>
        </section>

        {/* Section 4: Logistics and Professional Planning Fees */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Logistics and Professional Planning Fees
            </h2>
          </div>

          {/* 12. Travel, Accommodation and Transfers */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              12. Travel, Accommodation and Transfers
            </h3>
            <p>
              Residential conferences, multi-city dealer conventions, and offsite retreats require careful travel coordination. Document arrival airports, flight schedules, hotel room-night allocations, single versus twin sharing policies, early check-in buffers, and airport shuttle logistics.
            </p>
            <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 my-4 bg-muted">
              <Image
                src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/corporate-travel-transfers.jpg"
                alt="Corporate delegates arrival and conference transfer management"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-foreground/90 space-y-2">
              <strong className="text-primary block">Illustrative Room-Night Calculation:</strong>
              <p>
                Calculating hotel accommodations accurately requires tracking room-nights rather than multiplying delegates by room rates. For example: <strong>40 delegates sharing 20 twin rooms for 2 nights equals 40 room-nights</strong> (assuming 100% twin occupancy and property approval). If 10 senior executives require individual single rooms, the calculation changes to 10 single rooms + 15 twin rooms (30 guests) = 25 rooms × 2 nights = 50 room-nights.
              </p>
            </div>
            <p className="text-sm">
              For ground logistics, specify vehicle categories (sedans, luxury SUVs, 26-seater executive coaches), maximum waiting windows, expressway tolls, parking permits, and driver allowances. Assigning a dedicated transport manager prevents miscommunication and reduces redundant vehicle runs.
            </p>
          </div>

          {/* 13. What a Corporate Event Planner May Manage */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              13. What a Corporate Event Planner May Manage
            </h3>
            <p>
              Engaging an experienced corporate event planning agency provides end-to-end governance across multiple complex workstreams. Typical responsibilities include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-foreground/90">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Venue shortlisting &amp; commercial negotiations</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Audio-visual technical rider specification</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Vendor procurement &amp; contract execution</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Creative stage design &amp; 3D visualization</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Registration portal &amp; attendee badging</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Live show flow &amp; run-sheet execution</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Guest hospitality &amp; transport coordination</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Post-event vendor audit &amp; budget closeout</li>
            </ul>
            <p className="text-sm">
              Understand the distinct operational differences in our guides on <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>what does an event planner do</Link> and <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>event planner vs event manager</Link>.
            </p>
          </div>

          {/* 14. How Management Fees Are Quoted */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              14. How Management Fees Are Quoted
            </h3>
            <p>
              Corporate event agencies in India quote professional fees across three common billing models:
            </p>
            <div className="space-y-3 text-sm text-foreground/90">
              <div className="p-3 rounded-lg bg-background border border-border/70">
                <strong>1. Fixed Project Management Fee:</strong> A lump-sum fee agreed upfront based on planning scope, timeline, deliverables, and required on-site staffing.
              </div>
              <div className="p-3 rounded-lg bg-background border border-border/70">
                <strong>2. Percentage Fee:</strong> A fee calculated as a percentage of approved supplier expenditure managed by the agency.
              </div>
              <div className="p-3 rounded-lg bg-background border border-border/70">
                <strong>3. Hybrid Model:</strong> A baseline coordination fee combined with itemized unit pricing for specialized design, technical operation, or staffing services.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs sm:text-sm text-foreground/90 leading-relaxed">
              <strong>Critical Pricing Notice:</strong> There is no universal standard percentage (such as 10% or 20%) that applies uniformly across the Indian corporate event management industry. Agency pricing depends heavily on operational complexity, lead time, senior producer involvement, and legal liability. When reviewing percentage-based proposals, confirm the calculation base in writing: verify whether client-direct expenses, airline tickets, statutory GST, or venue security deposits are included or excluded, and confirm that all third-party supplier markups and commissions are fully disclosed.
            </div>
          </div>
        </section>

        {/* Section 5: Illustrative Budgets by Corporate Event Type */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <PieChart className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Illustrative Budgets by Corporate Event Type
            </h2>
          </div>

          {/* PROMINENT DISCLAIMER NOTICE */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-foreground space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>ILLUSTRATIVE PLANNING EXAMPLES ONLY</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              These budget ranges are starting points for initial conceptual scoping derived from the source article. They are <strong>not surveyed market averages, AS Event Management quotations, or guaranteed pricing</strong>. The final budget for any corporate event depends on confirmed business objectives, city, date, venue tier, technical production scale, guest travel, and actual written vendor quotations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Range 1 */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                  Meeting or Workshop
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2">
                  ₹50,000 – ₹5,00,000
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Typical Audience: 10 – 50 delegates (Single-day, local)
                </p>
                <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                  Focuses on executive boardroom or training hall rental, quality presentation display, working buffet lunch, coffee breaks, basic attendee pads, and facilitator logistics.
                </p>
              </div>
              <div className="text-xs text-muted-foreground pt-3 border-t border-border/50">
                Assumes local non-residential attendance with baseline audio and screen.
              </div>
            </div>

            {/* Range 2 */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                  Conference or Seminar
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2">
                  ₹5,00,000 – ₹25,00,000
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Typical Audience: 50 – 300 delegates (Full-day)
                </p>
                <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                  Includes business hotel ballroom, LED video wall, digital sound, stage backdrop, branded registration counters, full-day delegate catering, photography, and event crew.
                </p>
              </div>
              <div className="text-xs text-muted-foreground pt-3 border-t border-border/50">
                Excludes attendee flights, hotel lodging, and premium celebrity keynotes.
              </div>
            </div>

            {/* Range 3 */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                  Awards Evening or Product Launch
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2">
                  ₹25,00,000 – ₹1,00,00,000+
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Typical Audience: 300 – 1,000+ delegates
                </p>
                <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                  Features high-impact scenic stage fabrication, synchronized intelligent lighting, theatrical reveal mechanisms, professional emcee, gala dinner, and entertainment acts.
                </p>
              </div>
              <div className="text-xs text-muted-foreground pt-3 border-t border-border/50">
                Production intensity and experiential technology drive expenditure.
              </div>
            </div>

            {/* Range 4 */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                  Large Convention or Summit
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2">
                  ₹1,00,00,000 and above
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Typical Audience: 1,000+ delegates (Multi-day)
                </p>
                <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                  Comprehensive multi-track convention center occupancy, trade exhibition stalls, digital badge scanners, simultaneous livestreaming, heavy logistics, and mass delegate hospitality.
                </p>
              </div>
              <div className="text-xs text-muted-foreground pt-3 border-t border-border/50">
                Multi-day venue leases, citywide transit, and hotel blocks shape totals.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 bg-muted">
              <Image
                src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/awards-gala.jpg"
                alt="Corporate awards evening and annual gala celebration in India"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 448px"
              />
            </div>
            <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 bg-muted">
              <Image
                src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/conference-audience.jpg"
                alt="Large convention hall audience attending corporate business summit"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 448px"
              />
            </div>
          </div>

          {/* Budget vs Payment Schedule Distinction */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Separate the Budget from the Payment Schedule
            </h3>
            <p>
              A common pitfall in corporate event financial planning is confusing the <strong>approved budget</strong> with <strong>cash required today</strong>. An approved ₹20 lakh budget does not mean the entire cash balance is disbursed immediately.
            </p>
            <p>
              Maintain a synchronized cash-flow timeline mapping initial advance deposits (often 25–50% to lock hotel ballrooms and technical vendors), staged progress milestones, and final balances due upon completion. Track cancellation refund policies and purchase orders diligently to protect the organization against unrecoverable exposure.
            </p>
          </div>
        </section>

        {/* Section 6: Worked Example for a 100-Delegate Conference */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Worked Example for a 100-Delegate Conference
            </h2>
          </div>

          {/* HYPOTHETICAL NOTICE */}
          <div className="p-5 rounded-2xl bg-primary/10 border-2 border-primary/40 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>HYPOTHETICAL WORKED EXAMPLE — NOT A QUOTATION</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
              This arithmetic scenario illustrates a transparent line-item budget for a single-day, non-residential business conference hosting 100 local delegates. It utilizes hypothetical planning allowances to demonstrate structure and methodology; it is <strong>not a quotation or fixed rate</strong> from AS Event Management.
            </p>
          </div>

          {/* Line-item table */}
          <div className="overflow-x-auto rounded-xl border border-border/80 bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-foreground border-b border-border/80">
                <tr>
                  <th className="py-3 px-4 font-bold">Budget Category</th>
                  <th className="py-3 px-4 font-bold">Scope &amp; Planning Assumptions</th>
                  <th className="py-3 px-4 font-bold text-right">Illustrative Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Venue &amp; Catering Package</td>
                  <td className="py-3 px-4 text-muted-foreground">Hall rental, lunch, 2 tea breaks, house chairs (100 delegates × ₹2,000)</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹2,00,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Audio-Visual &amp; Crew</td>
                  <td className="py-3 px-4 text-muted-foreground">LED display, 4 wireless mics, stage wash lighting, sound operator</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹60,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Stage Branding &amp; Signage</td>
                  <td className="py-3 px-4 text-muted-foreground">Main stage backdrop, registration fascia, 4 directional standees</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹30,00,0</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Registration &amp; Event Staff</td>
                  <td className="py-3 px-4 text-muted-foreground">Badge printing, lanyards, 2 registration hostesses, floor coordinator</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹20,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Event Photography</td>
                  <td className="py-3 px-4 text-muted-foreground">1 professional photographer, high-res editing, same-day PR preview</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹15,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Local Logistics &amp; Delivery</td>
                  <td className="py-3 px-4 text-muted-foreground">Freight delivery of branding, equipment transport, emergency courier</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹15,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">Planning &amp; Coordination</td>
                  <td className="py-3 px-4 text-muted-foreground">End-to-end event management, vendor coordination, on-site supervision</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">₹35,000</td>
                </tr>
                <tr className="bg-muted/40 font-semibold text-foreground">
                  <td colSpan={2} className="py-3 px-4">Base Subtotal</td>
                  <td className="py-3 px-4 text-right font-mono">₹3,75,000</td>
                </tr>
                <tr className="text-muted-foreground">
                  <td colSpan={2} className="py-3 px-4">Contingency Reserve (10% of base subtotal)</td>
                  <td className="py-3 px-4 text-right font-mono">₹37,500</td>
                </tr>
                <tr className="bg-primary/10 text-foreground font-bold text-base border-t-2 border-primary/40">
                  <td colSpan={2} className="py-3 px-4">Planning Total Before Taxes</td>
                  <td className="py-3 px-4 text-right font-mono text-primary">₹4,12,500</td>
                </tr>
                <tr className="bg-card text-xs text-muted-foreground">
                  <td colSpan={2} className="py-2.5 px-4">Effective Cost Per Delegate</td>
                  <td className="py-2.5 px-4 text-right font-mono font-medium text-foreground">₹4,125 / delegate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-muted-foreground space-y-1">
            <strong>Exclusions from this Worked Example:</strong> Flights, delegate hotel accommodations, paid keynote speakers, celebrity entertainment, multi-camera live broadcasting, and statutory GST (18%). Taxes must be applied based on finalized individual supplier bills.
          </div>

          {/* 120-Delegate Scaling Scenario */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              What Changes When Attendance Increases to 120 Delegates?
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              If registration climbs from 100 to 120 attendees and the existing ballroom capacity remains adequate without requiring additional AV screens or furniture:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground font-mono">
              <li>• Additional Catering (20 delegates × ₹2,000): +₹40,000</li>
              <li>• Adjusted Base Subtotal: ₹4,15,000</li>
              <li>• Revised 10% Contingency Reserve: ₹41,500</li>
              <li>• Revised Total Before Taxes: ₹4,56,500 (₹3,804 per delegate)</li>
            </ul>
            <p className="text-xs text-muted-foreground italic">
              Important: This favorable economy of scale only holds if the venue capacity threshold is not breached and existing staff and AV systems remain sufficient.
            </p>
          </div>

          {/* Why this is below conference band */}
          <div className="p-5 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-muted-foreground space-y-2">
            <strong className="text-foreground block">Why This Example Sits Below the ₹5 Lakh Conference Band:</strong>
            <p>
              This deliberately simple local conference relies on a basic hotel package with no external staging, no live video streaming, and minimal branding. It demonstrates why broad event-type bands are planning starting points rather than rigid price minimums.
            </p>
          </div>
        </section>

        {/* Section 7: How to Control Your Corporate Event Budget */}
        <section className="space-y-8 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <Receipt className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              How to Control Your Corporate Event Budget
            </h2>
          </div>

          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/70 my-4 bg-muted">
            <Image
              src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/budget-planning-meeting.jpg"
              alt="Business team reviewing a corporate event budget"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-2">
              <h3 className="font-bold text-foreground text-base sm:text-lg">
                1. Define Business Priorities
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Clarify must-have operational necessities before entertaining creative add-ons. For an executive seminar, crystal-clear sound and presentation timing matter far more than elaborate floral centerpieces.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-2">
              <h3 className="font-bold text-foreground text-base sm:text-lg">
                2. Build a Realistic Contingency
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Allocate a 10–15% contingency reserve as an initial planning choice. Adjust based on outdoor weather exposure or travel complexity. Never use contingency to hide predictable expenses such as taxes or driver overtime.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-2">
              <h3 className="font-bold text-foreground text-base sm:text-lg">
                3. Book Early &amp; Compare Like-for-Like
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Send identical written scopes to competing vendors so price variations represent genuine differences in service rather than missing deliverables or hidden exclusions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/70 space-y-2">
              <h3 className="font-bold text-foreground text-base sm:text-lg">
                4. Maintain a Three-Column Ledger
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track every expense line across Planned Budget, Committed Contracts, and Actual Invoiced Costs. Enforce formal written sign-offs before any vendor proceeds with unbudgeted requests.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Frequently Asked Questions */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Clear, authoritative answers to the most common corporate event budgeting questions in India.
          </p>

          <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 my-2 bg-muted">
            <Image
              src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/planner-discussion.jpg"
              alt="Corporate client and event planner discussing event proposals and portfolio"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="space-y-3">
            {corporateEventCostFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 9: Final Corporate Event Budget Checklist */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Final Corporate Event Budget Checklist
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Use this interactive verification checklist before signing contracts or releasing financial advances for your corporate function.
          </p>

          <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/70 my-2 bg-muted">
            <Image
              src="/images/blog/how-much-does-corporate-event-planning-cost-in-india/event-operations-team.jpg"
              alt="Professional corporate event operations and management team"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs sm:text-sm text-muted-foreground">
              <span>Click items as your planning committee confirms them:</span>
              <span className="font-semibold text-primary">
                {Object.values(checkedItems).filter(Boolean).length} of {budgetChecklistItems.length} Confirmed
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {budgetChecklistItems.map((item, idx) => {
                const isChecked = !!checkedItems[idx]
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheckbox(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-primary/5 border-primary/40 text-foreground'
                        : 'bg-background hover:bg-muted/50 border-border/70 text-foreground/80'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Square className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Section 10: Conclusion */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Conclusion
          </h2>
          <p>
            An effective corporate event budget begins with a clear business brief and ends with documented financial reconciliation. Understanding which expenses are fixed overheads, which fluctuate with attendee numbers, and which expand with production ambition empowers management teams to invest confidently where it creates lasting value.
          </p>
          <p>
            By comparing vendor quotations on a rigorous like-for-like basis, maintaining a disciplined contingency reserve, tracking change requests in writing, and synchronizing cash flow with vendor milestones, your organization can deliver an impressive corporate conference, gala, or product launch without financial compromise.
          </p>
          <p>
            For further event planning resources, explore our <Link href="/services/corporate-events" className={linkClass}>corporate events management services</Link>, review our transparent <Link href="/packages" className={linkClass}>event planning packages</Link>, browse our corporate gallery in the <Link href="/portfolio" className={linkClass}>AS Events portfolio</Link>, or consult our guides on <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>how early should you hire an event planner</Link> and <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>how to create an event budget</Link>.
          </p>
        </section>

        {/* Section 11: High-Contrast Conversion CTA */}
        <section className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] border-2 border-[#C5A880]/50 shadow-2xl text-center space-y-5 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan with Confidence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Planning a Corporate Event and Need a Realistic Budget?
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Share your business objective, city, preferred dates, approximate attendance and budget priorities with AS Event Management. Our team can discuss the planning scope and provide an itemized proposal based on your actual requirements.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {/* Primary Button: gold/tan background, dark text */}
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#d4b993] text-[#0f172a] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 focus:ring-offset-[#0b1120]"
            >
              <span>Plan Your Corporate Event</span>
              <ArrowRight className="w-4 h-4 text-[#0f172a]" />
            </button>

            {/* Secondary Button: dark navy background, white text */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0b1120] hover:bg-[#1e293b] text-white border border-[#C5A880]/40 font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0b1120]"
            >
              <span>Contact AS Event Management</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
