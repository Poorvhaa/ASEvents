'use client'

import { useEffect } from 'react'
import { ServicesHero } from '@/components/services/services-hero'
import { ServicesList } from '@/components/services/services-list'
import { CTASection } from '@/components/sections/cta-section'

export default function ServicesPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 300)
    }
  }, [])

  return (
    <>
      <ServicesHero />
      <ServicesList />
      <CTASection />
    </>
  )
}