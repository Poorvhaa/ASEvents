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
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { getVenueQuotePrefill } from '@/lib/venues/book-venue'
import { VenueInquiryForm } from '@/components/venues/venue-inquiry-form'
import type { Venue } from '@/lib/types/venues'

interface VenueDetailContentProps {
  venue: Venue
}

export function VenueDetailContent({ venue }: VenueDetailContentProps) {
  const { openModal } = useQuoteModal()

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-24">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 lg:px-8 pb-10">
              <Link
                href="/venues"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
              >
                <ArrowLeft size={16} />
                Back to Venues
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary text-sm font-medium">{venue.category}</span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-2">
                  {venue.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin size={16} className="text-primary" />
                    <span>{venue.location}, {venue.city}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-sm font-semibold text-foreground">{venue.rating}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">About This Venue</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{venue.description}</p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Facilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {venue.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <Check size={18} className="text-primary shrink-0" />
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Photo Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {venue.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${venue.name} gallery ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
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
                className="mt-12"
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Location</h2>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Map size={48} className="text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">{venue.location}, {venue.city}</p>
                    <p className="text-sm text-muted-foreground mt-2">Google Maps integration coming soon</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="sticky top-28 p-8 rounded-2xl bg-white border border-slate-200 shadow-lg"
              >
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-3xl font-bold text-foreground mt-1 mb-6">{venue.startingPrice}</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-medium text-foreground">{venue.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 size={20} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground">{venue.indoorOutdoor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car size={20} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Parking</p>
                      <p className="font-medium text-foreground">{venue.parking}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bed size={20} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rooms Available</p>
                      <p className="font-medium text-foreground">{venue.rooms}</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => openModal(getVenueQuotePrefill(venue))}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-blue-700 font-semibold mb-6"
                >
                  Book This Venue
                </Button>

                <h3 className="text-lg font-semibold text-foreground mb-4">Inquiry Form</h3>
                <VenueInquiryForm venue={venue} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
