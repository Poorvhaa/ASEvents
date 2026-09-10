import { BreadcrumbStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { AboutHero } from '@/components/about/about-hero'
import { CompanyStory } from '@/components/about/company-story'
import { MissionVision } from '@/components/about/mission-vision'
//import { TeamSection } from '@/components/about/team-section'
import { Achievements } from '@/components/about/achievements'
//import { Partners } from '@/components/about/partners'
import { CTASection } from '@/components/sections/cta-section'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  const title = getTranslationServer(lang, 'seo.about.title')
  const description = getTranslationServer(lang, 'seo.about.description')
  return {
    alternates: { canonical: 'https://www.aseventmanagement.com/about' },
    robots: { index: true, follow: true },
    title,
    description,
    openGraph: {
      url: 'https://www.aseventmanagement.com/about',
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

export default function AboutPage() {
  return (
    <>
      <BreadcrumbStructuredData page="about" />
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      {/*<TeamSection />
      
      <Partners />*/}
<Achievements />
      <CTASection />
    </>
  )
}
