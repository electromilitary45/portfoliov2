# Módulo: Blog

CRUD de artículos con markdown e imágenes múltiples. Tabla: `blog_posts`.

---

## 1. Tipos (`blog-post.type.ts`)

```ts
type BlogPostStatus = "draft" | "published" | "archived";

interface BlogPostImage {
    url: string;
    alt: string;
    order: number;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    content?: string;        // markdown
    status: BlogPostStatus;
    readingTime: string;     // ej. "4 min"
    publishedAt?: string;
    tags: string[];
    coverImageUrl?: string;  // legacy; primer item de images
    coverImageAlt?: string;
    images?: BlogPostImage[];
    href: string;            // /blog/<slug>
}
```

> Compatibilidad: el mapper usa el **primer item de `images`** como cover si no hay `cover_image_url`.

---

## 2. Service (`blog-post.service.ts`)

Tabla Supabase: **`blog_posts`** (el select incluye la columna `images` jsonb). Fallback a `blog-post.mock.ts`.

| Función | Descripción |
|---------|-------------|
| `getBlogPosts()` | Published, orden `published_at` desc |
| `getPublishedBlogPosts()` | Alias del anterior — alimenta `/blog` y home |
| `getBlogPostBySlug(slug)` | Published + slug — detalle público |
| `getAllBlogPostsForAdmin()` | Todos, orden `created_at` desc — alimenta CMS |
| `getBlogPostById(id)` | Por id |

---

## 3. Rutas

### Público
- `/blog` — grid de `BlogPostCard` ("Artículos publicados"); metadata estática (title/description/canonical).
- `/blog/[slug]` — detalle: tiempo de lectura, fecha `es-ES`, tags, **ImageCarousel (Embla + autoplay)** con las imágenes del post, contenido renderizado con `react-markdown` + `remark-gfm` bajo estilos `prose` (Tailwind Typography).

### SEO (`generateMetadata` en `[slug]/page.tsx`)
- Título: título del post (template `%s | Portfolio Derek Leiva`); descripción: `excerpt`.
- Keywords: `tags`; canonical: `/blog/<slug>`.
- OpenGraph: `type: "article"` con `publishedTime` y tags; imagen = `coverImageUrl` o 1ª de `images`.
- Twitter: `summary_large_image` si hay imagen, si no `summary`.

### Admin
- `/admin/blog` — tabla con título, badge de estado (iconos Eye/EyeOff/Archive), fecha y acciones: editar, ciclo de estado, eliminar. Botón para crear.

---

## 4. Server Actions (`src/app/actions/blog/`)

| Acción | Efecto |
|--------|--------|
| `create-blog-post.action.ts` | Crea post (slug autogenerado desde título; sube imágenes a bucket `blog-images`: `<uuid>.<ext>`) |
| `update-blog-post.action.ts` | Actualiza campos e imágenes |
| `update-status.action.ts` | Ciclo draft → published → archived |
| `delete-blog-post.action.ts` | Elimina |

Todas verifican sesión (`getUser()` → `"No autorizado"`) y hacen `revalidatePath`.

---

## 5. Componentes (`features/blog/components/`)

| Componente | Tipo | Rol |
|------------|------|-----|
| `BlogPostCard.tsx` | Server | Card pública: cover en grayscale que colorea al hover, meta, tags |
| `CreateBlogPostModal.tsx` | Client | Modal de creación |
| `CreateBlogPostForm.tsx` | Form | Título, excerpt, tags, textarea markdown, inputs dinámicos multi-imagen con preview + alt + order |
| `EditBlogPostButton.tsx` | Client | Modal de edición |
| `EditBlogPostForm.tsx` | Form | Mantiene imágenes existentes vía hidden `currentImages` JSON; reemplazar/añadir/borrar por orden; reordenado con estado |
| `BlogPostStatusAction.tsx` | Form | Etiquetas según estado: Publicar / Archivar / Reactivar |
| `DeleteBlogPostButton.tsx` | Client | Confirmación |

---

## 6. Estados

```
draft ──Publicar──▶ published ──Archivar──▶ archived
                        ▲                     │
                        └────Reactivar────────┘
```

Solo `published` es visible públicamente.
