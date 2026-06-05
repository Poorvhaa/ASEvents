import { create } from 'zustand'

interface QuoteModalStore {
  isOpen: boolean
  initialEventType: string
  initialStep: number

  openModal: (options?: {
    eventType?: string
    step?: number
  }) => void

  closeModal: () => void
}

export const useQuoteModal = create<QuoteModalStore>((set) => ({
  isOpen: false,
  initialEventType: '',
  initialStep: 1,

  openModal: (options) =>
    set({
      isOpen: true,
      initialEventType: options?.eventType || '',
      initialStep: options?.step || 1,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      initialEventType: '',
      initialStep: 1,
    }),
}))
