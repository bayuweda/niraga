-- Seed data: Contoh toko Dapur Dinda
-- Jalankan ini SETELAH migration whatsapp

-- Insert contoh store (pake UUID manual biar gampang)
insert into public.stores (id, user_id, name, slug, description, logo_emoji, whatsapp, status)
values (
  '00000000-0000-0000-0000-000000000001',
  (select id from auth.users limit 1), -- reference any user, or skip if no user yet
  'Dapur Dinda',
  'dapur-dinda',
  'Frozen food homemade berkualitas, dibuat fresh setiap hari. Bebas pengawet, rasa rumahan.',
  '🥟',
  '6281234567890',
  'active'
) on conflict (slug) do nothing;

-- Insert contoh produk
with store as (select id from public.stores where slug = 'dapur-dinda' limit 1)
insert into public.products (store_id, name, emoji, price, unit, bg_color, stock, is_active)
select store.id, 'Siomay Frozen Ayam', '🥟', 45000, 'isi 20 pcs', '#fff7ed', 15, true from store
union all
select store.id, 'Bakso Sapi Premium', '🍜', 55000, 'isi 25 pcs', '#f0fdf4', 20, true from store
union all
select store.id, 'Udang Crispy Frozen', '🦐', 65000, 'isi 500gr', '#fefce8', 8, true from store
union all
select store.id, 'Nugget Ayam Homemade', '🥩', 42000, 'isi 300gr', '#fdf2f8', 0, true from store
on conflict do nothing;
