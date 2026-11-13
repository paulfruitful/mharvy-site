-- Run this SQL once in your Supabase Dashboard -> SQL Editor
-- Project: https://evzkayuyoeluzkwnpezi.supabase.co

create extension if not exists "pgcrypto";

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null default 'Untitled Draft',
  category text not null default 'Brand Strategy',
  excerpt text not null default '',
  content text not null default '',
  key_takeaways jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  cover_image text,
  read_time text not null default '3 min read',
  publish_date text not null default to_char(now(), 'Mon YYYY'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_updated_at_idx on public.blog_posts (updated_at desc);

create or replace function public.set_blog_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.set_blog_posts_updated_at();

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Public visitors can read published posts only
drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published');

-- Signed-in admins (Authentication -> Users) can read all drafts and write/delete posts
drop policy if exists "Authenticated admins manage all blog posts" on public.blog_posts;
create policy "Authenticated admins manage all blog posts"
  on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);
