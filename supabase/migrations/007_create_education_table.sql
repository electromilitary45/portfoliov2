-- 007_create_education_table.sql
-- Creates the education table for the profile section.

create table if not exists public.education (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    institution text not null,
    period text not null
);

grant select on public.education to anon;
grant select, insert, update, delete on public.education to authenticated;

alter table if exists public.education enable row level security;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'education' and policyname = 'Public can read education'
    ) then
        create policy "Public can read education" on public.education
            for select using (true);
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'education' and policyname = 'Authenticated users can manage education'
    ) then
        create policy "Authenticated users can manage education" on public.education
            for all to authenticated using (true) with check (true);
    end if;
end $$;

create index if not exists education_title_idx on public.education (title);
