'use client'

import { motion } from 'framer-motion'
import { MessageSquare, CalendarCheck, Palette, PartyPopper, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We begin with a detailed consultation to understand your vision, preferences, and requirements.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Planning',
    description: 'Our team develops a comprehensive plan including timeline, budget, and vendor coordination.',
  },
  {
    number: '03',
    icon: Palette,
    title: 'Design',
    description: 'We create stunning visual concepts and themes that bring your dream event to life.',
  },
  {
    number: '04',
    icon: PartyPopper,
    title: 'Execution',
    description: 'Our experienced team handles every detail on the day, ensuring flawless execution.',
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Celebration',
    description: 'Sit back and enjoy your perfect event while we take care of everything behind the scenes.',
  },
]

export function Process() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">How We Work</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Our <span className="text-gold-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From initial concept to final celebration, we guide you through every step of the journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <span className="text-primary font-mono text-sm">{step.number}</span>
                <h3 className="text-xl font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Icon */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
