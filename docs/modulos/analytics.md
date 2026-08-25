# Módulo: Analytics

Analítica first-party de visitas de página. Tabla: `page_views`.

---

## 1. Flujo completo

```
AnalyticsTracker (client, en root layout)
    │ genera/persiste UUID en localStorage ("portfolio_visitor_id")
    │ en cada cambio de pathname (excluye /admin y /_)
    ▼ navigator.sendBeacon (fallback fetch keepalive; delay 500ms en primera carga)
POST /api/analytics/track   { path, referrer, visitor_id }
    │ usa SUPABASE_SERVICE_ROLE_KEY si existe (si no, anon key)
    ▼
INSERT INTO page_views   (RLS: anon puede insertar)
    ▼
getAnalyticsSummary() agrega en el dashboard /admin
```

---

## 2. API route

`src/app/api/analytics/track/route.ts` — `force-dynamic`.

- Recibe JSON `{ path, referrer, visitor_id }`.
- Sin env de Supabase → responde `{ ok: true, note: "no config" }` sin insertar.
- Endpoint público (el middleware lo omite del refresh de sesión).

---

## 3. Tipos (`analytics.type.ts`)

```ts
interface PageView         { id; path; referrer; visitorId?; createdAt }
interface DailyVisits      { date; visits; unique_visitors }
interface AnalyticsSummary {
    totalVisits: number;
    todayVisits: number;
    uniqueVisitors: number;
    dailyVisits: DailyVisits[];   // últimos 30 días
    topPages: { path; visits }[];       // top 8
    topReferrers: { referrer; count }[];// top 8
    recentVisits: PageView[];           // últimas 10
}
```

---

## 4. Service (`analytics.service.ts`)

### `getAnalyticsSummary()`
6 queries paralelas sobre `page_views`:

1. Count total.
2. Count de hoy.
3. Rows de los últimos 30 días (para únicos y buckets diarios).
4. Paths.
5. Referrers no vacíos.
6. Últimas 10.

La agregación (Set de visitantes únicos, mapa diario, top-8 de páginas/referrers) se hace en JS. Si Supabase no está configurado → summary con ceros.

---

## 5. Componentes (`features/analytics/components/`)

| Componente | Rol |
|------------|-----|
| `AnalyticsCards` | Tarjetas: visitas totales, hoy, visitantes únicos |
| `VisitsChart` | Gráfico de barras CSS puro de 30 días; overlay visitas vs únicos con tooltips |
| `TopPagesTable` | Tabla path + barras rojas proporcionales |
| `TopReferrers` | Lista; `(direct)` se muestra como "🔗 Directo" |

---

## 6. Tracker cliente

`src/components/analytics/AnalyticsTracker.tsx` (client component montado en `src/app/layout.tsx`):

- Genera UUID v4 y lo guarda en `localStorage`.
- Escucha cambios de pathname con `usePathname()` + efecto.
- **No trackea** `/admin/**` ni rutas internas `/_*`.
- Envío con `navigator.sendBeacon` para no bloquear la navegación.
