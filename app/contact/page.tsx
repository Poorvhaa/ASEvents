import { BreadcrumbStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactContent } from '@/components/contact/contact-content'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  const title = getTranslationServer(lang, 'seo.contact.title')
  const description = getTranslationServer(lang, 'seo.contact.description')
  return {
    alternates: { canonical: 'https://www.aseventmanagement.com/contact' },
    robots: { index: true, follow: true },
    title,
    description,
    openGraph: {
      url: 'https://www.aseventmanagement.com/contact',
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

export default function ContactPage() {
  return (
    <>
      <BreadcrumbStructuredData page="contact" />
      <ContactHero />
      <ContactContent />
    </>
  )
}
