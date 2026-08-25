# Base de datos (Supabase)

Esquema completo, migraciones, políticas RLS y buckets de storage.

Fuente de verdad: `supabase/migrations/` (13 migraciones, sin `config.toml` ni seed aparte).

---

## 1. Tablas

> No hay foreign keys: las relaciones son lógicas y se resuelven en código.

### 1.1 `projects` — [001_create_projects_table.sql]

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | uuid PK | `gen_random_uuid()` |
| `title` | text | |
| `slug` | text | **unique** |
| `summary` | text | |
| `description` | text | nullable |
| `status` | text | default `'draft'`, CHECK `draft/published/archived` |
| `stack` | text[] | tecnologías |
| `github_url`, `demo_url` | text | nullable |
| `image_url`, `image_alt` | text | nullable |
| `is_featured` | boolean | destacado en home |
| `sort_order` | int | orden manual en `/proyectos` |
| `published_at` | timestamptz | nullable |
| `created_at`, `updated_at` | timestamptz | defaults |

Índices: `status`, `is_featured`, `sort_order`.
RLS: anon SELECT solo `status='published'`; authenticated acceso total.

### 1.2 `blog_posts` — [002] + [003]

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | uuid PK | |
| `title` | text | |
| `slug` | text | **unique** |
| `excerpt` | text | resumen |
| `content` | text | markdown |
| `status` | text | CHECK `draft/published/archived`, default `'draft'` |
| `reading_time` | text | default `'1 min'` |
| `tags` | text[] | |
| `images` | jsonb | default `'[]'` — array `{url, alt, order}` (multi-imagen) |
| `cover_image_url`, `cover_image_alt` | text | legacy; el primer item de `images` hace de cover |
| `published_at` | timestamptz | nullable |
| `created_at`, `updated_at` | timestamptz | |

Índices: `status`, `slug`, `published_at`.
RLS: mismo patrón que projects.

### 1.3 `experiences` — [004] + [005] + [006]

| Columna | Tipo |
|---------|------|
| `id` | uuid PK |
| `role` | text (indexado) |
| `company` | text |
| `period` | text NOT NULL |
| `description` | text |
| `stack` | text[] (casteada desde jsonb en 006) |

RLS: público puede leer todo (`using true`); authenticated gestiona.

### 1.4 `education` — [007]

| Columna | Tipo |
|---------|------|
| `id` | uuid PK |
| `title` | text (indexado) |
| `institution` | text |
| `period` | text |

RLS: lectura pública total; authenticated gestiona.

### 1.5 `certificates` — [008] + [012]

| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | uuid PK | |
| `title` | text | |
| `issuer` | text | |
| `year` | text | |
| `file_url` | text | nullable (PDF/imagen en bucket) |
| `link_url` | text | nullable (añadida en 012) |
| `sort_order` | int | NOT NULL default 0 (añadida en 012), indexada |

RLS: lectura pública; authenticated gestiona.

### 1.6 `profiles` — [010]

| Columna | Tipo |
|---------|------|
| `id` | uuid PK |
| `headline` | text default '' |
| `summary` | text default '' |
| `avatar_url` | text nullable |
| `created_at`, `updated_at` | timestamptz |

Se inserta **una fila vacía por defecto**: la app la trata como singleton.
RLS: lectura pública; authenticated gestiona.

### 1.7 `page_views` — [013]

| Columna | Tipo |
|---------|------|
| `id` | uuid PK |
| `path` | text NOT NULL (indexado) |
| `referrer` | text default '' |
| `visitor_id` | text nullable |
| `created_at` | timestamptz (indexado) |

RLS: **anon puede INSERT** (tracking público); authenticated SELECT. Grants completos para anon/authenticated/service_role.

---

## 2. Storage buckets

| Bucket | Visibilidad | Políticas | Uso en código |
|--------|-------------|-----------|---------------|
| `avatars` | Público | [011]: read público; authenticated upload/update/delete | Avatar del perfil (`profile/avatar.<ext>` upsert) |
| `certificates` | Lectura pública anónima | [009]: CRUD autenticado scope a `bucket_id='certificates'` | Archivos de certificados (`certificates/<uuid>.<ext>`) |
| `blog-images` | — | — | Imágenes de posts (`<uuid>.<ext>`) |
| `project-images` | — | — | Imágenes de proyectos (`<slug>/<timestamp>-<name>`) |

---

## 3. Orden de migraciones

| # | Archivo | Cambio |
|---|---------|--------|
| 001 | `create_projects_table.sql` | Tabla projects + RLS + índices |
| 002 | `create_blog_posts_table.sql` | Tabla blog_posts + RLS + índices |
| 003 | `add_images_to_blog_posts.sql` | Columna `images jsonb` |
| 004 | `create_experiences_table.sql` | Tabla experiences |
| 005 | `add_experiences_rls.sql` | Grants + RLS + índice (idempotente) |
| 006 | `fix_experiences_stack_type.sql` | `stack` → `text[]` |
| 007 | `create_education_table.sql` | Tabla education + RLS |
| 008 | `create_certificates_table.sql` | Tabla certificates + RLS |
| 009 | `add_certificates_storage_policies.sql` | Bucket/policies certificates |
| 010 | `create_profiles_table.sql` | Tabla profiles + fila semilla |
| 011 | `add_avatars_storage_policies.sql` | Bucket avatars |
| 012 | `add_certificates_link_and_sort.sql` | `link_url` + `sort_order` |
| 013 | `create_page_views_table.sql` | Tabla page_views + INSERT anónimo |

---

## 4. Modelo lógico (relaciones en código)

```
profiles (singleton)
    └── getProfileWithAvatar() ensambla:
        ├── experiences[]
        ├── education[]
        └── certificates[] (ordenados por sort_order)

projects      → standalone (is_featured, sort_order)
blog_posts    → images jsonb embebido
page_views    → standalone (agregado en dashboard)
```

---

## 5. Convención de acceso

- Cliente servidor: `src/lib/supabase/server.ts` (cookies SSR).
- Cliente browser: `src/lib/supabase/client.ts`.
- Mapeo snake_case (BD) ↔ camelCase (TS) con funciones mapper explícitas por feature.
