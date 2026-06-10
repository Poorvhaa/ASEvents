'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { VenueAvailability } from '@/components/venues/venue-availability'
import type { Venue } from '@/lib/types/venues'

interface VenueInquiryFormProps {
  venue: Venue
}

export function VenueInquiryForm({ venue }: VenueInquiryFormProps) {
  const maxGuests = parseInt(venue.capacity.replace(/\D/g, ''), 10) || 0
  const [guestError, setGuestError] = useState('')
  const [dateAvailable, setDateAvailable] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guests: '',
    message: '',
  })

  const capacityExceeded = Boolean(guestError)
  const canSubmit = !capacityExceeded && dateAvailable && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueId: venue.id,
          eventDate: formData.eventDate,
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          guestCount: parseInt(formData.guests, 10) || 1,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-green-800 font-medium">Booking request submitted!</p>
        <p className="text-sm text-green-700 mt-2">
          We&apos;ll contact you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none"
          placeholder="+91 95103 24143"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-foreground mb-1.5">
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none"
          />
          <VenueAvailability
            venueId={venue.id}
            eventDate={formData.eventDate}
            onAvailabilityChange={setDateAvailable}
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1.5">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            required
            min={1}
            value={formData.guests}
            onChange={(e) => {
              const value = e.target.value
              setFormData({ ...formData, guests: value })
              const guestCount = parseInt(value, 10)
              if (!Number.isNaN(guestCount) && guestCount > maxGuests) {
                setGuestError(
                  `Guest count exceeds venue capacity. Maximum Capacity: ${venue.capacity}`
                )
              } else {
                setGuestError('')
              }
            }}
            className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none ${
              guestError
                ? 'border-2 border-red-500 bg-red-50/30'
                : 'border border-slate-200 focus:border-primary'
            }`}
            placeholder={`Maximum ${venue.capacity}`}
          />
          {guestError && (
            <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm text-red-700 font-medium">⚠ Guest count exceeds venue capacity.</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none resize-none"
          placeholder={`I'm interested in booking ${venue.name}...`}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        disabled={!canSubmit}
        type="submit"
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-blue-700 font-semibold disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting…' : 'Request Booking'}
      </Button>
    </form>
  )
}
