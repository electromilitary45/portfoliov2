# Tareas y roadmap

Pendientes de mejora del portfolio, priorizados según referencia de portfolios top (Brittany Chiang, Lee Robinson, Josh Comeau). Marca `[x]` al completar.

---

## 🔴 Prioridad alta

> Tarea 2 (Infraestructura SEO técnica) y tarea 3 (Formulario de contacto) completadas el 2026-08-25 — ver "Hecho recientemente".

### 4. Casos de estudio en proyectos
- [ ] Añadir campos de resultado/métricas al modelo (ej. `highlights jsonb`: problema → solución → resultado).
- [ ] Migración SQL + formularios admin + render en detalle público.
- Ref: `docs/base-de-datos.md` §1.1, `docs/modulos/proyectos.md`.

### 5. Proyectos relacionados
- [x] Sección "Proyectos relacionados" al fondo del detalle (`/proyectos/[slug]`): algoritmo de overlap de stack, muestra 2 proyectos con más tecnologías en común. Reutiliza `ProjectCard` existente.

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

- [x] Micro-interacciones: reveals on scroll, hovers animados (`prefers-reduced-motion` friendly).
- [ ] RSS feed (`src/app/feed.xml/route.ts`) + botón de suscripción.
- [ ] Newsletter (integración externa).
- [ ] Página `/now` o badge "Disponible para proyectos".
- [ ] Sección open source separada (PRs destacados), además del heatmap.
- [x] i18n EN/ES (Google Translate widget integrado en navbar).

---

## ✅ Hecho recientemente

- [x] **2026-09-18 — UI/UX mejora `/sobre-mi`**: rediseño visual de la página "Sobre mí" con mejoras de presentación:
  - **Timeline visual real** en `ExperienceTimeline`: línea vertical con dots/conectores, borde lateral rojo, icono `Briefcase`.
  - **Cards diferenciadas por sección**: Experience (border rojo), Education (border azul `border-l-blue-600` + icono `GraduationCap`), Certificates (border amber `border-l-amber-500` + icono `Award` + badge de año con `rounded-full`).
  - **Scroll reveal animations**: componente `ScrollReveal` reutilizable con Intersection Observer + CSS `fade-in-up`, soporte `prefers-reduced-motion`, delays escalonados (100ms, 200ms, 300ms).
  - **Links de certificados** con icono `ExternalLink`.
  - Archivos: `ScrollReveal.tsx` (nuevo), `ExperienceTimeline.tsx`, `EducationList.tsx`, `CertificateList.tsx`, `page.tsx`, `globals.css`.
- [x] **2026-09-18 — Fix certificados admin**: `getAdminCertificates()` en `profile.service.ts` no seleccionaba `link_url` ni `sort_order`, por lo que el panel admin no mostraba enlaces ni respetaba el orden de drag & drop al recargar. Corregido para incluir ambos campos y ordenar por `sort_order`, igual que la función pública.
- [x] **2026-09-18 — Previsualización de archivos en certificados**: componentes `UpdateCertificateModal` y `CreateCertificateModal` ahora muestran vista previa del archivo: imágenes inline con enlace, PDFs con icono y nombre. En edición se muestra el archivo actual; al seleccionar uno nuevo se reemplaza la vista previa. Limpieza de ObjectURLs al desmontar.
- [x] **2026-09-17 — Proyectos relacionados**: nueva función `getRelatedProjects()` en `project.service.ts` que calcula relevancia por overlap de stack (count de tecnologías compartidas). Se muestra al fondo de `/proyectos/[slug]` una sección "Proyectos relacionados" con 2 `ProjectCard` en grid de 2 columnas. Incluye fallback: si no hay overlap, muestra los 2 más recientes. Si solo hay 1 proyecto publicado, no se muestra la sección.
- [x] **2026-09-17 — Análisis UI/UX completo + correcciones**: revisión integral del sitio público con 17 mejoras implementadas:
  - **Textos**: 7 etiquetas en inglés traducidas a español (`Featured Projects` → `Proyectos destacados`, `Latest Posts` → `Últimas publicaciones`, `Contact Channels` → `Canales de contacto`, `GitHub Activity` → `Actividad de GitHub`, `Stack` → `Stack tecnológico`, `Project Index` → `Índice de proyectos`, `Writing Log` → `Bitácora de escritura`). Textos de developer expuestos al público eliminados (menciones a Supabase/mock, placeholder text). Footer: `Built with Next.js` → `Derek Leiva`.
  - **Google Translate widget**: widget de Google integrado en navbar con botón custom (`LanguageToggle.tsx`) que activa el dropdown oculto. Detecta idioma del navegador automáticamente. CSS custom para dark/light mode y ocultar branding de Google. Fix de hydration mismatch (`suppressHydrationWarning` + estilos body).
  - **Navbar**: indicador de página activa con `usePathname()` (underline rojo + font-medium). Menú móvil con animación `max-h` + `opacity` + `transition-all duration-300`.
  - **Formulario contacto**: componente `ContactFormClient.tsx` con estado de carga (spinner `Loader2` + texto "Enviando..."), botón deshabilitado para prevenir doble envío. Honeypot con `position: relative` en form.
  - **Dark mode**: contraste corregido — `neutral-400` ajustado a `#7a7a82`, `neutral-500` a `#9a9aa2` para escala progresiva correcta.
  - **Scroll-to-top**: `ScrollToTop.tsx` — botón fijo que aparece al scroll > 400px con fade-in/out.
  - **GitHub en móvil**: terminal de actividad visible en `lg:hidden xl:flex` (antes estaba oculta en toda vista que no fuera `lg:`).
  - **404 mejorada**: sección "Páginas populares" con links a Inicio, Proyectos, Blog, Sobre mí, Contáctame.
  - **Breadcrumbs**: `Breadcrumbs.tsx` en detalle de proyectos y blog (`Inicio > Categoría > Página`).
  - **Blog nav**: navegación next/previous al final de cada artículo.
  - **Admin button**: movido del navbar al footer como link discreto junto al copyright.
  - Archivos nuevos: `LanguageToggle.tsx`, `ScrollToTop.tsx`, `Breadcrumbs.tsx`, `ContactFormClient.tsx`.

- [x] **2026-09-16 — Optimización de cards en Featured Projects**: eliminado `min-h-[460px]` fijo, cards ahora usan `h-full` para igualar altura por fila del grid; `line-clamp-3` en summary y badge `+N` para exceso de tags; tooltips nativos al hover muestran contenido completo; grid con `[grid-auto-rows:1fr]` para distribución uniforme. Numeración secuencial automática basada en índice del array en vez de `sort_order` de BD.
- [x] **2026-08-25 — Fix gráfico "Tráfico Diario"**: las barras medían siempre 0px (alturas % sobre contenedor con altura auto + `items-end` que colapsaba las columnas). Ahora las columnas ocupan la altura completa del contenedor y las barras se anclan al fondo con posicionamiento absoluto; hover en toda la columna y mínimo visual 0.75% para días con datos.
- [x] **2026-08-25 — Dashboard funcional**: card "Mensajes sin leer" (link a bandeja), tendencia semanal 7v7 días con delta % (`WeeklyTrend`), GitHubCard eliminada del CMS, exclusión de tráfico propio cuando hay sesión admin (cookies `sb-*` en tracker), tooltip del chart traducido y top pages ahora clickeables.
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
