'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Calendar, Users, X, Search, LayoutGrid, Images } from 'lucide-react'
import {
  portfolioItems,
  galleryImages,
  portfolioCategories,
  categorySlugMap,
  type PortfolioItem,
  type GalleryImage,
} from '@/lib/data/portfolio'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

export function PortfolioGrid() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'events' | 'gallery'>('events')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<PortfolioItem | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    const category = searchParams.get('category')
    if (category && categorySlugMap[category]) {
      setActiveCategory(categorySlugMap[category])
    }
    if (searchParams.get('tab') === 'gallery') {
      setActiveTab('gallery')
    }
  }, [searchParams])

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredGallery = galleryImages.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  )

  return (
    <Section className="bg-background">
      <SectionContainer>
        <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-1">
          <div className="inline-flex bg-white rounded-full p-1 border border-slate-200 shadow-sm shrink-0">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 min-h-11 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <LayoutGrid size={18} />
              {t('portfolioPage.grid.events')}
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 min-h-11 px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Images size={18} />
              {t('portfolioPage.grid.gallery')}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="filter-scroll justify-start sm:justify-center">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 min-h-11 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white border border-slate-200 text-foreground hover:border-primary/50'
                }`}
              >
                {t(`portfolioPage.categories.${category}`) || category}
              </button>
            ))}
          </div>

          {activeTab === 'events' && (
            <div className="relative w-full max-w-md mx-auto sm:mx-0 sm:ml-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="search"
                placeholder={t('portfolioPage.grid.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-11 pl-12 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-foreground text-sm sm:text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </div>

        {activeTab === 'events' && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer min-w-0"
                  onClick={() => setSelectedEvent(item)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 sm:mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-primary text-xs sm:text-sm font-medium">
                    {t(`portfolioPage.categories.${item.category}`) || item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-small truncate">{item.location}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
          >
            {filteredGallery.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={index % 3 === 0 ? 500 : index % 3 === 1 ? 300 : 400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {t(`portfolioPage.categories.${image.category}`) || image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'events' && filteredItems.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground">{t('portfolioPage.grid.noEvents')}</p>
          </div>
        )}

        {activeTab === 'gallery' && filteredGallery.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground">{t('portfolioPage.grid.noImages')}</p>
          </div>
        )}

        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/80"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200"
              >
                <div className="relative aspect-video sm:aspect-video min-h-[200px]">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="touch-target w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors"
                    aria-label={t('quoteModal.close')}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-5 sm:p-8">
                  <span className="text-primary text-sm font-medium">
                    {t(`portfolioPage.categories.${selectedEvent.category}`) || selectedEvent.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-2 mb-4">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mb-6 text-muted-foreground text-small">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary shrink-0" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary shrink-0" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-primary shrink-0" />
                      <span>{selectedEvent.guests} {t('portfolioPage.grid.guestsLabel')}</span>
                    </div>
                  </div>
                  <p className="text-body text-muted-foreground mb-6 sm:mb-8">{selectedEvent.description}</p>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">{t('portfolioPage.grid.eventGallery')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {selectedEvent.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${selectedEvent.title} gallery ${i + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-3 sm:p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 sm:top-6 sm:right-6 touch-target text-white hover:text-primary transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                aria-label={t('portfolioPage.grid.closeLightbox')}
              >
                <X size={28} />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-5xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  className="object-contain w-full h-auto max-h-[85vh] rounded-xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionContainer>
    </Section>
  )
}
