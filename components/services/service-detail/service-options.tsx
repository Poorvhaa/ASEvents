import { Section, SectionContainer } from '@/components/layout/section-container'
import { Check, Sparkles } from 'lucide-react'
import { ServiceOptionItem } from '@/lib/data/services-data'

interface ServiceOptionsProps {
  heading: string
  description: string
  options: ServiceOptionItem[]
}

export function ServiceOptions({
  heading,
  description,
  options,
}: ServiceOptionsProps) {
  return (
    <Section className="py-20 sm:py-24 bg-white border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <span className="text-eyebrow">Service-Specific Solutions</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            {heading}
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-8 sm:p-9 rounded-3xl bg-slate-50 border border-border/50 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-all duration-300"
            >
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-primary block mb-2">
                  {option.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
                  {option.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light mb-6">
                  {option.description}
                </p>
              </div>

              <div className="border-t border-border/40 pt-5 mt-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground block mb-3.5">
                  Featured Inclusions:
                </span>
                <ul className="space-y-2.5">
                  {option.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85 font-light"
                    >
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
