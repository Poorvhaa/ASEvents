import { Section, SectionContainer } from '@/components/layout/section-container'
import { ServiceProcessStep } from '@/lib/data/services-data'

interface ServiceProcessProps {
  steps: ServiceProcessStep[]
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
    <Section className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <span className="text-eyebrow">Proven Methodology</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            Our Step-by-Step Planning Process
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            From our initial discovery conversation to on-site execution, our structured workflow ensures calm, organized, and timely delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-7 sm:p-8 rounded-2xl bg-white border border-border/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-primary/40 block mb-3">
                  {step.number}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/20 flex items-center justify-between text-xs text-primary font-semibold">
                <span>Phase {step.number}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
