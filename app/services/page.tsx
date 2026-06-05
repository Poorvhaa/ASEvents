import type { Metadata } from 'next'
import { ServicesHero } from '@/components/services/services-hero'
import { ServicesList } from '@/components/services/services-list'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Event Planning Services | AS Events',
  description:
    'Premium event management services including wedding planning, destination weddings, corporate events, product launches, exhibitions, birthday celebrations, and entertainment management across India.',
  keywords: [
    'wedding planning India',
    'destination weddings',
    'corporate event management',
    'product launch events',
    'exhibition planning',
    'birthday event planning',
    'anniversary events',
    'entertainment management',
    'event packages',
  ],
  openGraph: {
    title: 'Event Planning Services | AS Events',
    description: 'Comprehensive premium event management services tailored to your vision.',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <CTASection />
    </>
  )
}
