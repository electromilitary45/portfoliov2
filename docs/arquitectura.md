# Arquitectura

Visión general de la estructura, los patrones y el flujo de datos del proyecto.

---

## 1. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router), React 19 |
| Estilos | Tailwind CSS v4 + `@tailwindcss/typography` |
| Backend | Supabase (PostgreSQL, Auth, Storage) vía `@supabase/ssr` |
| Interacción extra | `@dnd-kit` (drag & drop), `embla-carousel-react` (carrusel), `lucide-react` (iconos) |
| Markdown | `react-markdown` + `remark-gfm` |
| Analítica propia | Endpoint propio + tabla `page_views` |
| Analítica de plataforma | `@vercel/analytics` |

---

## 2. Estructura de carpetas

```
src/
├── app/
│   ├── layout.tsx                  # Root layout: fuentes Geist, SEO, Analytics
│   ├── globals.css                 # Tailwind v4 + variables de tema
│   ├── (guest)/                    # RUTAS PÚBLICAS (navbar + footer, tema claro)
│   │   ├── layout.tsx
│   │   ├── page.tsx                # /
│   │   ├── sobre-mi/page.tsx
│   │   ├── proyectos/page.tsx
│   │   ├── proyectos/[slug]/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   └── contactame/page.tsx
│   ├── (admin)/admin/              # CMS PRIVADO (sidebar oscura)
│   │   ├── layout.tsx              # Guardia de auth + navegación
│   │   ├── page.tsx                # Dashboard
│   │   ├── proyectos/page.tsx
│   │   ├── blog/page.tsx
│   │   └── perfil/page.tsx
│   ├── (auth)/admin/login/page.tsx # Login independiente (sin nav)
│   ├── actions/                    # Server Actions ("use server") por módulo
│   └── api/analytics/track/route.ts
├── components/
│   ├── analytics/AnalyticsTracker.tsx
│   ├── home/                       # Secciones de la página principal
│   ├── layout/                     # GuestNavbar, GuestFooter, AdminMobileNav
│   └── ui/                         # Button, Container, Modal, PageHeader, etc.
├── features/                       # Lógica de negocio por módulo
│   ├── analytics/
│   ├── blog/
│   ├── dashboard/
│   ├── github/
│   ├── profile/
│   └── projects/
└── lib/supabase/
    ├── client.ts                   # Cliente browser (@supabase/ssr createBrowserClient)
    ├── server.ts                   # Cliente servidor/componentes/actions (cookies)
    ├── middleware.ts               # updateSession() para el middleware Edge
    └── storage.ts                  # uploadPublicFile(), uploadProjectImage()
middleware.ts                       # Middleware raíz (refresh sesión + gate /admin)
supabase/migrations/                # 13 migraciones SQL
```

---

## 3. Route groups

| Grupo | Tema | Layout | Propósito |
|-------|------|--------|-----------|
| `(guest)` | Claro (`bg-neutral-50`) | `GuestNavbar` + `GuestFooter` | Sitio público |
| `(admin)` | Oscuro (neutrals oscuros) | Sidebar fija en lg + `AdminMobileNav` en móvil | CMS autenticado |
| `(auth)` | Oscuro | Ninguno (pantalla completa) | Solo login |

---

## 4. Patrón de feature module

Cada módulo bajo `src/features/<modulo>/` sigue la misma convención:

```
features/proyectos/
├── project.type.ts     # Tipos de dominio (camelCase)
├── project.service.ts  # Acceso a datos (Supabase) + mapeo snake_case → camelCase
├── project.mock.ts     # Datos de respaldo cuando no hay Supabase configurado
└── components/         # Componentes específicos del módulo (cards, modales, forms)
```

Reglas del patrón:

1. **Modo mock**: cada service comprueba `shouldUseMock*()` — es `true` si faltan `NEXT_PUBLIC_SUPABASE_URL` o `NEXT_PUBLIC_SUPABASE_ANON_KEY`. También hace fallback a mocks dentro de `try/catch` si la query falla. El sitio nunca se rompe por falta de configuración.
2. **Mappers**: funciones explícitas convierten filas snake_case de Postgres a tipos camelCase de TS.
3. **Componentes cliente solo donde hacen falta** (modales, formularios con estado); las páginas son Server Components async.

