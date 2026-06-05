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

export function PortfolioGrid() {
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <LayoutGrid size={18} />
              Events
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'gallery'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Images size={18} />
              Gallery
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white border border-slate-200 text-foreground hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {activeTab === 'events' && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-12 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Events Grid */}
        {activeTab === 'events' && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedEvent(item)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-primary text-sm font-medium">{item.category}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                    <MapPin size={14} />
                    <span className="text-sm">{item.location}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Gallery Grid */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filteredGallery.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={index % 3 === 0 ? 500 : index % 3 === 1 ? 300 : 400}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">{image.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'events' && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
          </div>
        )}

        {activeTab === 'gallery' && filteredGallery.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No gallery images found in this category.</p>
          </div>
        )}

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
              >
                <div className="relative aspect-video">
                  <Image src={selectedEvent.image} alt={selectedEvent.title} fill className="object-cover" />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <span className="text-primary text-sm font-medium">{selectedEvent.category}</span>
                  <h2 className="text-3xl font-serif font-bold text-foreground mt-2 mb-4">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-6 mb-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-primary" />
                      <span>{selectedEvent.guests} Guests</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-8">{selectedEvent.description}</p>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Event Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedEvent.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${selectedEvent.title} gallery ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-5xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[85vh] rounded-xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
