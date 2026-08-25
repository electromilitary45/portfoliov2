# Módulo: Dashboard

Panel principal de `/admin` con métricas agregadas de contenido y tráfico.

---

## 1. Ruta

`/admin` — `src/app/(admin)/admin/page.tsx`

Ejecuta en paralelo:
```ts
const [data, analytics, unreadMessages] = await Promise.all([
    getDashboardData(),
    getAnalyticsSummary(),   // ver módulo Analytics
    getUnreadMessagesCount(), // features/contact
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
}
```
> `getGitHubStats()` fue retirado del dashboard (métricas públicas decorativas). Sigue usándose en el sitio público (hero/home).

### `getDashboardData()`
Agrega en paralelo los services de proyectos, blog y perfil. Calcula stats por estado y recortes de recientes. Si algo falla → estructura con ceros.

---

## 3. Secciones renderizadas

| Sección | Componentes | Datos |
|---------|-------------|-------|
| StatsCards ×5 | `StatsCard` | Proyectos, Blog, Experiencia, Certificados y **Mensajes sin leer** (link a `/admin/mensajes`, acento rojo cuando hay pendientes) |
| Estado de contenido | `StatusBar` ×2 | Barras verde/amarilla/gris draft/published/archived |
| Analítica | `AnalyticsCards`, `VisitsChart`, `WeeklyTrend`, `TopPagesTable`, `TopReferrers` | Ver módulo [Analytics](./analytics.md) |
| Recientes ×2 | `RecentList` | Últimos 5 proyectos/posts con punto de estado |
| Acciones rápidas | Links | Crear proyecto/post, editar perfil, ver sitio público |

### Tendencia semanal (`WeeklyTrend`)
Suma de visitas últimos 7 días vs 7 anteriores (calculada en la página desde `analytics.dailyVisits`). Muestra delta % con flecha ▲/▼ coloreada, o "nuevo" si no había datos previos.

---

## 4. Componentes (`features/dashboard/components/`)

| Componente | Rol |
|------------|-----|
| `StatsCard` | Icono + contador + sub + link opcional + acento |
| `StatusBar` | Barra proporcional de estados |
| `RecentList` | Últimos 5 ítems con estado |

(AnalyticsCards/VisitsChart/WeeklyTrend/TopPagesTable/TopReferrers viven en `features/analytics/components/`.)

---

## 5. Precisión de métricas

- El tracker **excluye sesiones admin**: si existen cookies `sb-*` (usuario logueado en el CMS), `AnalyticsTracker` no envía eventos → tu propio tráfico no contamina.
- Sigue excluyendo `/admin/**` y rutas internas.
- Limitación conocida: no filtra bots que ejecuten JS; `uniqueVisitors` se calcula sobre la ventana de 30 días.

## 6. Layout del admin

`(admin)/admin/layout.tsx`: guardia de auth, sidebar fija en lg (Dashboard/Proyectos/Blog/Perfil/Mensajes), ThemeToggle variante admin, sign-out. En <lg: `AdminMobileNav`.
