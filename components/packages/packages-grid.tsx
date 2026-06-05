'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageCard } from '@/components/cards/package-card'
import { packages, packageCategories } from '@/lib/data/packages'
import type { PackageCategoryFilter } from '@/lib/types/packages'

const categoryMap: Record<PackageCategoryFilter, string | null> = {
  All: null,
  Wedding: 'wedding',
  Corporate: 'corporate',
  Social: 'social',
  Festival: 'festival',
}

export function PackagesGrid() {
  const [activeCategory, setActiveCategory] = useState<PackageCategoryFilter>('All')

  const filteredPackages = packages.filter((pkg) => {
    const category = categoryMap[activeCategory]
    return category === null || pkg.category === category
  })

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {packageCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PackageCard pkg={pkg} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No packages found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
