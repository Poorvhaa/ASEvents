'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Video } from 'lucide-react'

const categories = ['All', 'Weddings', 'Corporate', 'Social', 'Destination']

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200', category: 'Weddings', type: 'image' },
  { id: 2, src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=1200', category: 'Weddings', type: 'image' },
  { id: 3, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200', category: 'Corporate', type: 'image' },
  { id: 4, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200', category: 'Corporate', type: 'image' },
  { id: 5, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200', category: 'Social', type: 'image' },
  { id: 6, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200', category: 'Social', type: 'image' },
  { id: 7, src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200', category: 'Destination', type: 'image' },
  { id: 8, src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200', category: 'Destination', type: 'image' },
  { id: 9, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200', category: 'Weddings', type: 'image' },
  { id: 10, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200', category: 'Corporate', type: 'image' },
  { id: 11, src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200', category: 'Corporate', type: 'image' },
  { id: 12, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200', category: 'Social', type: 'image' },
]

const videoItems = [
  { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', title: 'Royal Wedding Highlights', category: 'Weddings' },
  { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', title: 'Tech Summit Recap', category: 'Corporate' },
  { id: 'v3', thumbnail: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800', title: 'Maldives Dream Wedding', category: 'Destination' },
  { id: 'v4', thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800', title: 'Sweet 16 Celebration', category: 'Social' },
]

export function GalleryContent() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = galleryImages.filter((item) => 
    activeCategory === 'All' || item.category === activeCategory
  )

  const filteredVideos = videoItems.filter((item) => 
    activeCategory === 'All' || item.category === activeCategory
  )

  const handlePrevImage = () => {
    const newIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const handleNextImage = () => {
    const newIndex = currentImageIndex === filteredImages.length - 1 ? 0 : currentImageIndex + 1
    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const openLightbox = (image: typeof galleryImages[0]) => {
    const index = filteredImages.findIndex((img) => img.id === image.id)
    setCurrentImageIndex(index)
    setSelectedImage(image)
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-card rounded-full p-1 border border-border">
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'images'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <ImageIcon size={18} />
              Images
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'videos'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Video size={18} />
              Videos
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
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

        {/* Images Gallery */}
        {activeTab === 'images' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(image)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={`Gallery image ${image.id}`}
                    width={400}
                    height={index % 3 === 0 ? 500 : index % 3 === 1 ? 300 : 400}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-foreground font-medium">View</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Videos Gallery */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-4">{video.title}</h3>
                <span className="text-primary text-sm">{video.category}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <motion.div
                key={selectedImage.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl max-h-[85vh] px-16"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={`Gallery image ${selectedImage.id}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[85vh] rounded-lg"
                />
              </motion.div>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
