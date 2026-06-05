import { pgTable, text, timestamp, boolean, serial, integer, decimal, jsonb } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  phone: text('phone'),
  role: text('role').notNull().default('user'), // user or admin
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// --- Event Management ---
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  location: text('location').notNull(),
  category: text('category').notNull(), // wedding, corporate, birthday, etc.
  status: text('status').notNull().default('pending'), // pending, confirmed, completed, cancelled
  image: text('image'),
  details: jsonb('details'), // store flexible event data
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- Quote Requests ---
export const quoteRequests = pgTable('quoteRequests', {
  id: serial('id').primaryKey(),
  userId: text('userId'), // nullable for guests
  eventType: text('eventType').notNull(),
  eventDate: timestamp('eventDate').notNull(),
  guestCount: integer('guestCount').notNull(),
  budget: text('budget'),
  location: text('location').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  requirements: text('requirements'),
  status: text('status').notNull().default('pending'), // pending, viewed, quoted, accepted, rejected
  quote: decimal('quote', { precision: 12, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- Contact Submissions ---
export const contactSubmissions = pgTable('contactSubmissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'), // new, read, responded
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})


// --- Gallery Items ---
export const galleryItems = pgTable('galleryItems', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  image: text('image').notNull(),
  thumbnail: text('thumbnail'),
  category: text('category').notNull(), // wedding, corporate, birthday, etc.
  type: text('type').notNull().default('image'), // image, video
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Portfolio Items ---
export const portfolioItems = pgTable('portfolioItems', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  fullDescription: text('fullDescription'),
  image: text('image').notNull(),
  thumbnail: text('thumbnail'),
  category: text('category').notNull(), // wedding, corporate, birthday, etc.
  date: timestamp('date'),
  client: text('client'),
  location: text('location'),
  highlights: text('highlights'), // JSON or comma-separated
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
