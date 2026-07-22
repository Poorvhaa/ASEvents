import { z } from 'zod'
import { hasXSS, hasSQL, parseFlexibleDate } from './sanitization'

// Helper to prevent script and SQL injection payloads on text inputs
const safeString = <T extends z.ZodTypeAny>(schema: T) => {
  return schema
    .refine(val => typeof val === 'string' ? !hasXSS(val) : true, { message: 'Potential script injection (XSS) detected.' })
    .refine(val => typeof val === 'string' ? !hasSQL(val) : true, { message: 'Potential SQL injection payload detected.' });
};

// ----------------------------------------------------------------
// Shared Field Schemas
// ----------------------------------------------------------------

export const nameField = safeString(
  z.string()
    .trim()
    .min(2, 'Please enter a valid name.')
    .max(60, 'Please enter a valid name.')
    .regex(/^[a-zA-Z\p{L}'\-\s]+$/u, 'Please enter a valid name.')
);

export const emailField = safeString(
  z.string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address.')
    .refine(val => !/\s/.test(val), 'Email cannot contain spaces.')
);

export const basePhoneField = z.string()
  .trim()
  .regex(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number.')
  .refine(val => (val.match(/\+/g) || []).length <= 1, 'Please enter a valid phone number.')
  .refine(val => {
    const digits = val.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }, 'Please enter a valid phone number.');

export const phoneFieldRequired = safeString(basePhoneField);

export const phoneFieldOptional = z.string().trim().optional().or(z.literal('')).superRefine((val, ctx) => {
  if (!val) return;
  const res = phoneFieldRequired.safeParse(val);
  if (!res.success) {
    res.error.issues.forEach(issue => ctx.addIssue(issue));
  }
});

export const futureDateField = z.string()
  .trim()
  .refine(val => {
    const d = parseFlexibleDate(val);
    if (!d) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }, { message: 'Please select a valid future event date.' });

export const timeField = z.string()
  .trim()
  .regex(/^(?:(1[0-2]|0?[1-9])(?::([0-5][0-9]))?\s*([aApP][mM])|(2[0-3]|[01]?[0-9]):([0-5][0-9]))$/, 'Please enter a valid time.');

export const guestCountInputSchema = z.union([
  z.number().int().min(1).max(100000),
  z.string()
    .trim()
    .regex(/^\d+$/, 'Please enter a valid guest count.')
    .transform(val => parseInt(val, 10))
    .pipe(z.number().int().min(1).max(100000))
], { invalid_type_error: 'Please enter a valid guest count.' });

export const budgetInputSchema = z.string()
  .trim()
  .transform(val => val.replace(/[₹$,\s]/g, ''))
  .refine(val => /^\d+(\.\d+)?$/.test(val), 'Please enter a valid budget.')
  .transform(val => parseFloat(val));

export const eventLocationField = safeString(
  z.string()
    .trim()
    .min(3, 'Please enter a valid location (at least 3 characters).')
    .max(150, 'Location must be under 150 characters.')
    .refine(val => /\p{L}/u.test(val), 'Location cannot contain only numbers or symbols.')
);

export const locationField = z.string()
  .min(1, "Please enter a valid event location.")
  .transform(val => val.trim().replace(/\s+/g, ' '))
  .refine(val => {
    if (val.length < 2 || val.length > 120) return false;
    const alphaMatches = val.match(/[a-zA-Z]/g);
    if (!alphaMatches || alphaMatches.length < 2) return false;
    if (!/^[a-zA-Z0-9\s\-',.]+$/.test(val)) return false;
    if (/<[^>]*>/g.test(val)) return false;
    if (val.toLowerCase().includes('script')) return false;
    return true;
  }, {
    message: "Please enter a valid event location."
  });

export const eventTypeField = z.string()
  .trim()
  .min(1, 'Please select an event type.');

export const messageField = safeString(
  z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must not exceed 2000 characters.')
    .refine(val => val.length > 0, 'Message cannot contain only spaces.')
);

const commonShortPrompts = ['hi', 'hello', 'event', 'test', 'help', 'hey', 'yo', 'please', 'none'];
export const aiPlannerPromptField = safeString(
  z.string()
    .trim()
    .min(10, 'Please describe your event.')
    .max(1500, 'Prompt must not exceed 1500 characters.')
    .refine(val => val.length > 0, 'Please describe your event.')
    .refine(val => {
      const lower = val.toLowerCase();
      return !commonShortPrompts.includes(lower);
    }, 'Please describe your event.')
);

// ----------------------------------------------------------------
// Form Specific Schemas
// ----------------------------------------------------------------

export const quoteSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneFieldRequired,
  eventType: eventTypeField,
  venueType: z.string().trim().max(100).optional(),
  location: locationField,
  guestCount: z.union([z.string(), z.number()]).optional(),
  budget: z.union([z.string(), z.number()]).optional(),
  requirements: z.string().trim().max(5000).optional(),
});

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneFieldOptional,
  eventType: eventTypeField.optional(), // custom for contact form context
  eventDate: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  subject: safeString(z.string().trim().min(1).max(200)),
  message: messageField,
});

export const bookingSchema = z.object({
  venueId: z.string().min(1),
  eventDate: futureDateField,
  customerName: nameField,
  email: emailField,
  phone: phoneFieldRequired,
  guestCount: guestCountInputSchema,
  message: z.string().trim().optional(),
});

export const leadSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneFieldRequired,
  location: locationField,
  eventType: eventTypeField,
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  venueType: z.string().optional(),
  specialRequirements: z.string().optional(),
  aiRecommendation: z.any().optional(),
});

export const chatSchema = z.object({
  eventType: eventTypeField,
  location: z.string().max(100).optional(),
  guestCount: z.string().max(50).optional(),
  budget: z.string().max(100).optional(),
  venueType: z.string().max(200).optional(),
  specialRequirements: z.string().max(5000).optional(),
  leadId: z.string().uuid().optional(),
  language: z.string().max(10).optional(),
});

export const availabilityQuerySchema = z.object({
  venueId: z.string().min(1),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const venuesQuerySchema = z.object({
  city: z.string().optional(),
  category: z.string().optional(),
  capacity: z.coerce.number().int().positive().optional(),
});

export const authSchema = z.object({
  name: nameField.optional(),
  email: emailField,
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const customPackageSchema = z.object({
  eventType: eventTypeField,
  guestCount: z.string().trim().min(1, 'Please select a guest count.'),
  location: z.string().trim().min(1, 'Please select a location.'),
});

