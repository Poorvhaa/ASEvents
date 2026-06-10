'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { venueCities } from '@/lib/data/venues'
import { Section, SectionContainer } from '@/components/layout/section-container'

const eventTypes = [
  'Wedding',
  'Engagement',
  'Corporate Event',
  'Birthday Celebration',
  'Festival Event',
  'Other',
]

const guestCounts = [
  'Less than 50',
  '50 - 100',
  '100 - 200',
  '200 - 500',
  '500 - 1000',
  '1000+',
]

const budgetRanges = [
  'Under ₹1,00,000',
  '₹1,00,000 - ₹3,00,000',
  '₹3,00,000 - ₹5,00,000',
  '₹5,00,000 - ₹10,00,000',
  '₹10,00,000+',
]

const selectClass =
  'w-full min-h-11 px-4 py-3 rounded-xl bg-white border border-slate-200 text-foreground text-sm sm:text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export function CustomPackageBuilder() {
  const { openModal } = useQuoteModal()
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    location: '',
    budgetRange: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal({
      eventType: formData.eventType || 'Custom Package',
      step: 2,
    })
  }

  return (
    <Section className="bg-slate-50 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <SectionContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-eyebrow">Custom</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Build Your Own <span className="text-gold-gradient">Package</span>
          </h2>
          <p className="text-body text-muted-foreground">
            Tell us about your celebration and we&apos;ll craft a bespoke package
            perfectly suited to your needs and budget.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-5 sm:p-8 lg:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="min-w-0">
              <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-2">
                Event Type
              </label>
              <select
                id="eventType"
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className={selectClass}
                required
              >
                <option value="">Select event type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label htmlFor="guestCount" className="block text-sm font-medium text-foreground mb-2">
                Guest Count
              </label>
              <select
                id="guestCount"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className={selectClass}
                required
              >
                <option value="">Select guest count</option>
                {guestCounts.map((count) => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={selectClass}
                required
              >
                <option value="">Select location</option>
                {venueCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label htmlFor="budgetRange" className="block text-sm font-medium text-foreground mb-2">
                Budget Range
              </label>
              <select
                id="budgetRange"
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className={selectClass}
                required
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="min-h-11 w-full mt-6 sm:mt-8 bg-primary text-primary-foreground hover:bg-blue-700 font-semibold text-base sm:text-lg"
          >
            Generate Recommendation
          </Button>
        </motion.form>
      </SectionContainer>
    </Section>
  )
}
