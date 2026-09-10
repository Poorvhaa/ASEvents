import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Venues | AS Event Management',
  description: 'Explore premium wedding halls, luxury resorts, banquet halls, and lawns with AS Event Management to find the ideal setting for your celebration.',
  alternates: { canonical: 'https://www.aseventmanagement.com/venues' },
  openGraph: {
    title: 'Event Venues | AS Event Management',
    description: 'Explore premium wedding halls, luxury resorts, banquet halls, and lawns with AS Event Management to find the ideal setting for your celebration.',
    url: 'https://www.aseventmanagement.com/venues',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Venues | AS Event Management',
    description: 'Explore premium wedding halls, luxury resorts, banquet halls, and lawns with AS Event Management to find the ideal setting for your celebration.',
  },
  robots: { index: false, follow: true },
}

import { notFound } from 'next/navigation'

export default function VenuesPage() {
  notFound()
}
/*import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { VenuesHero } from '@/components/venues/venues-hero'
import { VenuesGrid } from '@/components/venues/venues-grid'
import { CTASection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  const title = getTranslationServer(lang, 'seo.venues.title')
  const description = getTranslationServer(lang, 'seo.venues.description')
  return {
    title,
    description,
    keywords: [
      'wedding venues India',
      'banquet halls',
      'luxury resorts',
      'destination wedding venues',
      'corporate venues',
      'event venues',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
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
*/