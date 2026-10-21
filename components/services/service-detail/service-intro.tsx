import { Section, SectionContainer } from '@/components/layout/section-container'
import { CheckCircle2, Compass, ShieldAlert, Sparkles } from 'lucide-react'

interface ServiceIntroProps {
  whatIsIt: string
  whoIsItFor: string
  whyItMatters: string
  ourApproach: string
}

export function ServiceIntro({
  whatIsIt,
  whoIsItFor,
  whyItMatters,
  ourApproach,
}: ServiceIntroProps) {
  return (
    <Section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-eyebrow">Overview & Philosophy</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            Designed for Perfection, Executed with Passion
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            Understanding why professional management elevates celebrations from stressful to sublime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: What It Is */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-50 border border-border/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                <Sparkles size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3">
                What the Service Encompasses
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                {whatIsIt}
              </p>
            </div>
          </div>

          {/* Card 2: Who It Is For */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-50 border border-border/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                <Compass size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3">
                Tailored for Discerning Hosts
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                {whoIsItFor}
              </p>
            </div>
          </div>

          {/* Card 3: Why Professional Planning Matters */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-50 border border-border/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3">
                Why Professional Planning Matters
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                {whyItMatters}
              </p>
            </div>
          </div>

          {/* Card 4: How AS Events Approaches It */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-primary/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-foreground mb-5 shadow-sm">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3">
                The AS Event Management Approach
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                {ourApproach}
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}
