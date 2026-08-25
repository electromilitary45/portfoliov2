-- Permite enviar mensajes desde el formulario a usuarios autenticados
-- (ej. el admin navegando el sitio con su sesion activa en el mismo navegador).
CREATE POLICY "Authenticated users can submit contact_messages"
    ON contact_messages
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
