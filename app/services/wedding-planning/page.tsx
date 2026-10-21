import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { servicesData } from '@/lib/data/services-data'
import { ServicePageTemplate } from '@/components/services/service-detail/service-page-template'

const SLUG = 'wedding-planning'
const data = servicesData[SLUG]

export const metadata: Metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: {
    canonical: data.canonicalUrl,
  },
  openGraph: {
    title: data.title,
    description: data.metaDescription,
    url: data.canonicalUrl,
    siteName: 'AS Event Management',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: data.heroImage.src,
        width: 1200,
        height: 800,
        alt: data.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.metaDescription,
    images: [data.heroImage.src],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function WeddingPlanningPage() {
  if (!data) notFound()

  return <ServicePageTemplate data={data} />
}
