# Documentación — Portfolio v2

Documentación técnica del proyecto **Portfolio Derek Leiva**: portafolio personal con sitio público y CMS privado, construido con Next.js 16 (App Router), Supabase, Tailwind CSS v4 y desplegado en Vercel.

- Idioma del sitio: español (`lang="es"`)
- URL de producción: `https://portfolio.villalobossebas.me`

---

## Índice general

### 1. Fundamentos

| # | Documento | Contenido |
|---|-----------|-----------|
| 1.1 | [Arquitectura](./arquitectura.md) | Estructura de carpetas, route groups, flujo de datos, patrón de features, renderizado |
| 1.2 | [Configuración y entorno](./configuracion.md) | Variables de entorno, scripts, `next.config.ts`, `tsconfig`, dependencias |
| 1.3 | [Base de datos](./base-de-datos.md) | Esquema Supabase, migraciones, RLS, buckets de storage |

### 2. Módulos (ordenados por módulo)

| # | Módulo | Descripción |
|---|--------|-------------|
| 2.1 | [Autenticación](./modulos/autenticacion.md) | Login admin, middleware, capas de protección, sign-out |
| 2.2 | [Proyectos](./modulos/proyectos.md) | CRUD de proyectos (público + admin), tabla `projects` |
| 2.3 | [Blog](./modulos/blog.md) | CRUD de posts con markdown e imágenes, tabla `blog_posts` |
| 2.4 | [Perfil](./modulos/perfil.md) | Sobre mí: perfil, experiencia, educación, certificados (drag & drop) |
| 2.5 | [Dashboard](./modulos/dashboard.md) | Panel `/admin`: estadísticas, recientes, acciones rápidas |
| 2.6 | [Analytics](./modulos/analytics.md) | Tracking first-party de visitas, tabla `page_views`, gráficos |
| 2.7 | [GitHub](./modulos/github.md) | Integración con la API pública de GitHub (stats, contribuciones) |

### 3. Referencias

| # | Documento | Contenido |
|---|-----------|-----------|
| 3.1 | [Componentes UI compartidos](./componentes-ui.md) | `Button`, `Modal`, `PageHeader`, layout, home, etc. |
| 3.2 | [Tareas y roadmap](./tareas.md) | Pendientes priorizados, convención de seguimiento |

---

## Mapa rápido de rutas

### Sitio público `(guest)` — tema claro

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `src/app/(guest)/page.tsx` | Home: hero, destacados, GitHub, stack, proyectos, blog |
| `/sobre-mi` | `src/app/(guest)/sobre-mi/page.tsx` | Perfil, experiencia, educación, certificados |
| `/proyectos` | `src/app/(guest)/proyectos/page.tsx` | Archivo de proyectos publicados |
| `/proyectos/[slug]` | `src/app/(guest)/proyectos/[slug]/page.tsx` | Detalle de proyecto |
| `/blog` | `src/app/(guest)/blog/page.tsx` | Artículos publicados |
| `/blog/[slug]` | `src/app/(guest)/blog/[slug]/page.tsx` | Detalle del post (markdown + carrusel) |
| `/contactame` | `src/app/(guest)/contactame/page.tsx` | Tarjetas de contacto estáticas |

### CMS privado `(admin)` — tema oscuro

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/admin` | `src/app/(admin)/admin/page.tsx` | Dashboard |
| `/admin/proyectos` | `src/app/(admin)/admin/proyectos/page.tsx` | Gestión de proyectos |
| `/admin/blog` | `src/app/(admin)/admin/blog/page.tsx` | Gestión de posts |
| `/admin/perfil` | `src/app/(admin)/admin/perfil/page.tsx` | Gestión de perfil/experiencia/educación/certificados |

### Autenticación `(auth)`

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/admin/login` | `src/app/(auth)/admin/login/page.tsx` | Formulario email/password |

### API

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `POST /api/analytics/track` | `src/app/api/analytics/track/route.ts` | Registra vistas de página |
| `/sitemap.xml` | `src/app/sitemap.ts` | Sitemap: rutas estáticas + proyectos/posts publicados |
| `/robots.txt` | `src/app/robots.ts` | Reglas de crawling (bloquea `/admin`, `/api`) |
| 404 global | `src/app/not-found.tsx` | Página "no encontrada" personalizada |

---

## Comandos

```bash
npm run dev     # Servidor de desarrollo
npm run build   # Build de producción
npm run start   # Servidor de producción
npm run lint    # ESLint
```
