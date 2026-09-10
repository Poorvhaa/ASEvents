import { BreadcrumbStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { Suspense } from 'react'
import { PortfolioHero } from '@/components/portfolio/portfolio-hero'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { CTASection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  const title = getTranslationServer(lang, 'seo.portfolio.title')
  const description = getTranslationServer(lang, 'seo.portfolio.description')
  return {
    alternates: { canonical: 'https://www.aseventmanagement.com/portfolio' },
    robots: { index: true, follow: true },
    title,
    description,
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
      url: 'https://www.aseventmanagement.com/portfolio',
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

export default async function PortfolioPage() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'

  return (
    <>
      <BreadcrumbStructuredData page="portfolio" />
      <PortfolioHero />
      <Suspense fallback={<div className="py-24 text-center text-muted-foreground">{getTranslationServer(lang, 'loading.portfolio')}</div>}>
        <PortfolioGrid />
      </Suspense>
      <CTASection />
    </>
  )
}
