# Módulo: Proyectos

CRUD de proyectos para el sitio público y el CMS. Tabla: `projects`.

---

## 1. Tipos (`project.type.ts`)

```ts
type ProjectStatus = "draft" | "published" | "archived";

interface Project {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description?: string;
    status: ProjectStatus;
    stack: string[];
    githubUrl?: string;
    demoUrl?: string;
    imageUrl?: string;
    imageAlt?: string;
    isFeatured: boolean;
    sortOrder: number;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    href: string;   // /proyectos/<slug>
}
```

---

## 2. Service (`project.service.ts`)

Tabla Supabase: **`projects`**. Fallback a `project.mock.ts` si falta config o falla la query.

| Función | Descripción |
|---------|-------------|
| `getProjects()` | Solo `status='published'`, orden `sort_order` asc — alimenta `/proyectos` |
| `getFeaturedProjects()` | Published AND `is_featured=true` — alimenta home |
| `getProjectBySlug(slug)` | Published + slug, `.single()` — detalle público; `null` → `notFound()` |
| `getAdminProjects()` | Todos los estados, orden `created_at` desc — alimenta CMS |

Mappers convierten filas snake_case → `Project`.

---

## 3. Rutas

### Público
- `/proyectos` — grid de `ProjectCard` ("Archivo de proyectos").
- `/proyectos/[slug]` — detalle: título, resumen, chips de stack, botones GitHub/demo, imagen hero, sección descripción.

### Admin
- `/admin/proyectos` — lista completa (draft/published/archived) con imagen, badge de estado, stack y acciones: editar (modal), publicar/archivar, eliminar (confirmación), enlace "Ver público".

---

## 4. Server Actions (`src/app/actions/projects/`)

| Acción | Efecto |
|--------|--------|
| `create-project.action.ts` | Crea proyecto (+ upload imagen a bucket `project-images`: `<slug>/<timestamp>-<name>`) |
| `update-project.action.ts` | Actualiza campos/imagen |
| `update-status.action.ts` | Alterna published ↔ archived |
| `delete-project.action.ts` | Elimina |

Todas: check `getUser()` (lanza `"No autorizado"`), luego `revalidatePath` de las rutas afectadas (`/`, `/proyectos`, `/admin/proyectos`).

---

## 5. Componentes (`features/projects/components/`)

| Componente | Tipo | Rol |
|------------|------|-----|
| `ProjectCard.tsx` | Server | Card pública (imagen, índice sort_order, estado, título, resumen, stack); toda la card es Link |
| `CreateProjectModal.tsx` | Client | Abre Modal con formulario |
| `CreateProjectForm.tsx` | Server-action form | Campos: title, summary, description, stack (CSV), githubUrl, demoUrl, imageFile, imageAlt, status, isFeatured |
| `EditProjectButton.tsx` | Client | Modal de edición |
| `EditProjectForm.tsx` | Form | Mismos campos prefill + hidden projectId/currentImageUrl/publishedAt |
| `ProjectStatusAction.tsx` | Form renderizado en servidor | Toggle published/archived con hidden fields |
| `DeleteProjectButton.tsx` | Client | Confirmación antes de borrar |

---

## 6. Estados y visibilidad

```
draft ──publicar──▶ published ──archivar──▶ archived
                        ▲                      │
                        └──────reactivar───────┘
```

- Solo `published` es visible al público (RLS + queries).
- `isFeatured` controla aparición en la home.
