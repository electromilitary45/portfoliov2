-- 009_add_certificates_storage_policies.sql
-- Adds Storage RLS policies for the certificates bucket.

-- Allow authenticated users to upload files to the certificates bucket
create policy "Authenticated users can upload certificates"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'certificates');

-- Allow authenticated users to read files from the certificates bucket
create policy "Authenticated users can read certificates"
    on storage.objects for select to authenticated
    using (bucket_id = 'certificates');

-- Allow authenticated users to update files in the certificates bucket
create policy "Authenticated users can update certificates"
    on storage.objects for update to authenticated
    using (bucket_id = 'certificates');

-- Allow authenticated users to delete files from the certificates bucket
create policy "Authenticated users can delete certificates"
    on storage.objects for delete to authenticated
    using (bucket_id = 'certificates');

-- Allow public (anon) to read certificate files
create policy "Public can read certificates"
    on storage.objects for select to anon
    using (bucket_id = 'certificates');
