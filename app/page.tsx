import type { Metadata } from 'next'
import { IntroExperience } from '@/components/intro/IntroExperience'
import { ENABLE_CINEMATIC_INTRO } from '@/src/config/features'
import { Hero } from '@/components/sections/hero'
import { ValueProps } from '@/components/sections/value-props'
import { Services } from '@/components/sections/services'
//import { FeaturedVenues } from '@/components/sections/featured-venues'
import { PackagesPreview } from '@/components/sections/packages-preview'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Testimonials } from '@/components/sections/testimonials'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'AS Event Management | Event Planning & Management',
  description: 'Plan weddings, corporate events, and private celebrations with AS Event Management in Vadodara, Gujarat. Discover planning services tailored to your occasion.',
  alternates: { canonical: 'https://www.aseventmanagement.com/' },
  openGraph: {
    title: 'AS Event Management | Event Planning & Management',
    description: 'Plan weddings, corporate events, and private celebrations with AS Event Management in Vadodara, Gujarat. Discover planning services tailored to your occasion.',
    url: 'https://www.aseventmanagement.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AS Event Management | Event Planning & Management',
    description: 'Plan weddings, corporate events, and private celebrations with AS Event Management in Vadodara, Gujarat. Discover planning services tailored to your occasion.',
  },
  robots: { index: true, follow: true },
}

export default function HomePage() {
  return (
    <>
      {ENABLE_CINEMATIC_INTRO && <IntroExperience />}
      <div id="homepage-content">
        <Hero />
        <ValueProps />
        <Services />
        {/*<FeaturedVenues />*/}
        <PackagesPreview />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </div>
    </>
  )
}