---

## 5. Flujo de mutación (CRUD admin)

```
Modal/Form (client component)
    ↓ <form action={serverAction}>
Server Action (src/app/actions/<módulo>/*.action.ts)  ["use server"]
    ↓ supabase.auth.getUser() → throw "No autorizado" si no hay sesión
Supabase write (+ upload a Storage si hay imagen)
    ↓ revalidatePath("/admin/x") + revalidatePath("/") 
redirect("/admin/x?flag=true")
    ↓ (solo módulo perfil)
FeedbackBanner interpreta el query param y muestra mensaje en español
```

Los módulos de proyectos y blog dependen del refresco de la lista tras `revalidatePath`; el módulo perfil además usa flags en la URL para feedback.

---

## 6. Flujo de renderizado público

- Páginas guest = Server Components async que llaman a services.
- Home compone secciones de `src/components/home/`: `HeroSection` → `HomeHighlights` → `GitHubContributions` → `TechStackSection` → `FeaturedProjectsSection` → `LatestBlogPostsSection`.
- Cachés: GitHub stats `revalidate: 3600`, gráfico de contribuciones `revalidate: 86400`.

---

## 7. Capas de protección (resumen)

Ver detalle en [Autenticación](./modulos/autenticacion.md).

1. **Middleware raíz**: refresh de tokens + redirect a `/admin/login` si no hay cookie `sb-*` en `/admin/*`.
2. **`(admin)/admin/layout.tsx`**: `getUser()` → redirect si null.
3. **Server Actions**: cada acción verifica `getUser()` y lanza `"No autorizado"`.
4. **RLS en Postgres**: anon solo lee lo publicado; escrituras requieren JWT autenticado.

---

## 8. Convenciones

- Alias de ruta: `@/*` → `src/*`.
- Estados de contenido: `"draft" | "published" | "archived"` (proyectos, blog).
- Fechas formateadas en español (`es-ES`) con `Intl.DateTimeFormat`.
- Sin foreign keys en la BD: las relaciones se resuelven en código (`getProfileWithAvatar()` junta 4 tablas; `blog_posts.images` es jsonb embebido).

---

## 9. SEO / Metadata

- Constantes del sitio centralizadas en `src/lib/site.ts` (`SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`) — las consumen layout, sitemap y robots.
- Root layout (`src/app/layout.tsx`): `metadataBase`, título con template `%s | Portfolio Derek Leiva` y OG/Twitter por defecto (`/preview.png`, `es_ES`).
- Rutas dinámicas (`/proyectos/[slug]`, `/blog/[slug]`): `generateMetadata` por contenido — title/description, keywords (stack/tags), canonical, OpenGraph completo y Twitter card.
- Páginas estáticas guest: `export const metadata` con title + description + canonical.
- Ojo: el merge de metadata es **shallow** — si una página define `openGraph`, reemplaza el del layout, por eso cada `generateMetadata` define su OG completo.

### Archivos de metadata técnica

| Archivo | Salida | Contenido |
|---------|--------|-----------|
| `src/app/sitemap.ts` | `/sitemap.xml` | 5 rutas estáticas + slugs de proyectos publicados (`getProjects`) y posts publicados (`getPublishedBlogPosts`). `revalidate: 3600` |
| `src/app/robots.ts` | `/robots.txt` | Allow `/`; Disallow `/admin`, `/api`; enlaza al sitemap |
| `src/app/not-found.tsx` | 404 global | Página personalizada con estilo guest (label rojo, h1 grande, botones a inicio/proyectos) |
| `src/app/error.tsx` | 500 por segmento | Error boundary (client) con botón "Intentar de nuevo" (`unstable_retry()`) y enlace al inicio; muestra `error.digest` como referencia para logs |
| `src/app/global-error.tsx` | 500 crítico | Fallback si falla el root layout; define su propio `<html>/<body>` e importa `globals.css`; sin export de metadata (no soportado en client components) |

Pendiente opcional: `opengraph-image` dinámico por post/proyecto (ver `docs/tareas.md`).
