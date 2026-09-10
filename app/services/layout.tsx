import { BreadcrumbStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Planning Services | AS Event Management',
  description: 'Discover wedding planning, corporate events, private celebrations, and entertainment services from AS Event Management, with support for every event detail.',
  alternates: { canonical: 'https://www.aseventmanagement.com/services' },
  openGraph: {
    title: 'Event Planning Services | AS Event Management',
    description: 'Discover wedding planning, corporate events, private celebrations, and entertainment services from AS Event Management, with support for every event detail.',
    url: 'https://www.aseventmanagement.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Planning Services | AS Event Management',
    description: 'Discover wedding planning, corporate events, private celebrations, and entertainment services from AS Event Management, with support for every event detail.',
  },
  robots: { index: true, follow: true },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbStructuredData page="services" />
      {children}
    </>
  )
}
