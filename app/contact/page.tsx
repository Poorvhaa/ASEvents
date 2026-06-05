import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactContent } from '@/components/contact/contact-content'

export const metadata: Metadata = {
  title: 'Contact Us | AS Events',
  description: 'Get in touch with AS Events for your next luxury event. Request a quote or schedule a consultation.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactContent />
    </>
  )
}
