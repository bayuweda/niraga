-- Migration: Add whatsapp column to stores
alter table public.stores add column if not exists whatsapp text;

-- Migration: Allow public insert on orders for WA checkout flow
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'Anyone can create orders') then
    create policy "Anyone can create orders" on public.orders for insert with check (true);
  end if;
end $$;

-- Migration: Add notes column to orders
alter table public.orders add column if not exists notes text;

-- Migration: Add banner_url column to stores
alter table public.stores add column if not exists banner_url text;

-- Migration: Add payment_info column to stores
alter table public.stores add column if not exists payment_info text;

-- Migration: Add qris_url column to stores
alter table public.stores add column if not exists qris_url text;

-- Migration: Add images jsonb and description to products
alter table public.products add column if not exists images jsonb default '[]'::jsonb;
alter table public.products add column if not exists description text;
update public.products set images = jsonb_build_array(image_url) where image_url is not null and (images is null or images = '[]'::jsonb);
