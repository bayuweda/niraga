-- Supabase Database Schema for Niraga

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS (mirrors auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STORES
create table if not exists public.stores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  description text,
  logo_emoji text default '🏪',
  whatsapp text,
  shipping_info text,
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PRODUCTS
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  name text not null,
  emoji text default '📦',
  price integer not null, -- in rupiah
  unit text not null, -- e.g., "isi 20 pcs", "500gr"
  bg_color text default '#f0fdf4',
  stock integer default 0,
  is_active boolean default true,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORDERS
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  customer_name text not null,
  customer_contact text,
  items jsonb not null, -- [{product_id, name, qty, price}]
  total integer not null,
  status text default 'new' check (status in ('new', 'confirmed', 'done', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOT SETTINGS
create table if not exists public.bot_settings (
  id uuid default uuid_generate_v4() primary key,
  store_id uuid references public.stores(id) on delete cascade not null unique,
  telegram_token text,
  bot_username text,
  prompt_personality text default 'ramah dan cepat melayani',
  auto_reply_enabled boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CHAT LOGS
create table if not exists public.chat_logs (
  id uuid default uuid_generate_v4() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  sender text check (sender in ('user', 'bot')),
  message text not null,
  response text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.stores enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.bot_settings enable row level security;
alter table public.chat_logs enable row level security;

-- RLS POLICIES

-- Profiles: users can read all, update own
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'Public profiles are viewable by everyone') then
    create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can update own profile') then
    create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Stores are viewable by everyone if active') then
    create policy "Stores are viewable by everyone if active" on public.stores for select using (status = 'active' or auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can insert own stores') then
    create policy "Users can insert own stores" on public.stores for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can update own stores') then
    create policy "Users can update own stores" on public.stores for update using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Products are viewable by everyone if active') then
    create policy "Products are viewable by everyone if active" on public.products for select using (is_active = true or (select user_id from stores where id = store_id) = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Store owners can manage products') then
    create policy "Store owners can manage products" on public.products for all using ((select user_id from stores where id = store_id) = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Store owners can manage orders') then
    create policy "Store owners can manage orders" on public.orders for all using ((select user_id from stores where id = store_id) = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Anyone can create orders') then
    create policy "Anyone can create orders" on public.orders for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Store owners can manage bot settings') then
    create policy "Store owners can manage bot settings" on public.bot_settings for all using ((select user_id from stores where id = store_id) = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Store owners can view chat logs') then
    create policy "Store owners can view chat logs" on public.chat_logs for select using ((select user_id from stores where id = store_id) = auth.uid());
  end if;
end $$;

-- Add shipping_info column if upgrading from old schema
alter table public.stores add column if not exists shipping_info text;

-- INDEXES
create index if not exists stores_user_id_idx on public.stores(user_id);
create index if not exists stores_slug_idx on public.stores(slug);
create index if not exists products_store_id_idx on public.products(store_id);
create index if not exists orders_store_id_idx on public.orders(store_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists chat_logs_store_id_idx on public.chat_logs(store_id);

-- FUNCTIONS & TRIGGERS

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Username availability check
create or replace function public.check_username_available(uname text)
returns boolean
language sql
stable
as $$
  select not exists (select 1 from public.stores where slug = uname);
$$;
