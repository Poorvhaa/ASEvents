'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Star, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import type { Venue } from '@/lib/types/venues'

interface VenueCardProps {
  venue: Venue
  index?: number
}

export function VenueCard({ venue, index = 0 }: VenueCardProps) {
  const { openModal } = useQuoteModal()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group flex flex-col rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-400"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground">
            {venue.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
          <Star size={14} className="text-primary fill-primary" />
          <span className="text-sm font-semibold text-foreground">{venue.rating}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {venue.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
          <MapPin size={14} className="text-primary shrink-0" />
          <span className="text-sm">{venue.location}</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-primary" />
            <span>{venue.capacity}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 size={14} className="text-primary" />
            <span>{venue.indoorOutdoor}</span>
          </div>
        </div>

        <p className="text-lg font-bold text-foreground mt-4">{venue.startingPrice}</p>

        <div className="flex gap-3 mt-5">
          <Button asChild variant="outline" className="flex-1 border-primary/50 hover:bg-primary/10">
            <Link href={`/venues/${venue.slug}`}>View Details</Link>
          </Button>
          <Button
            onClick={() => openModal({ eventType: `Venue: ${venue.name}`, step: 2 })}
            className="flex-1 bg-primary text-primary-foreground hover:bg-gold-light"
          >
            Book Venue
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
