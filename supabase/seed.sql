-- Optional seed data for AS Events venues and packages
-- Run after schema.sql

INSERT INTO venues (id, name, city, category, capacity, price_range, description, image, gallery)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Royal Palace Wedding Hall',
    'Ahmedabad',
    'Wedding Halls',
    800,
    '₹2,50,000',
    'Premium wedding hall on SG Highway with grand mandap setup.',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
    '[]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Grand Vadodara Banquet',
    'Vadodara',
    'Banquet Halls',
    500,
    '₹1,80,000',
    'Elegant banquet hall in Sayajigunj for weddings and corporate events.',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
    '[]'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO packages (name, category, price, description, features)
VALUES
  (
    'Essential Wedding Package',
    'Wedding',
    250000,
    'Perfect for intimate celebrations',
    '["Decor", "Photography", "Catering for 100 guests"]'::jsonb
  ),
  (
    'Complete Wedding Package',
    'Wedding',
    850000,
    'Full wedding planning from haldi to reception',
    '["Full decor", "Premium catering", "Photography & videography", "Entertainment"]'::jsonb
  )
ON CONFLICT DO NOTHING;
