import { create } from 'zustand'

export interface QuoteModalPrefill {
  eventType?: string
  step?: number
}

interface QuoteModalStore {
  isOpen: boolean
  initialEventType: string
  initialStep: number

  openModal: (options?: QuoteModalPrefill) => void
  closeModal: () => void
}

const defaults = {
  isOpen: false,
  initialEventType: '',
  initialStep: 1,
}

export const useQuoteModal = create<QuoteModalStore>((set) => ({
  ...defaults,

  openModal: (options) =>
    set({
      isOpen: true,
      initialEventType: options?.eventType || '',
      initialStep: options?.step || 1,
    }),

  closeModal: () => set({ ...defaults }),
}))
