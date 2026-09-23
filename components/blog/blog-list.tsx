'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react'
import { blogPosts, blogCategories, blogTags } from '@/lib/data/blog'

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesCategory && matchesSearch && matchesTag
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`} className="group block h-full">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-muted">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-slate-950 text-xs font-semibold rounded-full shadow-md">
                              Featured
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-primary text-sm font-semibold">{post.category}</span>
                          <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <Calendar size={14} />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                          Read Full Guide
                          <ArrowRight size={16} />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
                {activeCategory === 'All' ? 'All Articles' : activeCategory}
              </h2>
              <div className="space-y-8">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col md:flex-row gap-6 p-4 rounded-2xl hover:bg-muted/30 transition-all border border-transparent hover:border-border/60"
                    >
                      <div className="relative w-full md:w-72 aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Calendar size={12} />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all mt-auto">
                          Read More
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8 p-6 rounded-2xl bg-card border border-border/70 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3">Search Articles</h3>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8 p-6 rounded-2xl bg-card border border-border/70 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3">Categories</h3>
              <div className="space-y-1.5">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`block w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors font-medium ${
                      activeCategory === category
                        ? 'bg-primary text-slate-950 font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blogTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-slate-950 font-bold'
                        : 'bg-muted/40 border border-border/60 text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <Tag size={11} />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
