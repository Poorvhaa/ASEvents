import { create } from 'zustand'

export interface QuoteModalPrefill {
  eventType?: string
  venue?: string
  venueName?: string
  venueCategory?: string
  venueCapacity?: string
  city?: string
  guestCount?: string
  eventDate?: string
  step?: number
  bookingBlocked?: boolean
  capacityExceeded?: boolean
}

interface QuoteModalStore extends QuoteModalPrefill {
  isOpen: boolean
  initialEventType: string
  initialVenue: string
  initialCity: string
  initialGuestCount: string
  initialStep: number
  initialVenueName: string
  initialVenueCategory: string
  initialVenueCapacity: string
  initialEventDate: string
  bookingBlocked: boolean
  capacityExceeded: boolean

  openModal: (options?: QuoteModalPrefill) => void
  closeModal: () => void
}

const defaults = {
  isOpen: false,
  initialEventType: '',
  initialVenue: '',
  initialCity: '',
  initialGuestCount: '',
  initialStep: 1,
  initialVenueName: '',
  initialVenueCategory: '',
  initialVenueCapacity: '',
  initialEventDate: '',
  bookingBlocked: false,
  capacityExceeded: false,
}

export const useQuoteModal = create<QuoteModalStore>((set) => ({
  ...defaults,

  openModal: (options) =>
    set({
      isOpen: true,
      initialEventType: options?.eventType || '',
      initialVenue: options?.venue || options?.venueName || '',
      initialVenueName: options?.venueName || options?.venue || '',
      initialVenueCategory: options?.venueCategory || '',
      initialVenueCapacity: options?.venueCapacity || '',
      initialCity: options?.city || '',
      initialGuestCount: options?.guestCount || '',
      initialEventDate: options?.eventDate || '',
      initialStep: options?.step || 1,
      bookingBlocked: options?.bookingBlocked ?? false,
      capacityExceeded: options?.capacityExceeded ?? false,
    }),

  closeModal: () => set({ ...defaults }),
}))
