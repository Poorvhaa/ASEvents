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
  Compass,
  ListChecks,
  Sliders,
  DollarSign,
  Scale,
  Zap,
  Plane,
  CloudSun,
  Shield,
  Globe,
  Luggage,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, destinationWeddingPlanningFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('destination-wedding-planning-complete-guide')
const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

export function DestinationWeddingPlanningContent() {
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
        badgeLabel="Complete Couple's Guide"
        shareTitle="Destination Wedding Planning: The Complete Guide for Couples"
      />

      {/* Featured Hero Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-muted">
          <Image
            src={article.image}
            alt="Destination wedding ceremony overlooking the sea with travel planning details"
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
            <strong>Destination wedding planning</strong> combines wedding coordination with travel, guest logistics, accommodation, local vendors, venue requirements, budgeting, legal considerations, and contingency planning.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            The right planning approach depends on your destination, guest count, number of functions, budget, travel complexity, and how much professional support you need. A successful destination wedding is built on making thoughtful decisions in the right order, communicating clearly with your guests, and protecting a dedicated contingency buffer.
          </p>
        </div>

        {/* Introduction */}
        <section className="space-y-5">
          <p>
            A destination wedding combines a marriage celebration with travel, bringing couples and guests together in a place that feels meaningful, breathtaking, or distinct from daily life at home. Whether envisioning an intimate sunset gathering on a coastal beach, a grand multi-day celebration at a historic heritage palace, or a stylish urban gathering in a global cultural capital, destination weddings transform a single event into an unforgettable shared journey.
          </p>
          <p>
            The appeal is easy to understand: a distinctive setting naturally elevates the atmosphere, simplifies decorative requirements, and allows couples to spend extended, quality time with loved ones. Yet planning from a distance introduces unique operational complexities. Couples must navigate remote vendor vetting, guest transport logistics, regional legal parameters, unpredictable weather, and multi-currency budgeting.
          </p>
          <p>
            A seamless celebration does not depend on selecting the most exotic locale or cramming every hour with mandatory activities. It relies on making well-timed decisions, establishing transparent communications, and working with seasoned partners. This comprehensive guide details every phase of <strong>destination wedding planning</strong>—from setting initial priorities and negotiating venue contracts to coordinating Indian cultural rituals, managing weather contingencies, and executing flawless wedding-day operations.
          </p>
        </section>

        {/* Section 1: What Makes a Destination Wedding Different? */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">1</span>
            <span>What Makes a Destination Wedding Different?</span>
          </h2>
          <p>
            A destination wedding takes place away from the couple’s usual home area, often somewhere guests must travel to attend. Some couples choose a location with deep personal significance, such as where they first met or a region connected to ancestral roots. Others select a setting for its scenic beauty, climate, architecture, regional cuisine, or recreational appeal.
          </p>
          <p>
            The fundamental distinction between a hometown wedding and a destination wedding lies in the broader planning footprint:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Hometown Wedding Footprint
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Local venue and single-day event management</li>
                <li>Standard vendor contracts with local suppliers</li>
                <li>Guests commute from home; minimal transit coordination</li>
                <li>Direct in-person vendor meetings and food tastings</li>
                <li>Familiar regional regulations and municipal sound curfews</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border-2 border-primary/40 bg-primary/5 hover:border-primary/60 transition-all">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" />
                Destination Wedding Footprint
              </h3>
              <ul className="text-sm text-foreground/90 space-y-2 list-disc list-inside font-medium">
                <li>Multi-day itineraries across multiple resort spaces</li>
                <li>Room blocks, airport shuttles, and hospitality helpdesks</li>
                <li>Remote vendor sourcing, foreign currency &amp; contracts</li>
                <li>Local permits, beach permissions, and ceremony recognition</li>
                <li>Guaranteed indoor weather backup facilities (Plan B)</li>
              </ul>
            </div>
          </div>

          <p>
            The chosen location influences virtually every choice: the best season to marry, what guests should pack, which flowers and décor can be sourced locally, how long music can play outdoors, and whether the ceremony can be legally certified. Destination weddings can suit many styles and budgets. A small guest list does not automatically make an event inexpensive, and a large celebration does not necessarily require a luxury palace buyout. The key is to understand which costs are fixed and which depend directly on guest headcount.
          </p>

          {/* Infographic 1 */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-md bg-card">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="/images/blog/destination-wedding-planning-complete-guide/journey-not-ceremony.jpg"
                alt="Destination Weddings: A Journey, Not Just a Ceremony - The Idea, The Place, The Trip, The Day"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-3 bg-muted/30 border-t border-border/40 text-center text-xs text-muted-foreground font-medium">
              Figure 1: Destination wedding planning connects vision, travel, and guest hospitality into a unified journey.
            </div>
          </div>
        </section>

        {/* Section 2: Start With the Couple’s Priorities */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">2</span>
            <span>Start With the Couple’s Priorities</span>
          </h2>
          <p>
            Before researching venues or collecting inspiration, partners should align on what matters most. Establishing foundational priorities early prevents wasting valuable months evaluating venues that cannot accommodate your core expectations or budget parameters.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <div className="p-5 rounded-xl border border-border/70 bg-card text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Our People</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Realistic guest count, elderly accessibility, children, and international travel ease.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/70 bg-card text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Our Vision</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Atmosphere, cultural rituals, scenic backdrops, culinary style, and guest experience.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/70 bg-card text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Our Limit</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hard financial ceiling, confirmed family contributions, hosted expenses, and reserve fund.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/70 bg-card text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Our Time</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Celebration duration (1 day vs 3-day weekend), travel buffers, and guest downtime.
              </p>
            </div>
          </div>

          <p>
            Key questions couples should openly discuss include:
          </p>
          <ul className="space-y-2 text-sm sm:text-base list-disc list-inside text-muted-foreground">
            <li>What setting and climate genuinely reflect our personalities?</li>
            <li>How many guests do we realistically anticipate attending once travel costs are considered?</li>
            <li>Must the legal marriage paperwork take place abroad, or can we formalize registration at home?</li>
            <li>What balance do we want between hosted celebrations and personal relaxation for our guests?</li>
            <li>Which expenses will we subsidize for our guests (e.g., room nights, airport transfers, welcome meals)?</li>
            <li>Are there specific regional culinary requirements or family religious traditions that dictate venue choice?</li>
          </ul>

          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Planning Tip:</strong> Distinguish the wedding celebration from the travel vacation. While guests are thrilled to explore a new city or beach resort, an over-programmed schedule leaves everyone exhausted. Balance lively festivities with unhurried downtime.
          </div>

          {/* Infographic 2 */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-md bg-card">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="/images/blog/destination-wedding-planning-complete-guide/start-with-priorities.jpg"
                alt="Start with Your Priorities - What matters most to you and your guests?"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-3 bg-muted/30 border-t border-border/40 text-center text-xs text-muted-foreground font-medium">
              Figure 2: Defining non-negotiables early gives every subsequent planning decision a clear anchor.
            </div>
          </div>
        </section>

        {/* Section 3: Destination Wedding Ideas: Finding the Perfect Setting */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">3</span>
            <span>Destination Wedding Ideas: Finding the Perfect Setting</span>
          </h2>
          <p>
            Every wedding backdrop establishes its own distinctive mood, logistics, and vendor dynamics. Exploring different <strong>destination wedding ideas</strong> helps couples match their celebration style with operational realities:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Beach &amp; Tropical Resorts</span>
              <h3 className="text-lg font-serif font-bold text-foreground mt-1 mb-2">Coastal &amp; Island Celebrations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Locations such as Goa, Kerala, the Andaman Islands, Thailand, or Bali deliver relaxed elegance, sunset backdrops, and open-air receptions.
              </p>
              <div className="text-xs text-foreground/80 space-y-1">
                <p><strong>Key Checks:</strong> High humidity, tidal schedules, public beach permits, sand load-in access for heavy production, and guaranteed air-conditioned indoor backup.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Heritage &amp; Royal Palaces</span>
              <h3 className="text-lg font-serif font-bold text-foreground mt-1 mb-2">Historic Palaces &amp; Villas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Rajasthan heritage fortresses (Udaipur, Jaipur, Jodhpur) and European villas (Tuscany, Lake Como) offer timeless grandeur, regal architecture, and dramatic photography.
              </p>
              <div className="text-xs text-foreground/80 space-y-1">
                <p><strong>Key Checks:</strong> Strict preservation rules, candle/fire bans, outdoor sound curfews (often 10:00 PM), and heritage furniture movement limits.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Mountains &amp; Scenic Retreats</span>
              <h3 className="text-lg font-serif font-bold text-foreground mt-1 mb-2">Hill Stations &amp; Alpine Lodges</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Locations such as Mussoorie, Shimla, Kashmir, or the Swiss Alps provide crisp climates, panoramic valley views, and cozy, intimate gatherings.
              </p>
              <div className="text-xs text-foreground/80 space-y-1">
                <p><strong>Key Checks:</strong> Steep narrow roads, winding transfers, altitude adjustments for elderly guests, and sudden mountain temperature drops.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Urban Luxury &amp; Cosmopolitan Hubs</span>
              <h3 className="text-lg font-serif font-bold text-foreground mt-1 mb-2">Metropolitan Hotel Ballrooms</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Cities like Dubai, Mumbai, Singapore, or London offer exceptional flight connectivity, world-class luxury hotels, Michelin-caliber catering, and vibrant nightlife.
              </p>
              <div className="text-xs text-foreground/80 space-y-1">
                <p><strong>Key Checks:</strong> City traffic bottlenecks, premium hotel room rates, parking logistics, and elevator/freight loading dock restrictions.</p>
              </div>
            </div>
          </div>

          <p>
            When planning an <Link href="/services/destination-weddings" className={linkClass}>Indian destination wedding</Link>, prioritize destinations that provide logistical capability for multi-day ceremonies (Haldi, Mehendi, Sangeet, Wedding, and Reception), rather than booking based on brand prestige alone.
          </p>

          {/* Infographic 3 */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-md bg-card">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="/images/blog/destination-wedding-planning-complete-guide/destination-settings.jpg"
                alt="Destination Wedding Ideas: Finding the Perfect Setting - Beach, Heritage, Mountain, City"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-3 bg-muted/30 border-t border-border/40 text-center text-xs text-muted-foreground font-medium">
              Figure 3: Evaluating destination settings across atmosphere, travel accessibility, and cultural adaptability.
            </div>
          </div>
        </section>

        {/* Section 4: Choose a Destination That Works in Practice */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">4</span>
            <span>Choose a Destination That Works in Practice</span>
          </h2>
          <p>
            A picturesque setting is only one element of a successful destination. Couples must evaluate practical operational viability before placing a deposit:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                <Plane className="w-4 h-4 text-primary" />
                1. Travel Accessibility &amp; Flight Connectivity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Evaluate direct flight frequencies and airport transit distances. A remote castle requiring three connecting flights and a four-hour mountain drive may be fine for a small group of friends, but proves arduous for elderly grandparents, families with young children, or busy executives. Direct guests to official government immigration portals for visa and passport validity rules rather than hosting unverified travel summaries.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-primary" />
                2. Climate, Seasonality &amp; Daylight Hours
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Research historical temperature patterns, humidity indices, monsoon cycles, and sunset timings for your target month. Peak holiday seasons, school vacations, and local cultural festivals create heavy tourist crowds, surging flight prices, and inflated accommodation costs. Shoulder season often provides optimal weather with significantly improved contract flexibility.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                3. Local Context, Regulations &amp; Community Norms
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Respect regional regulations regarding outdoor sound amplification, fireworks permits, public beach usage, and drone videography. Ethical destination planning prioritizes local community respect and engages verified local suppliers, avoiding treating any destination as a mere photographic stage.
              </p>
            </div>
          </div>

          {/* Infographic 4 */}
          <div className="my-8 rounded-2xl overflow-hidden border border-border/60 shadow-md bg-card">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="/images/blog/destination-wedding-planning-complete-guide/evaluate-destination-venue.jpg"
                alt="How to Evaluate the Destination and Venue: Access, Capacity, Services, Rules, Backup"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="p-3 bg-muted/30 border-t border-border/40 text-center text-xs text-muted-foreground font-medium">
              Figure 4: The five operational pillars of destination venue selection.
            </div>
          </div>
        </section>

        {/* Section 5: Compare the Venue, Package and Contract */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">5</span>
            <span>Compare the Venue, Package and Contract</span>
          </h2>
          <p>
            When requesting destination wedding venue quotations, establish identical baseline assumptions for each property: anticipated dates, guest count, number of functions, guaranteed room nights, and catering parameters. Request itemized proposals that separate room rates, venue hire, food and beverage, production power, setup access, service charges, and taxes.
          </p>

          {/* Responsive Venue Comparison Table */}
          <div className="my-8 overflow-hidden rounded-2xl border border-border/70 shadow-lg bg-card">
            <div className="p-4 sm:p-5 bg-muted/40 border-b border-border/60">
              <h3 className="font-serif font-bold text-lg text-foreground">
                Destination Wedding Venue Proposal Comparison Framework
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Always evaluate itemized operational capabilities rather than headline room rates alone.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-muted/70 text-foreground font-semibold border-b border-border/60">
                    <th className="p-3 sm:p-4 w-1/4">Category</th>
                    <th className="p-3 sm:p-4 w-1/3">What to Verify</th>
                    <th className="p-3 sm:p-4">Critical Questions to Ask the Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground flex items-center gap-2">
                      <Plane className="w-4 h-4 text-primary shrink-0" />
                      Access
                    </td>
                    <td className="p-3 sm:p-4">Airport transit distance, road conditions, parking, coach drop-off capacity</td>
                    <td className="p-3 sm:p-4">How will guests travel from the airport to the property? Are private group shuttle transfers included or contracted separately?</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary shrink-0" />
                      Accommodation
                    </td>
                    <td className="p-3 sm:p-4">Room count, inventory tiers, check-in/out times, attrition policies</td>
                    <td className="p-3 sm:p-4">How many rooms are guaranteed, for which exact dates, at what negotiated group rates? What happens to unsold rooms?</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      Ceremonies
                    </td>
                    <td className="p-3 sm:p-4">Indoor/outdoor event spaces, turnover windows, sound curfews</td>
                    <td className="p-3 sm:p-4">Which indoor and outdoor lawns/ballrooms are allocated for each function, and how many setup hours are provided before guest arrival?</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      Vendors
                    </td>
                    <td className="p-3 sm:p-4">Approved supplier lists, royalty fees, external catering access</td>
                    <td className="p-3 sm:p-4">Can outside decorators, sound technicians, and specialist caterers operate on-site without punitive vendor royalties?</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary shrink-0" />
                      Backup
                    </td>
                    <td className="p-3 sm:p-4">Weather contingencies, indoor ballroom capacity, backup generators</td>
                    <td className="p-3 sm:p-4">What happens in heavy monsoon rain or high winds? Does the indoor backup comfortably seat our full guest list?</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4 font-bold text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary shrink-0" />
                      Money
                    </td>
                    <td className="p-3 sm:p-4">Taxes, service charges, cancellation terms, minimum F&amp;B spend</td>
                    <td className="p-3 sm:p-4">What are the complete taxes (GST/VAT), service fees, security deposits, payment milestones, and cancellation penalties?</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 6: Decide How the Marriage Will Be Legally Recognized */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">6</span>
            <span>Decide How the Marriage Will Be Legally Recognized</span>
          </h2>
          <p>
            A celebratory destination gathering and an official legal marriage are two distinct legal events. Couples generally select one of three distinct approaches:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">1. Legal Abroad</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Formal legal marriage conducted at the destination according to local national civil law, requiring local registrars, witnesses, and certified documentation.
              </p>
            </div>
            <div className="p-5 rounded-xl border-2 border-primary/40 bg-primary/5">
              <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">2. Symbolic Abroad</h3>
              <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                Spiritual, religious, or personal ceremony exchanged overseas with friends and family, with legal civil registration handled in your home country.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-foreground mb-1">3. Legal at Home</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Formal court registration or registrar signing completed quietly at home before or after the destination trip to simplify international administrative procedures.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm leading-relaxed text-foreground/90">
            <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 mb-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Important Legal &amp; Immigration Notice
            </div>
            <p>
              Requirements vary significantly by destination, local municipality, and your citizenship. Legal foreign marriages may necessitate apostilles, sworn translations, blood tests, single-status affidavits, and mandatory local residency windows. AS Event Management specializes in hospitality and operational event management and does not provide legal, tax, or immigration counsel. Couples must verify all requirements with official government authorities, embassies, or qualified local legal counsel.
            </p>
          </div>
        </section>

        {/* Section 7: Build a Realistic Destination Wedding Budget */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">7</span>
            <span>Build a Realistic Destination Wedding Budget</span>
          </h2>
          <p>
            A robust destination wedding budget accounts for both the event production and travel-related logistics. Read our detailed guide on <Link href="/blog/how-to-create-an-event-budget" className={linkClass}>how to create an event budget</Link> for practical tracking templates.
          </p>
          <p>
            Comprehensive destination budget categories include:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6 text-xs sm:text-sm">
            {[
              'Venue rental and ceremony fees',
              'Food and beverages (all functions)',
              'Photography and videography',
              'Entertainment and sound systems',
              'Floral design, lighting & production',
              'Wedding clothing and alterations',
              'Bridal hair, makeup & styling',
              'Guest transportation & airport shuttles',
              'Accommodation for couple & family',
              'Welcome dinner & farewell brunch',
              'Planner fees and on-site coordination',
              'Travel & vendor liability insurance',
              'Legal documentation & translation',
              'Stationery, digital invites & website',
              'Local taxes, service fees & levies',
              'Foreign exchange & bank transfer fees',
              'Dedicated contingency reserve (15%)',
            ].map((cat, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-border/70 bg-card flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-foreground">{cat}</span>
              </div>
            ))}
          </div>

          {/* Section 25: Illustrative ₹30 Lakh Budget Example */}
          <div className="my-8 rounded-2xl border-2 border-primary/40 bg-card shadow-xl overflow-hidden">
            <div className="p-5 sm:p-6 bg-primary/10 border-b border-primary/20">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-wider">
                Teaching Example Only
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-2">
                Illustrative ₹30 Lakh Destination Wedding Budget Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                To illustrate how a comprehensive budget allocates across core categories, review this balanced allocation model.
              </p>
            </div>

            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border text-foreground font-semibold">
                      <th className="py-2.5 px-3">Expense Category</th>
                      <th className="py-2.5 px-3 text-right">Hypothetical Allocation</th>
                      <th className="py-2.5 px-3 text-right">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-muted-foreground">
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Venue &amp; Room Block Accommodation</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹6,00,000</td><td className="py-2.5 px-3 text-right">20.0%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Catering (Multi-function Meals &amp; Beverages)</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹6,00,000</td><td className="py-2.5 px-3 text-right">20.0%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Décor, Floral Design, Stage &amp; Production</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹4,50,000</td><td className="py-2.5 px-3 text-right">15.0%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Photography, Cinematography &amp; Drone</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹2,50,000</td><td className="py-2.5 px-3 text-right">8.3%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Wedding Planner &amp; On-Site Coordination</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹2,50,000</td><td className="py-2.5 px-3 text-right">8.3%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Guest Shuttles &amp; Local Transportation</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹2,00,000</td><td className="py-2.5 px-3 text-right">6.7%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">DJ, Sound, Lighting &amp; Artists</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹1,50,000</td><td className="py-2.5 px-3 text-right">5.0%</td></tr>
                    <tr><td className="py-2.5 px-3 font-medium text-foreground">Permits, Documentation &amp; Administration</td><td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">₹50,000</td><td className="py-2.5 px-3 text-right">1.7%</td></tr>
                    <tr className="bg-primary/5"><td className="py-2.5 px-3 font-bold text-primary">Dedicated Contingency Reserve</td><td className="py-2.5 px-3 text-right font-mono font-bold text-primary">₹4,50,000</td><td className="py-2.5 px-3 text-right font-bold text-primary">15.0%</td></tr>
                    <tr className="border-t-2 border-primary font-bold text-foreground"><td className="py-3 px-3 text-base">TOTAL BUDGET</td><td className="py-3 px-3 text-right font-mono text-base text-primary">₹30,00,000</td><td className="py-3 px-3 text-right">100.0%</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Required Disclosure:</strong> This is a hypothetical teaching example only. It is not an average destination wedding price, vendor quotation, or recommended universal allocation. Actual costs vary widely based on guest count, city tier, property classification, and season. For Indian market cost benchmarks, explore our study on <Link href="/blog/how-much-does-event-planning-cost-in-india" className={linkClass}>how much event planning costs in India</Link>.
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Hidden Costs and Financial Surprises */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">8</span>
            <span>Hidden Costs and Financial Surprises</span>
          </h2>
          <p>
            The most damaging budget overruns stem from unspoken assumptions. A resort quotation might advertise an attractive lawn fee, but omit mandatory electricity generator rentals, overnight setup labor, or cleaning surcharges.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Plane className="w-4 h-4 text-primary" />
                Travel &amp; Logistics Extras
              </h3>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Out-of-town vendor flights, baggage &amp; room allowances</li>
                <li>Airport shuttle wait times and toll fees</li>
                <li>Freight shipping, customs duties &amp; baggage overages</li>
                <li>Extra hotel nights for early setup and teardown</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                Administrative &amp; Venue Fees
              </h3>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Mandatory service charges (10–18%) and local resort levies</li>
                <li>Foreign currency transaction fees (2–4%)</li>
                <li>Vendor royalty fees for non-preferred decorators</li>
                <li>Late-night music overtime penalties and cleanup fees</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Technical &amp; Production Surprises
              </h3>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Heavy generator fuel and temporary power distribution</li>
                <li>Lighting truss rigging and outdoor ground stabilization</li>
                <li>Floral substitutions due to regional availability</li>
                <li>Rain marquee / tent rental deposits</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Timing &amp; Hospitality Demands
              </h3>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Early guest check-ins and hospitality lounge refreshments</li>
                <li>Room hamper distribution fees charged by resorts</li>
                <li>Midnight snacks and extended bar service charges</li>
                <li>Emergency transportation for guest flight delays</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9: Destination Wedding Checklist and Planning Timeline */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">9</span>
            <span>Destination Wedding Checklist and Planning Timeline</span>
          </h2>
          <p>
            An organized <strong>destination wedding checklist</strong> establishes clear accountability and milestone targets. While specific timelines adjust depending on venue booking velocity, this structured sequence provides an ideal foundation:
          </p>

          <div className="space-y-4 my-6">
            {[
              {
                period: '18–24 Months Before',
                badge: 'Strategic Alignment',
                tasks: [
                  'Align on maximum budget ceiling and target guest headcount',
                  'Research destinations, international flight access, seasons, and legal requirements',
                  'Shortlist 3–5 properties and request itemized proposals',
                  'Decide whether to hire a full-service destination wedding planner',
                  'Create preliminary guest list and verify guest travel affordability',
                ],
              },
              {
                period: '12–18 Months Before',
                badge: 'Venue & Key Contracts',
                tasks: [
                  'Lock venue contract and secure negotiated room block agreement',
                  'Send digital Save-the-Dates with location, airports, and room block codes',
                  'Launch central wedding information website with travel FAQs',
                  'Secure priority creative vendors: photography, video, catering, entertainment',
                  'Review travel insurance policies and vendor cancellation terms',
                ],
              },
              {
                period: '9–12 Months Before',
                badge: 'Design & Inclusions',
                tasks: [
                  'Finalize floral design concepts, production specs, and rain backup plan',
                  'Select wedding attire, accounting for destination climate and tailoring lead times',
                  'Schedule hair and makeup artist trials',
                  'Confirm welcome dinner and pre-wedding gathering locations',
                  'Remind international guests to verify passport expiry dates (minimum 6 months validity)',
                ],
              },
              {
                period: '6–9 Months Before',
                badge: 'Invitations & Logistics',
                tasks: [
                  'Send formal invitations with precise RSVP and dietary collection deadlines',
                  'Finalize multi-function catering menus and bar packages with venue',
                  'Establish airport shuttle transfer windows for arriving guests',
                  'Confirm ceremony rituals, priest/officiant arrangements, and music cues',
                  'Verify submission deadlines for civil registration or legal documentation',
                ],
              },
              {
                period: '3–6 Months Before',
                badge: 'Confirmations & Details',
                tasks: [
                  'Track RSVPs and conduct personalized follow-ups for room bookings',
                  'Finalize rooming list allocations with hotel front office management',
                  'Order welcome bag items, print menus, place cards, and luggage tags',
                  'Review outstanding vendor milestone payments and currency conversion rates',
                  'Publish finalized event itinerary and dress codes to the wedding website',
                ],
              },
              {
                period: '1–3 Months Before',
                badge: 'Operational Lock-In',
                tasks: [
                  'Submit final guaranteed guest headcount to caterer and hotel',
                  'Reconfirm setup windows, technical specs, and contact details with all suppliers',
                  'Review all ceremony schedules with family leads and appointed coordinators',
                  'Assemble comprehensive wedding day master run-of-show timeline',
                  'Pack wedding clothing and irreplaceable documents in carry-on baggage',
                ],
              },
            ].map((phase, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-serif font-bold text-lg text-foreground">{phase.period}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                    {phase.badge}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
                  {phase.tasks.map((task, tIdx) => (
                    <li key={tIdx}><span className="text-foreground/90 font-medium">{task}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10: When to Hire a Destination Wedding Planner */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">10</span>
            <span>When to Hire a Destination Wedding Planner</span>
          </h2>
          <p>
            Coordinating an elaborate celebration in an unfamiliar locale across time zones, languages, and regional supplier markets can quickly become overwhelming. A skilled <Link href="/services/destination-weddings" className={linkClass}>destination wedding planner</Link> provides objective guidance, local supplier accountability, and peace of mind.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Full-Service Planning</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Manages every phase from destination scouting and budget architecture to contract negotiation, guest hospitality, design curation, and on-site event execution.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Partial Coordination</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Assists couples who have already locked their venue but need expert support for vendor curation, production design, contract vetting, and timeline management.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Month-of Coordination</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Steps in 4–6 weeks prior to the event to consolidate supplier contracts, build master run-of-show schedules, confirm arrival logistics, and manage on-site execution.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-base text-foreground mb-1">Resort / Venue Coordination</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Oversees in-house venue catering and room allocations. Note: resort coordinators rarely manage external decorators, guest shuttles, or off-site events.
              </p>
            </div>
          </div>

          <p>
            When interviewing candidate planners, inquire about their specific on-the-ground experience in your destination, local language fluency, supplier connections, fee structure (flat fee vs percentage), and team size. For an in-depth framework on vetting professionals, consult our guide on <Link href="/blog/how-to-choose-the-right-event-planner-for-your-event" className={linkClass}>how to choose the right event planner for your event</Link> and read <Link href="/blog/wedding-planner-vs-diy-wedding-planning" className={linkClass}>wedding planner vs DIY wedding planning</Link>.
          </p>
        </section>

        {/* Section 11: Guest Travel, Hospitality and Communication */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">11</span>
            <span>Guest Travel, Hospitality and Communication</span>
          </h2>
          <p>
            Your guests are investing financial resources, annual vacation leave, and long hours of travel to share in your celebration. A thoughtful hospitality plan ensures they feel valued, comfortable, and oriented from arrival to departure:
          </p>

          <div className="space-y-3 my-6">
            <div className="p-4 rounded-xl border border-border/70 bg-card flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground text-sm">One Central Information Source</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Maintain a mobile-friendly wedding website detailing recommended flight itineraries, airport transfer schedules, hotel booking codes, attire guidelines, local climate expectations, and packing essentials.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card flex items-start gap-3">
              <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground text-sm">Tiered Accommodation Choices</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  If the primary wedding resort carries premium rates, negotiate group codes at nearby secondary hotels at various price points, providing complimentary shuttles to all official wedding functions.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card flex items-start gap-3">
              <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground text-sm">Dedicated Hospitality Desk</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Appoint a dedicated hospitality manager at the hotel lobby to greet arriving guests, assist with check-ins, distribute welcome itineraries, and address flight delay questions without disturbing the couple.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Use Technology to Keep Planning Organized */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">12</span>
            <span>Use Technology to Keep Planning Organized</span>
          </h2>
          <p>
            Digital coordination tools streamline communications across disparate time zones, but technology must simplify rather than complicate operations:
          </p>
          <ul className="space-y-2 text-sm sm:text-base list-disc list-inside text-muted-foreground">
            <li><strong>Central Master Tracker:</strong> Maintain one shared cloud spreadsheet for budget tracking, contracts, invoices, and payment due dates.</li>
            <li><strong>Online RSVP Management:</strong> Collect dietary restrictions, arrival flight numbers, and room preferences via digital RSVP portals.</li>
            <li><strong>Multi-Channel Broadcasts:</strong> Use email newsletters for official logistical instructions and a broadcast messaging channel for real-time weekend updates.</li>
          </ul>

          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10 text-sm leading-relaxed text-foreground/90">
            <div className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400 mb-1">
              <Shield className="w-4 h-4 shrink-0" />
              Critical Guest Privacy &amp; Data Security Warning
            </div>
            <p>
              Never publish private passport numbers, flight booking references, payment details, or sensitive personal data on a public wedding website. Utilize password-protected guest portals, restrict administrative access to planning accounts, and enable multi-factor authentication (MFA). Collect only the minimum information required for hospitality coordination and delete sensitive data after event completion.
            </p>
          </div>
        </section>

        {/* Section 13: Working With Local and Remote Wedding Vendors */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">13</span>
            <span>Working With Local and Remote Wedding Vendors</span>
          </h2>
          <p>
            When suppliers operate far from your home city, written clarity becomes vital. Follow a disciplined 4-stage vendor management lifecycle:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <div className="p-4 rounded-xl border border-border/70 bg-card text-center">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 1</span>
              <h3 className="font-serif font-bold text-base text-foreground mt-1 mb-1">Shortlist</h3>
              <p className="text-xs text-muted-foreground">
                Evaluate full event portfolios, client testimonials, and destination experience.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-card text-center">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 2</span>
              <h3 className="font-serif font-bold text-base text-foreground mt-1 mb-1">Compare</h3>
              <p className="text-xs text-muted-foreground">
                Request itemized scopes detailing staffing, equipment, transport, and overtime fees.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-card text-center">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 3</span>
              <h3 className="font-serif font-bold text-base text-foreground mt-1 mb-1">Confirm</h3>
              <p className="text-xs text-muted-foreground">
                Lock signed contracts with explicit cancellation, backup, and delivery clauses.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-card text-center">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 4</span>
              <h3 className="font-serif font-bold text-base text-foreground mt-1 mb-1">Deliver</h3>
              <p className="text-xs text-muted-foreground">
                Provide on-site load-in schedules and conduct pre-event technical testing.
              </p>
            </div>
          </div>

          <p>
            Avoid relying on verbal agreements over phone calls or messaging apps. Always summarize key decisions, design alterations, and financial changes in written agreements signed by authorized leads.
          </p>
        </section>

        {/* Section 14: Planning Indian Destination Wedding Ceremonies */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">14</span>
            <span>Planning Indian Destination Wedding Ceremonies</span>
          </h2>
          <p>
            An <strong>Indian destination wedding</strong> typically encompasses multiple distinct rituals—Haldi, Mehendi, Sangeet, sacred Wedding Ceremony, and Reception. Each ritual demands dedicated spatial, decorative, catering, and operational planning:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Haldi Ceremony (Vibrant Morning Gathering)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Requires open-air poolside or garden lawns with stain-resistant flooring, direct water access for floral baths, casual finger food, and joyful acoustic or dhol music.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                Mehendi Ceremony (Relaxed Afternoon Affair)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Demands shaded, comfortable lounge seating with low tables for henna artists, light folk music, refreshing mocktails, and easy food service that accommodates hands adorned with wet henna.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                <Music className="w-4 h-4 text-primary" />
                Sangeet Night (High-Energy Dance Celebration)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Requires an expansive ballroom or open-air stage equipped with professional concert-grade lighting, LED display walls, professional sound engineering, wireless microphones for emcees, and seamless bar operations.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Sacred Wedding Ceremony &amp; Baraat
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Involves Baraat procession permits, dedicated arrival pathways, traditional welcome rituals (Milni), custom mandap construction with ceremonial fire (havan) clearance, and reverent audio amplification for Vedic chants.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-primary" />
                Grand Wedding Reception
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Features sophisticated stage backdrops, multi-course banquet dining, emotional family toasts, cake cutting, and formal guest photography lines.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Cultural Nuance:</strong> Indian wedding customs vary substantially across communities (Gujarati, Punjabi, South Indian, Marwari, Bengali, Sindhi, and multicultural unions). Avoid compressing too many ceremonies into a single day. Allow realistic 3-to-4 hour gaps between morning and evening events for makeup changes, guest rest, and venue turnover.
          </div>
        </section>

        {/* Section 15: Weather, Travel Disruption and Backup Plans */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">15</span>
            <span>Weather, Travel Disruption and Backup Plans</span>
          </h2>
          <p>
            Outdoor destination celebrations are subject to unpredictable coastal storms, high winds, intense heat, or sudden monsoon downpours. A robust contingency framework protects both investment and peace of mind:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-primary" />
                Plan A: Outdoor Ceremony
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Stunning natural scenic sunset backdrop</li>
                <li>Open-air mandap or floral wedding arbor</li>
                <li>Natural sea breeze and outdoor ambiance</li>
                <li>Requires shade parasols, hydration &amp; misting fans</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border-2 border-primary/40 bg-primary/5">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Plan B: Indoor Ballroom Alternative
              </h3>
              <ul className="text-sm text-foreground/90 space-y-2 list-disc list-inside font-medium">
                <li>Climate-controlled ballroom with full guest capacity</li>
                <li>Pre-reserved lighting, sound, and floral setup</li>
                <li>Zero weather anxiety for elderly relatives</li>
                <li>Pre-agreed switch deadline (e.g., 4 hours prior)</li>
              </ul>
            </div>
          </div>

          <p>
            Establish a firm, written weather decision cutoff (typically 4 to 6 hours before ceremony start) agreed upon by the couple, venue banqueting director, decorator, and lead planner. Once triggered, the entire production team pivots seamlessly to Plan B without hesitation or chaotic last-minute debates.
          </p>
        </section>

        {/* Section 16: Sample Three-Day Destination Wedding Itinerary */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">16</span>
            <span>Sample Three-Day Destination Wedding Itinerary</span>
          </h2>
          <p>
            To illustrate how multi-day transitions flow across a celebratory weekend, review this illustrative scenario designed for a coastal or palace destination:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-lg text-foreground">Day 1: Guest Arrivals &amp; Casual Welcome Dinner</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold uppercase">Arrival Day</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Focuses on smooth check-in, orientation, and stress-free reunions without rigid styling or demanding attire.
              </p>
              <div className="text-xs space-y-1 text-foreground/90 font-medium">
                <p>• <strong>12:00 PM – 5:00 PM:</strong> Airport shuttle pickups, resort check-in, welcome drinks &amp; room hampers.</p>
                <p>• <strong>7:00 PM – 10:30 PM:</strong> Sunset poolside welcome barbecue, acoustic music, and relaxed mingling.</p>
                <p>• <strong>10:30 PM:</strong> Early night to ensure guests and bridal party are fully rested.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-lg text-foreground">Day 2: Vibrant Mehendi &amp; High-Energy Sangeet</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold uppercase">Celebration Day</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Blends cultural traditions in the afternoon with an electrifying musical performance in the evening.
              </p>
              <div className="text-xs space-y-1 text-foreground/90 font-medium">
                <p>• <strong>1:00 PM – 4:30 PM:</strong> Garden Mehendi with live chaat stations, folk dances &amp; henna artists.</p>
                <p>• <strong>4:30 PM – 7:00 PM:</strong> Guest downtime, styling changes &amp; stage sound-check.</p>
                <p>• <strong>7:30 PM – 1:00 AM:</strong> Sangeet gala featuring family dance performances, DJ, and late-night supper.</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-lg text-foreground">Day 3: Sacred Haldi, Baraat, Wedding Ceremony &amp; Reception</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold uppercase">Wedding Day</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The pinnacle celebration uniting sacred rituals with a formal celebratory banquet.
              </p>
              <div className="text-xs space-y-1 text-foreground/90 font-medium">
                <p>• <strong>9:00 AM – 11:00 AM:</strong> Intimate morning Haldi ceremony with floral showers.</p>
                <p>• <strong>3:30 PM – 4:30 PM:</strong> Energetic Baraat procession with brass band or dhol drummers.</p>
                <p>• <strong>5:00 PM – 7:00 PM:</strong> Sunset Vedic wedding ceremony at the beachfront mandap.</p>
                <p>• <strong>8:00 PM – Late:</strong> Formal wedding reception dinner, champagne toasts, and after-party.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Note: This is an illustrative scenario only, not a mandatory schedule. Every wedding program should reflect the specific family preferences, flight arrivals, and regional traditions of the couple.
          </p>
        </section>

        {/* Section 17: The Final Destination Wedding Checklist */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">17</span>
            <span>The Final Destination Wedding Checklist</span>
          </h2>
          <p>
            During the final 7 to 10 days before departure, shift your mindset from creative planning to operational verification and delegation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                1. Guests
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Confirm final rooming list with front desk, match dietary meal counts with caterer, verify airport shuttle rosters, and test broadcast messaging.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                2. Venue
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Walk through banquet halls, check power backup generators, verify sound curfew exceptions, and inspect indoor weather contingency spaces.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-primary" />
                3. Vendors
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reconfirm arrival windows for photo/video, florist, decorator, sound team, makeup artists, and ensure lead contacts have direct numbers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                4. Money
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reconcile remaining supplier balances, prepare organized tipping envelopes, verify credit card international limits, and protect reserve fund.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                5. Documents
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pack physical passports, visas, marriage licenses, insurance policies, and hotel vouchers in secure, carry-on luggage.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/80 bg-card">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                6. Plan B
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reconfirm decision deadline for weather activation, review emergency supplier substitution contacts, and ensure first-aid kits are on-site.
              </p>
            </div>
          </div>
        </section>

        {/* Section 18: Create a Wedding Plan and Assign Family Roles */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">18</span>
            <span>Create a Wedding Plan and Assign Family Roles</span>
          </h2>
          <p>
            A seamless celebration empowers trusted family members without burdening them with high-stress operational crises. Clearly distinguish between supportive ceremonial duties and contracted professional management:
          </p>

          <div className="p-5 rounded-xl border border-border/80 bg-card my-6">
            <h3 className="font-serif font-bold text-lg text-foreground mb-3">Family Role Mapping vs. Professional Coordination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-muted/30">
                <strong className="text-primary block mb-1">Meaningful Family Responsibilities:</strong>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Greeting arriving guests at the traditional welcome desk</li>
                  <li>Coordinating sacred ceremonial ritual items (puja samagri)</li>
                  <li>Introducing relatives during the Milni or formal reception line</li>
                  <li>Delivering heartfelt family toasts and blessings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <strong className="text-foreground block mb-1">Contracted Professional Responsibilities:</strong>
                <ul className="text-xs sm:text-sm text-foreground/80 space-y-1 list-disc list-inside font-medium">
                  <li>Troubleshooting delayed sound equipment or blown fuses</li>
                  <li>Authorizing catering plate count extensions with banquet managers</li>
                  <li>Supervising decorator teardown and security deposit returns</li>
                  <li>Coordinating emergency medical needs or late-night shuttles</li>
                </ul>
              </div>
            </div>
          </div>

          <p>
            Never assign stressful logistics—such as vendor payments or stage setup supervision—to close family members during sacred functions when they should be fully present and participating in rituals.
          </p>
        </section>

        {/* Section 19: Hiring the Right Destination Wedding Vendors */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">19</span>
            <span>Hiring the Right Destination Wedding Vendors</span>
          </h2>
          <p>
            When assembling your vendor creative team, demand written specifications across every creative discipline:
          </p>

          <div className="space-y-3 my-6 text-sm">
            <div className="p-4 rounded-xl border border-border/70 bg-card">
              <strong className="text-foreground font-serif text-base block mb-0.5">Photography &amp; Videography:</strong>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Confirm exact coverage hours across Haldi, Mehendi, Sangeet, and Reception. Specify second shooter numbers, drone permits where legally permissible, raw footage delivery terms, and editing timelines.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-card">
              <strong className="text-foreground font-serif text-base block mb-0.5">Catering &amp; Culinary Execution:</strong>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Ensure caterers can execute authentic regional cuisines (Jain, vegetarian, gluten-free, or multi-regional) with strict food safety standards and transparent per-plate pricing.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-card">
              <strong className="text-foreground font-serif text-base block mb-0.5">Floral Design, Décor &amp; AV Production:</strong>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Require written engineering and safety sign-offs for mandap structures, open flames, outdoor sound decibel limits, and electrical load capacity.
              </p>
            </div>
          </div>
        </section>

        {/* Section 20: Wedding Funding and Expense Control */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">20</span>
            <span>Wedding Funding and Expense Control</span>
          </h2>
          <p>
            A disciplined financial strategy ensures you begin married life on solid footing rather than under a cloud of debt:
          </p>
          <ul className="space-y-2 text-sm sm:text-base list-disc list-inside text-muted-foreground">
            <li><strong>Rely Only on Confirmed Capital:</strong> Build your budget solely around liquid savings and confirmed family contributions—never around speculative wedding gift estimates.</li>
            <li><strong>Maintain Live Expense Tracking:</strong> Record contract values, paid advances, outstanding balance milestones, and foreign currency exchange fluctuations in a single live sheet.</li>
            <li><strong>Protect Your 15% Reserve:</strong> Preserve your contingency reserve strictly for unforeseen operational needs (e.g., weather shelter, overtime, generator fuel) rather than discretionary decorative upgrades.</li>
          </ul>

          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Financial Prudence:</strong> While some couples consider commercial wedding loans, borrowing creates long-term repayment obligations and substantial interest expenses. We advise tailoring celebration scope to confirmed financial means.
          </div>
        </section>

        {/* Section 21: Final Weeks, Packing Essentials and Wedding-Day Coordination */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">21</span>
            <span>Final Weeks, Packing Essentials and Wedding-Day Coordination</span>
          </h2>
          <p>
            The final days on-site should focus entirely on celebration and emotional connection. Ensure the operating team conducts a thorough venue walkthrough, confirming freight loading bays, service elevators, emergency exits, and designated ceremonial ritual spots.
          </p>
          <p>
            Pack irreplaceable items—such as custom bridal jewelry, sacred wedding attire, passports, prescription medicines, and vendor contracts—in your carry-on luggage. On the wedding day itself, appoint a professional coordinator or dedicated logistics lead to manage the master timeline, direct guests, and resolve vendor questions, allowing you to immerse yourselves completely in the joy of your celebration.
          </p>
        </section>

        {/* Section 22: After the Wedding: Follow-Up and Keepsakes */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">22</span>
            <span>After the Wedding: Follow-Up and Keepsakes</span>
          </h2>
          <p>
            A thoughtful post-wedding closeout protects your finances, preserves cherished keepsakes, and expresses heartfelt gratitude:
          </p>
          <ul className="space-y-2 text-sm sm:text-base list-disc list-inside text-muted-foreground">
            <li><strong>Invoice Reconciliation:</strong> Review final hotel master bills, settle incidental damage deposits, verify overtime hours, and obtain written payment receipts.</li>
            <li><strong>Heartfelt Gratitude:</strong> Send personalized thank-you notes to guests who traveled across cities and continents to be by your side, acknowledging their presence and generous gifts.</li>
            <li><strong>Keepsake Archiving:</strong> Download high-resolution photo galleries and cinematography reels to redundant cloud drives and physical storage, respecting guest privacy when sharing imagery online.</li>
            <li><strong>Legal Formalities:</strong> If you held a symbolic celebration abroad, complete official marriage registration in your home jurisdiction within statutory time limits.</li>
          </ul>
        </section>

        {/* Section 23: Frequently Asked Questions About Destination Weddings */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">23</span>
            <span>Frequently Asked Questions About Destination Weddings</span>
          </h2>
          <p>
            Clear, authoritative answers to common destination wedding planning questions:
          </p>

          <div className="space-y-3 my-6">
            {destinationWeddingPlanningFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-foreground">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 24: Conclusion: Create a Celebration Worth Remembering */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">24</span>
            <span>Conclusion: Create a Celebration Worth Remembering</span>
          </h2>
          <p>
            Breathtaking landscape photographs and viral social media videos are wonderful byproducts of a destination celebration, but true wedding success is measured by human connection, cultural resonance, and calm execution. A well-chosen destination honors both the couple’s aesthetic vision and the comfort of the people traveling to join them.
          </p>
          <p>
            Masterful destination wedding planning seamlessly unifies venue selection, transparent budgeting, legal diligence, travel hospitality, vendor synergy, ceremony scheduling, and contingency backups into a harmonious, stress-free celebration. When a structured plan shoulders the operational weight, couples and their families are free to savor every sacred ritual, heartfelt laughter, and unforgettable sunset.
          </p>
          <p>
            Begin your planning journey with a clear, concise brief: target destination region, approximate dates, estimated guest count, planned functions, overall financial ceiling, and must-have cultural traditions. Use that brief to evaluate venues and explore expert coordination support.
          </p>
        </section>

        {/* Lead-Conversion CTA */}
        <section className="p-8 sm:p-10 rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-card via-card to-amber-400/5 shadow-2xl relative overflow-hidden my-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-500 mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Destination Wedding Consultation
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight mb-4">
              Planning a Destination Wedding?
            </h2>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-8">
              Share your preferred destination, approximate dates, guest count, planned functions and budget range with AS Event Management. Our team can help you understand the planning scope and available options for your celebration.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={openModal}
                type="button"
                className="px-6 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:bg-amber-300 transition-all flex items-center gap-2"
              >
                <span>Plan Your Destination Wedding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-sm"
              >
                Contact AS Event Management
              </Link>
            </div>
          </div>
        </section>

        {/* Contextual Related Guides Footer */}
        <div className="pt-8 border-t border-border/60">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Related Wedding Planning Guides &amp; Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <Link
              href="/services/destination-weddings"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>Explore Destination Wedding Services</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/services/wedding-planning"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>Full-Service Wedding Planning</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/blog/how-to-plan-a-successful-wedding"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>How to Plan a Successful Wedding</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/blog/complete-event-planning-checklist"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>Complete Event Planning Checklist</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
