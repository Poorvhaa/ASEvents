'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import Link from 'next/link'

interface Quote {
  id: number
  name: string
  email: string
  eventType: string
  eventDate: string
  guestCount: number
  status: string
  createdAt: string
}

export default function AdminQuotes() {
  const [isLoading, setIsLoading] = useState(true)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        loadQuotes()
      }
    }
    checkAuth()
  }, [router])

  const loadQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes')
      if (response.ok) {
        const data = await response.json()
        setQuotes(data)
      }
    } catch (error) {
      console.error('Failed to load quotes:', error)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        loadQuotes()
      }
    } catch (error) {
      console.error('Failed to update quote status:', error)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Quote Requests</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Event Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Guests</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-3">{quote.name}</td>
                  <td className="px-6 py-3">{quote.email}</td>
                  <td className="px-6 py-3">{quote.eventType}</td>
                  <td className="px-6 py-3">{quote.guestCount}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        quote.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : quote.status === 'quoted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={quote.status}
                      onChange={(e) => updateStatus(quote.id, e.target.value)}
                      className="px-3 py-1 text-sm rounded border border-border bg-background"
                    >
                      <option value="pending">Pending</option>
                      <option value="viewed">Viewed</option>
                      <option value="quoted">Quoted</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
