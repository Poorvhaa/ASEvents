import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Gallery | AS Event Management',
  description: 'View photos of weddings, corporate events, and private celebrations in the AS Event Management portfolio gallery, with ideas for your own special occasion.',
  alternates: { canonical: 'https://www.aseventmanagement.com/gallery' },
  openGraph: {
    title: 'Event Gallery | AS Event Management',
    description: 'View photos of weddings, corporate events, and private celebrations in the AS Event Management portfolio gallery, with ideas for your own special occasion.',
    url: 'https://www.aseventmanagement.com/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Gallery | AS Event Management',
    description: 'View photos of weddings, corporate events, and private celebrations in the AS Event Management portfolio gallery, with ideas for your own special occasion.',
  },
  robots: { index: true, follow: true },
}

import { permanentRedirect } from 'next/navigation'

export default function GalleryPage() {
  permanentRedirect('/portfolio')
}
