'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    alt: 'Luxury wedding reception',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop',
    alt: 'Elegant table setting',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop',
    alt: 'Birthday celebration',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop',
    alt: 'Corporate gala',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    alt: 'Outdoor wedding',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    alt: 'Anniversary party',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    alt: 'Conference event',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop',
    alt: 'Beach wedding',
  },
]

export function GalleryPreview() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Gallery</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Moments We&apos;ve <span className="text-gold-gradient">Captured</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Browse through our collection of unforgettable events and see the magic we create.
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={index % 2 === 0 ? 300 : 400}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-foreground font-medium">View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-gold-light px-8">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[80vh]"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh] rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
