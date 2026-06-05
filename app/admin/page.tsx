'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'

interface DashboardStats {
  totalQuotes: number
  pendingQuotes: number
  totalEvents: number
  totalContacts: number
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        // Fetch dashboard stats
        loadStats()
      }
    }
    checkAuth()
  }, [router])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">AS Events Admin</h1>
            <button
              onClick={() => auth.signOut()}
              className="px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Total Quotes</p>
            <p className="text-3xl font-bold text-foreground">{stats?.totalQuotes || 0}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Pending Quotes</p>
            <p className="text-3xl font-bold text-foreground">{stats?.pendingQuotes || 0}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="text-3xl font-bold text-foreground">{stats?.totalEvents || 0}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Total Contacts</p>
            <p className="text-3xl font-bold text-foreground">{stats?.totalContacts || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/quotes" className="block">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold text-foreground mb-2">Quote Requests</h3>
              <p className="text-muted-foreground">Manage quote inquiries and send responses</p>
            </div>
          </Link>

          <Link href="/admin/events" className="block">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold text-foreground mb-2">Events</h3>
              <p className="text-muted-foreground">Manage your events portfolio</p>
            </div>
          </Link>

          <Link href="/admin/contacts" className="block">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold text-foreground mb-2">Contact Messages</h3>
              <p className="text-muted-foreground">View and respond to contact submissions</p>
            </div>
          </Link>

          <Link href="/admin/content" className="block">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <h3 className="text-xl font-bold text-foreground mb-2">Content</h3>
              <p className="text-muted-foreground">Manage blog posts, gallery, and portfolio</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
