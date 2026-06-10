
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text,
  status text not null default 'draft',
  stack text[] not null default '{}',
  github_url text,
  demo_url text,
  image_url text,
  image_alt text,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint projects_status_check check (
    status in ('draft', 'published', 'archived')
  )
);

alter table public.projects enable row level security;

create policy "Public can read published projects" on public.projects for
select using (status = 'published');

create policy "Authenticated users can manage projects" on public.projects for all to authenticated using (true)
with
    check (true);

create index if not exists projects_status_idx on public.projects (status);

create index if not exists projects_featured_idx on public.projects (is_featured);

create index if not exists projects_sort_order_idx on public.projects (sort_order);