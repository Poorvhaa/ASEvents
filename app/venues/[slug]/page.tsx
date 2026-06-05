import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VenueDetailContent } from '@/components/venues/venue-detail-content'
import { CTASection } from '@/components/sections/cta-section'
import { venues, getVenueBySlug } from '@/lib/data/venues'

interface VenuePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug }))
}

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { slug } = await params
  const venue = getVenueBySlug(slug)

  if (!venue) {
    return { title: 'Venue Not Found | AS Events' }
  }

  return {
    title: `${venue.name} | AS Events Venues`,
    description: venue.description,
    keywords: [
      venue.name,
      venue.category,
      venue.city,
      'event venue',
      'wedding venue India',
    ],
    openGraph: {
      title: `${venue.name} | AS Events`,
      description: venue.description,
      images: [{ url: venue.image }],
      type: 'website',
    },
  }
}

export default async function VenueDetailPage({ params }: VenuePageProps) {
  const { slug } = await params
  const venue = getVenueBySlug(slug)

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
