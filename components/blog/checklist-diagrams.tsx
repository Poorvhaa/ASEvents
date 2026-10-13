import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface FlowStep {
  label: string
  detail: string
}

interface Milestone {
  phase: string
  detail: string
}

interface CheckItem {
  label: string
  detail: string
}

function DiagramFrame({
  eyebrow,
  title,
  description,
  label,
  tone = 'light',
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  label: string
  tone?: 'light' | 'dark'
  children: ReactNode
}) {
  const dark = tone === 'dark'

  return (
    <figure
      aria-label={label}
      className={`my-8 p-4 sm:p-6 lg:p-8 rounded-2xl border shadow-md ${
        dark
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-primary/30 text-white'
          : 'bg-card border-border text-foreground'
      }`}
    >
      <figcaption className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{eyebrow}</span>
        <h3
          className={`text-xl sm:text-2xl font-serif font-bold mt-1 text-balance ${
            dark ? 'text-white' : 'text-foreground'
          }`}
        >
          {title}
        </h3>
        {description ? (
          <p className={`text-sm mt-1 max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-muted-foreground'}`}>
            {description}
          </p>
        ) : null}
      </figcaption>
      {children}
    </figure>
  )
}

function FlowStrip({ steps, dark = false }: { steps: string[]; dark?: boolean }) {
  return (
    <div
      className={`mt-5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-[11px] sm:text-xs font-semibold px-3 py-3 rounded-lg border ${
        dark
          ? 'bg-slate-900/70 border-slate-800 text-slate-200'
          : 'bg-muted/40 border-border text-foreground'
      }`}
    >
      {steps.map((step, index) => (
        <span key={step} className="inline-flex items-center gap-1.5">
          <span className={index === steps.length - 1 ? 'text-primary' : undefined}>{step}</span>
          {index < steps.length - 1 ? <ArrowRight className="w-3 h-3 text-primary shrink-0" /> : null}
        </span>
      ))}
    </div>
  )
}

export function NumberedFlow({
  eyebrow,
  title,
  description,
  label,
  steps,
}: {
  eyebrow: string
  title: string
  description?: string
  label: string
  steps: FlowStep[]
}) {
  const columns =
    steps.length === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <DiagramFrame eyebrow={eyebrow} title={title} description={description} label={label}>
      <ol className={`grid ${columns} gap-3 sm:gap-4`}>
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="relative p-4 rounded-xl bg-[#FAF8F5] border border-primary/40 min-w-0"
          >
            <span className="w-8 h-8 rounded-full bg-primary text-slate-950 text-sm font-bold flex items-center justify-center mb-3">
              {index + 1}
            </span>
            <p className="font-bold text-sm tracking-wide text-foreground">{step.label}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
          </li>
        ))}
      </ol>
      <FlowStrip steps={steps.map((step) => step.label)} />
    </DiagramFrame>
  )
}

