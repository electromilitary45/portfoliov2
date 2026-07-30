CREATE TABLE page_views (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    path text NOT NULL,
    referrer text DEFAULT '' NOT NULL,
    visitor_id text,
    created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_path ON page_views(path);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read page_views"
    ON page_views
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anyone can insert page_views"
    ON page_views
    FOR INSERT
    TO anon
    WITH CHECK (true);
