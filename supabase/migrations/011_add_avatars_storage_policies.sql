-- 011_add_avatars_storage_policies.sql
-- Creates the avatars storage bucket and policies.

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects' and policyname = 'Public can read avatars'
    ) then
        create policy "Public can read avatars" on storage.objects
            for select using (bucket_id = 'avatars');
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects' and policyname = 'Authenticated users can upload avatars'
    ) then
        create policy "Authenticated users can upload avatars" on storage.objects
            for insert to authenticated with check (bucket_id = 'avatars');
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects' and policyname = 'Authenticated users can update avatars'
    ) then
        create policy "Authenticated users can update avatars" on storage.objects
            for update to authenticated using (bucket_id = 'avatars') with check (bucket_id = 'avatars');
    end if;
end $$;

do $$ begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects' and policyname = 'Authenticated users can delete avatars'
    ) then
        create policy "Authenticated users can delete avatars" on storage.objects
            for delete to authenticated using (bucket_id = 'avatars');
    end if;
end $$;
