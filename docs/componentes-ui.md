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

### `Breadcrumbs.tsx`
Navegación tipo `Inicio > Categoría > Página actual`. Recibe `items: BreadcrumbItem[]` donde el último item no tiene `href` (es la página actual). Usa `ChevronRight` como separador. Estilo monospace uppercase consistente con el sitio.

### `ScrollReveal.tsx` (client)
Wrapper con Intersection Observer que aplica animación `fade-in-up` al entrar en viewport. Props: `children`, `className?`, `delay?` (ms, para stagger). Respeta `prefers-reduced-motion`. Reutilizable en cualquier página.

### `ImageCarousel.tsx` (client)
Carrusel Embla sobre `BlogPostImage[]`: flechas prev/next, dots de snap, captions con alt.

---

## 2. `layout/`

### `GuestNavbar.tsx` (client)
Header sticky translúcido (blur). Links: Inicio, Sobre mí, Proyectos, Blog, Contáctame. Indicador de página activa con `usePathname()` (underline rojo + font-medium). Menú hamburguesa < md con animación `max-h` + `opacity` + `transition-all duration-300`. Incluye `LanguageToggle` + `ThemeToggle`. El botón Admin se movió al footer.

### `GuestFooter.tsx`
Bloque de marca, descripción, links GitHub/LinkedIn/Email, link discreto a Admin, © año dinámico.

### `AdminMobileNav.tsx` (client)
Barra oscura sticky para < lg; recibe `navItems`; incluye "Volver al sitio" y form de sign-out (server action).

### `ThemeToggle.tsx` (client)
Botón sol/luna presente en el navbar guest (desktop + menú móvil) y en el admin (sidebar desktop + barra móvil, `variant="admin"`). Alterna `.dark` en `<html>`, persiste en `localStorage("portfolio-theme")`. Renderiza placeholder hasta montar para evitar mismatch de hidratación. La inversión visual real vive en `globals.css` (variables CSS): guest invierte bajo `.dark`; admin invierte bajo `.palette-admin` y se restaura con `.dark .palette-admin`.

### `LanguageToggle.tsx` (client)
Botón con icono `Globe` que activa el dropdown de Google Translate. El widget de Google está oculto visualmente (`opacity: 0`) pero funcional, superpuesto al botón. Al hacer click, dispara el click en el widget oculto y aparece el dropdown de idiomas.

### `ScrollToTop.tsx` (client)
Botón fijo bottom-right (`z-50`) con icono `ArrowUp`. Aparece al scroll > 400px con fade-in (`translate-y` + `opacity`). Scroll suave al top.

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

---

## 5. `contact/`

### `ContactFormClient.tsx` (client)
Formulario de contacto con estado de carga. Muestra spinner (`Loader2` animado) y texto "Enviando..." durante el envío. Botón deshabilitado para prevenir doble envío. Honeypot anti-spam invisible. Server Action: `sendContactMessageAction`.
