'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Download } from 'lucide-react'
import type { LeadRecord, LeadStatus } from '@/lib/ai/types'

const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Quoted', 'Booked', 'Closed']

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All')
  const [isLoading, setIsLoading] = useState(true)

  const loadLeads = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (statusFilter !== 'All') params.set('status', statusFilter)

      const res = await fetch(`/api/admin/leads?${params}`, { credentials: 'include' })
      if (res.ok) {
        setLeads(await res.json())
      }
    } catch (error) {
      console.error('Failed to load leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [statusFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    loadLeads()
  }

  const updateStatus = async (id: string, status: LeadStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) loadLeads()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const exportCSV = () => {
    const params = new URLSearchParams({ format: 'csv' })
    if (search) params.set('search', search)
    if (statusFilter !== 'All') params.set('status', statusFilter)
    window.open(`/api/admin/leads?${params}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-muted-foreground hover:text-primary text-sm">
              ← Back
            </Link>
            <h1 className="text-2xl font-serif font-bold text-foreground">AI Leads</h1>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none"
            />
          </form>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-2 rounded-full text-xs font-medium ${
                statusFilter === 'All' ? 'bg-primary text-primary-foreground' : 'border border-slate-200'
              }`}
            >
              All
            </button>
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-full text-xs font-medium ${
                  statusFilter === s ? 'bg-primary text-primary-foreground' : 'border border-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Loading leads...</p>
        ) : leads.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No leads found.</p>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Contact</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Event</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Venue Type</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Location</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Budget</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3">
                        <div>{lead.email}</div>
                        <div className="text-xs text-muted-foreground">{lead.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div>{lead.eventType}</div>
                        <div className="text-xs text-muted-foreground">{lead.guestCount} guests</div>
                      </td>
                      <td className="px-4 py-3">{lead.venueType || 'N/A'}</td>
                      <td className="px-4 py-3">{lead.location || 'N/A'}</td>
                      <td className="px-4 py-3">{lead.budget || '—'}</td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:border-primary focus:outline-none"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
