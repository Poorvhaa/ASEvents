'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFeaturedVenues } from '@/lib/data/venues'

export function FeaturedVenues() {
  const featuredVenues = getFeaturedVenues()

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Venues</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 text-balance">
              Featured <span className="text-gold-gradient">Venues</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 gap-2 w-fit">
            <Link href="/venues">
              View All Venues
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/venues/${venue.slug}`}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                    <Star size={12} className="text-primary fill-primary" />
                    <span className="text-xs font-semibold">{venue.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-gold-light w-full">
                      View Details
                    </Button>
                  </div>
                </div>
                <span className="text-primary text-sm font-medium">{venue.category}</span>
                <h3 className="text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span className="text-sm">{venue.city}</span>
                </div>
                <p className="text-sm font-semibold text-foreground mt-2">{venue.startingPrice}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
