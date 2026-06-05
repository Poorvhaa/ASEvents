'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Star, Crown } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    title: 'Best Event Planner',
    year: '2023',
    organization: 'Luxury Events Association',
  },
  {
    icon: Award,
    title: 'Excellence in Design',
    year: '2023',
    organization: 'Wedding Industry Awards',
  },
  {
    icon: Star,
    title: 'Top 10 Event Companies',
    year: '2022',
    organization: 'Event Professional Magazine',
  },
  {
    icon: Crown,
    title: 'Platinum Service Award',
    year: '2022',
    organization: 'Client Choice Awards',
  },
]

export function Achievements() {
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
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Recognition</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Awards & <span className="text-gold-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our commitment to excellence has been recognized by leading industry organizations.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <achievement.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-primary font-medium">{achievement.year}</span>
              <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{achievement.title}</h3>
              <p className="text-muted-foreground text-sm">{achievement.organization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
