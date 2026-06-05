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
  visible           boolean default true,
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
  visible     boolean default true,
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
('homepage', '{"heroTitle":"Your Trusted Partner in Veterinary Excellence","heroTitleAccent":"Veterinary Excellence","heroSubtitle":"Premium veterinary pharmaceuticals for livestock, poultry, and companion animals across Kenya.","heroBadge":"Kenya''s Most Trusted Vet Pharma Supplier","ctaPrimary":"Browse Products","ctaSecondary":"Contact Sales","stat1Val":"500+","stat1Label":"Products","stat2Val":"1,000+","stat2Label":"Customers","stat3Val":"15+","stat3Label":"Counties","stat4Val":"100%","stat4Label":"Certified","whyTitle":"Why Choose Ultimate Vetserve?","whySubtitle":"Four reasons thousands of vets and farmers across Kenya trust us.","newsTitle":"News & Insights","newsSubtitle":"Stay informed on the latest in veterinary health management."}')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('contact', '{"phone":"+254 724 241542","email":"info@ultimatevetserve.com","address":"Ultimate House, Oloolua, Ngong, Kajiado County, Kenya","hours":"Mon–Fri 8am–4:30pm","heroImage":"https://images.unsplash.com/photo-1596526134530-727856838726?auto=format&fit=crop&q=80&w=1600","mapImage":"https://images.unsplash.com/photo-1524668951403-d44b28200ce9?auto=format&fit=crop&q=80&w=800"}')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('about', '{"heroImage":"https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1800","storyImage":"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=700","commitmentBg":"https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80&w=1600","heroTitle":"About Us","heroSubtitle":"Learn about our commitment to veterinary excellence, animal welfare, and pharmaceutical standards across Kenya.","storyTitle":"Our Story","storyText":"Ultimate Vetserve Limited was established to provide veterinarians and livestock farmers with premium-quality, regulated veterinary pharmaceuticals and supplies. Based in Ngong, Kajiado County, we serve customers across Kenya with a product range of over 500 registered veterinary medicines.","vision":"To become the leading provider of veterinary pharmaceuticals in East Africa, recognized for quality, reliability, and compassionate animal healthcare solutions.","mission":"To provide veterinarians and animal owners with premium-quality medications and supplies, ensuring optimal health outcomes for all animals under their care.","values":"Quality assurance, ethical practices, customer dedication, innovation in animal healthcare, and unwavering commitment to animal welfare.","teamTitle":"Meet Our Team","teamSubtitle":"Dedicated professionals with deep expertise in veterinary pharmaceuticals.","stat1Val":"500+","stat1Label":"Certified Products","stat2Val":"15+","stat2Label":"Counties Served","commitmentValues":"[\"International pharmaceutical quality standards\",\"Regulatory compliance with Kenya Veterinary Board\",\"Cold-chain integrity for temperature-sensitive products\",\"Expert technical support for every product\",\"Transparent supply chain and ethical sourcing\",\"Ongoing investment in animal welfare research\"]"}')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('sustainability_programs', '[{"title":"Mobile Veterinary Clinics","description":"Free and subsidised mobile clinics dispatched to remote areas lacking veterinary infrastructure. Services include disease diagnosis, vaccinations, deworming, and emergency treatments."},{"title":"Farmer Education & Training","description":"Structured training workshops teaching smallholder farmers essential animal husbandry skills — disease recognition, nutrition, biosecurity, and proper medication administration."},{"title":"Subsidised Deworming Campaigns","description":"Mass deworming campaigns for small ruminants in resource-limited communities using discounted ALBENSERVE boluses and oral anthelmintics to reduce parasite burden."},{"title":"Disease Surveillance & Reporting","description":"Field officers trained to identify and report outbreak-level diseases, helping the Department of Veterinary Services respond swiftly to emerging animal health threats."},{"title":"Youth in Veterinary Agriculture","description":"Sponsoring university students in veterinary and animal science programmes through bursaries and internships, investing in the next generation of Kenyan animal health professionals."},{"title":"Sustainable Livestock Practices","description":"Promoting sustainable, low-input livestock management — rotational grazing, integrated pest management, and natural feed supplementation to reduce chemical dependency."}]')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('sustainability_stats', '[{"value":"12,000+","label":"Animals Treated","description":"Through mobile clinic outreach programmes across rural Kenya"},{"value":"2,500+","label":"Farmers Trained","description":"In basic animal health management and disease prevention"},{"value":"18","label":"Counties Reached","description":"Mobile veterinary services delivered in underserved areas"},{"value":"95%","label":"Positive Outcomes","description":"Animals treated through our programmes showing full recovery"}]')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('sustainability_commitments', '["Supply only fully certified and registered veterinary pharmaceuticals","Maintain cold chain integrity for all temperature-sensitive products","Responsible disposal and return of expired pharmaceutical products","Zero tolerance for counterfeit or substandard veterinary drugs","Support the Kenya Veterinary Board''s efforts to combat illegal veterinary products","Partner with NGOs and government to extend animal healthcare access"]')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('sustainability_partners', '[{"name":"Veterinarians with a Mission Programme (VMP)","website":"https://kenyavetsmission.org","desc":"Primary outreach partner serving pastoral communities in Kenya''s ASAL regions"},{"name":"Kenya Veterinary Board (KVB)","website":"https://kvb.go.ke","desc":"Regulatory compliance and professional standards oversight"},{"name":"Dept. of Veterinary Services (DVS)","website":"#","desc":"Government coordination for disease surveillance and control"},{"name":"KEPHIS","website":"https://kephis.org","desc":"Phytosanitary and agricultural regulatory body"},{"name":"Kenya Dairy Board (KDB)","website":"#","desc":"Dairy sector quality standards and farmer support"},{"name":"FAO Kenya","website":"https://fao.org","desc":"Food security and sustainable agriculture alignment"}]')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('species_cards', '[{"name":"Cattle & Livestock","tag":"Antibiotics · Antiparasitic · Nutrition","count":"12+ Products","image":"https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=700"},{"name":"Poultry","tag":"Vaccines · Vitamins · Treatments","count":"8+ Products","image":"https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=700"},{"name":"Companion Pets","tag":"Antiparasitic · Vitamins · Care","count":"5+ Products","image":"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=700"},{"name":"General Use","tag":"Disinfectants · Supplements","count":"3+ Products","image":"https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=700"}]')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('commitment_cards', '[{"title":"Certified Quality","description":"Every product is registered with the Kenya Veterinary Board and meets KEBS international standards before it reaches your hands.","image":"https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?auto=format&fit=crop&q=80&w=600","icon":"BadgeCheck"},{"title":"Nationwide Delivery","description":"Consistent stock availability and rapid cold-chain delivery to veterinary professionals across 15+ Kenyan counties.","image":"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600","icon":"Truck"},{"title":"Expert Guidance","description":"Our trained veterinary pharmaceutical specialists provide professional support on product selection and disease management.","image":"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600","icon":"HeartPulse"}]')
on conflict (key) do nothing;

