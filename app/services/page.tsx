'use client'

import { ServicesHero } from '@/components/services/services-hero'
import { ServicesList } from '@/components/services/services-list'
import { CTASection } from '@/components/sections/cta-section'
import { useHashScroll } from '@/hooks/use-hash-scroll'

export default function ServicesPage() {
  useHashScroll('/services')

  return (
    <>
      <ServicesHero />
      <ServicesList />
      <CTASection />
    </>
  )
}
