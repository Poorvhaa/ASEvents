import { BreadcrumbStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { Suspense } from 'react'
import { PackagesHero } from '@/components/packages/packages-hero'
import { PackagesGrid } from '@/components/packages/packages-grid'
import { CTASection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  const title = getTranslationServer(lang, 'seo.packages.title')
  const description = getTranslationServer(lang, 'seo.packages.description')
  return {
    alternates: { canonical: 'https://www.aseventmanagement.com/packages' },
    robots: { index: true, follow: true },
    title,
    description,
    keywords: [
      'Wedding packages India',
      'Event packages',
      'Haldi package',
      'Sangeet package',
      'Corporate event packages',
      'Festival event planning',
    ],
    openGraph: {
      url: 'https://www.aseventmanagement.com/packages',
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

export default async function PackagesPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'

  return (
    <>
      <BreadcrumbStructuredData page="packages" />
      <PackagesHero />
      <Suspense fallback={<div className="py-24 text-center text-muted-foreground">{getTranslationServer(lang, 'loading.packages')}</div>}>
        <PackagesGrid />
      </Suspense>
      <CTASection />
    </>
  )
}
