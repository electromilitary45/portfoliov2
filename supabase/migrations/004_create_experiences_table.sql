-- 004_create_experiences_table.sql

CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    stack TEXT[]
);

COMMENT ON TABLE experiences IS 'Stores professional experience entries for the profile.';