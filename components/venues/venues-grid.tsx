'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VenueCard } from '@/components/cards/venue-card'
import { venues, venueCategories, venueCities } from '@/lib/data/venues'
import type { VenueCategory, VenueCity } from '@/lib/types/venues'

export function VenuesGrid() {
  const [activeCity, setActiveCity] = useState<VenueCity | 'All'>('All')
  const [activeCategory, setActiveCategory] = useState<VenueCategory | 'All'>('All')

  const filteredVenues = venues.filter((venue) => {
    const matchesCity = activeCity === 'All' || venue.city === activeCity
    const matchesCategory = activeCategory === 'All' || venue.category === activeCategory
    return matchesCity && matchesCategory
  })

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* City Filters */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3 text-center">Filter by City</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCity('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCity === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              All Cities
            </button>
            {venueCities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCity === city
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary/50'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <p className="text-sm font-medium text-muted-foreground mb-3 text-center">Filter by Category</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              All Venues
            </button>
            {venueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Venues Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <VenueCard venue={venue} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No venues found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
