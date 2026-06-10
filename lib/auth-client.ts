export const auth = {
  async getSession() {
    try {
      const res = await fetch('/api/admin/session', { credentials: 'include' })
      if (!res.ok) return null
      const data = await res.json()
      return data.authenticated ? { user: { email: 'admin@asevents.in', role: 'admin' } } : null
    } catch {
      return null
    }
  },
  async signOut() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
  },
}

export const authClient = {
  signIn: {
    email: async ({ email, password }: { email: string; password: string }) => {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        return { error: { message: data.error || 'Invalid credentials' } }
      }
      return { error: null }
    },
  },
  signUp: {
    email: async () => ({
      error: { message: 'Sign up is disabled. Contact administrator.' },
    }),
  },
}
