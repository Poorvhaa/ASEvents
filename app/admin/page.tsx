'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import type { LeadRecord, LeadStatus } from '@/lib/ai/types'
import type { DbVenueBooking, DbContactInquiry, DbAiConsultation } from '@/types/database'

interface CrmStats {
  totalLeads: number
  venueBookings: number
  pendingInquiries: number
  aiConsultations: number
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<CrmStats | null>(null)
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [bookings, setBookings] = useState<DbVenueBooking[]>([])
  const [contacts, setContacts] = useState<DbContactInquiry[]>([])
  const [statusFilter, setStatusFilter] = useState<LeadStatus | ''>('')
  const [eventTypeFilter, setEventTypeFilter] = useState('')
  const router = useRouter()

  const loadCrm = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      if (eventTypeFilter) params.set('eventType', eventTypeFilter)

      const response = await fetch(`/api/admin/crm?${params}`, { credentials: 'include' })
      if (response.status === 401) {
        router.push('/sign-in')
        return
      }
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setLeads(data.leads || [])
        setBookings(data.bookings || [])
        setContacts(data.contacts || [])
      }
    } catch (error) {
      console.error('Failed to load CRM:', error)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        loadCrm()
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (!isLoading) loadCrm()
  }, [statusFilter, eventTypeFilter])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">AS Events CRM</h1>
          <button
            onClick={() => auth.signOut().then(() => router.push('/sign-in'))}
            className="px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90 text-sm"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats?.totalLeads ?? 0 },
            { label: 'Venue Bookings', value: stats?.venueBookings ?? 0 },
            { label: 'Pending Inquiries', value: stats?.pendingInquiries ?? 0 },
            { label: 'AI Consultations', value: stats?.aiConsultations ?? 0 },
          ].map((card) => (
            <div key={card.label} className="bg-card p-5 rounded-lg border border-border">
              <p className="text-xs sm:text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | '')}
            className="px-3 py-2 rounded-lg border border-border text-sm bg-background"
          >
            <option value="">All Statuses</option>
            {(['New', 'Contacted', 'Quoted', 'Booked', 'Closed'] as LeadStatus[]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Filter by event type"
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />
          <Link
            href="/admin/leads"
            className="px-4 py-2 rounded-lg border border-primary text-primary text-sm hover:bg-primary/5"
          >
            Full Leads View →
          </Link>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3 hidden sm:table-cell">Event</th>
                  <th className="text-left p-3 hidden md:table-cell">City</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3 hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 10).map((lead) => (
                  <tr key={lead.id} className="border-t border-border">
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3 hidden sm:table-cell">{lead.eventType}</td>
                    <td className="p-3 hidden md:table-cell">{lead.city}</td>
                    <td className="p-3">{lead.status}</td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted-foreground">
                      No leads yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-semibold mb-4">Venue Bookings</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 8).map((b) => (
                    <tr key={b.id} className="border-t border-border">
                      <td className="p-3">{b.customer_name}</td>
                      <td className="p-3">{b.event_date}</td>
                      <td className="p-3">{b.status}</td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-muted-foreground">
                        No bookings yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Contact Requests</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Subject</th>
                    <th className="text-left p-3 hidden sm:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.slice(0, 8).map((c) => (
                    <tr key={c.id} className="border-t border-border">
                      <td className="p-3">{c.name}</td>
                      <td className="p-3">{c.subject}</td>
                      <td className="p-3 hidden sm:table-cell text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-muted-foreground">
                        No contact requests yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
