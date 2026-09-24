'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
} from 'lucide-react'
import { BlogPost } from '@/lib/data/blog'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'

interface GenericArticleContentProps {
  post: BlogPost
}

export function GenericArticleContent({ post }: GenericArticleContentProps) {
  const { openModal } = useQuoteModal()

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(() => {})
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Article link copied to clipboard!')
    }
  }

  return (
    <article className="pt-28 pb-20 bg-background text-foreground">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 lg:px-8 max-w-4xl mb-6">
        <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight size={14} className="text-muted-foreground/60" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight size={14} className="text-muted-foreground/60" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* 2. Article Header */}
      <header className="container mx-auto px-4 lg:px-8 max-w-4xl mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
            {post.category.toUpperCase()}
          </span>
          <span className="text-muted-foreground/60 text-xs">·</span>
          <span className="text-muted-foreground text-xs">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.15] mb-4 text-balance">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
          {post.excerpt}
        </p>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/60 text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <span className="uppercase tracking-wider font-semibold text-primary">
              {post.category.toUpperCase()}
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-muted-foreground">{post.readTime}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 bg-card"
          >
            <Share2 size={14} />
            Share Article
          </button>
        </div>
      </header>

      {/* 3. Hero Image */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl mb-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/40 bg-muted">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 text-white text-xs sm:text-sm">
            <span className="font-semibold text-primary block text-[11px] uppercase tracking-wider mb-0.5">
              AS Events • Inspiration & Trends
            </span>
            <span>{post.title}</span>
          </div>
        </div>
      </div>

      {/* 4. Article Body Content */}
      <main className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary shadow-sm mb-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
            Design Philosophy
          </span>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-2">
            Transforming Spaces into Unforgettable Experiences
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Modern event design has moved beyond surface-level decoration. Today&apos;s most memorable
            celebrations focus on atmosphere, sensory depth, spatial harmony, and crafting environments
            where guests feel immediately immersed and celebrated.
          </p>
        </div>

        <section className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-base sm:text-lg mb-10 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              1. Experiential & Immersive Layouts
            </h2>
            <p>
              Traditional banquet setups with rows of identical tables are being replaced by curated
              multizone environments. Contemporary event planners create progressive journeys: an
              inviting entry foyer that sets the mood, lounge vignettes for relaxed conversation,
              dynamic focal points for ceremonial proceedings, and vibrant celebration areas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              2. Dramatic Ceiling Installations & Cascading Florals
            </h2>
            <p>
              Decor is no longer restricted to tabletop centerpieces. High-impact overhead floral
              canopies, cascading botanical greens, and suspended crystal chandeliers draw the eyes
              upward, transforming massive venues into intimate, luxurious spaces.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              3. Ambient Lighting as an Architectural Feature
            </h2>
            <p>
              Lighting is the secret catalyst that transforms good décor into pure magic. Pin-spotting
              focal tables, warm architectural uplighting along venue perimeter walls, kinetic light
              fixtures, and custom neon storytelling pieces establish emotional depth and photograph
              magnificently.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              4. Sustainable & Earth-Toned Textures
            </h2>
            <p>
              Couples and corporate hosts alike are embracing authentic textures — textured linens,
              natural rattan accents, terracotta warmth, dried botanicals blended with live seasonal
              blooms, and repurposed décor elements that marry luxury with thoughtful consciousness.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              5. High-Impact Photo Backdrops & Memory Zones
            </h2>
            <p>
              Interactive photo installations have evolved into personalized works of art. From custom
              floral monogram walls and editorial backdrops to vintage lounge vignettes, these spaces
              encourage guests to document and share memories naturally.
            </p>
          </div>
        </section>

        {/* Practical Checklist Box */}
        <div className="my-10 p-6 sm:p-8 bg-card border border-border/80 rounded-2xl shadow-sm">
          <h3 className="text-xl font-serif font-bold text-foreground mb-3">
            Core Decor Planning Checklist
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/90">
            {[
              'Align décor palette with venue architecture & lighting',
              'Design distinct zones for arrival, dining, and celebration',
              'Ensure optimal sightlines and guest movement flow',
              'Coordinate floral density and seasonal availability',
              'Balance overhead ceiling structures with table proportions',
              'Test ambient lighting transitions from day to evening',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/30">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Card */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-primary/30 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                Bring Your Vision to Life
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                Design Your Dream Event with AS Events
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                From conceptual styling and stage design to bespoke floral architecture and venue
                transformations, AS Events provides turnkey decor and event management across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Button
                  onClick={() => openModal()}
                  className="bg-primary text-slate-950 font-bold hover:bg-primary/90 px-6 py-3 rounded-xl shadow-lg"
                >
                  <Sparkles size={16} className="mr-2" />
                  Request Decor Consultation
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-white/10 hover:text-white rounded-xl"
                >
                  <Link href="/portfolio" className="flex items-center gap-1.5">
                    <span>View Decor Portfolio</span>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
                <a
                  href="tel:+919510324143"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-primary" />
                  +91 95103 24143
                </a>
                <a
                  href="mailto:as.eventmanagement2829@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-primary" />
                  as.eventmanagement2829@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </article>
  )
}
