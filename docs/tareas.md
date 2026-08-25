# Tareas y roadmap

Pendientes de mejora del portfolio, priorizados según referencia de portfolios top (Brittany Chiang, Lee Robinson, Josh Comeau). Marca `[x]` al completar.

---

## 🔴 Prioridad alta

> Tarea 2 (Infraestructura SEO técnica) y tarea 3 (Formulario de contacto) completadas el 2026-08-25 — ver "Hecho recientemente".

### 4. Casos de estudio en proyectos
- [ ] Añadir campos de resultado/métricas al modelo (ej. `highlights jsonb`: problema → solución → resultado).
- [ ] Migración SQL + formularios admin + render en detalle público.
- Ref: `docs/base-de-datos.md` §1.1, `docs/modulos/proyectos.md`.

---

## 🟡 Prioridad media

> Tarea 5 (Dark mode) completada el 2026-08-25 — ver "Hecho recientemente".

### 6. Descargar CV
- [ ] PDF en `public/` + botón en hero y/o navbar.
- [ ] Campo opcional `cv_url` en `profiles` para gestionarlo desde el CMS.

### 7. Testimonios / recomendaciones
- [ ] Tabla `testimonials` (autor, cargo, quote, avatar) + CRUD en `/admin`.
- [ ] Sección pública en home o `/sobre-mi`.

### 8. Filtros y búsqueda
- [ ] Filtro por stack en `/proyectos` (ya existe columna `stack text[]`).
- [ ] Filtro por tag en `/blog` (ya existe `tags text[]`).
- Implementación sugerida: query params + Server Components (sin JS extra).

### 9. Contador de vistas público
- [ ] Mostrar nº de lecturas en `/blog/[slug]` usando datos de `page_views`.
- Ref: `docs/modulos/analytics.md`.

---

## 🟢 Nice to have

- [ ] Micro-interacciones: reveals on scroll, hovers animados (`prefers-reduced-motion` friendly).
- [ ] RSS feed (`src/app/feed.xml/route.ts`) + botón de suscripción.
- [ ] Newsletter (integración externa).
- [ ] Página `/now` o badge "Disponible para proyectos".
- [ ] Sección open source separada (PRs destacados), además del heatmap.
- [ ] i18n EN/ES.

---

## ✅ Hecho recientemente

- [x] **2026-08-25 — Dark mode (sitio completo)**: toggle sol/luna persistido en `localStorage` (navbar guest + sidebar/barra móvil del admin); script anti-FOUC en root layout; implementado por **inversión de variables CSS** en `globals.css` — cero cambios masivos de clases. Guest invierte bajo `.dark`; admin/login usan `.palette-admin` (claro por defecto, restauración a su oscuro original bajo `.dark .palette-admin`, badges remapeados para contraste). Nota: `global-error.tsx` queda siempre claro al tener su propio `<html>` sin el script.
- [x] **2026-08-25 — Formulario de contacto funcional**: formulario en `/contactame` (honeypot + validación server-side) con doble canal: email vía **Resend** (`RESEND_API_KEY`, plantilla HTML propia) + respaldo en tabla `contact_messages` (**migraciones 014 y 015**). Bandeja nueva `/admin/mensajes` en el CMS (leer/no leer, eliminar, contadores). Env vars nuevas documentadas. Errores de canales ahora se loguean en consola.
- [x] **2026-08-25 — OpenGraph dinámico**: `opengraph-image.tsx` en `/proyectos/[slug]` y `/blog/[slug]` (`ImageResponse` de `next/og`, 1200×630, tarjeta tipográfica estilo del sitio con título/descripción/tags). Comportamiento: si el contenido tiene foto propia, el `generateMetadata` la prioriza; la tarjeta generada actúa como fallback automático cuando no hay imagen.
- [x] **2026-08-25 — Páginas de error 500**: `src/app/error.tsx` (boundary por segmento, client component con `unstable_retry()`) y `src/app/global-error.tsx` (fallback crítico con html/body propio). Ambos muestran `error.digest` para rastrear logs.
- [x] **2026-08-25 — Infraestructura SEO técnica**: `src/app/sitemap.ts` (5 rutas estáticas + slugs de proyectos/posts publicados, `revalidate: 3600`), `src/app/robots.ts` (bloquea `/admin` y `/api`, enlaza sitemap), `src/app/not-found.tsx` personalizado. Constantes del sitio extraídas a `src/lib/site.ts`. Sin migraciones (sin cambios de BD).
- [x] **2026-08-25 — SEO por página**: `generateMetadata` dinámico en `/proyectos/[slug]` y `/blog/[slug]` (título, descripción, keywords, canonical, OpenGraph, Twitter card); metadata estática en `/sobre-mi`, `/proyectos`, `/blog`, `/contactame`; template de títulos `%s | Portfolio Derek Leiva` en root layout. Sin migraciones (usa columnas existentes).
- [x] Hero del home horizontal `[foto | título/nombre]` en todos los dispositivos (`HeroSection.tsx`).
- [x] Botón Admin duplicado en header móvil corregido (`GuestNavbar.tsx`).
- [x] Carpeta `docs/` creada con documentación completa por módulo.

---

## Convención

Formato de cada tarea: `- [ ] descripción` + refs a archivos/docs. Al terminar una tarea, moverla a "Hecho recientemente" con fecha.
