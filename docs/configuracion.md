# Configuración y entorno

Variables de entorno, scripts, configuración de Next/TS y dependencias.

---

## 1. Variables de entorno (`.env.local`)

> Nunca commitear valores. Solo se listan los nombres.

| Variable | Requerida | Uso |
|----------|-----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Sí (para datos reales) | URL del proyecto Supabase. Si falta, **todos los services entran en modo mock** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sí (para datos reales) | Clave anónima para cliente browser/servidor |

| Variable | Opcional | Uso |
|----------|----------|-----|
| `SUPABASE_SERVICE_ROLE_KEY` | Producción | Usada por `POST /api/analytics/track` para insertar vistas sin RLS de usuario. Sin ella hace fallback a la anon key; sin ninguna devuelve `{ok:true}` sin insertar |
| `GITHUB_USERNAME` | Opcional | Habilita stats de GitHub (hero, dashboard) y el gráfico de contribuciones (`ghchart.rshah.org`). Si falta, esas secciones se ocultan o muestran hint |
| `RESEND_API_KEY` | Para email de contacto | API key de [resend.com](https://resend.com) — envía la notificación del formulario de contacto. Sin ella el mensaje solo se guarda en BD (`contact_messages`) |
| `RESEND_FROM` | No | Remitente personalizado del email (ej. `"Portfolio <hola@tudominio.com>"`). Default: `onboarding@resend.dev` (requiere destinatario = email de la cuenta Resend hasta verificar dominio) |
| `CONTACT_EMAIL_TO` | No | Destinatario de las notificaciones. Default: `dereklevilla45@gmail.com` |

---

## 2. Comportamiento sin configuración (graceful degradation)

- Services (`projects`, `blog`, `profile`, `dashboard`, `analytics`) detectan env faltante → devuelven **datos mock**.
- Queries que fallan → `try/catch` con fallback a mocks/zeros.
- `GITHUB_USERNAME` ausente → secciones GitHub ocultas.
- El sitio público y el CMS renderizan siempre; solo no habrá datos reales.

---

## 3. Scripts (`package.json`)

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

No hay tests definidos.

---

## 4. `next.config.ts`

```ts
images.remotePatterns: ["https://<project-ref>.supabase.co/storage/v1/object/public/**"]
experimental.serverActions.bodySizeLimit: "10mb"
```

- Permite optimizar imágenes servidas desde Storage público de Supabase con `next/image`.
- Sube a 10 MB el límite de body de Server Actions (necesario para subir imágenes).

---

## 5. `tsconfig.json`

- `strict: true`, target ES2017, resolución `bundler`, JSX `react-jsx`.
- Alias: `"@/*" → "./src/*"` — usado en todo el proyecto.
- Incluye `.next/types` y `.next/dev/types` (convención Next 16) y `**/*.mts`.

> Nota (de `AGENTS.md`): esta versión de Next.js tiene breaking changes respecto a convenciones anteriores. Los docs oficiales están embebidos en `node_modules/next/dist/docs/`.

---

## 6. Estilos

### `postcss.config.mjs`
Único plugin: `@tailwindcss/postcss` (pipeline Tailwind v4).

### `globals.css`
- `@import "tailwindcss";` (v4, sin `tailwind.config`).
- `@custom-variant dark` basado en clase `.dark` en `<html>` (toggle manual además de `prefers-color-scheme`).
- **Sistema de tema por inversión de variables**: Tailwind v4 compila los colores como `var(--color-*)`; bajo `.dark` se redefine la escala de neutrales/blanco/rojo para invertir el sitio público sin tocar clases de componentes.
- **`.palette-admin`**: el CMS y el login están codificados con paleta oscura fija; esta clase los invierte a claro cuando el sitio está en modo claro, y bajo `.dark .palette-admin` restaura sus valores originales (oscuro). Un solo toggle gobierna todo. Incluye remapeo de badges (`green/yellow/red-400/500`) para contraste sobre fondo claro.
- Script anti-FOUC inline en `src/app/layout.tsx`: aplica `.dark` antes del primer render leyendo `localStorage("portfolio-theme")`, con fallback a `prefers-color-scheme`.

---

## 7. ESLint (`eslint.config.mjs`)

Flat config: `eslint-config-next/core-web-vitals` + preset TypeScript.
Ignora `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

---

## 8. Dependencias principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `next` | 16.2.9 | Framework |
| `react` / `react-dom` | 19.2.4 | UI |
| `@supabase/ssr` | ^0.12 | Cliente Supabase con cookies (SSR/middleware) |
| `@supabase/supabase-js` | ^2.108 | Cliente base Supabase |
| `resend` + `@react-email/render` | — | Envío de email del formulario de contacto (plantilla JSX) |
| `@dnd-kit/core` + `sortable` + `utilities` | — | Drag & drop de certificados |
| `embla-carousel-react` + `autoplay` | — | Carrusel de imágenes del blog |
| `lucide-react` | — | Iconos |
| `react-markdown` + `remark-gfm` | — | Render de contenido markdown del blog |
| `@tailwindcss/typography` | ^0.5 | Clases `prose` para artículos |
| `@vercel/analytics` | — | Analytics de plataforma |

Dev: `tailwindcss` v4, `typescript` 5, `eslint` 9 + `eslint-config-next` 16.2.9.
