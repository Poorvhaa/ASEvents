'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  date: string
  location: string
  category: string
  status: string
  createdAt: string
}

export default function AdminEvents() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>([])
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        loadEvents()
      }
    }
    checkAuth()
  }, [router])

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/admin/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    }
  }

  const deleteEvent = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
        if (response.ok) {
          loadEvents()
        }
      } catch (error) {
        console.error('Failed to delete event:', error)
      }
    }
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
              <h1 className="text-2xl font-bold text-foreground">Events</h1>
            </div>
            <Link
              href="/admin/events/new"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              Add Event
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-4">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="flex-1 px-3 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEvent(event.id)}
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
