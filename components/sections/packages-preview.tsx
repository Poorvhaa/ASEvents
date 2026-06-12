'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { packages } from '@/lib/data/packages'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

const categoryParamMap: Record<string, string> = {
  wedding: 'weddings',
  corporate: 'corporate',
  social: 'birthday',
  exhibition: 'exhibitions',
  entertainment: 'entertainment',
}

const categoryNames: Record<string, string> = {
  wedding: 'Weddings',
  corporate: 'Corporate',
  social: 'Social Events',
  exhibition: 'Exhibitions',
  entertainment: 'Entertainment',
}

const previewPackages = packages.filter(
  (p) => p.popular || ['sangeet', 'product-launch', 'live-concert'].includes(p.id)
)

export function PackagesPreview() {
  const { t } = useTranslation()

  return (
    <Section className="bg-slate-50">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6"
        >
          <div className="text-center md:text-left">
            <span className="text-eyebrow">{t('packagesPreview.eyebrow')}</span>
            <h2 className="text-section-heading text-foreground mt-3 sm:mt-4">
              {t('packagesPreview.headingPart1')}{' '}
              <span className="text-gold-gradient">{t('packagesPreview.headingPart2')}</span>
            </h2>
            <p className="text-body text-muted-foreground mt-3 sm:mt-4 max-w-xl mx-auto md:mx-0">
              {t('packagesPreview.description')}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="min-h-11 border-primary/50 text-foreground hover:bg-primary/10 gap-2 w-full sm:w-fit mx-auto md:mx-0"
          >
            <Link href="/packages">
              {t('packagesPreview.viewAll')}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {previewPackages.map((pkg, index) => {
            const categoryParam = categoryParamMap[pkg.category] || pkg.category
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Link
                  href={`/packages?category=${categoryParam}`}
                  className={`relative flex flex-col h-full p-5 sm:p-6 rounded-2xl bg-white border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer select-none ${
                    pkg.popular ? 'border-primary ring-1 ring-primary/20' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase">
                      <Sparkles size={10} />
                      {t('packagesPreview.popular')}
                    </span>
                  )}
                  <span className="text-primary text-xs font-medium capitalize">
                    {t(`packagesPage.categories.${categoryNames[pkg.category] || pkg.category}`) || pkg.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mt-1 mb-3">
                    {t(`packages.${pkg.id}.title`) || pkg.title}
                  </h3>
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {pkg.highlights.slice(0, 4).map((item, hIndex) => {
                      const highlightKey = `packages.${pkg.id}.highlights.${hIndex}`
                      const translatedItem = t(highlightKey)
                      return (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check size={12} className="text-primary mt-0.5 shrink-0" />
                          <span>{translatedItem === highlightKey ? item : translatedItem}</span>
                        </li>
                      )
                    })}
                  </ul>
                  <p className="text-sm font-bold text-foreground">
                    {t(`packages.${pkg.id}.price`) || pkg.price}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}
