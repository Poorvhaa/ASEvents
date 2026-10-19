'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Search, Tag, X } from 'lucide-react'
import { blogPosts, blogCategories, blogTags, BlogPost } from '@/lib/data/blog'

function parsePostDate(dateStr?: string): number {
  if (!dateStr) return 0
  const parsed = new Date(dateStr).getTime()
  return isNaN(parsed) ? 0 : parsed
}

interface ArticleCardProps {
  post: BlogPost
  index: number
}

function ArticleCard({ post, index }: ArticleCardProps) {
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
        {/* Card Image */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-4 shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          {post.featured && (
            <div className="absolute top-3 left-3 z-10">
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

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Filter posts based on active category, search query, and selected tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase()
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      const matchesTag = !selectedTag || post.tags.includes(selectedTag)
      return matchesCategory && matchesSearch && matchesTag
    })
  }, [activeCategory, searchQuery, selectedTag])

  // Order of categories to display
  const categoryOrder = useMemo(() => {
    const defined = ['Planning Tips', 'Weddings', 'Corporate', 'Trends', 'Inspiration']
    if (activeCategory !== 'All') {
      return [activeCategory]
    }
    return defined
  }, [activeCategory])

  // Group filtered posts by category, sorted newest first
  const groupedByCategory = useMemo(() => {
    const groups: { [cat: string]: BlogPost[] } = {}

    for (const cat of categoryOrder) {
      const postsInCat = filteredPosts.filter(
        (p) => p.category.toLowerCase() === cat.toLowerCase()
      )
      if (postsInCat.length > 0) {
        // Sort newest publication date first
        groups[cat] = [...postsInCat].sort((a, b) => parsePostDate(b.date) - parsePostDate(a.date))
      }
    }

    // Also include any posts from other categories if present and activeCategory === 'All'
    if (activeCategory === 'All') {
      for (const post of filteredPosts) {
        const found = categoryOrder.some((c) => c.toLowerCase() === post.category.toLowerCase())
        if (!found) {
          if (!groups[post.category]) groups[post.category] = []
          groups[post.category].push(post)
        }
      }
    }

    return groups
  }, [filteredPosts, categoryOrder, activeCategory])

  const totalResults = filteredPosts.length
  const activeFiltersCount =
    (activeCategory !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0) + (selectedTag ? 1 : 0)

  const clearAllFilters = () => {
    setActiveCategory('All')
    setSearchQuery('')
    setSelectedTag(null)
  }

  return (
    <section className="pt-28 pb-16 sm:pb-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Compact Clean Header Area (replaces old oversized hero) */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            Articles &amp; Guides
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Articles
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Expert planning guides, ideas, and event management insights from AS Events.
          </p>

          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50 text-xs">
              <span className="text-muted-foreground">
                Showing {totalResults} {totalResults === 1 ? 'article' : 'articles'}
              </span>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium ml-2 px-2 py-0.5 rounded bg-primary/5 border border-primary/20"
              >
                <X size={12} />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Category-wise Content Area */}
          <div className="lg:col-span-3">
            {Object.keys(groupedByCategory).length > 0 ? (
              <div className="space-y-14">
                {Object.entries(groupedByCategory).map(([catName, posts]) => (
                  <section
                    key={catName}
                    aria-labelledby={`category-heading-${catName.toLowerCase().replace(/\s+/g, '-')}`}
                    className="space-y-6"
                  >
                    {/* Category Section Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <h2
                        id={`category-heading-${catName.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-2xl font-serif font-bold text-foreground flex items-center gap-2.5"
                      >
                        <span>{catName}</span>
                        <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {posts.length}
                        </span>
                      </h2>
                    </div>

                    {/* Standardized 2-Column Responsive Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {posts.map((post, idx) => (
                        <ArticleCard key={post.id} post={post} index={idx} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 rounded-2xl bg-card border border-border/70">
                <p className="text-base text-foreground font-semibold mb-2">
                  No articles found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your search terms or clearing selected category filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-bold text-sm hover:bg-primary/90 transition-all"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Search Box */}
            <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Search Articles
              </h3>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 text-sm rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3">Categories</h3>
              <div className="space-y-1.5">
                {blogCategories.map((category) => {
                  const isSelected = activeCategory === category
                  const count =
                    category === 'All'
                      ? blogPosts.length
                      : blogPosts.filter(
                          (p) => p.category.toLowerCase() === category.toLowerCase()
                        ).length

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`flex items-center justify-between w-full text-left px-3.5 py-2 rounded-xl text-sm transition-all font-medium ${
                        isSelected
                          ? 'bg-primary text-slate-950 font-bold shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-slate-950/20 text-slate-950 font-bold'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blogTags.map((tag) => {
                  const isSelected = selectedTag === tag
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-slate-950 font-bold shadow-sm'
                          : 'bg-muted/40 border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                      }`}
                    >
                      <Tag size={11} />
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
