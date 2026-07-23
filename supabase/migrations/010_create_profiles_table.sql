-- 010_create_profiles_table.sql
-- Creates the profiles table for storing profile-level data (avatar, headline, summary).

create table if not exists public.profiles (
    id uuid primary key default gen_random_uuid(),
    headline text not null default '',
    summary text not null default '',
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

grant select on public.profiles to anon;
grant select, insert, update, delete on public.profiles to authenticated;

alter table if exists public.profiles enable row level security;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'profiles' and policyname = 'Public can read profiles'
    ) then
        create policy "Public can read profiles" on public.profiles
            for select using (true);
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'profiles' and policyname = 'Authenticated users can manage profiles'
    ) then
        create policy "Authenticated users can manage profiles" on public.profiles
            for all to authenticated using (true) with check (true);
    end if;
end $$;

-- Insert a default profile row so there's always one to update
insert into public.profiles (headline, summary, avatar_url)
values ('', '', null)
on conflict do nothing;