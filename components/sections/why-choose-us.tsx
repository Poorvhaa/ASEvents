'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Lightbulb, Settings, Handshake } from 'lucide-react'
import { Section, SectionContainer } from '@/components/layout/section-container'

const stats = [
  { value: 500, suffix: '+', label: 'Events Delivered' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+', label: 'Vendor Partners' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

const features = [
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our dedicated team brings decades of combined experience in crafting memorable events across all scales and styles.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Concepts',
    description: 'We transform your vision into reality with innovative designs and unique themes that set your event apart.',
  },
  {
    icon: Settings,
    title: 'End-to-End Management',
    description: 'From initial concept to final execution, we handle every detail so you can enjoy your special moments stress-free.',
  },
  {
    icon: Handshake,
    title: 'Trusted Vendors',
    description: 'Our network of premium vendors ensures the highest quality services for catering, decor, entertainment, and more.',
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary">
      {count}{suffix}
    </span>
  )
}

export function WhyChooseUs() {
  return (
    <Section className="bg-background">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-eyebrow">Why AS Events</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Why Choose <span className="text-gold-gradient">Us</span>
          </h2>
          <p className="text-body text-muted-foreground">
            We don&apos;t just plan events, we create experiences that leave lasting impressions
            and become cherished memories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="text-center p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-small text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
