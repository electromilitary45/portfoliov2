# Módulo: Autenticación

Login del administrador, manejo de sesión y capas de protección.

---

## 1. Resumen

- Cuenta única compartida (no hay registro ni UI de usuarios).
- Supabase Auth con email/password (`signInWithPassword`).
- Sesión en cookies `sb-*` gestionadas por `@supabase/ssr`.

---

## 2. Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/admin/login` | `src/app/(auth)/admin/login/page.tsx` | Formulario oscuro email/password |

### Flujo de login
```
Submit → server action inline signIn()
  → supabase.auth.signInWithPassword({ email, password })
  → error  → redirect("/admin/login?error=invalid_credentials")
  → éxito  → redirect("/admin")
```

### Sign-out
- `signOutAction` en `src/app/actions/auth/sign-out.action.ts`
- `supabase.auth.signOut()` → redirect `/admin/login`.
- Se dispara desde formularios en el sidebar admin y en `AdminMobileNav`.

---

## 3. Middleware raíz — `middleware.ts`

```ts
matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
```

Flujo por request:

1. Si el path empieza con `/api/analytics` → pasa directo (endpoint público de tracking).
2. `updateSession(request)` (`src/lib/supabase/middleware.ts`): cliente SSR ligado a cookies request/response + `supabase.auth.getUser()` → **refresca tokens expirados** y re-emite cookies `sb-*`.
3. Para `/admin/**` (excepto `/admin/login`): si ninguna cookie empieza con `"sb-"` → redirect a `/admin/login`.

> El middleware es solo un gate barato de presencia de cookie + refresh. La autorización real ocurre más abajo.

---

## 4. Capas de protección

| Capa | Dónde | Qué hace |
|------|-------|----------|
| 1. Middleware | `middleware.ts` | Redirect sin cookie `sb-*`; refresh de tokens |
| 2. Layout guard | `(admin)/admin/layout.tsx` | `supabase.auth.getUser()` → `redirect("/admin/login")` si null |
| 3. Server Actions | `src/app/actions/**` | Cada acción mutante llama `getUser()` y lanza `"No autorizado"` |
| 4. RLS | Postgres | anon solo lee lo público; escrituras requieren JWT autenticado |

---

## 5. Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/lib/supabase/client.ts` | Cliente browser (`createBrowserClient`) |
| `src/lib/supabase/server.ts` | Cliente servidor para componentes/actions |
| `src/lib/supabase/middleware.ts` | `updateSession()` para el Edge middleware |
| `src/app/actions/auth/sign-out.action.ts` | Cierre de sesión |
