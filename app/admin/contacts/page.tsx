'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import Link from 'next/link'

interface Contact {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminContacts() {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<Contact[]>([])
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
      const response = await fetch('/api/admin/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
    }
  }

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' }),
      })
      if (response.ok) {
        loadContacts()
      }
    } catch (error) {
      console.error('Failed to update contact status:', error)
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
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-3">{contact.name}</td>
                  <td className="px-6 py-3">{contact.email}</td>
                  <td className="px-6 py-3">{contact.subject}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {contact.status === 'new' && (
                      <button
                        onClick={() => markAsRead(contact.id)}
                        className="px-3 py-1 text-sm rounded bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        Mark as Read
                      </button>
                    )}
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
