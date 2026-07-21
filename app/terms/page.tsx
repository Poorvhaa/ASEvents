import type { Metadata } from 'next'
// Harmless edit 3
import { SectionContainer } from '@/components/layout/section-container'

export const metadata: Metadata = {
  title: 'Terms of Service | AS Events',
  description: 'Terms of Service for AS Events luxury wedding and corporate event planning services.',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <SectionContainer>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-8 text-center tracking-wide">
            Terms of Service
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 space-y-6 font-sans text-sm sm:text-base leading-relaxed">
            <p>
              Welcome to AS Events. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service.
            </p>
            
            <h2 className="font-serif text-xl sm:text-2xl text-foreground pt-4">1. Acceptance of Terms</h2>
            <p>
              By engaging AS Events for wedding planning, destination wedding execution, or corporate events planning, you agree to these terms. If you do not agree to these terms, please do not use our services or access our website.
            </p>

            <h2 className="font-serif text-xl sm:text-2xl text-foreground pt-4">2. Services Offered</h2>
            <p>
              AS Events provides bespoke event management, luxury wedding coordination, and consulting services. The specific scope of work, deliverables, and fees for any event will be detailed in a separate written agreement signed by both parties.
            </p>

            <h2 className="font-serif text-xl sm:text-2xl text-foreground pt-4">3. Privacy and Information Security</h2>
            <p>
              Your privacy is of utmost importance to us. Any personal details, event coordinates, or private guest lists shared with AS Events will be handled with absolute confidentiality and in accordance with our internal privacy policies.
            </p>

            <h2 className="font-serif text-xl sm:text-2xl text-foreground pt-4">4. Intellectual Property</h2>
            <p>
              All content on this website, including designs, photography, text, and the AS monogram branding, is the intellectual property of AS Events and protected under applicable copyright laws.
            </p>

            <h2 className="font-serif text-xl sm:text-2xl text-foreground pt-4">5. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws governing luxury hospitality and contract execution in our operating jurisdictions.
            </p>
            
            <p className="text-sm text-foreground/60 pt-8 border-t border-border mt-12 text-center">
              Last updated: July 2026. For inquiries regarding our terms, please contact our concierge.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
