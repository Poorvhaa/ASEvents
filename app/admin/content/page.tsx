'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import Link from 'next/link'

interface ContentItem {
  id: number
  title: string
  type: 'blog' | 'gallery' | 'portfolio'
  category: string
  createdAt: string
}

export default function AdminContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [activeTab, setActiveTab] = useState<'blog' | 'gallery' | 'portfolio'>('blog')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        loadContent('blog')
      }
    }
    checkAuth()
  }, [router])

  const loadContent = async (type: 'blog' | 'gallery' | 'portfolio') => {
    try {
      const response = await fetch(`/api/${type}`)
      if (response.ok) {
        const data = await response.json()
        const items = data.map((item: any) => ({
          ...item,
          type,
        }))
        setContentItems(items)
      }
    } catch (error) {
      console.error(`Failed to load ${type}:`, error)
    }
  }

  const handleTabChange = (tab: 'blog' | 'gallery' | 'portfolio') => {
    setActiveTab(tab)
    loadContent(tab)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
            </div>
            <Link
              href={`/admin/content/new?type=${activeTab}`}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              Add {activeTab === 'blog' ? 'Post' : activeTab === 'gallery' ? 'Image' : 'Portfolio'}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {['blog', 'gallery', 'portfolio'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab as any)}
              className={`px-4 py-2 font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">Category: {item.category}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/admin/content/${item.id}?type=${item.type}`}
                  className="flex-1 px-3 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this item?')) {
                      await fetch(`/api/${item.type}/${item.id}`, { method: 'DELETE' })
                      loadContent(item.type)
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
