CREATE TABLE contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read contact_messages"
    ON contact_messages
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anyone can submit contact_messages"
    ON contact_messages
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Admins can update contact_messages"
    ON contact_messages
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins can delete contact_messages"
    ON contact_messages
    FOR DELETE
    TO authenticated
    USING (true);

GRANT ALL ON public.contact_messages TO anon;
GRANT ALL ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
