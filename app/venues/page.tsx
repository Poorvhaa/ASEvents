import type { Metadata } from 'next'
import { VenuesHero } from '@/components/venues/venues-hero'
import { VenuesGrid } from '@/components/venues/venues-grid'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Event Venues | AS Events',
  description:
    'Discover premium wedding halls, luxury resorts, banquet venues, farmhouses, and corporate spaces across Ahmedabad, Mumbai, Udaipur, Goa, and more.',
  keywords: [
    'wedding venues India',
    'banquet halls',
    'luxury resorts',
    'destination wedding venues',
    'corporate venues',
    'event venues',
  ],
  openGraph: {
    title: 'Event Venues | AS Events',
    description:
      'Find the perfect venue for your wedding, corporate event, or celebration across India.',
    type: 'website',
  },
}

export default function VenuesPage() {
  return (
    <>
      <VenuesHero />
      <VenuesGrid />
      <CTASection />
    </>
  )
}
