-- 008_create_certificates_table.sql
-- Creates the certificates table for the profile section.

create table if not exists public.certificates (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    issuer text not null,
    year text not null,
    file_url text
);

grant select on public.certificates to anon;
grant select, insert, update, delete on public.certificates to authenticated;

alter table if exists public.certificates enable row level security;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'certificates' and policyname = 'Public can read certificates'
    ) then
        create policy "Public can read certificates" on public.certificates
            for select using (true);
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'certificates' and policyname = 'Authenticated users can manage certificates'
    ) then
        create policy "Authenticated users can manage certificates" on public.certificates
            for all to authenticated using (true) with check (true);
    end if;
end $$;

create index if not exists certificates_title_idx on public.certificates (title);
