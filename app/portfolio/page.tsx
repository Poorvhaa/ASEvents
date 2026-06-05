import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PortfolioHero } from '@/components/portfolio/portfolio-hero'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Portfolio & Gallery | AS Events',
  description:
    'Explore our portfolio of luxury weddings, corporate events, destination celebrations, exhibitions, birthdays, and entertainment events across India.',
  keywords: [
    'event portfolio India',
    'wedding portfolio',
    'corporate events gallery',
    'destination weddings',
    'product launches',
    'exhibitions',
    'birthday events',
    'anniversary celebrations',
    'entertainment events',
  ],
  openGraph: {
    title: 'Portfolio & Gallery | AS Events',
    description: 'Browse our collection of extraordinary events and stunning event photography.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Loading portfolio...</div>}>
        <PortfolioGrid />
      </Suspense>
      <CTASection />
    </>
  )
}
