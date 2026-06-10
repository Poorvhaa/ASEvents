'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import Link from 'next/link'
import type { DbContactInquiry } from '@/types/database'

export default function AdminContacts() {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<DbContactInquiry[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession()
      if (!session) {
        router.push('/sign-in')
      } else {
        setIsLoading(false)
        loadContacts()
      }
    }
    checkAuth()
  }, [router])

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts', { credentials: 'include' })
      if (response.ok) {
        setContacts(await response.json())
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
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
            <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Subject</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-3">{contact.name}</td>
                  <td className="px-6 py-3">{contact.email}</td>
                  <td className="px-6 py-3">{contact.subject}</td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {new Date(contact.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(expandedId === contact.id ? null : contact.id)
                      }
                      className="text-primary hover:underline"
                    >
                      {expandedId === contact.id ? 'Hide' : 'View'}
                    </button>
                    {expandedId === contact.id && (
                      <p className="mt-2 text-muted-foreground max-w-md">{contact.message}</p>
                    )}
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No contact messages yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
