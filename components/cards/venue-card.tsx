'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Star, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Venue } from '@/lib/types/venues'
import { useTranslation } from '@/src/hooks/useTranslation'

interface VenueCardProps {
  venue: Venue
  index?: number
}

export function VenueCard({ venue, index = 0 }: VenueCardProps) {
  const { t } = useTranslation()

  const indoorOutdoorKey =
    venue.indoorOutdoor === 'Indoor'
      ? 'indoor'
      : venue.indoorOutdoor === 'Outdoor'
      ? 'outdoor'
      : 'indoorOutdoor'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-blue-400"
    >
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <Image
          src={venue.image}
          alt={t(`venues.${venue.slug}.name`) || venue.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 max-w-[70%]">
          <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-foreground line-clamp-1">
            {t(`venuesPage.categories.${venue.category}`) || venue.category}
          </span>
        </div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <Star size={14} className="text-primary fill-primary shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-foreground">{venue.rating}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-6 min-w-0">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {t(`venues.${venue.slug}.name`) || venue.name}
        </h3>

        <div className="flex items-start gap-1.5 mt-2 text-muted-foreground min-w-0">
          <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
          <span className="text-small line-clamp-2">{t(`venues.${venue.slug}.location`) || venue.location}</span>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-primary shrink-0" />
            <span className="text-small">
              {venue.capacity.replace(' Guests', ' ' + t('portfolioPage.grid.guestsLabel'))}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 size={14} className="text-primary shrink-0" />
            <span className="text-small">
              {t(`venuesPage.labels.${indoorOutdoorKey}`) || venue.indoorOutdoor}
            </span>
          </div>
        </div>

        <p className="text-base sm:text-lg font-bold text-foreground mt-3 sm:mt-4">{venue.startingPrice}</p>

        <div className="mt-4 sm:mt-5">
          <Button
            asChild
            className="min-h-11 w-full bg-primary text-primary-foreground hover:bg-blue-700 text-sm font-semibold"
          >
            <Link href={`/venues/${venue.slug}`}>{t('featuredVenues.details')}</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
