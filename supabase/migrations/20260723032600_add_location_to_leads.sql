-- Migration to add location column to leads table
-- Created at 2026-07-23T03:26:00+05:30

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS location TEXT;
