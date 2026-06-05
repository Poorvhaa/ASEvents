import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/about-hero'
import { CompanyStory } from '@/components/about/company-story'
import { MissionVision } from '@/components/about/mission-vision'
import { TeamSection } from '@/components/about/team-section'
import { Achievements } from '@/components/about/achievements'
import { Partners } from '@/components/about/partners'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'About Us | AS Events',
  description: 'Learn about AS Events - our story, mission, team, and commitment to creating extraordinary events.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <TeamSection />
      <Achievements />
      <Partners />
      <CTASection />
    </>
  )
}
