create table clinics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text not null,
  country text not null,
  region text not null check (region in ('EU', 'World')),
  categories text[] not null,
  price_min integer,
  price_max integer,
  currency text default 'EUR',
  rating numeric(2,1),
  review_count integer default 0,
  verified boolean default false,
  premium boolean default false,
  languages text[],
  description text,
  website_url text,
  contact_url text,
  address text,
  phone text,
  founded_year integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table clinics enable row level security;
create policy "Public read" on clinics for select using (true);

create index on clinics (country);
create index on clinics (region);
create index on clinics using gin (categories);
create index on clinics (rating desc);
create index on clinics (price_min);
