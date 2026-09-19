# Módulo: Perfil

Gestión de "Sobre mí": perfil (headline/summary/avatar), experiencia laboral, educación y certificados con reordenamiento drag & drop.

Tablas: `profiles` (singleton), `experiences`, `education`, `certificates`.

---

## 1. Tipos (`profile.type.ts`)

```ts
interface Experience  { id; role; company; period; description; stack: string[] }
interface Education   { id; title; institution; period }
interface Certificate { id; title; issuer; year; fileUrl?; linkUrl?; sortOrder }
interface Profile     { headline; summary; avatarUrl?; experience[]; education[]; certificates[] }
```

---

## 2. Service (`profile.service.ts`)

| Función | Tabla(s) | Descripción |
|---------|----------|-------------|
| `getProfile()` | — | Mock estático (sync) |
| `getProfileWithAvatar()` | profiles + experiences + education + certificates | Fetch paralelo de las 4 tablas; alimenta `/sobre-mi` y `HeroSection` |
| `getAdminProfile()` | profiles | `{headline, summary, avatarUrl}` (`limit(1).maybeSingle()`) |
| `getExperiences()` / `getAdminExperiences()` | experiences | Lista |
| `getEducation()` / `getAdminEducation()` | education | Lista |
| `getCertificates()` | certificates | Orden `sort_order` |
| `getAdminCertificates()` | certificates | Orden `sort_order` (misma query que pública) |

Fallback a `profile.mock.ts`.

---

## 3. Rutas

### Público
- `/sobre-mi` — avatar, headline, summary, `ExperienceTimeline` (timeline visual vertical), `EducationList` (cards borde azul), `CertificateList` (cards borde amber). Scroll reveal animations con `ScrollReveal`.

### Admin
- `/admin/perfil` — CMS completo:
  - `FeedbackBanner` (feedback por query params)
  - `ProfileAvatarUpload`
  - `ProfileAboutEditor` (headline/summary)
  - Experiencia: lista + modales crear/editar + botón borrar
  - Educación: lista + modales crear/editar + botón borrar
  - Certificados: `AdminCertificateList` con **@dnd-kit** drag & drop

---

## 4. Server Actions (`src/app/actions/profile/`) — 11 acciones

| Grupo | Acciones |
|-------|----------|
| Perfil | `update-profile.action.ts` (headline/summary), `upload-avatar.action.ts` (bucket `avatars`, path `profile/avatar.<ext>` upsert) |
| Experiencia | `create-experience`, `update-experience`, `delete-experience` |
| Educación | `create-education`, `update-education`, `delete-education` |
| Certificados | `create-certificate`, `update-certificate`, `delete-certificate`, **`reorder-certificates.action.ts`** |

Todas verifican sesión. Tras cada mutación: `revalidatePath("/admin/perfil")` (+ `/`, `/sobre-mi`) y `redirect("/admin/perfil?<flag>=true")`.

---

## 5. Feedback por query params

`FeedbackBanner` mapea ~16 flags a mensajes en español, p. ej.:

- Éxito: `?created=true`, `?updated=true`, `?deleted=true`, `?certificate_created=true`, `?certificate_updated=true`, `?avatar_updated=true`, `?reordered=true`…
- Error: `?error=...`

---

## 6. Componentes (`features/profile/components/`)

### Públicos
| Componente | Rol |
|------------|-----|
| `ExperienceTimeline` | Timeline visual vertical con línea, dots y cards con borde rojo |
| `EducationList` | Lista de estudios con cards de borde azul |
| `CertificateList` | Lista de certificados con cards de borde amber y badge de año |

### Admin (CRUD)
| Componente | Tipo | Rol |
|------------|------|-----|
| `CreateExperienceModal` / `UpdateExperienceModal(exp)` / `DeleteExperienceButton` | Client+Form | CRUD experiencia |
| `CreateEducationModal` / `UpdateEducationModal(edu)` / `DeleteEducationButton` | Client+Form | CRUD educación |
| `CreateCertificateModal` / `UpdateCertificateModal(cert)` / `DeleteCertificateButton` | Client+Form | CRUD certificados con previsualización de archivos |
| `AdminCertificateList` | Client (@dnd-kit) | Sortable list; al soltar llama `reorderCertificatesAction` |
| `ProfileAvatarUpload` | Client | File picker + preview → acción de avatar |
| `ProfileAboutEditor` | Client | Modal inline para headline/summary |
| `FeedbackBanner` | Server | Interpreta query params → mensajes |

---

## 7. Notas

- `profiles` se trata como **singleton**: existe una fila semilla creada por la migración [010].
- El orden de los certificados es manual (`sort_order`) mediante drag & drop.
