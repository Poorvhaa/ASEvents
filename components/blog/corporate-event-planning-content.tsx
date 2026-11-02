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
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, corporateEventPlanningFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('corporate-event-planning-complete-guide')
const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

export function CorporateEventPlanningContent() {
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

  const masterChecklistItems = [
    'Business objective and core KPIs approved by executive sponsors',
    'Named budget owner confirmed with spending ceiling and tracking ledger',
    'Project team RACI responsibility matrix and escalation protocol established',
    'Venue contract executed with usable layout capacity, load-in hours and power verified',
    'Vendor quotes, itemized deliverables, payment milestones and exclusion clauses logged',
    'Speaker briefs delivered, slide submission deadlines set and tech rehearsals scheduled',
    'Event landing page, registration funnel, automated reminders and badge generation tested',
    'Catering headcounts, allergen protocols, vegetarian/Jain options and meal timings locked',
    'AV cue sheet, confidence monitors, radio channels and spare hardware tested on-site',
    'Sponsor commitments, branding assets, exhibition booths and lead-capture compliance confirmed',
    'Attendee transport links, hotel room blocks, shuttle schedules and accessible wayfinding verified',
    'Written risk register and contingency playbooks for AV, weather, power and transit reviewed',
    'Final on-site venue walk-through and all-hands operations briefing completed before doors open',
    'Incident lead assigned with emergency contact escalation list accessible to all floor staff',
    'Post-event attendee survey, lead routing to CRM, vendor debrief and budget reconciliation scheduled',
  ]

  return (
    <article className="pt-28 pb-16 sm:pb-24 bg-background">
      <ArticleHeader
        post={article}
        badgeLabel="Corporate Event Guide"
        shareTitle="The Ultimate Guide to Corporate Event Planning"
      />

      {/* Featured Hero Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-muted">
          <Image
            src={article.image}
            alt="Corporate business conference and executive event planning stage with professional audio-visual production"
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
            <Sparkles className="w-4 h-4" />
            <span>Corporate Event Planning: Quick Answer</span>
          </div>
          <p className="text-foreground font-medium text-base sm:text-lg leading-relaxed mb-3">
            Corporate event planning is the process of defining a business objective, organizing an experience for the intended audience, coordinating resources and measuring the result. A successful corporate event is more than a well-decorated venue: it is a controlled project that balances budget, safety, content, guest experience, communications and measurable business outcomes.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            For most organizations, the simplest framework consists of four disciplined phases: <strong>strategy and foundation</strong>, <strong>logistics and venue selection</strong>, <strong>programming and promotion</strong>, and <strong>event-day execution followed by reporting</strong>. Each phase has specific decisions, deliverables, risks and owners. This corporate event checklist can be adapted for conferences, product launches, annual leadership summits, seminars, executive retreats and employee celebrations. Discover how our dedicated <Link href="/services/corporate-events" className={linkClass}>corporate event planning services</Link> keep every phase structured and accountable.
          </p>
        </div>

        {/* Section 1: Introduction */}
        <section className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Introduction: Transforming Business Objectives into Flawless Live Experiences
            </h2>
            <p>
              Corporate gatherings represent substantial investments of organizational capital, executive time, and brand reputation. Whether your company is convening 50 industry leaders for an invite-only strategy roundtable or hosting 1,000 delegates for an international tech symposium, the stakes demand rigorous project management from day one.
            </p>
            <p>
              Unlike social celebrations where emotional milestones guide the agenda, business events exist to create specific commercial or organizational outcomes: driving pipeline growth, launching strategic initiatives, building employee alignment, or strengthening high-value client relationships. Achieving those returns requires moving beyond superficial decor to engineer attendee journeys, technical production, speaker briefings, and contingency buffers with precision.
            </p>
            <p>
              In this comprehensive <strong>corporate event planning guide</strong>, we outline the end-to-end framework professional event producers rely on to deliver high-impact conferences, seminars, galas, and product launches across India. If your team is evaluating whether to coordinate in-house or partner with an agency, review our analysis on <Link href="/blog/event-planner-vs-event-manager" className={linkClass}>event planner vs event manager</Link> and <Link href="/blog/what-does-an-event-planner-do" className={linkClass}>what does an event planner do</Link>.
            </p>
          </div>
        </section>

        {/* Section 2: The Four-Phase Framework */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Workflow className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              The Four-Phase Corporate Event Checklist
            </h2>
          </div>
          <p>
            Breaking event production into sequential phases eliminates decision paralysis, establishes clear milestones, and ensures every rupee committed is accountable to leadership.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-xl bg-card border border-border/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">Phase 01</span>
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Strategy &amp; Foundation</h3>
              <p className="text-sm text-muted-foreground"><strong>Core Decision:</strong> What is the business outcome?</p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Approved scope, quantifiable KPIs, budget ceiling, team RACI matrix, initial risk register, and executive sign-off.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">Phase 02</span>
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Logistics &amp; Venue Selection</h3>
              <p className="text-sm text-muted-foreground"><strong>Core Decision:</strong> Can we deliver it safely and reliably?</p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Venue contract, technical AV specifications, catering agreements, registration platforms, hotel blocks, and transit routing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">Phase 03</span>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Programming &amp; Promotion</h3>
              <p className="text-sm text-muted-foreground"><strong>Core Decision:</strong> Why will the intended audience attend?</p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Agenda design, keynote and panel speaker management, multichannel promotion, sponsor deliverables, and networking design.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">Phase 04</span>
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Execution &amp; Measurement</h3>
              <p className="text-sm text-muted-foreground"><strong>Core Decision:</strong> Can we run it and prove value?</p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Minute-by-minute run sheet, on-site incident command, live issue log, post-event surveys, lead routing, and cost reconciliation.
              </p>
            </div>
          </div>

          {/* Structured Table */}
          <div className="rounded-xl border border-border/80 overflow-hidden shadow-sm mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/80 border-b border-border text-foreground font-semibold">
                  <tr>
                    <th className="p-4">Phase</th>
                    <th className="p-4">Decision to Make</th>
                    <th className="p-4">Evidence of Readiness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-card">
                  <tr>
                    <td className="p-4 font-semibold text-primary">Strategy</td>
                    <td className="p-4">What is the business outcome?</td>
                    <td className="p-4 text-muted-foreground">Approved scope, KPIs, budget ceiling, team roles, initial risk register</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-primary">Logistics</td>
                    <td className="p-4">Can we deliver it safely and reliably?</td>
                    <td className="p-4 text-muted-foreground">Venue contract, vendor quotes, AV brief, registration setup, transport plan</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-primary">Programming</td>
                    <td className="p-4">Why will the intended audience attend?</td>
                    <td className="p-4 text-muted-foreground">Agenda, speaker confirmations, promotion plan, sponsor deliverables</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-primary">Execution</td>
                    <td className="p-4">Can we run it and prove value?</td>
                    <td className="p-4 text-muted-foreground">Run sheet, crisis response plan, attendee survey, KPI report, cost closeout</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Suggested Planning Timeline */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Suggested Corporate Event Planning Timeline
            </h2>
          </div>
          <p>
            Successful event production requires adequate lead time to secure premier venues, recruit tier-one keynote speakers, negotiate supplier terms, and build attendee momentum.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-base sm:text-lg">12–24 Weeks Before Event</span>
                <span className="text-xs uppercase font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Foundation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Define business objectives, determine attendee profiles, establish spending ceiling, appoint project leads, lock dates, shortlist venues, and issue RFPs for primary suppliers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-base sm:text-lg">8–12 Weeks Before Event</span>
                <span className="text-xs uppercase font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Programming</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Finalize keynote speakers and panel moderators, draft session outlines, launch registration landing pages, publish promotional campaigns, and confirm sponsor packages.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-base sm:text-lg">4–8 Weeks Before Event</span>
                <span className="text-xs uppercase font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Production</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Issue detailed AV and lighting briefs, confirm catering headcounts and menu tastings, approve branded signage proofs, review stage design, and lock attendee travel itineraries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-base sm:text-lg">1–4 Weeks Before Event</span>
                <span className="text-xs uppercase font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Readiness</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Collect presentation decks and check formatting, build minute-by-minute run-of-show, test check-in badges, print collateral, run virtual speaker tests, and review contingency triggers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-base sm:text-lg">Event Day &amp; Subsequent Weeks</span>
                <span className="text-xs uppercase font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Execution &amp; Closeout</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Conduct morning floor briefing, direct live show execution, log incidents in real time, dispatch post-event surveys, route qualified leads to CRM, reconcile vendor invoices, and deliver leadership ROI report.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Planning Example Note:</strong> These windows are planning examples rather than universal deadlines. Multi-day international conferences, annual trade exhibitions, and large product launches may require 6 to 12 months of preparation; smaller executive roundtables and internal team meetings may operate comfortably on accelerated 4- to 8-week timelines. For booking lead times, see <Link href="/blog/how-early-should-you-hire-an-event-planner" className={linkClass}>how early should you hire an event planner</Link>.
            </span>
          </div>
        </section>

        {/* Section 4: Phase 1 Deep Dive */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Phase 1: Strategy and Foundation
            </h2>
          </div>
          <p>
            Building a defensible business case before committing funds to venues, marketing, or production ensures every downstream decision serves your organization’s strategic objectives.
          </p>

          {/* Subheading: Objectives and KPIs */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Define Your Objectives and KPIs
            </h3>
            <p>
              Corporate event planning begins with a measurable business purpose. A product launch might need qualified buyer conversations and meaningful media coverage; a client summit might focus on account retention, product adoption, and executive relationships; an internal gathering might aim to align cross-functional teams around strategic goals. Before selecting speakers or touring venues, write a one-sentence objective identifying the target audience, desired outcome, and the specific change the event should create.
            </p>
            <p>
              Translate that purpose into a concise scorecard of Key Performance Indicators (KPIs). Registration volume is a useful indicator of market interest, but it is not the same as attendance: track gross registrations, verified on-site check-ins, individual session participation, and post-event actions separately. For demand-generation events, agree in advance on the criteria for a Sales-Qualified Lead (SQL), the owner for each follow-up, and the response SLA. For internal employee summits, use anonymous structured feedback rather than claiming team morale improved without objective evidence.
            </p>

            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>Hypothetical Example: 250-Seat Corporate Conference Scorecard</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                A hypothetical 250-seat corporate conference might set targets of 200 checked-in attendees (80% show rate), an average post-event satisfaction rating above 4.2 out of 5.0, and 30 sales-qualified meetings scheduled within 14 days post-event. <em>These are illustrative planning examples, not industry benchmarks.</em> Assign a named owner and verifiable data source to each metric to evaluate performance objectively.
              </p>
            </div>
          </div>

          {/* Subheading: Budget */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Establish a Realistic Corporate Event Budget
            </h3>
            <p>
              A professional corporate event budget must capture the complete cost of delivering the experience, not merely the venue rental fee. Begin with an approved spending ceiling, then distinguish non-negotiable operational requirements from optional creative enhancements. Typical corporate event budget categories include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-foreground/90">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Venue rental, setup &amp; breakdown fees</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> AV, lighting, staging &amp; LED backdrops</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Catering, breaks &amp; service staff</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Speaker honorariums, travel &amp; lodging</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Registration software &amp; badge printing</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Directional signage, stage branding &amp; swag</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> On-site security, medical &amp; insurance</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> GST, local municipal permits &amp; licensing</li>
            </ul>
            <p>
              Maintain an estimate-to-actual tracking ledger. For every line item, record the initial budget estimate, vendor formal quote, signed commitment, advance deposit paid, balance due, and final invoice. Separate fixed expenses (such as the main ballroom hire) from variable expenses (such as per-plate lunch menus and attendee lanyards) that expand with attendance. Learn more in our guide to <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>how to create an event budget</Link> and <Link href="/blog/how-much-does-event-planning-cost-in-india" className={linkClass}>how much does event planning cost in India</Link>.
            </p>

            <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
              <DollarSign className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Contingency Reserve Guideline:</strong> Providing a 10–15% contingency reserve serves as an initial planning illustration. The appropriate reserve depends on venue complexity, outdoor exposure, custom stage fabrication, and contract penalty clauses. Never treat an unspent reserve as discretionary budget to add last-minute frills. Require formal sign-off for any scope changes that impact the bottom line.
              </span>
            </div>
          </div>

          {/* Subheading: Assemble Planning Team */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Assemble Your Planning Team (RACI Matrix)
            </h3>
            <p>
              Even modest business gatherings involve multiple interlinked workstreams. If all decisions funnel through one overwhelmed manager, delays and conflicting directives become inevitable. Establish a project RACI matrix (Responsible, Accountable, Consulted, Informed) to clarify governance:
            </p>

            <div className="rounded-xl border border-border/80 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/80 border-b border-border text-foreground font-semibold">
                    <tr>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Core Function</th>
                      <th className="p-3.5">Key Deliverables</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-card text-muted-foreground">
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Project Lead</td>
                      <td className="p-3.5">Overall scope, cross-functional alignment</td>
                      <td className="p-3.5">Master schedule, milestone tracking, executive status updates</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Finance Approver</td>
                      <td className="p-3.5">Budget governance, contract compliance</td>
                      <td className="p-3.5">Purchase orders, payment approvals, cost variance tracking</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Venue &amp; Logistics Lead</td>
                      <td className="p-3.5">Site operations, permits, guest movement</td>
                      <td className="p-3.5">Floor plans, load-in schedules, transit routes, hotel blocks</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Content &amp; Speaker Lead</td>
                      <td className="p-3.5">Agenda, speaker coordination, rehearsals</td>
                      <td className="p-3.5">Speaker briefs, presentation slides, run-of-show cues</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Production &amp; AV Lead</td>
                      <td className="p-3.5">Staging, sound, lighting, video broadcast</td>
                      <td className="p-3.5">AV cue sheets, technical rehearsals, power backups</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-foreground">Registration &amp; Comms</td>
                      <td className="p-3.5">Attendee communication, badge check-in</td>
                      <td className="p-3.5">Landing page, confirmation emails, badge printing, attendance logs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Subheading: Risk Assessment */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Risk Assessment and Contingency Planning
            </h3>
            <p>
              Professional event management anticipates that variables will fluctuate. Risks may include keynote travel cancellations, audio interference, Wi-Fi outages during live demos, catering delays, or extreme weather. Instead of generating a generic checklist, build an active event risk register with warning indicators and pre-authorized contingency actions.
            </p>

            <div className="rounded-xl border border-border/80 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/80 border-b border-border text-foreground font-semibold">
                    <tr>
                      <th className="p-3">Risk Factor</th>
                      <th className="p-3">Warning Signal</th>
                      <th className="p-3">Preventative Action</th>
                      <th className="p-3">Contingency Action</th>
                      <th className="p-3">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-card text-muted-foreground">
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Speaker flight cancellation</td>
                      <td className="p-3">Delayed flight alert 4 hrs out</td>
                      <td className="p-3">Book travel day before; confirm flight status morning-of</td>
                      <td className="p-3">Activate pre-tested remote Zoom feed or promote backup speaker</td>
                      <td className="p-3">Content Lead</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Venue Wi-Fi saturation</td>
                      <td className="p-3">Slow speeds at registration check-in</td>
                      <td className="p-3">Dedicated hardline VLAN for demo &amp; production desks</td>
                      <td className="p-3">Switch demo to offline local screen recordings and 5G cellular dongles</td>
                      <td className="p-3">AV Lead</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Registration bottleneck</td>
                      <td className="p-3">Queue exceeding 15 attendees</td>
                      <td className="p-3">Pre-print attendee badges and distribute QR codes in advance</td>
                      <td className="p-3">Deploy 2 roaming tablet check-in staff to fast-track pre-registered guests</td>
                      <td className="p-3">Reg Lead</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-foreground">Power fluctuation / trip</td>
                      <td className="p-3">Stage lights flickering during sound check</td>
                      <td className="p-3">Contract dedicated silent diesel generator with automatic changeover</td>
                      <td className="p-3">UPS battery backup sustains audio &amp; stage switchers seamlessly</td>
                      <td className="p-3">Venue Lead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Subheading: Sustainability & Inclusivity */}
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Sustainability, Accessibility and Inclusivity
            </h3>
            <p>
              Modern corporate conferences must be accessible to all delegates and mindful of resource waste. Practical sustainability measures include deploying reusable digital signage, distributing conference materials via mobile apps, providing glass bottle refill stations, and mandating venue waste segregation. 
            </p>
            <p>
              Accessibility planning starts at venue inspection, not at the registration desk. Verify step-free routes, ramp gradients to main stages, elevator proximity, accessible restrooms, and hearing-loop or captioning compatibility for presentations. Ensure registration forms allow attendees to disclose dietary restrictions and mobility needs privately.
            </p>
            <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Practical Guidance:</strong> Focus on pragmatic, verifiable steps such as eliminating single-use plastics and sourcing regional suppliers. Vague promotional claims that an event is &ldquo;zero waste&rdquo; or &ldquo;carbon neutral&rdquo; should never be made without audited third-party environmental measurement.
              </span>
            </div>
          </div>
        </section>

        {/* Section 5: Phase 2 Logistics and Venue Selection */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Phase 2: Logistics and Venue Selection
            </h2>
          </div>
          <p>
            Translating strategic goals into a seamless on-site experience requires evaluating physical infrastructure, production limits, and vendor contracts with thorough scrutiny.
          </p>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Select the Ideal Corporate Event Venue
            </h3>
            <p>
              The right corporate event venue supports your agenda, technical scope, and guest movement. A conference with parallel tracks requires acoustically isolated breakout rooms near the plenary hall. A tech product showcase demands high ceiling clearances, 3-phase industrial power, and heavy vehicle or freight elevator access.
            </p>
            <p>
              Always conduct a formal site audit using your projected run sheet. Walk the route from arrival drop-off to registration, main stage, breakout rooms, and dining areas. Examine column placement and audience sightlines: if a venue advertises 500-delegate capacity, verify whether that figure reflects tightly packed theater rows, classroom desks with power strips, or banquet tables. Usable capacity is frequently 20% to 30% lower once stage builds, cameras, and AV control booths are installed.
            </p>
            <p>
              Insist on an itemized contract that specifies setup and load-out hours, security fees, technician overtime rates, freight elevator access windows, noise curfews, and cancellation terms. For dedicated venue selection criteria, explore our comprehensive guide on <Link href="/blog/how-to-choose-a-wedding-venue-15-things-to-check" className={linkClass}>how to choose an event venue</Link>.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Coordinate Catering and Dietary Requirements
            </h3>
            <p>
              Corporate catering directly affects attendee energy, networking flow, and event timing. Structure meal formats around your program: standing coffee stations and high-top buffet tables encourage active networking, while seated plated dining suits formal corporate awards galas.
            </p>
            <p>
              Obtain complete pricing covering per-head costs, service charges, bartender licenses, food station rentals, and overtime fees. In India, always ensure clear separation of pure vegetarian and Jain culinary preparation, and establish a transparent labeling protocol for allergens (nuts, dairy, gluten). Schedule tea and coffee refreshes 15 minutes before session breaks so delegates never wait in congested lines.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Audio-Visual and Technology Production
            </h3>
            <p>
              AV production is the backbone of any professional corporate event. A poorly calibrated microphone or unreadable slide projector undermines the credibility of high-level presenters. Tailor your AV brief to the agenda: keynote speakers require wireless lapel or DPA headset microphones, confidence monitors showing speaker notes and elapsed countdown timers, and dual synchronized presentation laptops running through seamless video switchers.
            </p>
            <p>
              Conduct a rigorous technical rehearsal before doors open. Test video audio feeds, slide aspect ratios (16:9 standard), presentation clickers, and backup slide decks. Appoint a dedicated technical show caller who communicates with audio engineers, lighting operators, and camera crew via closed-circuit headsets to cue every transition cleanly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Transportation, Accommodation and Signage
            </h3>
            <p>
              For out-of-town executives and delegates, the event experience begins upon landing. Provide detailed travel guides with recommended airport transit, hotel room block codes, and check-in procedures. If operating shuttle buses between conference hotels and the venue, factor in peak traffic buffers and appoint a transport coordinator with live driver tracking.
            </p>
            <p>
              Wayfinding signage should answer questions before guests need to ask staff. Place legible directional signs at the arrival porch, foyer, registration counters, elevators, restrooms, plenary halls, and dining areas. For multi-track conferences, digital room display boards showing current and upcoming sessions prevent corridor confusion.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Registration and Check-In Systems
            </h3>
            <p>
              Registration creates the first impression of your event. Deploy a frictionless online registration portal that captures attendee details, dietary preferences, and session tracks while complying with personal data privacy regulations. Send automated calendar invites and mobile QR codes 48 hours in advance.
            </p>
            <p>
              Size your on-site check-in desks for peak arrival velocity rather than total headcount. If 300 delegates arrive within a 20-minute window before the opening keynote, provide multiple fast-track QR scanner stations and a separate help desk for walk-ins and badge reprints. Always maintain an encrypted offline master guest list on local laptops in case venue internet connectivity drops.
            </p>
          </div>
        </section>

        {/* Section 6: Phase 3 Programming and Promotion */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Phase 3: Programming and Promotion
            </h2>
          </div>
          <p>
            Compelling content attracts senior decision-makers; disciplined programming keeps them engaged throughout the business day.
          </p>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Develop an Engaging Event Agenda
            </h3>
            <p>
              Structure the agenda around a clear narrative arc: opening welcome, high-level industry context, actionable technical breakouts, participatory discussions, and a definitive closing summary. Avoid exhausting delegates with back-to-back 60-minute monologue presentations. Interleave 20-minute executive keynotes with 40-minute interactive panel debates and structured networking breaks.
            </p>
            <p>
              Pacing is critical: allocate generous 20-to-30-minute intervals between sessions to allow delegates to check emails, visit sponsor booths, and move between rooms without feeling rushed.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Manage Speakers and Content
            </h3>
            <p>
              Professional speaker management requires proactive coordination. Provide each presenter with a formal speaker brief detailing the audience profile, key theme, time limit, technical setup, and slide formatting guidelines. Set a firm deadline for slide submission at least 7 days before the event to allow technical formatting reviews and font checks.
            </p>
            <p>
              Schedule brief tech checks on event morning so speakers can test their clickers, microphones, and confidence monitors. Always have a qualified internal executive prepared with backup slides in case a keynote speaker experiences an unavoidable transit cancellation.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Corporate Event Marketing and Registration
            </h3>
            <p>
              Promotion should communicate immediate value: why this event is essential, what actionable insights attendees will gain, and who else will be in the room. Build an informative event landing page with speaker credentials, agenda timings, venue logistics, and a secure registration portal.
            </p>
            <p>
              Execute a targeted multi-channel campaign utilizing personalized email invitations, LinkedIn thought-leadership posts, and internal executive communications. Segment messaging by audience tier—ensuring existing enterprise clients, prospective buyers, and internal stakeholders receive relevant invitations rather than generic mass blasts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Sponsorship and Partnership Integration
            </h3>
            <p>
              Corporate sponsors and exhibitors provide valuable funding and attendee experiences, but their commercial presence must align with the event’s core theme. Create tiered sponsorship packages (Headline, Platinum, Gold) detailing exact deliverables: booth square footage, speaking slots, pass allocations, logo placements, and digital lead-capture rights.
            </p>
            <p>
              Appoint a dedicated sponsor liaison to manage booth load-in logistics, electrical hookups, and promotional asset approvals. Deliver a comprehensive post-event fulfillment report containing verified booth foot-traffic data and agreed brand exposure metrics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Attendee Engagement and Networking Design
            </h3>
            <p>
              Facilitating valuable business conversations is often the primary reason delegates attend in-person conferences. Move beyond unstructured coffee breaks by engineering purposeful networking environments: moderated executive roundtables, Birds-of-a-Feather topical discussions, and mobile-app-driven 1-on-1 meeting booking.
            </p>
            <p>
              Provide dedicated quiet seating zones where executives can take brief phone calls without leaving the event premises, alongside vibrant central lounge areas that foster spontaneous dialogue.
            </p>
          </div>
        </section>

        {/* Section 7: Phase 4 Execution and Post-Event Analysis */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Phase 4: Execution and Post-Event Analysis
            </h2>
          </div>
          <p>
            Live execution transforms strategic planning into real-world business outcomes, while post-event analysis captures measurable ROI and operational learnings for future events.
          </p>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              On-Site Event Management and Run Sheet
            </h3>
            <p>
              On event day, months of preparation depend on synchronized execution. A master run sheet (run-of-show) acts as the operational nerve center, detailing every minute of the day with exact times, activities, room locations, accountable owners, AV lighting cues, and contingency fallbacks.
            </p>
            <p>
              Convene the operations crew 90 minutes before doors open for a comprehensive morning walk-through: inspect directional signage, test registration terminals, verify stage lighting levels, check restroom cleanliness, and confirm radio channels. Appoint an on-site show caller empowered to make real-time timing adjustments without disrupting audience flow.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Crisis and Issue Management
            </h3>
            <p>
              Even the most meticulously planned business event will encounter unexpected challenges. The measure of professional event management lies in how swiftly and calmly issues are resolved behind the scenes. Establish clear escalation levels: minor badge reprints are resolved locally at the help desk; schedule delays are managed by the project lead; security or medical emergencies trigger immediate venue incident protocols.
            </p>
            <p>
              Maintain a live digital issue log throughout the day recording the incident, discovery time, response taken, and resolution. This documentation prevents miscommunication and informs future event risk assessments.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Post-Event Evaluation and Reporting
            </h3>
            <p>
              Evaluate the event against the specific business KPIs established in Phase 1. Dispatch an automated 4-question attendee survey within 24 hours while memories are fresh, capturing ratings on session content, venue logistics, networking value, and overall organization.
            </p>
            <p>
              Compile a comprehensive post-event executive report comparing projected versus actual metrics: registered vs attended, cost per attendee, sponsor satisfaction, qualitative feedback, and pipeline leads generated. Transparent reporting demonstrates event ROI to executive leadership and justifies future marketing budgets.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Content Repurposing and Lead Follow-Up
            </h3>
            <p>
              A high-impact corporate conference generates valuable intellectual property that extends far beyond event day. Record plenary sessions with high-definition multi-camera setups to produce educational video clips, executive thought-leadership articles, and podcast interviews.
            </p>
            <p>
              For commercial lead-generation events, sync attendee check-in and session participation data with your CRM within 48 hours. Ensure sales teams follow up with personalized outreach referencing specific sessions the prospect attended, capitalizing on event momentum.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              Vendor and Partner Debrief
            </h3>
            <p>
              Close out vendor partnerships with professional rigor. Review supplier delivery against agreed contracts, verify additional hours or equipment credits, reconcile all outstanding invoices, and return rental equipment in good condition.
            </p>
            <p>
              Hold an internal project debrief with core stakeholders to document operational successes and areas for optimization. Archive all final budgets, floor plans, vendor contact lists, and run sheets in a centralized repository to empower subsequent planning teams.
            </p>
          </div>
        </section>

        {/* Section 8: Master Checklist Component */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Corporate Event Planning: Master Checklist
            </h2>
          </div>
          <p>
            Use this interactive decision checklist alongside your project management tracker to verify readiness across all four planning phases. Click items as your team completes each milestone:
          </p>

          <div className="p-6 rounded-xl bg-card border border-border/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="font-bold text-foreground text-sm uppercase tracking-wider">Operational Milestones</span>
              <span className="text-xs text-primary font-semibold">
                {Object.values(checkedItems).filter(Boolean).length} of {masterChecklistItems.length} Completed
              </span>
            </div>
            <div className="space-y-2.5 pt-2">
              {masterChecklistItems.map((item, idx) => {
                const isChecked = !!checkedItems[idx]
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheckbox(idx)}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-primary/5 border-primary/40 text-muted-foreground'
                        : 'bg-background/80 border-border/60 text-foreground hover:border-primary/40'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-primary border-primary text-slate-950'
                          : 'border-border/80 bg-background'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-sm sm:text-base leading-snug ${isChecked ? 'line-through opacity-75' : ''}`}>
                      {item}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Section 9: Practical Run-of-Show Example */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Clock className="w-7 h-7 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              A Practical Run-of-Show Example
            </h2>
          </div>
          <p>
            A minute-by-minute run sheet aligns production crew, catering managers, and speakers to guarantee seamless timing throughout event day:
          </p>

          <div className="rounded-xl border border-border/80 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/80 border-b border-border text-foreground font-semibold">
                  <tr>
                    <th className="p-4 w-28">Time</th>
                    <th className="p-4">Operational Activity &amp; Milestones</th>
                    <th className="p-4 w-44">Accountable Lead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-card text-muted-foreground">
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">08:00</td>
                    <td className="p-4">Vendor load-in, stage lighting check, AV switchers &amp; mic frequency scans</td>
                    <td className="p-4 text-foreground font-medium">Production Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">08:45</td>
                    <td className="p-4">Registration desk powered up, badge printers tested, offline lists verified</td>
                    <td className="p-4 text-foreground font-medium">Registration Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">09:00</td>
                    <td className="p-4">Doors open; welcome tea, espresso bars &amp; networking lounge active</td>
                    <td className="p-4 text-foreground font-medium">Front-of-House Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">09:30</td>
                    <td className="p-4">Chimes call delegates to plenary hall; opening corporate video &amp; emcee intro</td>
                    <td className="p-4 text-foreground font-medium">Stage Manager</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">10:00</td>
                    <td className="p-4">Keynote presentation, live audience Q&amp;A, and visual synthesis</td>
                    <td className="p-4 text-foreground font-medium">Speaker Manager</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">11:15</td>
                    <td className="p-4">Mid-morning networking refreshment break; sponsor booth demonstrations</td>
                    <td className="p-4 text-foreground font-medium">Floor Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">12:00</td>
                    <td className="p-4">Parallel breakout workshops and executive industry panel discussions</td>
                    <td className="p-4 text-foreground font-medium">Content Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">13:30</td>
                    <td className="p-4">Multi-cuisine buffet lunch service; reserved VIP executive dining</td>
                    <td className="p-4 text-foreground font-medium">Catering Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">15:00</td>
                    <td className="p-4">Interactive product showcase, innovation awards &amp; live customer demos</td>
                    <td className="p-4 text-foreground font-medium">Session Owner</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">16:15</td>
                    <td className="p-4">Closing remarks, strategic summary, call to action &amp; survey push</td>
                    <td className="p-4 text-foreground font-medium">Project Lead</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-semibold text-foreground">16:45</td>
                    <td className="p-4">Guest departures, airport transfers, vendor strike &amp; venue load-out</td>
                    <td className="p-4 text-foreground font-medium">Venue/Logistics Lead</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Illustrative Run-of-Show Schedule:</strong> This timetable is an illustrative planning example. A real production run sheet is tailored to your venue access windows, speaker travel itineraries, technical stage setup complexity, and catering service speeds. Consult our <Link href="/blog/complete-event-planning-checklist" className={linkClass}>complete event planning checklist</Link> for detailed operational templates.
            </span>
          </div>
        </section>

        {/* Interactive Consultation CTA Card */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 shadow-xl space-y-4 text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Planning a High-Impact Corporate Event in India?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            From multi-day international tech conferences and product launches in Mumbai and Bangalore to executive leadership offsites in Udaipur and Ahmedabad, AS Event Management delivers complete end-to-end planning, production design, AV staging, and live on-site execution.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-slate-950 font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg text-sm sm:text-base cursor-pointer"
            >
              <span>Request Corporate Event Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/80 hover:border-primary/50 text-foreground font-semibold hover:bg-card transition-all text-sm sm:text-base"
            >
              <span>Contact Our Corporate Team</span>
            </Link>
          </div>
        </section>

        {/* Section 10: Frequently Asked Questions */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Frequently Asked Questions About Corporate Event Planning
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Authoritative answers to the most critical questions corporate leaders and event committees ask when planning business gatherings in India.
          </p>

          <div className="space-y-3">
            {corporateEventPlanningFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-base sm:text-lg hover:text-primary transition-colors cursor-pointer"
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
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 11: Conclusion */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Conclusion: Build a Business Event That Delivers Value
          </h2>
          <p>
            The most successful corporate events are organized around a clear purpose rather than a collection of impressive details. A strong strategy makes budgeting purposeful; disciplined logistics makes the program possible; thoughtful programming makes participation worthwhile; and coordinated event-day management turns the plan into a seamless professional experience. After the doors close, measured outcomes and an honest debrief help the organization learn what worked and what should evolve.
          </p>
          <p>
            Use this complete corporate event checklist to assign responsibilities and make important decisions well before the final weeks. Whether your team manages an event internally or hires a professional corporate event planner, transparent vendor agreements, tested systems, accessible attendee journeys, and a clear reporting framework are what sustain quality from the first kickoff meeting to the final reconciled invoice.
          </p>
          <p>
            Explore our curated <Link href="/portfolio" className={linkClass}>corporate events portfolio</Link>, review our transparent <Link href="/packages" className={linkClass}>event planning packages</Link>, or connect with our directors to discuss your upcoming conference, product launch, or executive summit.
          </p>

          <div className="p-6 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground text-base sm:text-lg">Planning a Company Event?</h3>
              <p className="text-sm text-muted-foreground">AS Event Management coordinates seamless corporate conferences and executive summits across India.</p>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-slate-950 font-bold hover:bg-primary/90 transition-all text-sm shrink-0 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </article>
  )
}
