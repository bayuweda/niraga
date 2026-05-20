# Migrasi Supabase — Niraga

Jalankan SQL berikut di Supabase SQL Editor secara berurutan.

---

## 1. Migration Awal

```sql
alter table public.stores add column if not exists whatsapp text;

alter table public.orders add column if not exists notes text;

alter table public.stores add column if not exists banner_url text;
alter table public.stores add column if not exists payment_info text;
alter table public.stores add column if not exists qris_url text;

-- Public insert untuk WA checkout
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'Anyone can create orders') then
    create policy "Anyone can create orders" on public.orders for insert with check (true);
  end if;
end $$;
```

---

## 2. Multi Gambar + Deskripsi Produk

```sql
alter table public.products add column if not exists images jsonb default '[]'::jsonb;
alter table public.products add column if not exists description text;

-- Migrasi data existing: pindah image_url ke images[0]
update public.products set images = jsonb_build_array(image_url) where image_url is not null and (images is null or images = '[]'::jsonb);
```

---

## 3. Kategori Produk

```sql
alter table public.products add column if not exists category text default 'Semua';
create index if not exists products_store_category_idx on public.products(store_id, category);
```

---

## 4. Warna Tema Toko

```sql
alter table public.stores add column if not exists theme_color text default '#16a34a';
```

---

## 5. Counter Pengunjung Toko

```sql
-- Table
create table if not exists public.store_views (
  id         uuid default gen_random_uuid() primary key,
  store_id   uuid references public.stores(id) on delete cascade not null,
  viewed_at  timestamptz default now(),
  view_date  date default current_date
);

-- Index
create index if not exists store_views_store_date_idx on public.store_views(store_id, view_date);

-- Function increment
create or replace function public.increment_store_view(sid uuid)
returns integer
language plpgsql security definer
as $$
declare
  today_count integer;
begin
  insert into public.store_views(store_id) values(sid);
  select count(*) into today_count
  from public.store_views
  where store_id = sid and view_date = current_date;
  return today_count;
end;
$$;

-- RLS
alter table public.store_views enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'Anyone can insert view') then
    create policy "Anyone can insert view" on public.store_views for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Owners can read their store views') then
    create policy "Owners can read their store views" on public.store_views for select using (
      store_id in (select id from public.stores where user_id = auth.uid())
    );
  end if;
end $$;
```

---

> **Catatan:** Semua migration menggunakan `if not exists` / `add column if not exists` — aman dijalankan ulang tanpa error.
