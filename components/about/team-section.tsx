'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Apurva Shah',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'With 15+ years in luxury events, Victoria leads our vision for exceptional experiences.',
  },
  {
    name: 'Rahul Patel',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    bio: 'Rahul brings innovative design concepts that transform ordinary spaces into extraordinary venues.',
  },
  {
    name: 'Riya Modi',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'Riya ensures flawless execution with her meticulous attention to detail and logistics expertise.',
  },
  {
    name: 'Ajay Aggrawal',
    role: 'Client Relations Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    bio: 'Ajay builds lasting relationships with clients, ensuring their visions are perfectly realized.',
  },
]

export function TeamSection() {
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
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Our Team</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Meet the <span className="text-gold-gradient">Experts</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our talented team brings together decades of experience in event planning, 
            design, and hospitality.
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
              <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
