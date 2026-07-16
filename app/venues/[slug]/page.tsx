import { notFound } from 'next/navigation'
export default async function VenueDetailPage() {
  notFound()
}

/*
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { VenueDetailContent } from '@/components/venues/venue-detail-content'
import { CTASection } from '@/components/sections/cta-section'
import { venues } from '@/lib/data/venues'
import { getDisplayVenueBySlug } from '@/services/venueService'

interface VenuePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug }))
}

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { slug } = await params
  const venue = await getDisplayVenueBySlug(slug)

  if (!venue) {
    return { title: 'Venue Not Found | AS Events' }
  }

  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'

  const transNameKey = `venues.${venue.slug}.name`
  const transDescKey = `venues.${venue.slug}.description`
  const nameVal = getTranslationServer(lang, transNameKey)
  const descVal = getTranslationServer(lang, transDescKey)

  const displayName = nameVal === transNameKey ? venue.name : nameVal
  const displayDesc = descVal === transDescKey ? venue.description : descVal

  return {
    title: `${displayName} | AS Events Venues`,
    description: displayDesc,
    keywords: [
      displayName,
      venue.category,
      venue.city,
      'event venue',
      'wedding venue India',
    ],
    openGraph: {
      title: `${displayName} | AS Events`,
      description: displayDesc,
      images: [{ url: venue.image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} | AS Events`,
      description: displayDesc,
      images: [venue.image],
    },
  }
}

export default async function VenueDetailPage({ params }: VenuePageProps) {
  const { slug } = await params
  const venue = await getDisplayVenueBySlug(slug)

  if (!venue) {
    notFound()
  }

  return (
    <>
      <VenueDetailContent venue={venue} />
      <CTASection />
    </>
  )
}
*/