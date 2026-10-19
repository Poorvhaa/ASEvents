'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ChevronRight, Share2, Sparkles } from 'lucide-react'
import { BlogPost } from '@/lib/data/blog'

interface ArticleHeaderProps {
  post: BlogPost
  badgeLabel?: string
  shareTitle?: string
}

export function ArticleHeader({ post, badgeLabel, shareTitle }: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: shareTitle || post.title,
          url: window.location.href,
        })
        .catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      {/* 1. Official Article Logo - Centered above breadcrumbs and title */}
      <div className="flex justify-center mb-6">
        <Link
          href="/"
          className="group inline-flex items-center justify-center p-2 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-all"
          title="AS Events – Return to Home"
        >
          <div className="relative w-24 sm:w-28 h-24 sm:h-28 flex items-center justify-center overflow-hidden rounded-xl bg-white">
            <Image
              src="/images/brand/as-events-logo-white.png"
              alt="Apurv Shah – AS Events"
              width={112}
              height={112}
              priority
              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* 2. Standardized Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Articles
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="text-foreground font-medium truncate max-w-[240px] sm:max-w-md">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* 3. Category & Optional Guide/Type Label */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
          <Sparkles className="w-3.5 h-3.5" />
          {post.category}
        </span>
        {badgeLabel && (
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold ml-1">
            {badgeLabel}
          </span>
        )}
      </div>

      {/* 4. H1 Article Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
        {post.title}
      </h1>

      {/* 5. Subtitle / Excerpt */}
      {post.excerpt && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 font-light">
          {post.excerpt}
        </p>
      )}

      {/* 6. Standardized Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/60 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {post.author?.name || 'Apurv Shah'}
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>{post.author?.role || 'Lead Event Director, AS Events'}</span>
          </div>
          {post.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{post.date}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:border-primary/40 bg-card"
          title="Share Article"
        >
          <Share2 className="w-4 h-4" />
          {copied ? 'Link Copied!' : 'Share Guide'}
        </button>
      </div>
    </header>
  )
}
