import type { Metadata } from 'next'
import { BreadcrumbStructuredData } from '@/components/structured-data'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogList } from '@/components/blog/blog-list'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Blog & Event Planning Guides | AS Event Management',
  description:
    'Expert tips, planning guides, luxury trends, and inspiration for creating unforgettable weddings, corporate functions, and private celebrations.',
  alternates: {
    canonical: 'https://www.aseventmanagement.com/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Blog & Event Planning Guides | AS Event Management',
    description:
      'Expert tips, planning guides, luxury trends, and inspiration for creating unforgettable weddings, corporate functions, and private celebrations.',
    url: 'https://www.aseventmanagement.com/blog',
    siteName: 'AS Events',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Event Planning Guides | AS Event Management',
    description:
      'Expert tips, planning guides, luxury trends, and inspiration for creating unforgettable weddings, corporate functions, and private celebrations.',
  },
}

export default function BlogListingPage() {
  return (
    <>
      <BreadcrumbStructuredData page="blog" />
      <BlogHero />
      <BlogList />
      <CTASection />
    </>
  )
}
