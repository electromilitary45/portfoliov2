-- 006_fix_experiences_stack_type.sql
-- Changes stack column from JSONB[] to text[] to match the pattern used by projects.
-- Run this AFTER migration 005.

-- Option A: cast the column (preserves data if any)
alter table if exists public.experiences
    alter column stack type text[] using stack::text[];

-- If Option A fails, run Option B instead:
-- alter table if exists public.experiences drop column if exists stack;
-- alter table if exists public.experiences add column stack text[];
