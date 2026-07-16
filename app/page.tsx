import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
// import { FeaturedVenues } from '@/components/sections/featured-venues'
import { PackagesPreview } from '@/components/sections/packages-preview'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Testimonials } from '@/components/sections/testimonials'
import { CTASection } from '@/components/sections/cta-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      {/* <FeaturedVenues /> */}
      <PackagesPreview />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  )
}
