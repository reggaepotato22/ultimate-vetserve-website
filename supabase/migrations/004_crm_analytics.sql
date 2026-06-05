-- ============================================================
--  CRM & Analytics tables
--  Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. PAGE VIEWS (public analytics tracking) ───────────────
create table if not exists public.page_views (
  id         uuid default gen_random_uuid() primary key,
  path       text not null,
  referrer   text,
  user_agent text,
  created_at timestamptz default now()
);

alter table public.page_views enable row level security;
create policy "Anyone can log views"          on public.page_views for insert with check (true);
create policy "Authenticated can read views"  on public.page_views for select using (auth.role() = 'authenticated');
create policy "Authenticated can delete views" on public.page_views for delete using (auth.role() = 'authenticated');

-- ── 2. ENABLE REALTIME for live CRM updates ──────────────
alter publication supabase_realtime add table inquiries;
alter publication supabase_realtime add table page_views;
