# Componentes UI compartidos

Componentes reutilizables bajo `src/components/`.

---

## 1. `ui/` — primitivos

### `Button.tsx`
Polimórfico: renderiza `<Link>` si recibe `href`, si no `<button>`.

```tsx
<Button href="/admin" variant="dark">Admin</Button>
<Button variant="danger" type="submit">Eliminar</Button>
```

Variantes: `primary` (default), `secondary`, `dark`, `darkSecondary`, `danger`, `ghost`, `ghostDark`.
Base: `inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition`.
Acepta `className` extra (se concatena al final).

> Ojo con Tailwind v4: para ocultar condicionalmente usar **variantes con media query** (ej. `max-md:hidden`) porque la base `inline-flex` puede pisar utilidades planas como `hidden`.

### `Container.tsx`
Wrapper horizontal `max-w-7xl`.

### `Modal.tsx` (client)
Overlay a pantalla completa, panel oscuro, título/descripción/"Cerrar", cuerpo scrolleable. Lo usan todos los modales CRUD del admin.

### `PageHeader.tsx`
Header `h1` + descripción. `variant: "guest" | "admin"`. Slot `children`. Envuelve `SectionLabel`.

### `SectionLabel.tsx`
Eyebrow monospace uppercase rojo (`text-red-600` guest / `text-red-500` admin).

### `ImageCarousel.tsx` (client)
Carrusel Embla sobre `BlogPostImage[]`: flechas prev/next, dots de snap, captions con alt.

---

## 2. `layout/`

### `GuestNavbar.tsx` (client)
Header sticky translúcido (blur). Links: Inicio, Sobre mí, Proyectos, Blog, Contáctame + botón oscuro "Admin" → `/admin` (visible solo ≥ md). Menú hamburguesa < md con los mismos links + botón Admin dentro del desplegable.

### `GuestFooter.tsx`
Bloque de marca, descripción, links GitHub/LinkedIn/Email, © año dinámico.

### `AdminMobileNav.tsx` (client)
Barra oscura sticky para < lg; recibe `navItems`; incluye "Volver al sitio" y form de sign-out (server action).

### `ThemeToggle.tsx` (client)
Botón sol/luna en el navbar guest (desktop + menú móvil). Alterna `.dark` en `<html>`, persiste en `localStorage("portfolio-theme")`. Renderiza placeholder hasta montar para evitar mismatch de hidratación. La inversión visual real vive en `globals.css` (variables CSS).

---

## 3. `home/` — secciones del home

| Componente | Descripción |
|------------|-------------|
| `HeroSection` | Avatar + headline/summary del perfil + stats GitHub + CTAs; columna derecha con pushes recientes (tiempo relativo es) |
| `HomeHighlights` | 3 tarjetas hover-invert: nº proyectos, estrellas totales, nº artículos |
| `GitHubContributions` | SVG de contribuciones desde `ghchart.rshah.org` (`revalidate: 86400`); oculto sin username |
| `TechStackSection` | Grid numerado estático de 8 tecnologías sobre fondo oscuro |
| `FeaturedProjectsSection` | Grid de proyectos destacados (`getFeaturedProjects()`) |
| `LatestBlogPostsSection` | Primeros 2 posts publicados |

Todos son Server Components async (salvo indicación).

---

## 4. `analytics/`

### `AnalyticsTracker.tsx` (client)
Montado en el root layout. Genera/persiste UUID en localStorage y envía `{path, referrer, visitor_id}` por beacon a `/api/analytics/track` en cada cambio de ruta (excluye `/admin` y `/_`). Ver [Analytics](./modulos/analytics.md).
