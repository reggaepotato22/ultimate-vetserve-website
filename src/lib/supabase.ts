import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL     ?? '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ── Image upload helper ───────────────────────────────────────
// folder: 'products' | 'news' | 'team' | 'species' | 'hero' | 'settings'
// Returns the public URL of the uploaded file, or throws on error.
export async function uploadImage(file: File, folder = 'products'): Promise<string> {
  if (!supabase) throw new Error('Supabase not configured');
  const ext  = file.name.split('.').pop() ?? 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from('images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);
  return publicUrl;
}

// ── Image delete helper ───────────────────────────────────────
// Pass the full public URL; extracts the storage path automatically.
export async function deleteImage(publicUrl: string): Promise<void> {
  if (!supabase || !publicUrl) return;
  try {
    const url  = new URL(publicUrl);
    // path after /storage/v1/object/public/images/
    const path = url.pathname.split('/images/')[1];
    if (path) await supabase.storage.from('images').remove([path]);
  } catch {
    // silent — image may already be gone
  }
}

// ── Typed table helpers ───────────────────────────────────────
export const db = {
  products:     () => supabase?.from('products'),
  news:         () => supabase?.from('news_events'),
  team:         () => supabase?.from('team_members'),
  settings:     () => supabase?.from('site_settings'),
  inquiries:    () => supabase?.from('inquiries'),
} as const;

/*
  ── SUPABASE SETUP SQL ──────────────────────────────────────────────────────
  Run this in your Supabase SQL editor to set up all required tables.

  -- Products
  create table public.products (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    category text not null,
    category_slug text not null,
    species text[] default '{}',
    form text not null default 'Injectable',
    description text default '',
    full_description text,
    active_ingredient text,
    dosage text,
    withdrawal_period text,
    storage_info text,
    stock_status text default 'In Stock',
    tags text[] default '{}',
    image_url text,
    featured boolean default false,
    order_index integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
  );
  alter table public.products enable row level security;
  create policy "Public read" on public.products for select using (true);
  create policy "Auth all"    on public.products for all   using (auth.role() = 'authenticated');

  -- News & Events
  create table public.news_events (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text unique not null,
    excerpt text,
    content text,
    category text default 'News',
    image_url text,
    author text default 'Ultimate Vetserve',
    published_at timestamptz default now(),
    featured boolean default false,
    created_at timestamptz default now()
  );
  alter table public.news_events enable row level security;
  create policy "Public read" on public.news_events for select using (true);
  create policy "Auth all"    on public.news_events for all   using (auth.role() = 'authenticated');

  -- Site Settings (key-value content store)
  create table public.site_settings (
    id uuid default gen_random_uuid() primary key,
    key text unique not null,
    value jsonb,
    updated_at timestamptz default now()
  );
  alter table public.site_settings enable row level security;
  create policy "Public read" on public.site_settings for select using (true);
  create policy "Auth all"    on public.site_settings for all   using (auth.role() = 'authenticated');

  -- Team Members
  create table public.team_members (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    title text,
    bio text,
    image_url text,
    order_index integer default 0
  );
  alter table public.team_members enable row level security;
  create policy "Public read" on public.team_members for select using (true);
  create policy "Auth all"    on public.team_members for all   using (auth.role() = 'authenticated');

  -- Storage bucket for images
  insert into storage.buckets (id, name, public) values ('images', 'images', true);
  create policy "Public read"  on storage.objects for select using (bucket_id = 'images');
  create policy "Auth upload"  on storage.objects for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
  create policy "Auth delete"  on storage.objects for delete using  (bucket_id = 'images' and auth.role() = 'authenticated');
  ─────────────────────────────────────────────────────────────────────────────
*/