insert into public.site_settings (key, value) values
('sustainability', '{"heroImage":"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1600","heroTitle":"Healthier Animals.\nStronger Communities.","heroSubtitle":"Our commitment to advancing animal health and supporting veterinary professionals across Kenya.","heroBadge":"Our Commitment to Kenya","heroParagraph":"At Ultimate Vetserve Limited, our responsibility extends beyond commerce. We are committed to advancing animal health, supporting veterinary professionals, and partnering with the Veterinarians with a Mission Programme (VMP) — a Christian NGO dedicated to serving unreached pastoral communities across Kenya through professional veterinary care and the Gospel.","missionTitle":"Our Sustainability Mission","missionText":"We believe that access to quality veterinary care should not be limited by geography or income. Through our programmes and partnerships, we actively work to extend animal health services beyond commercial boundaries into the communities that need them most.","kvmTitle":"Kenya Veterinary Mission Partnership","kvmText":"Ultimate Vetserve is a proud partner of Kenya Veterinary Mission (kenyavetsmission.org), supporting their outreach programmes with subsidised pharmaceuticals, technical expertise, and co-funding of mobile veterinary clinics.","vmpTitle":"Supporting the<br /><span class=''text-primary''>Veterinarians with a Mission Programme</span>","vmpSubtitle":"Our Key Partnership","vmpParagraph1":"The Veterinarians with a Mission Programme (VMP) is a non-governmental organisation (NGO) dedicated to providing professional veterinary services in Kenya''s Arid and Semi-Arid Lands (ASAL). VMP serves the unreached pastoral communities through a dual mission of professional veterinary care and sharing the love of Christ.","vmpParagraph2":"Through our formal partnership with VMP, Ultimate Vetserve supplies subsidised pharmaceutical products, technical expertise, and co-funds mobile veterinary clinics reaching communities in Kajiado, Narok, Machakos, Kitui, and Trans Nzoia counties — areas where veterinary infrastructure is limited and pastoralist communities depend on healthy livestock for their livelihoods.","vmpImage":"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=700","vmpBullets":"[\"Subsidised pharmaceuticals for VMP outreach programmes serving pastoralist communities\",\"Joint mobile clinic events and farmer field days in Arid and Semi-Arid Lands (ASAL)\",\"Technical training for VMP community animal health workers\",\"Co-sponsorship of mass deworming and vaccination campaigns\",\"Emergency veterinary response in drought-affected regions\"]","programsSectionTitle":"Our Impact Programmes","programsSectionSubtitle":"Six active programmes designed to extend quality animal healthcare beyond commercial reach — into the communities and farms that need it most.","commitmentSectionTitle":"Our Commitment to<br /><span class=''text-green-400''>Responsible Practice</span>","commitmentSectionSubtitle":"We hold ourselves accountable to the highest ethical and regulatory standards in the distribution of veterinary pharmaceuticals. Every product we supply is rigorously verified to protect animal welfare and public health.","commitmentSectionBadge":"Responsible Business","commitmentStats":"[{\"val\":\"100%\",\"label\":\"Registered Products\",\"sub\":\"All pharmaceuticals licensed by KVB\"},{\"val\":\"0\",\"label\":\"Counterfeits Tolerated\",\"sub\":\"Zero tolerance policy enforced\"},{\"val\":\"5+\",\"label\":\"Years in Operation\",\"sub\":\"Building trust across Kenya\"},{\"val\":\"15+\",\"label\":\"Counties Served\",\"sub\":\"Nationwide distribution network\"}]","ctaTitle":"Join the Mission","ctaText":"Whether you''re a veterinary professional, a farmer, or an organisation — there are ways to support the Veterinarians with a Mission Programme and help extend animal health access across Kenya''s pastoral communities."}')
on conflict (key) do nothing;

-- ============================================================
--  DONE. Now go to:
--  Supabase → Authentication → Users → Add User
--  Email: admin@ultimatevetserve.com
--  Password: (choose a strong password)
--  That account can log in to the admin portal at /admin/login
-- ============================================================
