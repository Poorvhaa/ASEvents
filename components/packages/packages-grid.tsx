'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageCard } from '@/components/cards/package-card'
import { Loader2 } from 'lucide-react'
import { packageCategories } from '@/lib/data/packages'
import { usePackages } from '@/hooks/use-packages'
import type { PackageCategoryFilter } from '@/lib/types/packages'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

const categoryMap: Record<PackageCategoryFilter, string | null> = {
  All: null,
  Weddings: 'wedding',
  Corporate: 'corporate',
  'Social Events': 'social',
}

export function PackagesGrid() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<PackageCategoryFilter>('All')

  useEffect(() => {
    const categoryQuery = searchParams.get('category')
    if (categoryQuery) {
      const queryToCategoryMap: Record<string, PackageCategoryFilter> = {
        weddings: 'Weddings',
        corporate: 'Corporate',
        birthday: 'Social Events',
      }
      const matchedCategory = queryToCategoryMap[categoryQuery.toLowerCase()]
      if (matchedCategory) {
        setActiveCategory(matchedCategory)
        
        const element = document.getElementById('packages-grid-section')
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }
  }, [searchParams])

  const { packages: filteredPackages, loading, error } = usePackages(
    categoryMap[activeCategory] || undefined
  )

  return (
    <Section id="packages-grid-section" className="bg-background">
      <SectionContainer>
        <div className="filter-scroll justify-center sm:justify-start mb-8 sm:mb-12">
          {packageCategories
  .map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 min-h-11 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white border border-slate-200 text-foreground hover:border-primary/50'
              }`}
            >
              {t(`packagesPage.categories.${category}`) || category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-muted-foreground">{error}</div>
        )}

        {!loading && !error && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-0"
                >
                  <PackageCard pkg={pkg} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && filteredPackages.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground">{t('packagesPage.noPackages')}</p>
          </div>
        )}
      </SectionContainer>
    </Section>
  )
}
