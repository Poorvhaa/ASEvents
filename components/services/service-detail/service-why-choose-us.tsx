import { Section, SectionContainer } from '@/components/layout/section-container'
import { CheckCircle, ShieldCheck } from 'lucide-react'
import { ServiceWhyChooseItem } from '@/lib/data/services-data'

interface ServiceWhyChooseUsProps {
  items: ServiceWhyChooseItem[]
}

export function ServiceWhyChooseUs({ items }: ServiceWhyChooseUsProps) {
  return (
    <Section className="py-20 sm:py-24 bg-white border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <span className="text-eyebrow">The AS Events Distinction</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            Why Choose AS Event Management
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            Genuine planning mastery, transparent communication, and dedicated on-ground leadership rooted in Vadodara and serving Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-slate-50 border border-border/40 shadow-sm flex items-start gap-5 hover:border-primary/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