export function ColumnCards({
  eyebrow,
  title,
  description,
  label,
  columns,
}: {
  eyebrow: string
  title: string
  description?: string
  label: string
  columns: FlowStep[]
}) {
  return (
    <DiagramFrame eyebrow={eyebrow} title={title} description={description} label={label}>
      <ul
        className={`grid gap-3 sm:gap-4 ${
          columns.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {columns.map((column) => (
          <li key={column.label} className="rounded-xl overflow-hidden border border-primary/40 min-w-0 bg-[#FAF8F5]">
            <p className="bg-slate-950 text-primary text-xs sm:text-sm font-bold tracking-wide px-4 py-3">
              {column.label}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-4 py-4">{column.detail}</p>
          </li>
        ))}
      </ul>
    </DiagramFrame>
  )
}

export function MilestoneTrack({
  eyebrow,
  title,
  description,
  label,
  steps,
}: {
  eyebrow: string
  title: string
  description?: string
  label: string
  steps: Milestone[]
}) {
  return (
    <DiagramFrame eyebrow={eyebrow} title={title} description={description} label={label} tone="dark">
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step, index) => (
          <li
            key={step.phase}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 min-w-0 flex items-start gap-3"
          >
            <span className="w-8 h-8 rounded-full bg-primary text-slate-950 text-sm font-bold flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="font-bold text-sm tracking-wide text-slate-100">{step.phase}</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <FlowStrip steps={steps.map((step) => step.phase)} dark />
    </DiagramFrame>
  )
}

export function HubDiagram({
  eyebrow,
  title,
  description,
  label,
  center,
  nodes,
  footer,
}: {
  eyebrow: string
  title: string
  description?: string
  label: string
  center: string
  nodes: FlowStep[]
  footer?: string
}) {
  return (
    <DiagramFrame eyebrow={eyebrow} title={title} description={description} label={label} tone="dark">
      <div className="flex flex-col gap-4">
        <div className="mx-auto w-full max-w-xs rounded-full bg-primary text-slate-950 px-6 py-6 text-center shadow-lg">
          <p className="font-serif font-bold text-lg tracking-wide">{center}</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nodes.map((node) => (
            <li
              key={node.label}
              className="p-4 rounded-2xl bg-slate-900/90 border border-primary/40 min-w-0 text-center sm:text-left"
            >
              <p className="font-bold text-sm tracking-wide text-primary">{node.label}</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">{node.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      {footer ? <p className="text-xs sm:text-sm text-slate-400 text-center mt-5">{footer}</p> : null}
    </DiagramFrame>
  )
}

export function ChecklistGrid({
  eyebrow,
  title,
  description,
  label,
  items,
}: {
  eyebrow: string
  title: string
  description?: string
  label: string
  items: CheckItem[]
}) {
  return (
    <DiagramFrame eyebrow={eyebrow} title={title} description={description} label={label}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-3 p-4 rounded-xl border border-primary/40 bg-[#FAF8F5] min-w-0"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 w-4 h-4 rounded-sm border-2 border-primary shrink-0"
            />
            <div className="min-w-0">
              <p className="font-bold text-sm tracking-wide text-foreground">{item.label}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </DiagramFrame>
  )
}

export function IdeaBriefDiagram() {
  return (
    <NumberedFlow
      eyebrow="Event brief"
      title="From Idea to Event Brief"
      description="A clear brief becomes the filter for later planning decisions."
      label="From idea to event brief: vision, format, guests, budget and success"
      steps={[
        { label: 'VISION', detail: 'What should guests feel and remember?' },
        { label: 'FORMAT', detail: 'Wedding, corporate, birthday, anniversary or other' },
        { label: 'GUESTS', detail: 'Estimate who is attending and why' },
        { label: 'BUDGET', detail: 'Set a realistic planning range' },
        { label: 'SUCCESS', detail: 'Define what a great event looks like' },
      ]}
    />
  )
}

export function BudgetDiagram() {
  return (
    <ColumnCards
      eyebrow="Event planning budget"
      title="Build the Budget Before Booking"
      description="Keep a contingency reserve for changes and unexpected requirements."
      label="Event planning budget checklist"
      columns={[
        { label: 'VENUE', detail: 'Rental, rooms, access, deposits and required fees' },
        { label: 'FOOD', detail: 'Menu, service style, beverages and staffing' },
        { label: 'DESIGN', detail: 'Décor, florals, furniture, lighting and staging' },
        { label: 'PRODUCTION', detail: 'Audio, screens, microphones, power and technical crew' },
      ]}
    />
  )
}

export function BackwardTimelineDiagram() {
  return (
    <MilestoneTrack
      eyebrow="Event planning timeline"
      title="Plan Backward From Event Day"
      description="Major commitments usually need earlier decisions than final décor details."
      label="Event planning timeline working backward from event day"
      steps={[
        { phase: 'GOAL', detail: 'Name the event day and the result you are planning toward' },
        { phase: '12+ WEEKS', detail: 'Venue and major vendors' },
        { phase: '8–12 WEEKS', detail: 'Design and guest planning' },
        { phase: '4–8 WEEKS', detail: 'Final vendors and program' },
        { phase: '1–2 WEEKS', detail: 'Confirmations and run sheet' },
        { phase: 'EVENT DAY', detail: 'Execute and monitor' },
      ]}
    />
  )
}

export function VenueDecisionDiagram() {
  return (
    <NumberedFlow
      eyebrow="Venue checklist"
      title="Choose a Venue With the Event Flow in Mind"
      description="Capacity is only the first question. Access, layout, services and backup decide whether the space can host the event."
      label="Venue selection checklist for event planning"
      steps={[
        { label: 'CAPACITY', detail: 'Can the room comfortably hold the expected guests?' },
        { label: 'ACCESS', detail: 'Parking, loading, guest arrival and accessibility' },
        { label: 'LAYOUT', detail: 'Can dining, stage and social areas work together?' },
        { label: 'SERVICES', detail: 'What is included, and what must be sourced?' },
        { label: 'BACKUP', detail: 'What happens if weather or access changes?' },
      ]}
    />
  )
}

export function VendorTeamDiagram() {
  return (
    <HubDiagram
      eyebrow="Vendor coordination"
      title="Turn Vendors Into One Coordinated Team"
      description="Every partner should share the same brief, scope, contact, timeline and backup."
      label="Event vendor coordination workflow"
      center="EVENT"
      footer="Venue · Catering · Décor · Photo and video · Entertainment · Production · Logistics"
      nodes={[
        { label: 'BRIEF', detail: 'Share the same event vision and priorities' },
        { label: 'SCOPE', detail: 'Confirm deliverables, timing and inclusions' },
        { label: 'CONTACT', detail: 'Know the decision-maker for each partner' },
        { label: 'TIMELINE', detail: 'Align arrival, setup and cues' },
        { label: 'BACKUP', detail: 'Have alternatives for critical risks' },
      ]}
    />
  )
}

export function GuestJourneyDiagram() {
  return (
    <NumberedFlow
      eyebrow="Guest experience"
      title="Design the Guest Journey"
      description="Walk the event as a guest would, from the first arrival to the last departure."
      label="Guest journey planning checklist"
      steps={[
        { label: 'ARRIVE', detail: 'Parking, welcome and registration should feel clear' },
        { label: 'ORIENT', detail: 'Guests should know where to go next' },
        { label: 'EXPERIENCE', detail: 'Food, seating, program and entertainment flow' },
        { label: 'CONNECT', detail: 'Build natural moments for conversation and celebration' },
        { label: 'LEAVE', detail: 'Departure, gifts and transport should be organized' },
      ]}
    />
  )
}

export function DesignConceptDiagram() {
  return (
    <ColumnCards
      eyebrow="Design concept"
      title="Build a Visual Concept Before Buying Décor"
      description="Palette, focal point, light and details should tell the same story."
      label="Event design concept checklist"
      columns={[
        { label: 'PALETTE', detail: 'Choose a focused color family and supporting neutrals' },
        { label: 'FOCAL POINT', detail: 'Create one or two memorable visual moments' },
        { label: 'LIGHT', detail: 'Plan how the space should look during each phase' },
        { label: 'DETAILS', detail: 'Tables, signage, florals and small touches should support the concept' },
      ]}
    />
  )
}

export function RunOfShowDiagram() {
  return (
    <MilestoneTrack
      eyebrow="Run of show"
      title="Create a Run-of-Show Everyone Can Follow"
      description="The operating script tells the team what happens, who owns the cue, and what must be ready next."
      label="Event run-of-show timeline"
      steps={[
        { phase: 'SETUP', detail: 'Venue ready and technical checks' },
        { phase: 'GUESTS', detail: 'Arrival and welcome' },
        { phase: 'PROGRAM', detail: 'Ceremony, speeches or presentations' },
        { phase: 'PEAK', detail: 'Main celebration and entertainment' },
        { phase: 'CLOSE', detail: 'Final announcements and departure' },
      ]}
    />
  )
}

export function RiskPlanDiagram() {
  return (
    <ChecklistGrid
      eyebrow="Risk plan"
      title="Plan for What Could Go Wrong"
      description="Decide in advance what the team will do if conditions change."
      label="Event risk and backup planning checklist"
      items={[
        { label: 'WEATHER', detail: 'Outdoor backup location or timing adjustment' },
        { label: 'VENDOR', detail: 'Backup contact and replacement option' },
        { label: 'POWER', detail: 'Power plan and technical contingency' },
        { label: 'MEDICAL', detail: 'Know venue procedures and emergency contacts' },
        { label: 'TIMING', detail: 'Buffer time between major program moments' },
        { label: 'GUEST', detail: 'Accessibility, dietary and special assistance needs' },
      ]}
    />
  )
}

export function FinalWeekDiagram() {
  return (
    <NumberedFlow
      eyebrow="Final week"
      title="The Final Week Is for Confirmation"
      description="Use the last week to confirm the plan, not to discover that a key item was never assigned."
      label="Final week event planning checklist"
      steps={[
        { label: 'CONFIRM', detail: 'Vendor arrival, quantities and contact list' },
        { label: 'REHEARSE', detail: 'Review key cues and important transitions' },
        { label: 'PACK', detail: 'Emergency kit, signage and critical documents' },
        { label: 'BRIEF', detail: 'Give the team one final master schedule' },
        { label: 'REST', detail: 'Protect energy for the event itself' },
      ]}
    />
  )
}

export function CommandCenterDiagram() {
  return (
    <HubDiagram
      eyebrow="Event-day command"
      title="Event-Day Command Center"
      description="One lead coordinator should keep the master view."
      label="Event-day command center for venue, vendors, guests, program and backup"
      center="EVENT"
      nodes={[
        { label: 'VENUE', detail: 'Setup, access and room readiness' },
        { label: 'VENDORS', detail: 'Arrival, placement and check-in' },
        { label: 'GUESTS', detail: 'Welcome, flow and VIP support' },
        { label: 'PROGRAM', detail: 'Cues, timing and transitions' },
        { label: 'BACKUP', detail: 'Weather, technical issues and unexpected changes' },
      ]}
    />
  )
}

export function EventDayChecklistDiagram() {
  return (
    <ChecklistGrid
      eyebrow="Event day"
      title="A Simple Event-Day Checklist"
      description="A short visual check is easier to use while moving around the venue."
      label="Event-day coordination checklist"
      items={[
        { label: 'VENUE', detail: 'Room ready, signage placed and access confirmed' },
        { label: 'VENDORS', detail: 'All critical vendors checked in' },
        { label: 'CATERING', detail: 'Service timing and dietary needs confirmed' },
        { label: 'AV', detail: 'Sound, screens, microphones and lighting tested' },
        { label: 'GUESTS', detail: 'Registration, seating and hospitality ready' },
        { label: 'PROGRAM', detail: 'Host, script and cues aligned with the run sheet' },
      ]}
    />
  )
}

export function CloseoutDiagram() {
  return (
    <NumberedFlow
      eyebrow="Event closeout"
      title="Close the Event Professionally"
      description="The work continues after the last guest leaves."
      label="Event closeout workflow"
      steps={[
        { label: 'WRAP', detail: 'Confirm guests, vendors and venue are safely closed out' },
        { label: 'RECONCILE', detail: 'Collect final documents and approved expenses' },
        { label: 'RETURN', detail: 'Track rentals, equipment and leftover materials' },
        { label: 'THANK', detail: 'Send thoughtful follow-ups to clients and partners' },
        { label: 'LEARN', detail: 'Record what worked and what should change next time' },
      ]}
    />
  )
}

export function CompleteWorkflowDiagram() {
  return (
    <MilestoneTrack
      eyebrow="Planning workflow"
      title="The Complete Event Planning Checklist"
      description="The checklist is a system. Every decision should connect to the guest experience, operational readiness or budget control."
      label="Complete event planning checklist from idea to event day"
      steps={[
        { phase: 'IDEA', detail: 'Vision and goals' },
        { phase: 'PLAN', detail: 'Budget and venue' },
        { phase: 'BUILD', detail: 'Vendors and design' },
        { phase: 'DETAIL', detail: 'Guests and program' },
        { phase: 'PREP', detail: 'Confirm and rehearse' },
        { phase: 'EXECUTE', detail: 'Event day' },
        { phase: 'REVIEW', detail: 'Close and improve' },
      ]}
    />
  )
}

export function QuickReferenceDiagram() {
  return (
    <ChecklistGrid
      eyebrow="Quick reference"
      title="One-Page Planner Quick Reference"
      description="Eight checks that show whether the plan is ready to run."
      label="Printable event planning quick reference"
      items={[
        { label: 'VISION', detail: 'Purpose, audience and experience' },
        { label: 'MONEY', detail: 'Budget, deposits and contingency' },
        { label: 'PLACE', detail: 'Venue, layout and access' },
        { label: 'TEAM', detail: 'Vendors, responsibilities and contacts' },
        { label: 'GUESTS', detail: 'Invites, RSVP, seating and needs' },
        { label: 'PROGRAM', detail: 'Run-of-show, cues and transitions' },
        { label: 'RISK', detail: 'Weather, technical and backup plans' },
        { label: 'DAY', detail: 'Briefing, execution and closeout' },
      ]}
    />
  )
}
