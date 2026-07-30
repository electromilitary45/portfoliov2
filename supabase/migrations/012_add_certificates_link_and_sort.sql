-- 012_add_certificates_link_and_sort.sql
-- Adds link_url and sort_order columns to certificates table.

alter table if exists public.certificates
    add column if not exists link_url text,
    add column if not exists sort_order integer not null default 0;

create index if not exists certificates_sort_order_idx on public.certificates (sort_order);
