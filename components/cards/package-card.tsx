'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Users, Clock, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import type { EventPackage } from '@/lib/types/packages'
import type { EventType } from '@/lib/ai/types'
import { useTranslation } from '@/src/hooks/useTranslation'

interface PackageCardProps {
  pkg: EventPackage
  index?: number
}

const categoryNames: Record<string, string> = {
  wedding: 'Weddings',
  corporate: 'Corporate',
  social: 'Social Events',
  exhibition: 'Exhibitions',
  entertainment: 'Entertainment',
}

function mapPackageToEventType(title: string, category: EventPackage['category']): EventType | '' {
  const map: Record<string, EventType> = {
    'Haldi Ceremony': 'Haldi',
    'Mehendi Ceremony': 'Mehendi',
    'Sangeet Night': 'Sangeet',
    'Reception Celebration': 'Reception',
    'Complete Wedding Package': 'Wedding',
    'Corporate Conference': 'Corporate Event',
    'Product Launch': 'Product Launch',
    'Trade Exhibition': 'Exhibition',
    'Birthday Celebration': 'Birthday',
    'Anniversary Celebration': 'Anniversary',
    'Cultural Festival': 'Festival Event',
    'Live Concert': 'Entertainment Event',
  }
  if (map[title]) return map[title]
  if (category === 'wedding') return 'Wedding'
  if (category === 'corporate') return 'Corporate Event'
  if (category === 'exhibition') return 'Exhibition'
  if (category === 'entertainment') return 'Entertainment Event'
  return 'Birthday'
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const { openModal } = useQuoteModal()
  const { openChatWithPackage } = useAIConsultant()
  const { t } = useTranslation()

  const handleAIPlanner = () => {
    const titleTrans = t(`packages.${pkg.id}.title`) || pkg.title
    const msg = t('aiPlanner.prefillWelcome').replace('{eventType}', titleTrans)
    openChatWithPackage({
      eventType: mapPackageToEventType(pkg.title, pkg.category),
      guestCount: pkg.suitableGuests,
      budget: pkg.price.replace('Starting from ', ''),
    }, msg)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`relative flex flex-col h-full p-5 sm:p-6 lg:p-8 rounded-2xl bg-white border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 min-w-0 ${
        pkg.popular
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-slate-200 hover:border-blue-400'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            <Sparkles size={12} />
            {t('packagesPreview.popular')}
          </span>
        </div>
      )}

      <span className="text-primary text-xs sm:text-sm font-medium capitalize">
        {t(`packagesPage.categories.${categoryNames[pkg.category] || pkg.category}`) || pkg.category}
      </span>
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-1 mb-2">
        {t(`packages.${pkg.id}.title`) || pkg.title}
      </h3>

      <p className="text-base sm:text-lg font-bold text-foreground mb-3">
        {t(`packages.${pkg.id}.price`) || pkg.price}
      </p>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
        <span className="inline-flex items-center gap-1">
          <Users size={14} className="text-primary" />
          {pkg.suitableGuests} {t('packagesPage.guests')}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={14} className="text-primary" />
          {t(`packages.${pkg.id}.duration`) || pkg.duration}
        </span>
      </div>

      {(t(`packages.${pkg.id}.description`) || pkg.description) && (
        <p className="text-muted-foreground text-small leading-relaxed mb-4">
          {t(`packages.${pkg.id}.description`) || pkg.description}
        </p>
      )}

      <div className="mb-4">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">{t('packagesPage.keyHighlights')}</p>
        <ul className="space-y-1.5">
          {pkg.highlights.map((item, hIndex) => {
            const highlightKey = `packages.${pkg.id}.highlights.${hIndex}`
            const translatedItem = t(highlightKey)
            return (
              <li key={item} className="flex items-start gap-2 text-small text-foreground">
                <Check size={14} className="text-primary mt-0.5 shrink-0" />
                <span>{translatedItem === highlightKey ? item : translatedItem}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <ul className="space-y-1.5 mb-6 flex-1">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">{t('packagesPage.includedServices')}</p>
        {pkg.includedServices.slice(0, 5).map((item, sIndex) => {
          const serviceKey = `packages.${pkg.id}.includedServices.${sIndex}`
          const translatedItem = t(serviceKey)
          return (
            <li key={item} className="flex items-start gap-2 text-small text-muted-foreground">
              <Check size={14} className="text-primary/70 mt-0.5 shrink-0" />
              <span>{translatedItem === serviceKey ? item : translatedItem}</span>
            </li>
          )
        })}
      </ul>

      <div className="pt-4 border-t border-border mt-auto flex flex-col gap-2.5 w-full">
        <Button
          onClick={() => openModal({ eventType: t(`packages.${pkg.id}.title`) || pkg.title, step: 2 })}
          className="min-h-11 w-full bg-primary text-primary-foreground hover:bg-blue-700 font-semibold"
        >
          {t('nav.getQuote')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleAIPlanner}
          className="min-h-11 w-full border-primary/50 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 gap-1.5 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:opacity-100"
        >
          <Bot size={16} />
          {t('packagesPage.aiPlanner')}
        </Button>
      </div>
    </motion.div>
  )
}
