create extension if not exists pgcrypto;

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

create policy "block direct access for anon"
on public.contact_inquiries
for all
to anon
using (false)
with check (false);

create policy "block direct access for authenticated"
on public.contact_inquiries
for all
to authenticated
using (false)
with check (false);
