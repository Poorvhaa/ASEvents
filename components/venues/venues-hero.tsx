'use client'

import { motion } from 'framer-motion'
import { PageHero, SectionContainer } from '@/components/layout/section-container'

export function VenuesHero() {
  return (
    <PageHero>
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-primary rounded-full blur-3xl" />
      </div>

      <SectionContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-eyebrow">Venues</span>
          <h1 className="text-hero text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Discover Premium Event <span className="text-gold-gradient">Venues</span>
          </h1>
          <p className="text-body text-muted-foreground">
            Explore wedding halls, luxury resorts, banquet venues and corporate spaces across India.
          </p>
        </motion.div>
      </SectionContainer>
    </PageHero>
  )
}
