'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { buildProposalDocument } from '@/services/pdfService'
import { DownloadProposalButton } from '@/components/pdf/download-proposal-button'
import type { LeadPayload } from '@/lib/ai/types'

export function LeadForm() {
  const { answers, recommendation } = useAIConsultant()
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: answers.city || '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recommendation) return

    setIsSubmitting(true)
    setError('')

    const payload: LeadPayload = {
      ...formData,
      city: formData.city || answers.city,
      eventType: answers.eventType,
      eventDate: answers.eventDate,
      guestCount: answers.guestCount,
      budget: answers.budget,
      venuePreference: answers.venuePreference,
      specialRequirements: answers.specialRequirements,
      aiRecommendation: recommendation,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const proposalDoc =
    recommendation &&
    buildProposalDocument(
      {
        ...formData,
        city: formData.city || answers.city,
        eventType: answers.eventType,
        eventDate: answers.eventDate,
        guestCount: answers.guestCount,
        budget: answers.budget,
        venuePreference: answers.venuePreference,
        specialRequirements: answers.specialRequirements,
      },
      recommendation
    )

  if (submitted) {
    return (
      <div className="p-4 border-t border-slate-200 bg-slate-50 text-center space-y-3">
        <p className="text-sm font-semibold text-foreground">Thank you! Your proposal request has been received.</p>
        <p className="text-xs text-muted-foreground">Our team will contact you within 24 hours.</p>
        {proposalDoc && (
          <DownloadProposalButton
            document={proposalDoc}
            className="border-primary/50 text-primary w-full"
          />
        )}
      </div>
    )
  }

  return (
    <div className="p-4 border-t border-slate-200 bg-slate-50">
      <h3 className="text-sm font-semibold text-foreground mb-1">Receive Your Personalized Proposal</h3>
      <p className="text-xs text-muted-foreground mb-4">Get a detailed plan sent to your inbox.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none bg-white"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none bg-white"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none bg-white"
        />
        <input
          type="text"
          placeholder="City"
          required
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none bg-white"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-blue-700 font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Get My Proposal'}
        </Button>
      </form>
    </div>
  )
}
