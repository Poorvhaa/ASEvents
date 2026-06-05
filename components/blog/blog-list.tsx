'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react'

const categories = ['All', 'Weddings', 'Corporate', 'Planning Tips', 'Trends', 'Inspiration']

const tags = ['Luxury Events', 'Destination', 'Decor', 'Catering', 'Entertainment', 'Budget']

const blogPosts = [
  {
    id: 1,
    title: '10 Trends Shaping Luxury Weddings in 2024',
    excerpt: 'Discover the latest trends in luxury wedding planning, from sustainable choices to immersive experiences that are defining modern celebrations.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Trends',
    tags: ['Luxury Events', 'Weddings'],
    featured: true,
  },
  {
    id: 2,
    title: 'Corporate Event Planning: A Complete Guide',
    excerpt: 'Everything you need to know about planning successful corporate events that leave lasting impressions on attendees and stakeholders.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
    date: 'March 10, 2024',
    readTime: '12 min read',
    category: 'Corporate',
    tags: ['Corporate', 'Planning Tips'],
    featured: true,
  },
  {
    id: 3,
    title: 'Choosing the Perfect Destination Wedding Location',
    excerpt: 'Expert tips on selecting the ideal destination for your dream wedding abroad, from beach paradises to historic European venues.',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200',
    date: 'March 5, 2024',
    readTime: '10 min read',
    category: 'Weddings',
    tags: ['Destination', 'Weddings'],
    featured: false,
  },
  {
    id: 4,
    title: 'The Art of Event Catering: Creating Memorable Dining Experiences',
    excerpt: 'How to elevate your event with exceptional catering that delights guests and complements your celebration theme.',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=1200',
    date: 'February 28, 2024',
    readTime: '7 min read',
    category: 'Planning Tips',
    tags: ['Catering', 'Luxury Events'],
    featured: false,
  },
  {
    id: 5,
    title: 'Sustainable Event Planning: Eco-Friendly Celebrations',
    excerpt: 'How to create stunning events while minimizing environmental impact through sustainable practices and conscious choices.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
    date: 'February 20, 2024',
    readTime: '9 min read',
    category: 'Trends',
    tags: ['Trends', 'Planning Tips'],
    featured: false,
  },
  {
    id: 6,
    title: 'Entertainment Ideas That Wow Your Guests',
    excerpt: 'From live bands to interactive experiences, discover entertainment options that take your event to the next level.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200',
    date: 'February 15, 2024',
    readTime: '6 min read',
    category: 'Inspiration',
    tags: ['Entertainment', 'Inspiration'],
    featured: false,
  },
  {
    id: 7,
    title: 'Budget-Friendly Tips for Luxury Events',
    excerpt: 'Learn how to achieve a high-end look and feel without breaking the bank with these smart planning strategies.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
    date: 'February 10, 2024',
    readTime: '8 min read',
    category: 'Planning Tips',
    tags: ['Budget', 'Planning Tips'],
    featured: false,
  },
  {
    id: 8,
    title: 'Decor Trends: Transforming Spaces into Experiences',
    excerpt: 'Explore the latest decor trends that are transforming event spaces into immersive, Instagram-worthy experiences.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
    date: 'February 5, 2024',
    readTime: '7 min read',
    category: 'Trends',
    tags: ['Decor', 'Trends'],
    featured: false,
  },
]

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesCategory && matchesSearch && matchesTag
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-primary text-sm font-medium">{post.category}</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-medium mt-4 group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </motion.article>
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
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group cursor-pointer flex flex-col md:flex-row gap-6"
                  >
                    <div className="relative w-full md:w-72 aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-primary text-sm font-medium">{post.category}</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-medium group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </motion.article>
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
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <Tag size={12} />
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
