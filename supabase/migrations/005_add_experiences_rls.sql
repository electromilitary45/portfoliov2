-- 005_add_experiences_rls.sql
-- Adds RLS policies, GRANTs, and indexes to the experiences table
-- to match the pattern used by projects and blog_posts.

-- Table-level permissions (required for authenticated and anon roles)
grant select on public.experiences to anon;
grant select, insert, update, delete on public.experiences to authenticated;

-- Enable RLS (policies do the actual row-level filtering)
alter table if exists public.experiences enable row level security;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'experiences' and policyname = 'Public can read experiences'
    ) then
        create policy "Public can read experiences" on public.experiences
            for select using (true);
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'experiences' and policyname = 'Authenticated users can manage experiences'
    ) then
        create policy "Authenticated users can manage experiences" on public.experiences
            for all to authenticated using (true) with check (true);
    end if;
end $$;

create index if not exists experiences_role_idx on public.experiences (role);
