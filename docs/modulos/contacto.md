# Módulo: Contacto

Formulario público de contacto + bandeja de mensajes en el CMS. Doble canal: **Resend** (email) y **Supabase** (`contact_messages`, respaldo permanente).

---

## 1. Flujo

```
Formulario /contactame (Server Component)
    ↓ <form action={sendContactMessageAction}>
sendContactMessageAction ("use server")
    ├─ honeypot "website" → bots se descartan silenciosamente (?sent=true)
    ├─ validación server-side (nombre 2-80, email regex, mensaje 10-2000)
    ├─ INSERT en contact_messages (best-effort)
    ├─ resend.emails.send() con plantilla JSX (best-effort, replyTo = remitente)
    └─ redirect(/contactame?sent=true&channel=email|db | ?error=...)
         ↓
Bandeja /admin/mensajes (revalidatePath tras cada envío exitoso)
```

- Si falla un canal pero el otro funciona → éxito (`channel=db` significa "guardado pero sin correo").
- Si ambos fallan → `?error=no_channel`.
- Sin `RESEND_API_KEY` el email se omite; la BD sigue funcionando.

---

## 2. Variables de entorno

| Variable | Requerida | Uso |
|----------|-----------|-----|
| `RESEND_API_KEY` | Para email | API key de [resend.com](https://resend.com). Sin dominio verificado solo puede enviar al email de la cuenta, con from `onboarding@resend.dev` |
| `RESEND_FROM` | No | Remitente personalizado, ej. `"Portfolio <hola@tudominio.com>"` |
| `CONTACT_EMAIL_TO` | No | Destinatario (default: `dereklevilla45@gmail.com`) |

---

## 3. Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/contactame` | `src/app/(guest)/contactame/page.tsx` | Formulario + canales rápidos (GitHub/LinkedIn/email); feedback por query params |
| `/admin/mensajes` | `src/app/(admin)/admin/mensajes/page.tsx` | Bandeja del CMS: lista con badge "Nuevo", contador total/no leídos, marcar leído/no leído, eliminar |

---

## 4. Server Actions (`src/app/actions/contact/`)

| Acción | Auth | Efecto |
|--------|------|--------|
| `send-contact-message.action.ts` | Pública | Honeypot + validación + insert BD + email Resend |
| `mark-message-read.action.ts` | Requiere sesión (RLS) | Toggle `is_read` |
| `delete-contact-message.action.ts` | Requiere sesión (RLS) | Elimina mensaje |

> La acción de envío es pública por diseño (RLS permite INSERT a anon **y** authenticated — migración [015], porque el admin puede navegar el sitio logueado y su JWT viaja en las cookies); las acciones de gestión dependen del usuario autenticado del CMS.

---

## 5. Service y tipos

- `features/contact/contact-message.type.ts`: `ContactMessage { id, name, email, message, isRead, createdAt }`.
- `features/contact/contact.service.ts`: `getContactMessages()` (todos, `created_at` desc; mock `[]` sin config).
- `features/contact/components/ContactNotificationEmail.tsx`: plantilla HTML del email (JSX inline styles, estilo del sitio). Requiere `@react-email/render` instalado — `resend` lo usa para renderizar el componente `react:`; sin él lanza "Failed to render React component".

---

## 6. Base de datos — migración [014]

Tabla `contact_messages`: `id`, `name`, `email`, `message`, `is_read` (default false), `created_at`. Índices en `created_at` e `is_read`.

RLS: anon **INSERT** (formulario público); authenticated SELECT/UPDATE/DELETE.
