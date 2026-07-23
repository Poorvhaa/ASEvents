'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Users,
  Star,
  Building2,
  Car,
  Bed,
  Check,
  ArrowLeft,
  Map,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VenueInquiryForm } from '@/components/venues/venue-inquiry-form'
import type { Venue } from '@/lib/types/venues'
import { useTranslation } from '@/src/hooks/useTranslation'
import { venues } from '@/lib/data/venues'
import { VenueCard } from '@/components/cards/venue-card'

interface VenueDetailContentProps {
  venue: Venue
}

export function VenueDetailContent({ venue }: VenueDetailContentProps) {
  const { t, language } = useTranslation()

  const indoorOutdoorKey =
    venue.indoorOutdoor === 'Indoor'
      ? 'indoor'
      : venue.indoorOutdoor === 'Outdoor'
      ? 'outdoor'
      : 'indoorOutdoor'

  const relatedVenues = [...venues]
    .filter((v) => v.id !== venue.id)
    .sort((a, b) => {
      if (a.category === venue.category && b.category !== venue.category) return -1
      if (b.category === venue.category && a.category !== venue.category) return 1
      if (a.city === venue.city && b.city !== venue.city) return -1
      if (b.city === venue.city && a.city !== venue.city) return 1
      return b.rating - a.rating
    })
    .slice(0, 3)

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-24 overflow-hidden">
        <div className="relative h-[60vh] min-h-[480px] md:h-[70vh] md:min-h-[580px]">
          <Image
            src={venue.image}
            alt={t(`venues.${venue.slug}.name`) || venue.name}
            fill
            priority
            className="object-cover"
          />
          {/* Multi-layered premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/35" />
          
          {/* Content container */}
          <div className="absolute bottom-0 left-0 right-0 py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <Link
                href="/venues"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-all mb-4 group font-medium"
                aria-label={t('venuesPage.detail.back')}
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span>{t('venuesPage.detail.back')}</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl p-6 sm:p-8 rounded-2xl bg-slate-950/35 backdrop-blur-[6px] border border-white/10 shadow-2xl relative"
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                    {t(`venuesPage.categories.${venue.category}`) || venue.category}
                  </span>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/25 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold shadow-md shadow-amber-400/5">
                    <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                    <span>{venue.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                  {t(`venues.${venue.slug}.name`) || venue.name}
                </h1>
                
                <div className="flex items-center gap-2 mt-4 text-slate-200 text-xs sm:text-sm md:text-base font-medium">
                  <MapPin size={16} className="text-amber-400 shrink-0" />
                  <span>{t(`venues.${venue.slug}.location`) || venue.location}, {t(`cities.${venue.city}`) || venue.city}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-12 sm:space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-primary/30"
              >
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">{t('venuesPage.detail.about')}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-light">{t(`venues.${venue.slug}.description`) || venue.description}</p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">{t('venuesPage.detail.facilities')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {venue.amenities.map((amenity, index) => {
                    const amenityKey = `venues.${venue.slug}.amenities.${index}`
                    const translatedAmenity = t(amenityKey)
                    return (
                      <div
                        key={amenity}
                        className="group flex items-center gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="p-2 rounded-lg bg-blue-50 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shrink-0">
                          <Check size={16} />
                        </div>
                        <span className="text-slate-700 font-medium text-sm sm:text-base">
                          {translatedAmenity === amenityKey ? amenity : translatedAmenity}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Photo Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">{t('venuesPage.detail.gallery')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.gallery.map((img, i) => (
                    <div 
                      key={i} 
                      className={`relative overflow-hidden rounded-xl border border-slate-200 shadow-sm aspect-square ${
                        i === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[420px]' : ''
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${t(`venues.${venue.slug}.name`) || venue.name} gallery ${i + 1}`}
                        fill
                        sizes={i === 0 ? '(max-width: 768px) 100vw, 800px' : '(max-width: 768px) 100vw, 400px'}
                        className="object-cover hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Google Maps Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">{t('venuesPage.detail.location')}</h2>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                  <div className="text-center p-6 sm:p-8">
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
                      <Map size={32} />
                    </div>
                    <p className="text-slate-800 font-semibold text-sm sm:text-base">{t(`venues.${venue.slug}.location`) || venue.location}, {t(`cities.${venue.city}`) || venue.city}</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">{t('venuesPage.detail.mapSoon')}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="sticky top-28 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-100/50 overflow-hidden"
              >
                {/* Top luxury line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('venuesPage.detail.startingFrom')}</p>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1.5 mb-6">{venue.startingPrice}</p>

                <div className="space-y-4.5 mb-6">
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/70">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <Users size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium">{t('venuesPage.detail.capacity')}</p>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                        {venue.capacity.replace(' Guests', ' ' + t('portfolioPage.grid.guestsLabel'))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/70">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <Building2 size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium">{t('venuesPage.detail.type')}</p>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                        {t(`venuesPage.labels.${indoorOutdoorKey}`) || venue.indoorOutdoor}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/70">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <Car size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium">{t('venuesPage.detail.parking')}</p>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                        {t(`venues.${venue.slug}.parking`) || venue.parking}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/70">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <Bed size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium">{t('venuesPage.detail.rooms')}</p>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                        {t(`venues.${venue.slug}.rooms`) || venue.rooms}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="my-5 border-t border-slate-100" />

                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 mb-4">{t('venuesPage.detail.inquiry')}</h3>
                <VenueInquiryForm venue={venue} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Venues */}
      <section className="py-16 sm:py-24 border-t border-slate-200 bg-slate-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground">
              {t('venuesPage.detail.relatedTitle')}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              {t('venuesPage.detail.relatedSub')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedVenues.map((v, index) => (
              <VenueCard key={v.id} venue={v} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
