import { z } from 'zod'

export const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  eventType: z.string().min(1).max(100),
  city: z.string().max(100).optional(),
  guestCount: z.union([z.string(), z.number()]).optional(),
  budget: z.string().max(100).optional(),
  venuePreference: z.string().max(200).optional(),
  requirements: z.string().max(5000).optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
})

export const bookingSchema = z.object({
  venueId: z.string().min(1),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  customerName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20).optional(),
  guestCount: z.number().int().positive().max(100_000),
})

export const chatSchema = z.object({
  eventType: z.string().min(1).max(100),
  city: z.string().max(100).optional(),
  guestCount: z.string().max(50).optional(),
  budget: z.string().max(100).optional(),
  venuePreference: z.string().max(200).optional(),
  specialRequirements: z.string().max(5000).optional(),
  leadId: z.string().uuid().optional(),
})

export const availabilityQuerySchema = z.object({
  venueId: z.string().min(1),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export const venuesQuerySchema = z.object({
  city: z.string().optional(),
  category: z.string().optional(),
  capacity: z.coerce.number().int().positive().optional(),
})
