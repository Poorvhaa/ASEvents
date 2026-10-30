'use client'

import { useState, useMemo } from 'react'
import { Search, Tag, X } from 'lucide-react'
import {
  blogPosts,
  blogCategories,
  blogTags,
  BlogPost,
  sortBlogPostsByDateDescending,
} from '@/lib/data/blog'
import { ArticleCard } from './article-card'

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Filter posts based on active category, search query, and selected tag
  // Guarantees date descending order across all search and filter scenarios
  const filteredPosts = useMemo(() => {
    const matches = blogPosts.filter((post) => {
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
    return sortBlogPostsByDateDescending(matches)
  }, [activeCategory, searchQuery, selectedTag])

  const totalResults = filteredPosts.length
  const activeFiltersCount =
    (activeCategory !== 'All' ? 1 : 0) + (searchQuery ? 1 : 0) + (selectedTag ? 1 : 0)

  const clearAllFilters = () => {
    setActiveCategory('All')
    setSearchQuery('')
    setSelectedTag(null)
  }

  // Dynamic section heading reflecting active filter state
  const sectionTitle = useMemo(() => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery.trim()}"`
    }
    if (selectedTag && activeCategory === 'All') {
      return `Articles Tagged: ${selectedTag}`
    }
    if (selectedTag && activeCategory !== 'All') {
      return `${activeCategory} • Tagged: ${selectedTag}`
    }
    if (activeCategory === 'All') {
      return 'Latest Articles'
    }
    return activeCategory
  }, [activeCategory, searchQuery, selectedTag])

  return (
    <section className="pt-28 pb-16 sm:pb-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Compact Clean Header Area */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            Articles &amp; Guides
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Latest Articles
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Explore the latest event planning guides, wedding insights and professional tips from AS Event Management.
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
          {/* Main Continuous Date-Sorted Card Grid */}
          <div className="lg:col-span-3">
            {filteredPosts.length > 0 ? (
              <section aria-labelledby="articles-grid-heading" className="space-y-6">
                {/* Section Header with Title and Result Count */}
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <h2
                    id="articles-grid-heading"
                    className="text-2xl font-serif font-bold text-foreground flex items-center gap-2.5"
                  >
                    <span>{sectionTitle}</span>
                    <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {totalResults}
                    </span>
                  </h2>
                </div>

                {/* Single Continuous 2-Column Responsive Card Grid (Newest to Oldest) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, idx) => (
                    <ArticleCard key={post.id} post={post} index={idx} />
                  ))}
                </div>
              </section>
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
