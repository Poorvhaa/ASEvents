'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/lib/data/blog'

export const AS_EVENTS_CARD_LOGO = '/images/brand/as-events-logo-white.png'

export interface ArticleCardProps {
  post: BlogPost
  index?: number
  priority?: boolean
}

export function ArticleCard({ post, index = 0, priority = false }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-2xl border border-border/70 hover:border-primary/50 bg-card p-4 transition-all hover:shadow-md"
      >
        {/* Card Image Container with Consistent Brand Logo Overlay */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-4 shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />

          {/* AS Events Official Logo Overlay (Top-Left) */}
          <div
            className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] md:w-[54px] md:h-[54px] rounded-lg sm:rounded-xl bg-white shadow-sm sm:shadow p-0.5 sm:p-1 flex items-center justify-center border border-black/5">
              <Image
                src={AS_EVENTS_CARD_LOGO}
                alt="Apurv Shah – AS Events"
                width={54}
                height={54}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Featured Badge (Top-Right, cleanly avoiding overlap) */}
          {post.featured && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
              <span className="px-2.5 py-0.5 bg-primary text-slate-950 text-xs font-bold rounded-full shadow-md">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Category & Date */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <span className="text-primary font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          {post.date ? (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar size={12} />
              {post.date}
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* CTA & Read Time Footer */}
        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 text-primary font-semibold group-hover:gap-2.5 transition-all">
            Read Full Guide
            <ArrowRight size={14} />
          </span>
          {post.date && (
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Clock size={12} />
              {post.readTime}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
