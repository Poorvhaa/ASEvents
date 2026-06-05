import type { Metadata } from 'next'
import { PackagesHero } from '@/components/packages/packages-hero'
import { PackagesGrid } from '@/components/packages/packages-grid'
import { CustomPackageBuilder } from '@/components/packages/custom-package-builder'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Event Packages | AS Events',
  description:
    'Explore premium event packages for Indian Weddings, Corporate events, Social celebrations, and Festivals. From engagement to complete wedding packages, tailored to your budget.',
  keywords: [
    'Wedding packages India',
    'Event packages',
    'Haldi package',
    'Sangeet package',
    'Corporate event packages',
    'Festival event planning',
  ],
  openGraph: {
    title: 'Event Packages | AS Events',
    description:
      'Premium event packages for Weddings, Corporate events, Social celebrations, and Festivals across India.',
    type: 'website',
  },
}

export default function PackagesPage() {
  return (
    <>
      <PackagesHero />
      <PackagesGrid />
      <CustomPackageBuilder />
      <CTASection />
    </>
  )
}
