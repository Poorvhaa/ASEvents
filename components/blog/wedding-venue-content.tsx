'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Check,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, weddingVenueFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('how-to-choose-a-wedding-venue-15-things-to-check')
const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

export function WeddingVenueContent() {
  const { openModal } = useQuoteModal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!article) return null

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  return (
    <article className="pt-28 pb-16 sm:pb-24 bg-background">
      <ArticleHeader
        post={article}
        badgeLabel="Wedding Venue Checklist & Guide"
        shareTitle="How to Choose a Wedding Venue: 15 Things to Check Before Booking"
      />

      {/* Featured Hero Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-muted">
          <Image
            src={article.image}
            alt="Luxury wedding venue setup featuring an exquisite mandap and scenic outdoor ceremony seating"
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
            <span>Quick Answer</span>
          </div>
          <p className="text-foreground font-medium text-base sm:text-lg leading-relaxed mb-3">
            Choose a wedding venue by comparing the complete cost, real guest capacity, available dates, transport, accessibility, catering, d&eacute;cor rules, technical requirements, weather backup, staffing, vendor restrictions and contract terms.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Do not book based on appearance or headline price alone. Compare shortlisted venues using the same guest count, function schedule and written requirements. For couples coordinating celebrations across cities or heritage properties, our team at <Link href="/services/wedding-planning" className={linkClass}>AS Event Management</Link> provides dedicated site audits and contract negotiations to protect your budget.
          </p>
        </div>

        {/* Section: Overview & Ground Rules */}
        <section className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border/70 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Introduction: Choosing a Venue Without Expensive Surprises
            </h2>
            <p>
              Choosing a wedding venue is one of the most consequential decisions in the wedding planning process. The setting influences the ceremony style, guest capacity, catering model, transport arrangements, d&eacute;cor possibilities and final budget. A beautiful location can create an unforgettable atmosphere, but only if it also supports the practical requirements of your celebration.
            </p>
            <p>
              In India, couples may be organizing a single wedding ceremony, a lavish reception, or a multi-day celebration that includes Haldi, Mehendi, and Sangeet functions. Each format has distinct requirements for stage access, seating, food counters, music acoustics, parking, staffing, and room changes. A comprehensive <strong>wedding venue checklist</strong> helps prevent critical questions from being overlooked when a site visit is exciting or a sales proposal looks deceptively complete.
            </p>
            <p>
              This guide explains 15 essential <strong>wedding venue selection</strong> checks in detail. For each checkpoint, you will learn why the question matters, which operational details to verify, and what to request from the property in writing before signing an agreement or transferring a deposit.
            </p>
          </div>

          {/* Three Ground Rules Callout */}
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Three Ground Rules Before Booking Any Wedding Venue</span>
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-foreground/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span><strong>Ask for complete itemized quotations</strong> based on the exact same guest count, dates, and event schedule across all shortlisted properties.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span><strong>Request written confirmation</strong> of operational limitations, setup surcharges, outside-vendor fees, and weather backup arrangements before committing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span><strong>Do not transfer a nonrefundable deposit</strong> until the final contract accurately reflects every verbal concession, floor plan approval, and timing promise.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Check 01 */}
        <section id="check-1" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">01</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Start with your wedding vision and a complete budget
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-01-wedding-vision-and-budget.webp"
              alt="Wedding venue budget planning and total cost considerations checklist"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            A suitable wedding venue begins with clarity about the celebration you want to host. Before collecting venue brochures, discuss the atmosphere you are hoping to create: a traditional indoor ceremony, an intimate garden wedding, a heritage-property celebration, a modern banquet reception, or a destination wedding with several functions. Consider family customs, music, the importance of décor, guest comfort, and whether the wedding requires different spaces for ceremonies and dining. When both partners agree on their non-negotiables, venues become easier to compare and visually attractive options that do not fit the real brief can be eliminated early.
          </p>
          <p>
            Set a comfortable maximum wedding budget and decide how much of it is available for the venue and its required services. A quoted venue rent is not the same as the full venue-related cost. Your final bill can include catering, service staff, furniture, power, equipment, décor, parking, security, cleaning, taxes, supplier access, and overtime. Request an itemized estimate based on the same guest count and number of functions at every property. Keep a separate reserve for changes rather than using your full approved budget for the first quote.
          </p>
          <p>
            For example, if a banquet package appears affordable but requires a mandatory food minimum, external decorator fee, and separate sound system, its full cost may exceed that of another venue with a higher rental fee and more inclusions. Evaluate the total commitment, not only the first price shown.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Total estimated amount including taxes and service fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Mandatory spending minimums or venue-specific supplier charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Deposit, payment schedule and possible overtime costs</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Budget clarity is more important than a low headline venue price.
              </p>
            </div>
          </div>
        </section>

        {/* Check 02 */}
        <section id="check-2" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">02</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Confirm your guest count, actual capacity and seating layout
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-02-guest-count-capacity-seating.webp"
              alt="Wedding venue guest capacity, floor plans, and seating layout verification"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            A venue should comfortably serve the people you expect to invite, not simply advertise a large maximum number. Begin with a realistic guest estimate that includes children, family members, staff, photographers and any other people who will need space. Ask how the property calculates capacity for a seated dinner, buffet, reception, stage setup, and dance floor. A space that fits 400 people standing may support far fewer when a mandap, dining tables, buffet counters, or a performance stage are installed.
          </p>
          <p>
            Request a floor plan and walk through how guests will move from the entrance to registration, the ceremony, dining, washrooms and the exit. Look for bottlenecks, adequate seating for elderly relatives, visible sightlines, accessible pathways and comfortable separation of food stations from event activities. Where multiple functions happen on the same day, check whether the venue has enough staff and time to reconfigure spaces safely.
          </p>
          <p>
            For an Indian wedding, a Sangeet dance floor and stage need a different layout from a seated wedding ceremony. Ask to see layouts for both rather than assuming one arrangement can support every function. A clearly documented layout helps decorators, caterers and sound teams prepare correct quotations.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Seated versus standing capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Stage, mandap, buffet and circulation space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Alternative layout for each function</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Ask for a measured floor plan, not just a maximum guest number.
              </p>
            </div>
          </div>
        </section>

        {/* Check 03 */}
        <section id="check-3" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">03</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Check your preferred date, season and timing rules
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-03-date-season-timing-rules.webp"
              alt="Checking wedding dates, seasonal weather rules, and noise curfew timings"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            A venue that fits your budget and style still needs to be available on the date you want. Ask for availability across your preferred date range, especially if you are arranging several wedding functions or booking during popular seasons. If a particular calendar date is important for family or religious reasons, confirm its availability before investing time in detailed décor and supplier discussions. Some properties may offer different packages on weekdays and high-demand dates, so date flexibility may provide options.
          </p>
          <p>
            Weather and seasonality can change the entire guest experience. A garden venue during hot weather may require shade, cooled indoor spaces and refreshments. A coastal property during a rainy period requires an indoor alternative. Ask about sunset time, weather conditions, local events, holiday crowds, and road access for that month. These are planning inputs—not guarantees of actual weather.
          </p>
          <p>
            Also confirm exactly when the venue becomes available for preparation and when music, events, and cleanup must stop. A ceremony at 7 p.m. may still require decorators to arrive early in the morning and technicians to perform soundchecks. Clear access windows protect the schedule from rushed setup and overtime disputes.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Available dates and any pricing differences</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Vendor entry, setup and cleanup windows</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Sound curfew and last guest departure time</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Your event date affects availability, weather and every supplier schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Check 04 */}
        <section id="check-4" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">04</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Evaluate location, travel access, parking and transfers
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-04-location-access-parking-transfers.webp"
              alt="Wedding venue location evaluation, parking availability, and guest transfers"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            A beautiful venue should be practical to reach for your guests. Consider where most invitees will travel from, nearby airports or railway stations, road quality, signage, parking, and traffic at likely arrival times. A destination venue may look close on a map but still require a long drive or several transport changes. Ask for realistic arrival instructions and local transport options rather than judging convenience from distance alone.
          </p>
          <p>
            If guests include elderly relatives, children, or people unfamiliar with the area, simple arrival arrangements become especially important. Check whether safe drop-off areas are available, whether buses can access the entrance, and whether the venue can accommodate a coordinated shuttle system. For multi-day celebrations, calculate the time between hotels, ceremony locations, and off-site activities.
          </p>
          <p>
            For example, if the reception venue is 45 minutes from the preferred guest hotel in normal traffic, a delayed shuttle could push back dinner and performances. A transport coordinator, departure buffers and a clear contact number often matter as much as an attractive entrance.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Airport, station and road access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>On-site parking and safe guest drop-off</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Transfers and realistic journey times</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Guest travel is part of the wedding experience.
              </p>
            </div>
          </div>
        </section>

        {/* Check 05 */}
        <section id="check-5" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">05</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Verify accessibility, safety and everyday guest comfort
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-05-accessibility-safety-guest-comfort.webp"
              alt="Verifying wedding venue accessibility, guest comfort, and safety standards"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Wedding venues should welcome guests with different mobility, sensory and family needs. When touring a property, inspect step-free entry where needed, elevators or ramps, accessible washrooms, seating locations, paths between event spaces, and the distance from parking to the main celebration. Do not assume an entrance ramp alone makes a venue accessible. Ask the venue which accessibility measures are actually available and whether the arrangement will remain workable once décor, chairs and equipment are installed.
          </p>
          <p>
            Guest comfort also includes functioning washrooms, drinking water, ventilation, climate control, shaded waiting areas, safe walkways, lighting, nursing or quiet spaces if relevant, and emergency exits that stay unobstructed. For long ceremonies, consider resting places for elderly relatives and sufficient seating for people who cannot stand for extended periods. Check what the venue can reasonably provide rather than making assumptions based on photographs.
          </p>
          <p>
            Requirements differ by country and locality. For an India-based wedding, ask about applicable building rules and practical access features instead of assuming U.S.-specific terminology such as ADA applies automatically. A final walkthrough should consider the needs of your particular invitees.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Entry and restroom access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Safe lighting, exits, water and temperature</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Quiet areas, seating and assistance for guests who need it</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Comfort and access should be confirmed in person.
              </p>
            </div>
          </div>
        </section>

        {/* Check 06 */}
        <section id="check-6" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">06</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Plan nearby accommodation and multi-day hospitality
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-06-accommodation-multi-day-hospitality.webp"
              alt="Planning nearby wedding accommodation, room blocks, and guest hospitality"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            If guests are traveling from outside the city or the wedding includes several ceremonies, accommodation becomes part of the venue decision. Confirm whether rooms are available on-site, whether the property can reserve a room block, and whether nearby hotels provide reliable alternatives. Ask how many rooms are actually guaranteed, when guests must book, and whether there are minimum-night commitments or cancellation penalties.
          </p>
          <p>
            A convenient guest stay can reduce transport coordination and improve the atmosphere of a multi-day celebration. However, room rates, breakfast, taxes, early check-in, and late checkout may be excluded from the venue quotation. Couples should decide whether they will cover some guest stays or simply provide options. Communicate those arrangements clearly so invitees know what expenses are their responsibility.
          </p>
          <p>
            For a wedding with Haldi, Mehendi and a reception across two days, confirm where guests can change clothing, store bags, rest between functions and receive updated schedules. A rooming list, help desk and responsible hospitality contact can prevent confusion.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Number of rooms and contracted rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Check-in, checkout and cancellation rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Guest support and travel between hotel and functions</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Convenient accommodation protects guests from exhausting transfers.
              </p>
            </div>
          </div>
        </section>

        {/* Check 07 */}
        <section id="check-7" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">07</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Compare catering, menus and dietary arrangements
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-07-catering-menus-dietary-arrangements.webp"
              alt="Comparing wedding venue catering policies, menus, and dietary arrangements"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Food and hospitality strongly influence how guests remember a wedding. Start by clarifying whether the venue requires in-house catering or allows an outside caterer. Compare menus based on your function, guest profile and cultural needs. Ask for a written list of dishes, service styles, portion assumptions, buffet stations, beverage offerings, staffing and meal timing. A per-plate quotation is only useful if you understand exactly which services it includes.
          </p>
          <p>
            Collect dietary needs sensitively when guests RSVP. Vegetarian, Jain, vegan, allergy-aware and other meal requests may require separate preparation and service processes. Ask caterers how ingredients are managed, whether allergen information can be supplied, and what they can reliably accommodate. Food labeling and service training matter as much as an appealing tasting session.
          </p>
          <p>
            For example, adding a regional live counter can affect power needs, floor layout, queue management, staff count and final costs. Confirm whether children, service staff and vendor meals are charged separately, and whether the caterer imposes a final guest-count deadline or minimum guarantee.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>In-house versus external catering policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Menu inclusions, live counters and guest-count guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Dietary requests, service staffing and taxes</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Compare what guests receive, not only the per-plate figure.
              </p>
            </div>
          </div>
        </section>

        {/* Check 08 */}
        <section id="check-8" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">08</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Clarify beverage and bar policies before paying
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-08-beverage-and-bar-policies.webp"
              alt="Clarifying wedding bar policies, liquor permits, and corkage fee rules"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Venue beverage rules can materially affect the budget and guest experience. Some properties require the use of their in-house service, while others permit an outside supplier subject to conditions. Ask whether water, tea, coffee, juices and other beverages are included, what the bar-service arrangement is, and whether there are corkage, staffing, glassware or cleaning fees. If alcohol will be part of the celebration, confirm the relevant local permissions and venue rules rather than assuming an arrangement is allowed.
          </p>
          <p>
            Timing matters as much as the drinks themselves. Welcome beverages may be served during guest arrival, while a late reception can need additional staff and stock. Check whether beverage counters will be placed where long queues disrupt entrances or performances. For outdoor summer events, water points should be accessible throughout the venue.
          </p>
          <p>
            Document beverage inclusions and exclusions on the same quotation sheet as catering. If an event is alcohol-free, written confirmation of the available mocktails, water service and other refreshments is still useful.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Beverages included in catering rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Any required permits, corkage or bar staffing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Service times, glassware and final billing method</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Written beverage rules prevent avoidable charges and confusion.
              </p>
            </div>
          </div>
        </section>

        {/* Check 09 */}
        <section id="check-9" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">09</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Understand décor permissions, rentals and visual constraints
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-09-decor-permissions-rentals-constraints.webp"
              alt="Understanding wedding décor permissions, structural guidelines, and rental rules"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Venue photographs often feature decorations and furniture that are not part of the rental package. Clarify what chairs, tables, linens, stage platforms, lighting fixtures, floral structures, tenting and decorative elements are actually included. Ask which items must be rented separately and who is responsible for setup, repair of damage and removal after the event.
          </p>
          <p>
            Many venues limit open flames, fireworks, drilling, confetti, ceiling suspensions, adhesive materials and large structures. These restrictions can matter especially for elaborate mandaps, floral entrances, theme-based backdrops and live performances. Share your visual references with the venue and decorator before placing a deposit. A beautiful concept is useful only if the space and its rules permit it.
          </p>
          <p>
            Walk through the décor plan with measurements and setup times. For example, a large stage design might block a fire exit or reduce comfortable seated capacity, while heavy overhead installations can require professional structural checks. An approved design brief helps your vendors work within the available space.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Furniture and rental inclusions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Rules for flowers, hanging décor, candles and structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Decor setup, damage responsibility and removal</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                An inspiration photo is not a venue approval.
              </p>
            </div>
          </div>
        </section>

        {/* Check 10 */}
        <section id="check-10" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">10</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Check music, sound, power, photography and technical needs
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-10-sound-power-photography-technical.webp"
              alt="Checking venue sound systems, electrical power backup, and photography access"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Sound and lighting should be reviewed before choosing a venue, especially if your celebrations include speeches, live bands, DJs, video presentations or large Sangeet performances. Ask whether speakers, microphones, screens, staging and technical operators are included. Confirm power capacity, generator arrangements, load-in access, cable management and the allowed testing window. Venue acoustics matter: a visually appealing hall can still make speeches difficult to hear.
          </p>
          <p>
            Photography and videography also depend on practical access. Ask about lighting restrictions, drone permissions where relevant, photography access to terraces or private areas, and any exclusive supplier arrangements. Visit at a time similar to your ceremony if possible to understand how natural light enters the space and where guests will be seated.
          </p>
          <p>
            A technical rehearsal should include every device that will be used: laptops, music playback, live microphones, projector connections and presentation files. Confirm the noise curfew and ensure important program items happen before any music restrictions take effect.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Sound equipment and on-site technician</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Power backup, cables and event-specific lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Photography permissions, equipment access and curfew</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Technical reliability matters more than impressive equipment lists.
              </p>
            </div>
          </div>
        </section>

        {/* Check 11 */}
        <section id="check-11" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">11</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Demand a practical indoor or bad-weather backup
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-11-indoor-weather-backup-plan.webp"
              alt="Demanding a practical indoor bad-weather backup plan for outdoor weddings"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            For an outdoor wedding, a weather alternative should be planned before a deposit is paid. Ask the venue to show you the actual covered or indoor space, not simply promise that “something can be arranged.” Check its capacity, seating arrangement, access, decoration possibilities and sound setup. The backup should still support the ceremony respectfully and comfortably, including key traditions that need particular floor space or equipment.
          </p>
          <p>
            Weather risks extend beyond rain. Heat, wind, dust, cold and travel delays can affect setup and guest comfort. Ask who monitors forecasts, who decides whether the backup will be activated, how much notice suppliers need, and whether moving the event creates new charges. Put the decision process in writing so no one has to negotiate urgently on the wedding day.
          </p>
          <p>
            A helpful venue can show photos or a plan of the backup room already dressed for an event. Where the celebration is near water or on a rooftop, ask particularly about wind, electrical safety and evacuation routes.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Specific backup room or covered venue</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Decision deadline and responsible contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Extra charges to move staff, décor and guests</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Plan B should be contracted—not imagined.
              </p>
            </div>
          </div>
        </section>

        {/* Check 12 */}
        <section id="check-12" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">12</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Evaluate venue staffing, coordination and operating hours
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-12-venue-staffing-coordination-hours.webp"
              alt="Evaluating venue coordinator scope, staffing levels, and access hours"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            A venue coordinator is not automatically the same as a full-service wedding planner. Ask what the venue team will manage: room preparation, furniture placement, cleaning, vendor entry, catering coordination, guest questions, emergency response or full program timing. Request names or roles for the key staff who will be present, and check how many supervisors will be available when several wedding functions overlap.
          </p>
          <p>
            Hours of access should match the practical production schedule. Photographers may need preparation time, caterers need delivery windows, florists may require access before sunrise, and musicians need soundchecks. Ask when setup begins, when guests may enter, when music must stop and when all suppliers must leave. Overtime fees should be stated clearly in the contract.
          </p>
          <p>
            A simple responsibility chart can prevent avoidable last-minute calls to the couple. For instance, appoint one point of contact for the venue, one for the event planner and one for the family, with authority limits for expenses or schedule changes.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Venue coordinator versus external planner responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Confirmed staffing and supervisor coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Access hours, setup timing, breakdown and overtime</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Know who will solve a problem while you are celebrating.
              </p>
            </div>
          </div>
        </section>

        {/* Check 13 */}
        <section id="check-13" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">13</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Review preferred suppliers and outside-vendor restrictions
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-13-preferred-suppliers-vendor-restrictions.webp"
              alt="Reviewing preferred vendor lists and outside-vendor royalty restrictions"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Some wedding venues maintain preferred or mandatory vendor lists. These can simplify planning, but they also affect your freedom to choose a caterer, florist, decorator, photographer or technical team. Ask which vendors are recommended and which are compulsory. Check whether outside suppliers need insurance, registration, security clearance or a vendor access fee.
          </p>
          <p>
            If you have a trusted photographer or a decorator with a specific artistic approach, confirm the venue accepts that supplier in writing before committing. Preferred suppliers can sometimes offer streamlined coordination, but couples should still compare scope, portfolios and prices. A list provided by the venue is not a guarantee that every supplier is right for your event.
          </p>
          <p>
            For destination weddings, establish whether suppliers need extra travel, accommodation, meals or permits. That cost can materially affect whether to hire a familiar out-of-town team or suitable local professionals. Build all supplier restrictions into the venue comparison sheet.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Mandatory versus optional preferred vendor list</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Outside supplier permissions and fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Required documents, access rules and travel costs</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Vendor flexibility affects both creativity and total cost.
              </p>
            </div>
          </div>
        </section>

        {/* Check 14 */}
        <section id="check-14" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">14</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Read contracts, insurance, cancellation rules and every fee
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-14-contracts-insurance-cancellation-fees.webp"
              alt="Reviewing wedding venue contracts, insurance clauses, and cancellation policies"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            Before booking, request a complete written contract and a final itemized quotation. Check deposit requirements, payment milestones, taxes, guarantees, staffing, damage charges, security arrangements, setup fees, overtime and other exclusions. If the venue offers several packages, compare them line by line rather than relying on marketing names such as “premium” or “all-inclusive.” Ask the venue to identify any conditions that could change the final amount.
          </p>
          <p>
            Read cancellation, rescheduling and force majeure provisions carefully. Find out what happens if the event date changes, guest count falls, the venue becomes unavailable, or an unexpected disruption prevents the ceremony from proceeding. Insurance and liability arrangements vary by venue and local law; ask what coverage the property maintains and whether it requires the couple or suppliers to obtain additional cover. For substantial contracts, consider an independent professional review where appropriate.
          </p>
          <p>
            Keep the signed agreement, receipts, floor plan, selected menu, payment schedule and all amendments in a shared folder. When a venue representative promises a concession, ask for it to be added to the contract or confirmed in a traceable written message.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Cancellation, postponement and refund provisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Every applicable charge, tax and vendor condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Insurance responsibilities and written amendments</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Anything essential should appear in the agreement.
              </p>
            </div>
          </div>
        </section>

        {/* Check 15 */}
        <section id="check-15" className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg">15</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Visit, verify reviews and make a confident final comparison
            </h2>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border/70 shadow-md bg-muted">
            <Image
              src="/images/blog/how-to-choose-a-wedding-venue-15-things-to-check/check-15-venue-visit-reviews-scorecard.webp"
              alt="Conducting in-person venue site visits, checking reviews, and using scorecards"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p>
            A polished website is a helpful starting point, not a substitute for a venue visit. Tour each shortlisted property at a comparable time of day and ask to see the actual event spaces, guest facilities, power and service areas, accommodation if applicable, and the weather backup. Take photographs where permitted and record concerns immediately. Bring the person who will manage the wedding-day details when possible, so venue-specific questions can be addressed before booking.
          </p>
          <p>
            Read reviews across independent platforms, look for repeated themes and pay attention to how venues respond to concerns. One complaint may not represent overall performance, but recurring comments about late service, surprise charges or poor coordination deserve follow-up. Ask for relevant recent examples of weddings similar in guest count, event format and cultural requirements. Do not assume that attractive images demonstrate smooth operations.
          </p>
          <p>
            Finally, compare the shortlisted venues with a weighted scorecard. Assign more importance to safety, availability, guest capacity, total value and clear contracts than to photography appeal alone. Trust your instincts if a property seems disorganized, but support the final decision with written facts. The ideal wedding venue is the one that can deliver your chosen celebration within your budget with clear responsibility and reasonable confidence.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-card border border-border/80 space-y-2.5">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Questions to Ask the Venue</span>
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Site visit, actual layout and event-day flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Recent relevant reviews and reference examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Written comparison of total cost, fit and confidence</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Practical Takeaway
              </span>
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Visit the real space and let documented evidence guide the final choice.
              </p>
            </div>
          </div>
        </section>

        {/* Printable Comparison Scorecard Table */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Printable Wedding Venue Comparison Scorecard
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Rate each shortlisted venue on a scale from 1 (poor fit) to 5 (exceptional fit). Compare written contractual evidence alongside your numerical scores. Priorities vary: for one couple, accessibility matters most; for another, a particular ceremony date or external caterer is non-negotiable.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border/80 shadow-md">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-muted/70 border-b border-border text-foreground font-semibold">
                  <th className="p-3.5 sm:p-4">Decision Category</th>
                  <th className="p-3.5 sm:p-4 text-center">Venue A (/5)</th>
                  <th className="p-3.5 sm:p-4 text-center">Venue B (/5)</th>
                  <th className="p-3.5 sm:p-4">Key Verification Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Guest Comfort & Real Capacity</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Seated banquet vs standing space, unobstructed sightlines, washrooms</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Total Confirmed Itemized Cost</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Rental, food minimums, taxes, generator, overtime, and vendor fees</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Date & Setup Window Availability</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Auspicious timing hold, early load-in hours, and sound curfews</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Travel Access & Accommodation</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Road conditions, airport transfer times, valet parking, room blocks</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Menu & Outside-Vendor Flexibility</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Dietary specialization, outside decorator royalties, bar policies</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Weather Backup & Power Redundancy</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Contracted indoor backup room, diesel generator auto-switch</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Contract Transparency & Refund Terms</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Fair cancellation policy, force majeure, refundable deposit clarity</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 sm:p-4 font-medium text-foreground">Overall Style & Celebration Ambience</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4 text-center font-bold text-primary">&mdash;</td>
                  <td className="p-3.5 sm:p-4">Architectural beauty, photo backdrops, and personal emotional resonance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border/70 text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Scoring Rule:</strong> A venue should not win simply by collecting more points if it fails a mandatory requirement such as safe capacity, required dates, accessibility, or a permitted ceremony format.
            </span>
          </div>
        </section>

        {/* Interactive Consultation CTA Card */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 shadow-xl space-y-4 text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Need Expert Support Shortlisting & Negotiating Your Wedding Venue?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            From palace estates in Rajasthan and beachside resorts in Goa to premier banquet halls across Gujarat and Mumbai, AS Event Management audits venue capacity, verifies contracts, and negotiates inclusions on your behalf.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-slate-950 font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg text-sm sm:text-base cursor-pointer"
            >
              <span>Request Venue Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/80 hover:border-primary/50 text-foreground font-semibold hover:bg-card transition-all text-sm sm:text-base"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>
        </section>

        {/* Section: Frequently Asked Questions */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Frequently Asked Questions About Choosing a Wedding Venue
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Authoritative answers to the most critical questions couples ask before signing contracts and transferring venue deposits.
          </p>

          <div className="space-y-3">
            {weddingVenueFaqs.map((faq, idx) => {
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

        {/* Conclusion */}
        <section className="space-y-6 pt-6 border-t border-border/60">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            Conclusion: The Right Venue is the One You Can Trust
          </h2>
          <p>
            The best wedding venue balances emotion with practical delivery. It should reflect your celebration style, fit your guest list, support your traditions, offer dependable operations and provide a clear agreement. The 15-point wedding venue checklist above will help you make a decision grounded in complete information rather than an attractive photograph or an incomplete package price.
          </p>
          <p>
            Before signing, revisit the space if needed, confirm your most important requirements in writing, and make sure the responsibilities of the venue, planner and suppliers are clear. Thoughtful wedding venue selection gives you more freedom to enjoy your day. For end-to-end event design and venue coordination, discover our comprehensive <Link href="/services/wedding-planning" className={linkClass}>wedding planning services</Link> or consult our guide on <Link href="/blog/wedding-planner-vs-diy-wedding-planning" className={linkClass}>wedding planner vs DIY wedding planning</Link>.
          </p>

          <div className="p-6 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground text-base sm:text-lg">Planning Your Wedding?</h3>
              <p className="text-sm text-muted-foreground">AS Event Management coordinates seamless weddings across India and luxury destinations worldwide.</p>
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
