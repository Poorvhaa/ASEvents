/** Server auth stub — admin uses cookie-based session via /api/admin/login */
export const auth = {
  api: {
    async getSession() {
      return null
    },
  },
}
