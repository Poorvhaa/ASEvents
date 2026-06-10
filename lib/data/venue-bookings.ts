export interface MockVenueBooking {
  venueId: string
  bookedDates: string[]
}

/** Mock availability data — replace with Supabase/API in production */
export const mockVenueBookings: MockVenueBooking[] = [
  {
    venueId: '1',
    bookedDates: ['2026-12-15', '2026-12-20', '2026-11-08'],
  },
  {
    venueId: '2',
    bookedDates: ['2026-10-05', '2026-12-25'],
  },
  {
    venueId: '3',
    bookedDates: ['2026-12-31', '2027-01-15'],
  },
  {
    venueId: '4',
    bookedDates: ['2026-09-14', '2026-11-22'],
  },
  {
    venueId: '5',
    bookedDates: ['2026-12-10', '2026-12-18'],
  },
]

export function getBookedDatesForVenue(venueId: string): string[] {
  return mockVenueBookings.find((b) => b.venueId === venueId)?.bookedDates ?? []
}

export function isVenueDateBooked(venueId: string, eventDate: string): boolean {
  return getBookedDatesForVenue(venueId).includes(eventDate)
}
