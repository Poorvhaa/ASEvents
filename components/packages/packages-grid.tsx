'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageCard } from '@/components/cards/package-card'
import { packages, packageCategories } from '@/lib/data/packages'
import type { PackageCategoryFilter } from '@/lib/types/packages'
import { Section, SectionContainer } from '@/components/layout/section-container'

const categoryMap: Record<PackageCategoryFilter, string | null> = {
  All: null,
  Weddings: 'wedding',
  Corporate: 'corporate',
  'Social Events': 'social',
  Exhibitions: 'exhibition',
  Entertainment: 'entertainment',
}

export function PackagesGrid() {
  const [activeCategory, setActiveCategory] = useState<PackageCategoryFilter>('All')

  const filteredPackages = packages.filter((pkg) => {
    const category = categoryMap[activeCategory]
    return category === null || pkg.category === category
  })

  return (
    <Section className="bg-background">
      <SectionContainer>
        <div className="filter-scroll justify-center sm:justify-start mb-8 sm:mb-12">
          {packageCategories.map((category) => (
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
              {category}
            </button>
          ))}
        </div>

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

        {filteredPackages.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground">No packages found in this category.</p>
          </div>
        )}
      </SectionContainer>
    </Section>
  )
}
