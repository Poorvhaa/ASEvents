'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FileText,
  Briefcase,
  Image as ImageIcon,
  Layers,
  DollarSign,
  MessageSquare,
  MapPin,
  Star,
  Users,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Music,
  Check,
} from 'lucide-react'

// --- 1. Planner Selection Roadmap (8 Steps) ---
export function SelectionRoadmap() {
  const steps = [
    { num: 1, title: 'Define Your Event', icon: FileText, desc: 'Type, scale, budget & vision' },
    { num: 2, title: 'Check Experience', icon: Briefcase, desc: 'Proven track record in your format' },
    { num: 3, title: 'Review Portfolio', icon: ImageIcon, desc: 'Design taste & event consistency' },
    { num: 4, title: 'Understand Services', icon: Layers, desc: 'Full planning vs coordination' },
    { num: 5, title: 'Discuss Your Budget', icon: DollarSign, desc: 'Pricing structure & inclusions' },
    { num: 6, title: 'Evaluate Communication', icon: MessageSquare, desc: 'Responsiveness & clarity' },
    { num: 7, title: 'Confirm Event-Day Support', icon: MapPin, desc: 'On-site team presence' },
    { num: 8, title: 'Read Reviews & Choose', icon: Star, desc: 'Verified client feedback' },
  ]

  return (
    <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-gold/30 text-white shadow-xl">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Step-by-Step Guide
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
          The 8-Step Planner Selection Roadmap
        </h3>
        <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto">
          A structured framework to evaluate and hire the right event management partner.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div
              key={step.num}
              className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-primary group-hover:text-slate-950 transition-colors">
                {step.num}
              </div>
              <Icon className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-semibold text-sm sm:text-base text-slate-100 mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- 2. What a Professional Event Planner Coordinates ---
export function CoordinationFlow() {
  return (
    <div className="my-10 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border shadow-md">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          The Planning Conversation
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-1">
          What a Professional Event Planner Coordinates
        </h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-xl mx-auto">
          The initial planning conversation bridges your vision with dozens of moving event details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Client Vision */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-border shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <Users className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-foreground text-base sm:text-lg mb-2">CLIENT VISION</h4>
          <p className="text-xs text-muted-foreground mb-3 font-medium">Discuss & Align:</p>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 text-left list-disc list-inside">
            <li>Event type & occasion</li>
            <li>Expected guest count</li>
            <li>Budget & allocation</li>
            <li>Theme, style & ambiance</li>
            <li>Location & preferred dates</li>
            <li>Specific priorities & wishes</li>
          </ul>
        </div>

        {/* Planner Node */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-primary/15 to-primary/5 border-2 border-primary/40 shadow-md text-center relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
            Central Hub
          </div>
          <div className="w-16 h-16 rounded-full bg-primary text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg font-bold">
            <Sparkles className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-foreground text-lg mb-1">EVENT PLANNER</h4>
          <p className="text-xs text-primary font-semibold mb-3">AS Events Management</p>
          <ul className="text-xs space-y-1 text-muted-foreground text-center">
            <li>✓ Conceptual Strategy</li>
            <li>✓ Vendor Contract Negotiation</li>
            <li>✓ Detailed Master Timeline</li>
            <li>✓ Budget Optimization</li>
            <li>✓ On-Site Day-Of Execution</li>
          </ul>
        </div>

        {/* Vendors / Partners */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-border shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-foreground text-base sm:text-lg mb-2">
            VENDORS & PARTNERS
          </h4>
          <p className="text-xs text-muted-foreground mb-3 font-medium">Coordinated Execution:</p>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 text-left list-disc list-inside">
            <li>Venues & Banquet Halls</li>
            <li>Caterers & Menu Curators</li>
            <li>Decorators, Florists & Lighting</li>
            <li>Photographers & Cinematographers</li>
            <li>DJs, Artists & Entertainers</li>
            <li>Logistics, Permits & Audio-Visual</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6 pt-4 border-t border-border/60">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          Practical example: the initial planning conversation connects your vision with the event
          details that must be coordinated.
        </p>
      </div>
    </div>
  )
}

// --- 3. Before You Hire an Event Planner (Comparison Checklist) ---
export function BeforeYouHireTable() {
  const criteria = [
    {
      pillar: 'Experience',
      detail: 'Similar event types & formats',
      note: 'Confirm past success with your specific scale and audience.',
    },
    {
      pillar: 'Portfolio',
      detail: 'Style & execution quality',
      note: 'Assess aesthetics, organizational polish, and versatility.',
    },
    {
      pillar: 'Services',
      detail: 'Clear, transparent scope',
      note: 'Know exactly what is included vs client responsibilities.',
    },
    {
      pillar: 'Budget',
      detail: 'Fees, deposits & inclusions',
      note: 'Ensure no hidden markups, extra travel fees, or surprises.',
    },
    {
      pillar: 'Communication',
      detail: 'Response speed & organization',
      note: 'Verify communication channels, frequency, and point of contact.',
    },
    {
      pillar: 'Execution',
      detail: 'On-site event coordination',
      note: 'Confirm lead planner and team presence on the actual event day.',
    },
  ]

  return (
    <div className="my-10 p-6 sm:p-8 bg-slate-900 rounded-2xl border border-slate-800 text-white shadow-xl">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Evaluation Guide
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
          Before You Hire an Event Planner
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Compare the key pillars that directly affect your event experience.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-xs font-semibold text-primary uppercase tracking-wider">
              <th className="py-3 px-4">Core Pillar</th>
              <th className="py-3 px-4">What to Compare</th>
              <th className="py-3 px-4 hidden sm:table-cell">Why It Matters</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {criteria.map((item, index) => (
              <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {item.pillar}
                </td>
                <td className="py-3.5 px-4 text-primary font-medium">{item.detail}</td>
                <td className="py-3.5 px-4 text-slate-400 hidden sm:table-cell text-xs">
                  {item.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center italic">
        Practical checklist: compare experience, portfolio, scope, budget, communication, and
        event-day execution before hiring.
      </p>
    </div>
  )
}

// --- 4. Event-Day Coordination Checklist (6 Boxes) ---
export function EventDayCoordinationGrid() {
  const pillars = [
    {
      title: 'VENUE',
      items: ['Setup access & load-in', 'Layout & floor plans', 'Power & facility readiness'],
      icon: MapPin,
    },
    {
      title: 'VENDORS',
      items: ['Arrival times & badges', 'Placement & coordination', 'Run-of-show timing'],
      icon: Users,
    },
    {
      title: 'GUESTS',
      items: ['Welcome & hospitality', 'Flow & seating direction', 'VIP assistance'],
      icon: Sparkles,
    },
    {
      title: 'PROGRAM',
      items: ['Stage cues & scripts', 'Speeches & performances', 'Ceremony milestones'],
      icon: Clock,
    },
    {
      title: 'PRODUCTION',
      items: ['Audio, sound & mics', 'Lighting ambience & focus', 'Screens & visuals'],
      icon: Music,
    },
    {
      title: 'BACKUP',
      items: ['Contingency protocols', 'Weather adjustments', 'Fast troubleshooting'],
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="my-10 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border shadow-md">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Behind-the-Scenes
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-1">
          Event-Day Coordination Checklist
        </h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-xl mx-auto">
          The critical behind-the-scenes work that keeps an event moving smoothly without a hitch.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div
              key={pillar.title}
              className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-border/80 shadow-sm hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-foreground text-base tracking-wide">
                  {pillar.title}
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {pillar.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-6 pt-4 border-t border-border/60">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          Practical event-day view: venue, vendors, guests, program, production, and backup
          coordination all need to work together.
        </p>
      </div>
    </div>
  )
}

// --- 5. Event Planning Journey ---
export function EventPlanningJourney() {
  const phases = [
    { num: '1', name: 'DISCOVER', desc: 'Needs, vision & scope' },
    { num: '2', name: 'PLAN', desc: 'Strategy, budget & dates' },
    { num: '3', name: 'DESIGN', desc: 'Themes, aesthetics & flow' },
    { num: '4', name: 'BOOK', desc: 'Venues & vendor contracts' },
    { num: '5', name: 'COORDINATE', desc: 'Timelines & rehearsals' },
    { num: '6', name: 'EXECUTE', desc: 'Live on-site production' },
  ]

  return (
    <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-gold/30 text-white shadow-xl">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          End-to-End Process
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
          Event Planning Journey
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          From the first conversation to the final guest departure.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {phases.map((phase) => (
          <div
            key={phase.num}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center flex flex-col items-center hover:border-primary/50 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-slate-950 font-bold flex items-center justify-center text-sm mb-2 shadow-md">
              {phase.num}
            </div>
            <h4 className="font-bold text-slate-100 text-xs sm:text-sm tracking-wide">
              {phase.name}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-tight">{phase.desc}</p>
          </div>
        ))}
      </div>

      {/* Foundation Bar */}
      <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-primary/30 text-center">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 font-medium">
          Integrated Foundation
        </span>
        <p className="text-xs sm:text-sm font-semibold text-primary">
          Venue • Vendors • Budget • Timeline • Guests • Event-Day Support
        </p>
      </div>

      <div className="mt-5 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-300 font-mono bg-slate-900/70 px-4 py-2 rounded-lg border border-slate-800">
          <span>CONCEPT</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>BUDGET</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>VENUE</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>VENDORS</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>DESIGN</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>TIMELINE</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span>COORDINATION</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span className="text-primary font-bold">EXECUTION</span>
        </div>
      </div>
    </div>
  )
}

// --- 6. Interactive Final Checklist (12 Items) ---
export function FinalHiringChecklist() {
  const initialItems = [
    { id: 1, label: 'Event experience in your format', checked: true },
    { id: 2, label: 'Comprehensive portfolio reviewed', checked: true },
    { id: 3, label: 'Services offered & scope defined', checked: true },
    { id: 4, label: 'Vendor network & quality vetted', checked: false },
    { id: 5, label: 'Budget, fee structure & inclusions clear', checked: false },
    { id: 6, label: 'Communication style & response time tested', checked: false },
    { id: 7, label: 'Event-day coordination & staffing confirmed', checked: false },
    { id: 8, label: 'Location & destination experience verified', checked: false },
    { id: 9, label: 'Reviews, client references & testimonials checked', checked: false },
    { id: 10, label: 'Contract terms & cancellation responsibilities agreed', checked: false },
    { id: 11, label: 'Contingency & backup plans in place', checked: false },
    { id: 12, label: 'Alignment with your personal vision & expectations', checked: false },
  ]

  const [items, setItems] = useState(initialItems)

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const completedCount = items.filter((i) => i.checked).length

  return (
    <div className="my-10 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Section 15
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
            Final Hiring Checklist
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5">
            Use this interactive checklist to verify planner readiness before signing.
          </p>
        </div>
        <div className="px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 text-right sm:text-center shrink-0">
          <span className="text-xs text-muted-foreground block">Readiness Score</span>
          <span className="text-lg font-bold text-primary">
            {completedCount} / {items.length} Completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleItem(item.id)}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer ${
              item.checked
                ? 'bg-primary/10 border-primary/40 text-foreground font-medium'
                : 'bg-muted/30 border-border/60 text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
            }`}
          >
            <span className="text-xs sm:text-sm">{item.label}</span>
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                item.checked
                  ? 'bg-primary border-primary text-slate-950'
                  : 'border-slate-300 dark:border-slate-600 bg-transparent'
              }`}
            >
              {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// --- 7. Event Types Showcase ---
export function EventTypesShowcase() {
  const events = [
    {
      title: 'Weddings',
      desc: 'From intimate ceremonies to grand multi-day luxury celebrations.',
      image: '/images/portfolio/weddings/wedding 1.jpg',
      link: '/services#wedding-planning',
    },
    {
      title: 'Corporate Events',
      desc: 'Conferences, gala awards, networking summits, and product launches.',
      image: '/images/portfolio/corporate/corporate 1.jpg',
      link: '/services#corporate-events',
    },
    {
      title: 'Birthdays',
      desc: 'Fun, milestone themes and memorable family celebrations.',
      image: '/images/portfolio/birthdays/birthday 1.jpg',
      link: '/services#birthday-celebrations',
    },
    {
      title: 'Anniversaries',
      desc: 'Elegant romantic milestones celebrated with loved ones.',
      image: '/images/portfolio/anniversaries/anniversary 1.jpg',
      link: '/services#anniversary-events',
    },
    {
      title: 'Destination Events',
      desc: 'Scenic palatial venues, beachside retreats, and seamless guest travel.',
      image: '/images/portfolio/weddings/wedding 4.jpg',
      link: '/services#destination-weddings',
    },
  ]

  return (
    <div className="my-10">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Tailored Celebrations
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-1">
          Specialized Across Event Types
        </h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-xl mx-auto">
          Different occasions demand tailored expertise. Explore our specialized services:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {events.map((evt) => (
          <Link
            key={evt.title}
            href={evt.link}
            className="group relative rounded-xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-lg transition-all duration-300 block"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image
                src={evt.image}
                alt={evt.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <h4 className="font-bold text-sm">{evt.title}</h4>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {evt.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
