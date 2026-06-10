-- AS Events — Supabase schema
-- Run in Supabase SQL Editor or via CLI migration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT NOT NULL,
  city TEXT,
  guest_count TEXT,
  budget TEXT,
  venue_preference TEXT,
  requirements TEXT,
  source TEXT DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_event_type ON leads (event_type);

-- ---------------------------------------------------------------------------
-- contact_inquiries
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries (created_at DESC);

-- ---------------------------------------------------------------------------
-- venues
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  price_range TEXT,
  description TEXT,
  image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_venues_city ON venues (city);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues (category);
CREATE INDEX IF NOT EXISTS idx_venues_capacity ON venues (capacity);

-- ---------------------------------------------------------------------------
-- venue_bookings
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS venue_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID NOT NULL REFERENCES venues (id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guest_count INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venue_bookings_venue_date ON venue_bookings (venue_id, event_date);
CREATE INDEX IF NOT EXISTS idx_venue_bookings_status ON venue_bookings (status);

-- ---------------------------------------------------------------------------
-- packages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_packages_category ON packages (category);

-- ---------------------------------------------------------------------------
-- ai_consultations
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lead_id UUID REFERENCES leads (id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_consultations_created_at ON ai_consultations (created_at DESC);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;

-- Public read for venues and packages
CREATE POLICY "venues_public_read" ON venues FOR SELECT USING (true);
CREATE POLICY "packages_public_read" ON packages FOR SELECT USING (true);

-- Public insert for leads, contacts, bookings, consultations
CREATE POLICY "leads_public_insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_inquiries_public_insert" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "venue_bookings_public_insert" ON venue_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "ai_consultations_public_insert" ON ai_consultations FOR INSERT WITH CHECK (true);

-- Public read bookings for availability checks (date conflict only)
CREATE POLICY "venue_bookings_public_read" ON venue_bookings FOR SELECT USING (true);
