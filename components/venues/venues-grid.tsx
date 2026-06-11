'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { VenueCard } from '@/components/cards/venue-card'
import { venueCategories, venueCities } from '@/lib/data/venues'
import { useVenues } from '@/hooks/use-venues'
import type { VenueCategory, VenueCity } from '@/lib/types/venues'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

export function VenuesGrid() {
  const { t } = useTranslation()
  const [activeCity, setActiveCity] = useState<VenueCity | 'All'>('All')
  const [activeCategory, setActiveCategory] = useState<VenueCategory | 'All'>('All')

  const { venues, loading, error } = useVenues({
    city: activeCity === 'All' ? undefined : activeCity,
    category: activeCategory === 'All' ? undefined : activeCategory,
  })

  return (
    <Section className="bg-slate-50">
      <SectionContainer>
        <div className="max-w-5xl mx-auto mb-10 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-slate-900 mb-2 sm:mb-3">
              {t('venuesPage.grid.title')}
            </h3>
            <p className="text-center text-slate-500 text-small mb-6 sm:mb-8">
              {t('venuesPage.grid.subtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="min-w-0">
                <label htmlFor="venue-city" className="block text-sm font-semibold text-slate-600 mb-2">
                  {t('venuesPage.grid.destination')}
                </label>
                <select
                  id="venue-city"
                  value={activeCity}
                  onChange={(e) => setActiveCity(e.target.value as VenueCity | 'All')}
                  className="w-full min-h-11 h-12 sm:h-14 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">{t('venuesPage.grid.allLocations')}</option>
                  {venueCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor="venue-category" className="block text-sm font-semibold text-slate-600 mb-2">
                  {t('venuesPage.grid.collection')}
                </label>
                <select
                  id="venue-category"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as VenueCategory | 'All')}
                  className="w-full min-h-11 h-12 sm:h-14 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">{t('venuesPage.grid.allTypes')}</option>
                  {venueCategories.map((category) => (
                    <option key={category} value={category}>
                      {t(`venuesPage.categories.${category}`) || category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-muted-foreground">{error}</div>
        )}

        {!loading && !error && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-0"
                >
                  <VenueCard venue={venue} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && venues.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground">{t('venuesPage.grid.noVenues')}</p>
          </div>
        )}
      </SectionContainer>
    </Section>
  )
}
