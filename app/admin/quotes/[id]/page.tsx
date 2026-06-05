'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import Link from 'next/link'

interface QuoteDetail {
  id: number
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: number
  budget: string
  location: string
  requirements: string
  status: string
  quote: number | null
  createdAt: string
}

export default function AdminQuoteDetail() {
  const [isLoading, setIsLoading] = useState(true)
  const [quote, setQuote] = useState<QuoteDetail | null>(null)
  const [quoteAmount, setQuoteAmount] = useState('')
  const router = useRouter()
  const params = useParams()
  const quoteId = params.id as string

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        loadQuote()
      }
    }
    checkAuth()
  }, [router])

  const loadQuote = async () => {
    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}`)
      if (response.ok) {
        const data = await response.json()
        setQuote(data)
        if (data.quote) {
          setQuoteAmount(data.quote.toString())
        }
      }
    } catch (error) {
      console.error('Failed to load quote:', error)
    }
  }

  const sendQuote = async () => {
    if (!quoteAmount) {
      alert('Please enter a quote amount')
      return
    }

    try {
      await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'quoted',
          quote: parseFloat(quoteAmount),
        }),
      })

      // Send email
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote-sent',
          to: quote?.email,
          name: quote?.name,
          amount: quoteAmount,
        }),
      })

      loadQuote()
      alert('Quote sent successfully!')
    } catch (error) {
      console.error('Failed to send quote:', error)
      alert('Failed to send quote')
    }
  }

  if (isLoading || !quote) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/admin/quotes" className="text-muted-foreground hover:text-foreground">
            ← Back to Quotes
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{quote.name}</h1>
          <p className="text-muted-foreground mb-8">
            Received: {new Date(quote.createdAt).toLocaleDateString()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${quote.email}`} className="text-primary hover:underline">
                    {quote.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${quote.phone}`} className="text-primary hover:underline">
                    {quote.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Event Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Event Type</p>
                  <p className="text-foreground font-medium">{quote.eventType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Event Date</p>
                  <p className="text-foreground font-medium">
                    {new Date(quote.eventDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Guest Count</p>
                  <p className="text-foreground font-medium">{quote.guestCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget Range</p>
                  <p className="text-foreground font-medium">{quote.budget || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Requirements</h2>
            <p className="text-foreground bg-muted p-4 rounded-lg">{quote.requirements}</p>
          </div>

          {quote.status === 'pending' || quote.status === 'viewed' ? (
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-foreground mb-4">Send Quote</h2>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  placeholder="Enter quote amount"
                  className="flex-1 px-4 py-2 rounded border border-border bg-background text-foreground"
                />
                <button
                  onClick={sendQuote}
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                >
                  Send Quote
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground font-semibold">Quote Amount: ${quote.quote}</p>
              <p className="text-muted-foreground mt-2">Status: {quote.status}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
