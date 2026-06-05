'use client'

import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

export function MissionVision() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-10"
          >
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To create extraordinary events that exceed expectations and leave lasting impressions. 
              We are committed to delivering personalized, luxury experiences with impeccable attention 
              to detail, innovative concepts, and flawless execution. Every celebration we touch becomes 
              a masterpiece of memories.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-10"
          >
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the world&apos;s most trusted and innovative event management company, setting new 
              standards for luxury celebrations. We envision a future where every event we create 
              inspires joy, connects people, and transforms moments into timeless memories that 
              transcend generations.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-foreground mb-8">Our Core Values</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Excellence', 'Creativity', 'Integrity', 'Passion', 'Innovation'].map((value, index) => (
              <motion.span
                key={value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-6 py-3 rounded-full border border-primary/30 text-foreground hover:bg-primary/10 transition-colors"
              >
                {value}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
