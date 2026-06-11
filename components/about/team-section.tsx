'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'
import { useTranslation } from '@/src/hooks/useTranslation'

const team = [
  {
    name: 'Apurva Shah',
    roleKey: 'about.team.members.apurva.role',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bioKey: 'about.team.members.apurva.bio',
  },
  {
    name: 'Rahul Patel',
    roleKey: 'about.team.members.rahul.role',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    bioKey: 'about.team.members.rahul.bio',
  },
  {
    name: 'Riya Modi',
    roleKey: 'about.team.members.riya.role',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bioKey: 'about.team.members.riya.bio',
  },
  {
    name: 'Ajay Aggrawal',
    roleKey: 'about.team.members.ajay.role',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    bioKey: 'about.team.members.ajay.bio',
  },
]

export function TeamSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">{t('about.team.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            {t('about.team.titlePart1')}{' '}
            <span className="text-gold-gradient">{t('about.team.titlePart2')}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t('about.team.description')}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{t(member.roleKey)}</p>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{t(member.bioKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
