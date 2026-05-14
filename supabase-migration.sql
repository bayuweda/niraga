-- Migration: Add whatsapp column to stores
alter table public.stores add column if not exists whatsapp text;
