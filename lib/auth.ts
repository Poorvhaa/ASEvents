/** Server auth stub — admin uses cookie-based session via /api/admin/login */
import { cookies } from 'next/headers'

export interface Session {
  user: {
    id: string
    email: string
    role: string
  }
}

export const auth = {
  api: {
    async getSession(options?: { headers?: Headers }): Promise<Session | null> {
      const cookieStore = await cookies()
      const token = cookieStore.get('admin_session')?.value
      const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
      if (secret && token === secret) {
        return {
          user: {
            id: 'admin',
            email: 'admin@asevents.in',
            role: 'admin',
          },
        }
      }
      return null
    },
  },
}
