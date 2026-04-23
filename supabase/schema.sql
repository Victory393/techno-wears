create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  image_url text not null,
  price numeric(10, 2) not null check (price >= 0),
  currency_code text not null default 'USD',
  whatsapp_message text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.admin_users enable row level security;

grant select on table public.products to anon, authenticated;
grant insert, update, delete on table public.products to authenticated;
grant select on table public.admin_users to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to anon;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Users can read own admin row" on public.admin_users;
create policy "Users can read own admin row"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products
for delete
to authenticated
using (public.is_admin());

insert into public.products (
  slug,
  name,
  description,
  image_url,
  price,
  currency_code,
  whatsapp_message,
  sort_order
)
values
  (
    'premium-cotton-tee',
    'Premium Cotton Tee',
    'Heavyweight cotton tee with a minimal silhouette for daily wear.',
    'https://images.unsplash.com/photo-1759572095384-1a7e646d0d4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y290dG9uJTIwdGVlJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D',
    25,
    'USD',
    'Hello! I''m interested in the Premium Cotton Tee.',
    1
  ),
  (
    'premium-vintage-denim',
    'Premium Vintage Denim',
    'Structured vintage denim cut for a relaxed modern fit.',
    'https://images.unsplash.com/photo-1637069585336-827b298fe84a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VmludGFnZSUyMERlbmltJTIwY2xvdGhlcyUyMGRpc3BsYXklMjB3aXRoJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww',
    25,
    'USD',
    'Hello! I''m interested in the Premium Vintage Denim.',
    2
  ),
  (
    'slim-fit-dress',
    'Slim Fit Dress',
    'Tailored statement piece designed for a sharper evening look.',
    'https://plus.unsplash.com/premium_photo-1753788347026-075b4b6e9529?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2xpbSUyMGZpdCUyMGNsb3RoZXMlMjBkaXNwbGF5JTIwd2l0aCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D',
    25,
    'USD',
    'Hello! I''m interested in the Slim Fit Dress.',
    3
  ),
  (
    'premium-hoodie',
    'Premium Hoodie',
    'Soft heavyweight hoodie built for comfort and cold nights.',
    'https://media.istockphoto.com/id/1677942196/photo/hoodie-jacket-mockup-beige-hoodie.webp?a=1&b=1&s=612x612&w=0&k=20&c=vJmS0wFlRuXeKVcFlJ5099VcjDD6d4y23zxY1-dUbgY=',
    25,
    'USD',
    'Hello! I''m interested in the Premium Hoodie.',
    4
  ),
  (
    'baggy-trousers',
    'Baggy Trousers',
    'Loose-cut trousers with movement-friendly volume and durable fabric.',
    'https://media.istockphoto.com/id/877785318/photo/green-pants-for-the-boy.webp?a=1&b=1&s=612x612&w=0&k=20&c=-mxAvFAvUgicORlHqa0oJxbFWIZwkBhsKizb9HIk9P0=',
    25,
    'USD',
    'Hello! I''m interested in the Baggy Trousers.',
    5
  ),
  (
    'regular-t-shirts',
    'Regular T-shirts',
    'Everyday tees with a clean finish and breathable fabric.',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8LXNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D',
    25,
    'USD',
    'Hello! I''m interested in the Regular T-shirts.',
    6
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  price = excluded.price,
  currency_code = excluded.currency_code,
  whatsapp_message = excluded.whatsapp_message,
  sort_order = excluded.sort_order,
  is_active = true;
