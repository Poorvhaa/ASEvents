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
  Hotel,
  Sun,
  Umbrella,
} from 'lucide-react'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getBlogPostBySlug, destinationWeddingIndiaFaqs } from '@/lib/data/blog'
import { ArticleHeader } from '@/components/blog/article-header'

const article = getBlogPostBySlug('how-to-plan-a-destination-wedding-in-india')
const linkClass = 'text-primary underline hover:text-primary/80 font-medium transition-colors'

export function DestinationWeddingIndiaContent() {
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
        badgeLabel="India Step-by-Step Guide"
        shareTitle="How to Plan a Destination Wedding in India: A Step-by-Step Guide"
      />

      {/* Featured Hero Banner */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-muted">
          <Image
            src={article.image}
            alt="Destination wedding in India featuring scenic palaces, beachside celebrations and mandap rituals"
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
            To successfully <strong>plan a destination wedding in India</strong>, couples must align their vision, establish an all-inclusive budget with a dedicated contingency reserve, shortlist location regions that match guest travel accessibility, inspect destination wedding venues for true multi-event capacity, partner with experienced local vendors, and design a balanced multi-day cultural itinerary with realistic buffer times.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Unlike a local celebration, an <strong>Indian destination wedding</strong> serves as both an extraordinary family reunion and a temporary retreat. Success hinges on clear guest hospitality communication, structured room-night management, weather backup protocols, and on-site coordination. For broader international principles, consult our <Link href="/blog/destination-wedding-planning-complete-guide" className={linkClass}>complete destination wedding planning guide</Link>.
          </p>
        </div>

        {/* Section 1: Introduction */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">1</span>
            <span>Introduction</span>
          </h2>
          <p>
            Dreaming of a regal palace ceremony in Rajasthan, a sunset celebration beside the Arabian Sea in Goa, a tranquil gathering along the emerald backwaters of Kerala, or a mountain-view exchange of vows in the Himalayas? A <strong>destination wedding in India</strong> brings your closest family and friends together for a magical, immersive experience that standard single-day banquet weddings rarely match.
          </p>
          <p>
            However, orchestrating a celebration away from home also means coordinating guest accommodations, long-distance flights and train arrivals, local logistics, multi-day ritual setups, and diverse suppliers across different cities. Without a structured roadmap, what should be a joyful celebration can quickly turn into operational overwhelm.
          </p>
          <p>
            This <strong>India destination wedding guide</strong> walks you through every essential decision in practical order—from defining your wedding vision and tracking realistic room-night calculations to comparing regional seasons, vetting destination wedding venues in India, coordinating trusted suppliers, and assembling an airtight wedding-day run sheet. Every celebration is unique: adapt these steps to your community customs, guest scale, budget ceiling, and family traditions rather than treating any single example as a rigid formula.
          </p>
        </section>

        {/* Section 2: Define Your Wedding Vision and Establish a Realistic Budget */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">2</span>
            <span>Define Your Wedding Vision and Establish a Realistic Budget</span>
          </h2>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Choose Your Wedding Vision
          </h3>
          <p>
            A spectacular destination wedding begins with a shared picture of the celebration you want, not a random list of attractive hotels found on social media. Sit down together with key family decision-makers to discuss the overall atmosphere, hospitality experience, and cultural rituals that matter most:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/85">
            <li><strong>Atmosphere:</strong> Do you envision a royal, heritage-steeped welcome in a historic courtyard, a barefoot seaside sunset ceremony, an intimate colonial tea estate retreat, or a vibrant luxury resort festival?</li>
            <li><strong>Guest Scale &amp; Origins:</strong> Will you host an intimate gathering of 50 to 80 close relatives, or a lavish 250-guest celebration? Are guests traveling primarily from within India or flying in internationally across multiple time zones?</li>
            <li><strong>Ceremony Scope:</strong> Which functions do you genuinely wish to host (Haldi, Mehendi, Sangeet, sacred Wedding Ceremony, Reception, Farewell Brunch)? Who should be present at each event?</li>
          </ul>
          <p>
            Establishing this core vision early creates an essential filter against expensive scope creep and decorative upgrades that do not align with your true priorities.
          </p>

          {/* 4-Step Strategic Roadmap */}
          <div className="my-8">
            <h4 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-xs sm:text-sm text-primary">
              Core Decision Framework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-border/70 bg-card shadow-sm hover:border-primary/50 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-base mb-3">
                  01
                </div>
                <h5 className="font-bold text-foreground text-base mb-1.5">Vision</h5>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Clarify the ambiance, guest scale, cultural values, and memorable touchpoints that matter to both families.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/70 bg-card shadow-sm hover:border-primary/50 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-base mb-3">
                  02
                </div>
                <h5 className="font-bold text-foreground text-base mb-1.5">Budget Cap</h5>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Establish a confirmed total financial ceiling with all contributors before reaching out to luxury properties.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/70 bg-card shadow-sm hover:border-primary/50 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-base mb-3">
                  03
                </div>
                <h5 className="font-bold text-foreground text-base mb-1.5">Priorities</h5>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Identify three non-negotiables (e.g. food quality, senior guest accessibility, late-night music curfew).
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/70 bg-card shadow-sm hover:border-primary/50 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-base mb-3">
                  04
                </div>
                <h5 className="font-bold text-foreground text-base mb-1.5">Responsibilities</h5>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Appoint dedicated leads for contract approvals, guest communications, and day-of vendor sign-offs.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Plan the Complete Destination Wedding Budget
          </h3>
          <p>
            Before requesting hotel proposals, agree on an overall spending limit with everyone contributing financially. A complete <strong>destination wedding budget India</strong> framework must account for far more than banquet food and decorative florals. It must encompass:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/85">
            <li><strong>Accommodation &amp; Rooms:</strong> Room blocks, suites for immediate families, early check-in or late checkout fees.</li>
            <li><strong>Food &amp; Beverage:</strong> Multi-meal daily catering (breakfasts, high teas, cocktail dinners, ritual lunches), mineral water, service surcharges, and alcohol corkage fees.</li>
            <li><strong>Venue Rentals &amp; Space Use:</strong> Lawn hire, ballroom access, setup/strike access fees, and exclusive resort buyout charges.</li>
            <li><strong>Décor, Florals &amp; Lighting:</strong> Mandap architecture, stage builds, atmospheric lighting, sound rigs, and generator fuel.</li>
            <li><strong>Photography &amp; Cinematography:</strong> Multi-day coverage, drone permits, same-day edit films, and crew accommodations.</li>
            <li><strong>Bridal &amp; Groom Styling:</strong> Outfits, ceremonial jewelry, HMUA (hair and makeup artistry) for the couple and immediate relatives.</li>
            <li><strong>Logistics &amp; Guest Hospitality:</strong> Airport and railway transfers, luggage handling, welcome hampers, and internal shuttles.</li>
            <li><strong>Vendor Out-of-Station Expenses:</strong> Travel tickets, hotel rooms, and daily meals for non-local artists, photographers, and planners.</li>
            <li><strong>Statutory Taxes &amp; Royalties:</strong> GST (Goods and Services Tax at 18%), entertainment licenses (IPRS/PPL for commercial music), and local council permissions.</li>
            <li><strong>Professional Planning Fees:</strong> Dedicated management and coordination retainers.</li>
          </ul>

          {/* Illustrative Math Box */}
          <div className="p-6 rounded-xl border border-amber-400/30 bg-amber-400/5 my-6">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-2">
              <Coins className="w-4 h-4" />
              <span>Hypothetical Room-Night Planning Calculation</span>
            </div>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-3">
              For a destination wedding, guest accommodation is directly tied to the overall event scale. As a purely <strong>hypothetical teaching model</strong> to illustrate planning math:
            </p>
            <div className="bg-background/80 p-4 rounded-lg border border-border/60 text-xs sm:text-sm font-mono space-y-1 mb-3">
              <p>• Expected Guest Count: 120 guests</p>
              <p>• Room Sharing Ratio: 2 adults per standard room = 60 rooms</p>
              <p>• Duration of Stay: 2 nights</p>
              <p>• Base Room Calculation: 60 rooms × 2 nights = <strong>120 room-nights</strong></p>
              <p>• Single Occupancy / Special Family Suites: +10 to 15 additional room-nights</p>
              <p>• Vendor / Core Coordination Rooms: +6 to 10 room-nights</p>
              <p>• Total Estimated Commitment: <strong>~136 to 145 room-nights</strong></p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              <strong>Mandatory Disclosure:</strong> This is an illustrative estimation exercise, not a fixed commercial quote or guaranteed price. Actual costs vary significantly depending on city tier, property classification, peak versus off-peak calendar dates, and negotiated inclusions. Compare hotel packages on identical baseline assumptions so a lower room tariff does not mask inflated food or lawn rental charges.
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Track Quotations and Contingency
          </h3>
          <p>
            Maintain a central financial tracker recording three distinct figures for every line item: the planned budget, the written quoted proposal, and the legally committed amount. Always inquire about minimum room-night guarantees, food package inclusions, overtime surcharges, and cancellation policies.
          </p>
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary mt-1 shrink-0" />
            <div className="text-sm sm:text-base">
              <strong>Contingency Reserve Guideline:</strong> Maintaining a <strong>10% to 15% contingency reserve</strong> is a recommended starting guideline for budget discussions. This protects your celebration against currency fluctuations, sudden weather-proofing costs, extra guest room extensions, or unexpected technical generator requirements. The exact reserve percentage should reflect your actual exposure to weather, logistics, and out-of-town vendor dependencies.
            </div>
          </div>
        </section>

        {/* Section 3: Compare India’s Destination Wedding Locations and Seasons */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">3</span>
            <span>Compare India’s Destination Wedding Locations and Seasons</span>
          </h2>
          <p>
            India presents an extraordinary diversity of celebratory landscapes, each offering distinct architectural charm and unique logistical parameters. Choosing the ideal destination requires balancing scenic aspiration with practical guest accessibility and climate patterns.
          </p>

          {/* Regional Visual Collage */}
          <div className="relative aspect-[1200/400] w-full rounded-xl overflow-hidden shadow-md border border-border/70 my-6 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-destination-wedding-in-india/india-destination-wedding-locations.jpg"
              alt="Popular destination wedding locations in India including Rajasthan palaces, Goa beaches, Kerala backwaters and Himalayan hill stations"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Regional Deep Dives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-primary font-bold text-lg">
                <Building2 className="w-5 h-5" />
                <h4>Rajasthan (Udaipur, Jaipur, Jodhpur)</h4>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                World-renowned for majestic forts, restored heritage palaces, and regal courtyards. A <strong>Rajasthan destination wedding</strong> delivers timeless grandeur, royal welcome processions with traditional folk dancers, and breathtaking lakeside backdrops.
              </p>
              <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                <strong>Logistical Note:</strong> Historic palace structures often enforce strict architectural preservation rules, prohibiting heavy truss anchorings, open flame fireworks, or late-night high-decibel music in heritage open-air courtyards.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-primary font-bold text-lg">
                <Sun className="w-5 h-5" />
                <h4>Goa (North &amp; South Goa)</h4>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Celebrated for coastal sea breezes, lush beachside resort lawns, and vibrant bohemian flair. A <strong>Goa destination wedding</strong> provides relaxed elegance, barefoot mehendi parties, and romantic sunset vows right by the ocean.
              </p>
              <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                <strong>Logistical Note:</strong> High coastal humidity, seaside winds, and CRZ (Coastal Regulation Zone) environmental laws require specialized decor anchors, salt-resistant electronics, and mandatory indoor sound migrations by 10:00 PM.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-primary font-bold text-lg">
                <PalmtreeIcon className="w-5 h-5" />
                <h4>Kerala (Kovalam, Kumarakom, Kochi)</h4>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Known for tranquil palm-fringed backwaters, luxury houseboats, and ayurvedic beach resorts. A <strong>Kerala destination wedding</strong> excels at serene, intimate celebrations, authentic temple-style mandaps, and world-class traditional culinary feasts.
              </p>
              <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                <strong>Logistical Note:</strong> Monsoon timing (June through September) brings intense rainfall. Boat-to-resort transfers require rigorous safety protocols, life vests, and accessible luggage management.
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-primary font-bold text-lg">
                <Compass className="w-5 h-5" />
                <h4>Himalayan Hills (Shimla, Mussoorie, Manali)</h4>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Ideal for couples desiring crisp pine-scented air, misty mountain vistas, and boutique estate privacy. Delivers dramatic panoramic photography and romantic fireside evening celebrations.
              </p>
              <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                <strong>Logistical Note:</strong> Mountain roads can be narrow with lengthy travel times from regional airports. Wintry night drops demand outdoor patio heaters, fleece blankets for guests, and sheltered mandap staging.
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight pt-4">
            Destination Comparison Matrix
          </h3>
          <p className="text-sm sm:text-base text-foreground/85">
            Evaluate how India’s primary destination regions compare across crucial operational parameters:
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-border/80 shadow-md my-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-muted/70 text-foreground border-b border-border/80">
                  <th className="p-3 sm:p-4 font-bold">Region &amp; Style</th>
                  <th className="p-3 sm:p-4 font-bold">Ambiance &amp; Setting</th>
                  <th className="p-3 sm:p-4 font-bold">Transit &amp; Airport Access</th>
                  <th className="p-3 sm:p-4 font-bold">Guest Scale &amp; Stay</th>
                  <th className="p-3 sm:p-4 font-bold">Optimal Season &amp; Weather</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-card">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">
                    Rajasthan<br />
                    <span className="text-xs text-muted-foreground font-normal">Udaipur, Jaipur, Jodhpur</span>
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Grand royal palaces, historic havelis, illuminated courtyards, opulent ballrooms.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Direct flights to Jaipur/Udaipur/Jodhpur from major metros; 30–60 min hotel transfers.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    150–400+ guests; ample luxury inventory across 5-star heritage properties.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-xs mb-1">Oct to March</span><br />
                    Pleasant sunny days, cool winter nights; avoid extreme summer heat.
                  </td>
                </tr>

                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">
                    Goa<br />
                    <span className="text-xs text-muted-foreground font-normal">South &amp; North Coast</span>
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Oceanfront palm lawns, private golden sands, contemporary luxury resort pavilions.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Dabolim &amp; Mopa international airports; 45–75 min scenic resort highway drives.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    80–250 guests; private resort buyouts create cohesive community festivals.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-xs mb-1">Nov to Feb</span><br />
                    Dry weather, ocean breeze; avoid monsoon rainfall (June–Sept).
                  </td>
                </tr>

                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">
                    Kerala<br />
                    <span className="text-xs text-muted-foreground font-normal">Kovalam, Kumarakom</span>
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Calm backwaters, coconut lagoons, heritage wooden architecture, verdant lawns.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Cochin or Trivandrum airports; connected via highway and resort ferry speedboats.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    50–180 guests; intimate boutique retreats with authentic wellness hospitality.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-xs mb-1">Sept to March</span><br />
                    Lush post-monsoon greens, gentle warmth; monsoon requires covered spaces.
                  </td>
                </tr>

                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">
                    Hill Stations<br />
                    <span className="text-xs text-muted-foreground font-normal">Shimla, Mussoorie</span>
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Crisp Himalayan air, pine forests, colonial estates, terraced panoramic decks.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    Chandigarh/Dehradun airports + 3–4 hr winding mountain coach transfer.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    40–120 guests; intimate gathering scale with high exclusivity.
                  </td>
                  <td className="p-3 sm:p-4 text-foreground/80">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-xs mb-1">March to June &amp; Oct–Nov</span><br />
                    Cool summer respite or golden autumn; winter snow can hinder road transit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Select and Inspect the Right Destination Wedding Venue */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">4</span>
            <span>Select and Inspect the Right Destination Wedding Venue</span>
          </h2>
          <p>
            A destination wedding property is not just a stage for photographic moments; it serves as a multi-day home for your closest relatives. Selecting <strong>destination wedding venues in India</strong> requires assessing spatial functionality, service bandwidth, and backup infrastructure alongside visual charm.
          </p>

          <div className="relative aspect-[1080/245] w-full rounded-xl overflow-hidden shadow-md border border-border/70 my-6 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-destination-wedding-in-india/destination-wedding-venue-inspection.jpg"
              alt="Destination wedding venue inspection in India verifying function spaces and logistics"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Confirm Guest and Room Capacity
          </h3>
          <p>
            Verify whether the resort can house all invited guests under one roof. Splitting guests across multiple secondary hotels introduces complex transport schedules, communication delays, and fragmented family interactions. Ensure the property has separate, dedicated spaces for distinct functions (e.g. an intimate courtyard for Mehendi, a high-capacity ballroom for the late-night Sangeet, and an unobstructed lawn for the sunset Mandap) so teams can setup without interfering with active guest areas.
          </p>

          {/* Interactive Venue Checklist Grid */}
          <div className="my-8">
            <h4 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-xs sm:text-sm text-primary">
              Essential Venue Verification Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border/80 bg-card">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Real Capacity</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verify true seated capacity for traditional dining and theater mandap layouts rather than relying on standard floating reception numbers.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-card">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-2">
                  <Hotel className="w-4 h-4 text-primary" />
                  <span>Room Inventory</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Audit room categories (deluxe vs. suites), twin-bed availability, accessibility elevator access for elders, and connected family rooms.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-card">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-2">
                  <Umbrella className="w-4 h-4 text-primary" />
                  <span>Weather Plan B</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Inspect an approved, air-conditioned indoor banquet space capable of holding your full guest count if wind, heat, or rain strikes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-card">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Power Backup</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Confirm dedicated silent generator load capacity (KVA) for heavy sound rigs, LED walls, and outdoor architectural floodlights.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-card">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Exclusivity Terms</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Demand clear contract stipulations confirming whether another wedding party or corporate conference will share facilities simultaneously.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-card">
                <div className="flex items-center gap-2 font-bold text-foreground text-sm mb-2">
                  <Music className="w-4 h-4 text-primary" />
                  <span>Sound Curfews</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Clarify local municipal outdoor decibel restrictions (typically 10:00 PM) and check whether the property features a sound-proof after-party hall.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Review Contracts and Operational Rules
          </h3>
          <p>
            Insist on itemized written agreements covering room tariffs, extra bed charges, meal inclusion packages, food tasting policies, corkage fees, vendor meal pricing, security deposits, and cancellation milestones. Ensure external decorator access policies, fire safety rules for havan kund rituals, and baarat procession routes are formally cleared before signing.
          </p>
        </section>

        {/* Section 5: Choose a Destination Wedding Planner and Trusted Vendors */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">5</span>
            <span>Choose a Destination Wedding Planner and Trusted Vendors</span>
          </h2>
          <p>
            Executing an out-of-town wedding involves coordinating dozens of specialized professionals who rarely operate from the same office or city. Partnering with a skilled <strong>destination wedding planner in India</strong> bridges local geographic realities with your family’s creative expectations.
          </p>

          <div className="relative aspect-[1000/205] w-full rounded-xl overflow-hidden shadow-md border border-border/70 my-6 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-destination-wedding-in-india/destination-wedding-planner-consultation.jpg"
              alt="Destination wedding planner consultation reviewing floor plans and vendor contracts in India"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Define the Planner’s Role
          </h3>
          <p>
            When interviewing <strong>destination wedding planner India</strong> candidates, clarify the exact boundaries of their engagement:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/85">
            <li><strong>Sourcing &amp; Negotiation:</strong> Do they secure direct hotel agreements, vet production safety, and eliminate hidden commissions?</li>
            <li><strong>Design &amp; Creative Direction:</strong> Will they generate 3D renders, oversee custom stage builds, and manage floral sourcing?</li>
            <li><strong>Hospitality Desk &amp; Travel Logistics:</strong> Do they assign dedicated staff to greet guests at arrivals, manage check-in keys, and arrange return flight shuttles?</li>
            <li><strong>On-Site Floor Management:</strong> How many seasoned team leads will remain on-site throughout every ritual, sound check, and dinner transition?</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Choose Experienced Wedding Suppliers
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border/70 bg-card">
              <strong className="text-foreground flex items-center gap-2 mb-1">
                <Utensils className="w-4 h-4 text-primary" />
                Catering &amp; Culinary Experience:
              </strong>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Confirm whether the venue allows outside specialist chefs or mandates in-house culinary teams. Verify regional menu depth, authentic Jain preparations, live cooking station capacity, late-night snack service, and strict food hygiene standards.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card">
              <strong className="text-foreground flex items-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-primary" />
                Photography &amp; Cinematography:
              </strong>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Confirm team size, lighting crew, camera backup equipment, drone flight authorizations, editing delivery schedules, and out-of-station lodging allocations.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border/70 bg-card">
              <strong className="text-foreground flex items-center gap-2 mb-1">
                <Palette className="w-4 h-4 text-primary" />
                Décor &amp; Production Crew:
              </strong>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Review material samples, wind-resistant structural engineering for seaside or hill setups, floral preservation in high heat, and turn-around times between back-to-back functions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Make Guest Travel, Accommodation and Hospitality Easy */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">6</span>
            <span>Make Guest Travel, Accommodation and Hospitality Easy</span>
          </h2>
          <p>
            At a destination celebration, guest hospitality begins weeks before attendees land at the airport. Thoughtful hospitality planning transforms a potentially confusing travel day into a seamless, welcoming family retreat.
          </p>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Send Save-the-Dates and Guest Information
          </h3>
          <p>
            Distribute formal save-the-dates <strong>6 to 10 months in advance</strong> (or up to 12 months for destinations requiring international flights or peak-season holiday bookings). Follow up with a comprehensive digital wedding travel guide outlining:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/85">
            <li>Recommended arrival and departure airports (with flight codes and flight windows).</li>
            <li>Onward highway transfer durations and arranged group shuttle times.</li>
            <li>Clear disclosures regarding which costs are hosted by the family (e.g. rooms and meals) and which are arranged at discounted group rates for guest settlement.</li>
            <li>Recommended attire guidance, weather expectations, footwear advice (e.g. grass-friendly heels for lawn pheras), and theme colors.</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Establish a Dedicated Hospitality Desk
          </h3>
          <p>
            Set up an AS Event Management hospitality desk right beside the resort lobby. A dedicated concierge team relieves family members from troubleshooting misplaced luggage, room key cards, dietary preferences, or local sightseeing inquiries. Equip the desk with printed itineraries, emergency medical supplies, mobile charging stations, and local SIM assistance for international guests.
          </p>
        </section>

        {/* Section 7: Design Multi-Day Ceremonies With a Comfortable Itinerary */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">7</span>
            <span>Design Multi-Day Ceremonies With a Comfortable Itinerary</span>
          </h2>
          <p>
            An <strong>Indian destination wedding</strong> typically brings several distinct ceremonies together over two to three days. The secret to a joyful experience is avoiding an overstuffed, exhausting timetable that leaves guests fatigued before the sacred pheras even begin.
          </p>

          <div className="relative aspect-[1000/250] w-full rounded-xl overflow-hidden shadow-md border border-border/70 my-6 bg-muted">
            <Image
              src="/images/blog/how-to-plan-a-destination-wedding-in-india/multi-day-indian-wedding-ceremony.jpg"
              alt="Multi-day Indian destination wedding ceremony with vibrant celebrations and cultural rituals"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Cultural Ritual Nuances
          </h3>
          <p>
            Ceremonial sequences must honor your specific heritage—whether Gujarati, Punjabi, Marwari, South Indian, Bengali, Sindhi, or interfaith contemporary weddings. Speak directly with your family priest or officiant early to determine:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/85">
            <li>Precise auspicious timings (Shubh Muhurat) for the sacred Mandap rituals.</li>
            <li>Vedic setup requirements, havan kund ventilation, and specific ritual ingredients (samagri).</li>
            <li>Baarat procession route feasibility, musical permits, and vintage car or elephant/horse approvals from hotel authorities.</li>
          </ul>

          {/* 3-Function Ceremony Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="rounded-xl overflow-hidden border border-border/70 bg-card shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src="/images/blog/how-to-plan-a-destination-wedding-in-india/haldi-ceremony-setup.jpg"
                  alt="Vibrant Haldi ceremony setup with yellow florals and marigold decor in India"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-foreground text-sm">Vibrant Haldi &amp; Mehendi</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sunlit daytime celebrations featuring floral jewelry, refreshing mocktails, folk songs, and cheerful yellow marigold backdrops.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border/70 bg-card shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src="/images/blog/how-to-plan-a-destination-wedding-in-india/sangeet-celebration-night.jpg"
                  alt="Glamorous Sangeet celebration night with concert stage lighting and dance performances"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-foreground text-sm">Glamorous Sangeet Night</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  High-energy choreography, concert-grade acoustic staging, dynamic LED backdrops, and joyous family dance performances.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border/70 bg-card shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src="/images/blog/how-to-plan-a-destination-wedding-in-india/wedding-mandap-sunset.jpg"
                  alt="Sacred sunset wedding mandap overlooking scenic nature in India"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-foreground text-sm">Sacred Sunset Mandap</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The heart of the celebration: timeless Vedic vows, majestic floral canopy architecture, and heartfelt spiritual union.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Sample Balanced 3-Day Wedding Itinerary
          </h3>
          <p className="text-sm sm:text-base text-foreground/85">
            A proven itinerary framework that protects guest comfort and allows 3-to-4 hour recovery windows between major events:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Day 1 • Arrival, Welcome &amp; Sangeet</span>
              <h4 className="text-base font-bold text-foreground mt-1 mb-2">The Warm Welcome &amp; High-Energy Celebration</h4>
              <ul className="text-xs sm:text-sm text-foreground/80 space-y-1.5 list-disc pl-5">
                <li><strong>12:00 PM – 03:00 PM:</strong> Guest check-in, welcome drinks, hospitality desk registration, and room settling.</li>
                <li><strong>04:00 PM – 05:30 PM:</strong> Sundowner High Tea &amp; Mehndi session by the courtyard gardens.</li>
                <li><strong>05:30 PM – 07:30 PM:</strong> Dedicated rest and styling buffer for evening attire.</li>
                <li><strong>07:30 PM – Midnight:</strong> Sangeet performances, multi-station cocktail banquet, and dance floor celebration.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Day 2 • The Sacred Wedding Day</span>
              <h4 className="text-base font-bold text-foreground mt-1 mb-2">Tradition, Emotion &amp; Sunset Vows</h4>
              <ul className="text-xs sm:text-sm text-foreground/80 space-y-1.5 list-disc pl-5">
                <li><strong>09:30 AM – 11:30 AM:</strong> Vibrant Haldi celebration with phoolon ki holi (flower petal blessings).</li>
                <li><strong>12:00 PM – 01:30 PM:</strong> Traditional regional lunch buffet.</li>
                <li><strong>01:30 PM – 04:30 PM:</strong> Generous 3-hour afternoon rest window; bridal hair, makeup, and family portraits.</li>
                <li><strong>04:30 PM – 05:30 PM:</strong> Grand Baarat procession with live dhol beats and royal groom entry.</li>
                <li><strong>05:30 PM – 07:30 PM:</strong> Sacred sunset Mandap ceremony (Varmala &amp; Pheras).</li>
                <li><strong>08:30 PM – 11:30 PM:</strong> Formal Wedding Banquet, live musical ensemble, and celebratory toasts.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Day 3 • Farewell &amp; Departure</span>
              <h4 className="text-base font-bold text-foreground mt-1 mb-2">Gratitude &amp; Effortless Travel</h4>
              <ul className="text-xs sm:text-sm text-foreground/80 space-y-1.5 list-disc pl-5">
                <li><strong>09:00 AM – 11:30 AM:</strong> Relaxed farewell brunch with candid family photography.</li>
                <li><strong>11:30 AM – 01:00 PM:</strong> Coordinated luggage transfer, hotel checkout, and scheduled airport shuttle departures.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Personalize Décor, Catering, Outfits and Entertainment */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">8</span>
            <span>Personalize Décor, Catering, Outfits and Entertainment</span>
          </h2>
          <p>
            Infusing your personal narrative into a destination setting elevates a standard hotel booking into an unforgettable, bespoke sensory experience.
          </p>

          {/* Two-Column Visual Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-xl overflow-hidden border border-border/70 bg-card shadow-sm">
              <div className="relative aspect-[16/10] w-full bg-muted">
                <Image
                  src="/images/blog/how-to-plan-a-destination-wedding-in-india/wedding-outfits-styling.jpg"
                  alt="Destination wedding outfits and styling for Indian ceremonies"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-foreground text-sm">Ceremonial Outfits &amp; Styling</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Climate-conscious fabric choices (raw silk, organza, breathable chanderi) designed for tropical evenings and effortless mobility.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border/70 bg-card shadow-sm">
              <div className="relative aspect-[16/10] w-full bg-muted">
                <Image
                  src="/images/blog/how-to-plan-a-destination-wedding-in-india/wedding-catering-buffet.jpg"
                  alt="Destination wedding catering buffet with multi-cuisine dining in India"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-foreground text-sm">Curated Gastronomy</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Authentic regional delicacies paired with international gourmet stations, dedicated Jain counters, and artisanal midnight snacks.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Design Décor That Complements the Natural Landscape
          </h3>
          <p>
            Rather than fighting against your venue's inherent character with overwhelming artificial structures, let the local environment lead the design. In a Rajasthan heritage haveli, highlight the ornate jharokhas with gentle amber uplighting, earthen brass diyas, and fragrant tuberose (rajnigandha). In coastal Goa or Kerala, embrace airy pergolas draped in ivory linen, woven cane lanterns, and vibrant tropical monstera foliage.
          </p>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Outfits, Grooming and Climate Preparedness
          </h3>
          <p>
            Heavy velvet sherwanis and multi-layered lehengas that look stunning in an air-conditioned city showroom can prove stifling under the daytime sun of Goa or Rajasthan. Select breathable fabrics like georgette, silk organza, mulmul, and lightweight silks. Provide garment steam iron stations, safe locker storage for ceremonial jewelry, and schedule hair and makeup teams with realistic 45-minute buffers before portrait sessions.
          </p>
        </section>

        {/* Section 9: Build a Wedding Planning Checklist and Final-Day Run Sheet */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">9</span>
            <span>Build a Wedding Planning Checklist and Final-Day Run Sheet</span>
          </h2>
          <p>
            When managing multiple functions away from home, rely on a central master tracker rather than fragmented mobile messaging threads. A synchronized cloud spreadsheet ensures every family coordinator and vendor lead works from the exact same playbook.
          </p>

          {/* Planning Phases Master Tracker */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <CalendarCheck className="w-4 h-4" />
                <span>Early Phase (12–8 Months)</span>
              </div>
              <ul className="text-xs sm:text-sm text-foreground/80 space-y-2 list-disc pl-4">
                <li>Define vision and total financial ceiling.</li>
                <li>Compare destination regions and weather patterns.</li>
                <li>Assemble estimated guest count and room requirements.</li>
                <li>Conduct physical or virtual venue inspections.</li>
                <li>Finalize property contracts and deposit payments.</li>
                <li>Hire professional destination wedding planner.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <ListChecks className="w-4 h-4" />
                <span>Middle Phase (7–3 Months)</span>
              </div>
              <ul className="text-xs sm:text-sm text-foreground/80 space-y-2 list-disc pl-4">
                <li>Send formal save-the-dates and travel guide.</li>
                <li>Book core vendors (photo, cinema, HMUA, sound).</li>
                <li>Approve 3D décor concepts and floral palettes.</li>
                <li>Schedule menu tastings and culinary curations.</li>
                <li>Select ceremonial outfits and tailor fittings.</li>
                <li>Obtain commercial music permissions (PPL/IPRS).</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-card space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Final Phase (2 Mo – Final Week)</span>
              </div>
              <ul className="text-xs sm:text-sm text-foreground/80 space-y-2 list-disc pl-4">
                <li>Lock RSVPs and flight arrival spreadsheets.</li>
                <li>Finalize room allocations and family suites.</li>
                <li>Distribute function run sheets to vendor leads.</li>
                <li>Confirm generator load and indoor Plan B triggers.</li>
                <li>Assemble wedding-day emergency medical kit.</li>
                <li>Conduct on-site acoustic and lighting rehearsals.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Prepare the Wedding-Day Run Sheet
          </h3>
          <p>
            The master run sheet documents exactly who does what, where, and when. It details vendor arrival windows, technical stage checks, makeup chair times, family photo gatherings, priest preparations, and tear-down curfews. Assigning dedicated operational points-of-contact (POCs) for routine supplier queries frees the bride, groom, and parents to remain entirely present in the sacred emotions of the day.
          </p>
        </section>

        {/* Section 10: When Professional Destination Wedding Planning Support Helps */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">10</span>
            <span>When Professional Destination Wedding Planning Support Helps</span>
          </h2>
          <p>
            While couples with smaller, intimate gatherings may coordinate directly with hotel banquet managers, engaging full-service <strong>destination wedding planning services</strong> becomes invaluable when celebrations involve:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/85">
            <li>Multiple out-of-town guest groups requiring coordinated transit from diverse entry points.</li>
            <li>Multi-day cultural rituals spanning separate lawns, ballrooms, and outdoor pavilions.</li>
            <li>Suppliers traveling from different metropolitan hubs (e.g., Delhi photographers, Mumbai sound engineers, and local Rajasthan decorators).</li>
            <li>Unpredictable weather risks requiring rapid, calm operational contingency deployments.</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">
            Questions to Ask Prospective Planners
          </h3>
          <p>
            Before committing to a planning contract, conduct due diligence by asking:
          </p>
          <div className="space-y-3">
            <div className="p-3.5 rounded-lg border border-border/70 bg-card text-xs sm:text-sm">
              <strong>1. On-Site Staffing:</strong> How many full-time coordinators will be physically stationed on-site across each day and night function?
            </div>
            <div className="p-3.5 rounded-lg border border-border/70 bg-card text-xs sm:text-sm">
              <strong>2. Financial Transparency:</strong> Do you pass direct negotiated vendor rates through to us, or do you take commission markups from suppliers?
            </div>
            <div className="p-3.5 rounded-lg border border-border/70 bg-card text-xs sm:text-sm">
              <strong>3. Crisis Experience:</strong> Can you walk us through an actual situation where severe weather or power disruption forced a live Plan B shift?
            </div>
            <div className="p-3.5 rounded-lg border border-border/70 bg-card text-xs sm:text-sm">
              <strong>4. Guest Hospitality:</strong> How do your team members handle flight delays, lost luggage, and sudden room reallocation requests?
            </div>
          </div>
          <p className="pt-2">
            Explore how our team supports couples nationwide by visiting our specialized <Link href="/services/destination-weddings" className={linkClass}>destination wedding planning services</Link> page.
          </p>
        </section>

        {/* Section 11: Frequently Asked Questions */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">11</span>
            <span>Frequently Asked Questions About Destination Weddings in India</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/80">
            Real-world answers to the most common financial, logistical, and timing questions couples ask when planning an Indian destination wedding:
          </p>

          <div className="space-y-4 my-6">
            {destinationWeddingIndiaFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    type="button"
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
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

        {/* Section 12: Conclusion */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-sans font-bold">12</span>
            <span>Conclusion</span>
          </h2>
          <p>
            A masterfully planned destination wedding balances the visual splendor of an extraordinary setting with warm, attentive care for the guests who travel to celebrate with you. By establishing a realistic all-inclusive budget, inspecting venues for functional versatility, selecting experienced vendor partners, and honoring your cultural customs through a spacious itinerary, you create an environment where stress dissolves and genuine memories thrive.
          </p>
          <p>
            The most unforgettable celebration is never defined by extravagant spending alone; it is measured by how seamlessly the days unfold, how deeply the families bond, and how warmly guests feel cherished from the moment they arrive to their final departure.
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
              Planning a Destination Wedding in India?
            </h2>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-8">
              Share your preferred Indian destination, expected guest count, cultural traditions and approximate budget ceiling with AS Event Management. Our seasoned planners will help you navigate venue selection, vendor curations, and flawless on-site coordination.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openModal()}
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
              href="/blog/destination-wedding-planning-complete-guide"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>Destination Wedding Planning: Complete Guide</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/blog/how-much-does-event-planning-cost-in-india"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>How Much Does Event Planning Cost in India?</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <Link
              href="/blog/wedding-planner-vs-diy-wedding-planning"
              className="p-3.5 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-muted/40 transition-all font-semibold text-foreground flex items-center justify-between"
            >
              <span>Wedding Planner vs. DIY Wedding Planning</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function PalmtreeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2a3.5 3.5 0 0 1 7 0Z" />
      <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-2a3.5 3.5 0 0 0-7 0Z" />
      <path d="M5.8 12.2A5.8 5.8 0 0 1 4 10a6 6 0 0 1 11.8-1.5" />
      <path d="M11 15.5a4 4 0 0 1 4-3.5 4 4 0 0 1 4 3.5" />
      <path d="M13 10v11" />
      <path d="M13 21a2 2 0 0 1-2-2v-3" />
    </svg>
  )
}
