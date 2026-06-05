-- ============================================================
--  Add missing visibility columns
--  Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Add visible column to products if missing
alter table public.products add column if not exists visible boolean default true;

-- Add visible column to team_members if missing
alter table public.team_members add column if not exists visible boolean default true;

-- Update existing rows to be visible by default
update public.products set visible = true where visible is null;
update public.team_members set visible = true where visible is null;
