'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import type { EventPackage } from '@/lib/types/packages'

interface PackageCardProps {
  pkg: EventPackage
  index?: number
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const { openModal } = useQuoteModal()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`relative flex flex-col p-8 rounded-2xl bg-white border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
        pkg.popular
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-slate-200 hover:border-blue-400'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} />
            Most Popular
          </span>
        </div>
      )}

      <span className="text-primary text-sm font-medium capitalize">{pkg.category}</span>
      <h3 className="text-xl font-semibold text-foreground mt-1 mb-4">{pkg.title}</h3>

      {pkg.description && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pkg.description}</p>
      )}

      <ul className="space-y-2.5 mb-8 flex-1">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <Check size={16} className="text-primary mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="pt-6 border-t border-border">
        <p className="text-lg font-bold text-foreground mb-4">{pkg.price}</p>
        <Button
          onClick={() => openModal({ eventType: pkg.title, step: 2 })}
          className="w-full bg-primary text-primary-foreground hover:bg-gold-light font-semibold"
        >
          Get Quote
        </Button>
      </div>
    </motion.div>
  )
}
