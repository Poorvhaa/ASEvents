'use client'

import { motion } from 'framer-motion'
import { Sparkles, Map, ShieldCheck } from 'lucide-react'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

const valueProps = [
  {
    icon: Sparkles,
    label: '01',
    titleKey: 'valueProps.planning.title',
    descKey: 'valueProps.planning.desc',
    defaultTitle: 'Bespoke Planning',
    defaultDesc: 'Tailoring every detail to your story, crafting unique designs and seamless schedules that reflect your personal vision.',
  },
  {
    icon: Map,
    label: '02',
    titleKey: 'valueProps.venues.title',
    descKey: 'valueProps.venues.desc',
    defaultTitle: 'Elite Venue Curation',
    defaultDesc: 'Unlocking access to the finest luxury destinations, boutique heritage properties, and stunning beachfront spots across India.',
  },
  {
    icon: ShieldCheck,
    label: '03',
    titleKey: 'valueProps.execution.title',
    descKey: 'valueProps.execution.desc',
    defaultTitle: 'Flawless Execution',
    defaultDesc: 'Orchestrating every vendor, cue, and logistical detail with calm, professional precision so you can fully live your moment.',
  },
]

export function ValueProps() {
  const { t } = useTranslation()

  return (
    <Section className="bg-[#FAF8F5] py-16 sm:py-24 border-b border-border/30">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {valueProps.map((prop, index) => {
            const IconComponent = prop.icon
            
            // Fetch translations with default fallbacks
            const title = t(prop.titleKey) === prop.titleKey ? prop.defaultTitle : t(prop.titleKey)
            const desc = t(prop.descKey) === prop.descKey ? prop.defaultDesc : t(prop.descKey)

            return (
              <motion.div
                key={prop.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-start gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-border/20 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                {/* Gold-shaded index number & icon */}
                <div className="flex justify-between items-center w-full mb-2">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300 shrink-0">
                    <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-serif font-bold text-3xl text-primary/20 group-hover:text-primary/45 transition-colors duration-300 select-none">
                    {prop.label}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>
                
                <p className="text-small text-muted-foreground leading-relaxed font-light">
                  {desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}
