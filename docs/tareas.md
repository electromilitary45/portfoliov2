# Tareas y roadmap

Pendientes de mejora del portfolio, priorizados según referencia de portfolios top (Brittany Chiang, Lee Robinson, Josh Comeau). Marca `[x]` al completar.

---

## 🔴 Prioridad alta

### 2. Infraestructura SEO técnica
- [ ] Opcional: `opengraph-image` dinámico por post/proyecto (requiere `ImageResponse` de `next/og`).

> El resto (sitemap, robots, 404) completado el 2026-08-25 — ver "Hecho recientemente".

### 3. Formulario de contacto funcional
- [ ] Reemplazar tarjetas estáticas en `/contactame` por formulario (server action → email o guardado en Supabase).
- [ ] Alternativa mínima: botón "Copiar email" con feedback visual.
- Ref: `src/app/(guest)/contactame/page.tsx`.

### 4. Casos de estudio en proyectos
- [ ] Añadir campos de resultado/métricas al modelo (ej. `highlights jsonb`: problema → solución → resultado).
- [ ] Migración SQL + formularios admin + render en detalle público.
- Ref: `docs/base-de-datos.md` §1.1, `docs/modulos/proyectos.md`.

---

## 🟡 Prioridad media

### 5. Dark mode
- [ ] Toggle claro/oscuro persistido (`localStorage` / `class` strategy).
- [ ] Migrar clases hardcodeadas (`bg-neutral-50`, neutrales oscuros) a tokens del tema.
- Ref: `docs/configuracion.md` §6.

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

- [x] **2026-08-25 — Infraestructura SEO técnica**: `src/app/sitemap.ts` (5 rutas estáticas + slugs de proyectos/posts publicados, `revalidate: 3600`), `src/app/robots.ts` (bloquea `/admin` y `/api`, enlaza sitemap), `src/app/not-found.tsx` personalizado. Constantes del sitio extraídas a `src/lib/site.ts`. Sin migraciones (sin cambios de BD).
- [x] **2026-08-25 — SEO por página**: `generateMetadata` dinámico en `/proyectos/[slug]` y `/blog/[slug]` (título, descripción, keywords, canonical, OpenGraph, Twitter card); metadata estática en `/sobre-mi`, `/proyectos`, `/blog`, `/contactame`; template de títulos `%s | Portfolio Derek Leiva` en root layout. Sin migraciones (usa columnas existentes).
- [x] Hero del home horizontal `[foto | título/nombre]` en todos los dispositivos (`HeroSection.tsx`).
- [x] Botón Admin duplicado en header móvil corregido (`GuestNavbar.tsx`).
- [x] Carpeta `docs/` creada con documentación completa por módulo.

---

## Convención

Formato de cada tarea: `- [ ] descripción` + refs a archivos/docs. Al terminar una tarea, moverla a "Hecho recientemente" con fecha.
