# Módulo: Dashboard

Panel principal de `/admin` con métricas agregadas de todos los módulos.

---

## 1. Ruta

`/admin` — `src/app/(admin)/admin/page.tsx`

Ejecuta en paralelo:
```ts
const [data, analytics] = await Promise.all([
    getDashboardData(),
    getAnalyticsSummary(),   // ver módulo Analytics
]);
```

---

## 2. Service (`features/dashboard/dashboard.service.ts`)

### Tipos
```ts
interface ContentStats  { total; published; draft; archived }
interface DashboardData {
    projects: ContentStats;
    blogPosts: ContentStats;
    experiences: number;
    education: number;
    certificates: number;
    recentProjects: Project[];   // últimos 5
    recentPosts: BlogPost[];     // últimos 5
    github: GitHubStats | null;
}
```

### `getDashboardData()`
Agrega en paralelo: `getAdminProjects`, `getAllBlogPostsForAdmin`, `getAdminExperiences`, `getAdminEducation`, `getAdminCertificates`, `getGitHubStats`.
Calcula stats por estado y recortes de recientes. Si algo falla → estructura con ceros.

---

## 3. Secciones renderizadas

| Sección | Componentes | Datos |
|---------|-------------|-------|
| StatsCards | `StatsCard` ×N | Totales: proyectos, posts, experiencias, certificados |
| Estado de contenido | `StatusBar` ×2 | Barras verde/amarilla/gris con proporciones draft/published/archived (proyectos y blog) |
| Analítica | `AnalyticsCards`, `VisitsChart`, `TopPagesTable`, `TopReferrers` | Ver módulo [Analytics](./analytics.md) |
| Recientes ×2 | `RecentList` | Últimos 5 proyectos y 5 posts con punto de estado + link "crear" |
| GitHub | `GitHubCard` | Stars, repos, followers, top repos, top lenguajes; hint si falta `GITHUB_USERNAME` |
| Acciones rápidas | Botones | Accesos directos a crear contenido |

---

## 4. Componentes (`features/dashboard/components/`)

| Componente | Rol |
|------------|-----|
| `StatsCard` | Icono + contador + link opcional + acento visual |
| `StatusBar` | Barra proporcional de estados (published/draft/archived) |
| `RecentList` | Lista compacta de los últimos 5 ítems con estado |
| `GitHubCard` | Resumen de la cuenta de GitHub |

---

## 5. Layout del admin

`(admin)/admin/layout.tsx`:
- Guardia de auth (`getUser()` → redirect login).
- Sidebar fija en lg: Dashboard / Proyectos / Blog / Perfil.
- En <lg: `AdminMobileNav` (barra oscura sticky).
- Formulario de sign-out y enlace "Volver al sitio".
