import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'
import { PrivacyPolicyContent } from './privacy-policy-content'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  const title = getTranslationServer(lang, 'seo.privacyPolicy.title')
  const description = getTranslationServer(lang, 'seo.privacyPolicy.description')

  return {
    title,
    description,
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
