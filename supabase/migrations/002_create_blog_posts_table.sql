
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text,
  status text not null default 'draft',
  reading_time text not null default '1 min',
  tags text[] not null default '{}',
  cover_image_url text,
  cover_image_alt text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint blog_posts_status_check check (
    status in ('draft', 'published', 'archived')
  )
);

alter table public.blog_posts enable row level security;

create policy "Public can read published blog posts" on public.blog_posts for
select using (status = 'published');

create policy "Authenticated users can manage blog posts" on public.blog_posts for all to authenticated using (true)
with
    check (true);

create index if not exists blog_posts_status_idx on public.blog_posts (status);

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at);