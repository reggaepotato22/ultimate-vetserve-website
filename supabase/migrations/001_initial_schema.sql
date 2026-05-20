-- ============================================================
--  Ultimate Vetserve — Full Supabase Schema & Setup
--  Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. EXTENSIONS ────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 2. PRODUCTS ──────────────────────────────────────────────
create table if not exists public.products (
  id                uuid default gen_random_uuid() primary key,
  name              text not null,
  category          text not null,
  category_slug     text not null,
  species           text[] default '{}',
  form              text not null default 'Injectable',
  description       text default '',
  full_description  text,
  active_ingredient text,
  dosage            text,
  withdrawal_period text,
  storage_info      text,
  stock             text default 'In Stock',
  tags              text[] default '{}',
  image_url         text,
  featured          boolean default false,
  order_index       integer default 0,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table public.products enable row level security;
create policy "Public can read products"        on public.products for select using (true);
create policy "Authenticated can insert products" on public.products for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update products" on public.products for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete products" on public.products for delete using (auth.role() = 'authenticated');

-- auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger products_updated_at before update on public.products
  for each row execute procedure public.set_updated_at();

-- ── 3. NEWS & EVENTS ─────────────────────────────────────────
create table if not exists public.news_events (
  id           uuid default gen_random_uuid() primary key,
  title        text not null,
  slug         text unique not null,
  excerpt      text,
  content      text,
  category     text default 'News',
  image_url    text,
  author       text default 'Ultimate Vetserve',
  published_at timestamptz default now(),
  featured     boolean default false,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

alter table public.news_events enable row level security;
create policy "Public can read news"              on public.news_events for select using (true);
create policy "Authenticated can insert news"     on public.news_events for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update news"     on public.news_events for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete news"     on public.news_events for delete using (auth.role() = 'authenticated');

create trigger news_updated_at before update on public.news_events
  for each row execute procedure public.set_updated_at();

-- ── 4. TEAM MEMBERS ──────────────────────────────────────────
create table if not exists public.team_members (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  title       text,
  bio         text,
  image_url   text,
  order_index integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.team_members enable row level security;
create policy "Public can read team"              on public.team_members for select using (true);
create policy "Authenticated can insert team"     on public.team_members for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update team"     on public.team_members for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete team"     on public.team_members for delete using (auth.role() = 'authenticated');

create trigger team_updated_at before update on public.team_members
  for each row execute procedure public.set_updated_at();

-- ── 5. SITE SETTINGS (key-value content store) ───────────────
create table if not exists public.site_settings (
  id         uuid default gen_random_uuid() primary key,
  key        text unique not null,
  value      jsonb,
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;
create policy "Public can read settings"              on public.site_settings for select using (true);
create policy "Authenticated can upsert settings"     on public.site_settings for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update settings"     on public.site_settings for update using (auth.role() = 'authenticated');

create trigger settings_updated_at before update on public.site_settings
  for each row execute procedure public.set_updated_at();

-- ── 6. INQUIRIES (from contact form & product basket) ────────
create table if not exists public.inquiries (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  phone       text,
  email       text,
  clinic      text,
  message     text,
  products    jsonb default '[]',   -- array of {id, name, qty}
  status      text default 'new',   -- new | read | replied
  created_at  timestamptz default now()
);

alter table public.inquiries enable row level security;
create policy "Anyone can insert inquiry"            on public.inquiries for insert with check (true);
create policy "Authenticated can read inquiries"     on public.inquiries for select using (auth.role() = 'authenticated');
create policy "Authenticated can update inquiries"   on public.inquiries for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete inquiries"   on public.inquiries for delete using (auth.role() = 'authenticated');

-- ── 7. STORAGE BUCKET ────────────────────────────────────────
-- Creates a public 'images' bucket for all site uploads
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  10485760,  -- 10 MB max per file
  array['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do nothing;

-- Public read access
create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'images');

-- Only authenticated users can upload
create policy "Authenticated can upload images"
  on storage.objects for insert
  with check (bucket_id = 'images' and auth.role() = 'authenticated');

-- Only authenticated users can update (replace) images
create policy "Authenticated can update images"
  on storage.objects for update
  using (bucket_id = 'images' and auth.role() = 'authenticated');

-- Only authenticated users can delete images
create policy "Authenticated can delete images"
  on storage.objects for delete
  using (bucket_id = 'images' and auth.role() = 'authenticated');

-- ── 8. SEED DEFAULT SITE SETTINGS ────────────────────────────
insert into public.site_settings (key, value) values
('contact', '{"phone":"+254 724 241542","email":"info@ultimatevetserve.com","address":"Ultimate House, Oloolua, Ngong, Kajiado County, Kenya","hours":"Mon–Fri 8am–4:30pm"}')
on conflict (key) do nothing;

-- ============================================================
--  DONE. Now go to:
--  Supabase → Authentication → Users → Add User
--  Email: admin@ultimatevetserve.com
--  Password: (choose a strong password)
--  That account can log in to the admin portal at /admin/login
-- ============================================================
