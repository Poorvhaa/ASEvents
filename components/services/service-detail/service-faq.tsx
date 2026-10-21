'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { ServiceFAQItem } from '@/lib/data/services-data'
import { HelpCircle } from 'lucide-react'

interface ServiceFAQProps {
  faqs: ServiceFAQItem[]
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  return (
    <Section className="py-20 sm:py-24 bg-white border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-eyebrow">Clear Answers</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            Essential information regarding timelines, venue selection, vendor alignments, and budgeting for your event.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 border border-border/50 rounded-3xl p-6 sm:p-10 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white border border-border/40 rounded-2xl px-5 sm:px-6 py-1 data-[state=open]:border-primary/50 transition-colors shadow-none"
              >
                <AccordionTrigger className="text-left font-serif text-base sm:text-lg font-bold text-foreground py-4 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light pb-5 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>
    </Section>
  )
}
