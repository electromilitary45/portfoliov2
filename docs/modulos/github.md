# Módulo: GitHub

Integración de solo-lectura con la API pública de GitHub. No usa Supabase.

---

## 1. Tipos (`github.type.ts`)

```ts
interface GitHubUser  { login; name; avatar_url; html_url; public_repos; followers }
interface GitHubRepo  { name; html_url; description; stargazers_count; language; pushed_at; fork }
interface GitHubStats {
    user: GitHubUser;
    totalStars: number;
    topRepos: GitHubRepo[];     // top 5 por stars
    recentRepos: GitHubRepo[];  // top 5 por push reciente
    topLanguages: string[];     // top 3
}
```

---

## 2. Service (`github.service.ts`)

| Función | Descripción |
|---------|-------------|
| `getGitHubUsername()` | Lee env `GITHUB_USERNAME`; `null` si falta |
| `getGitHubStats()` | Fetch a la REST API de GitHub: usuario + repos ordenados por stars y por fecha de push (`revalidate: 3600`); filtra forks; calcula total de estrellas y lenguajes top |

---

## 3. Dónde se consume

| Lugar | Uso |
|-------|-----|
| `(guest)/page.tsx` → `HeroSection` | Stats (repos/stars/followers) + repos con pushes recientes (tiempo relativo en español) |
| `HomeHighlights` | Estrellas totales |
| `GitHubContributions` | Gráfico de contribuciones embebido: SVG desde `https://ghchart.rshah.org/<username>` (`revalidate: 86400`, render con `dangerouslySetInnerHTML`); oculto sin username |
| Dashboard `getDashboardData()` | Alimenta `GitHubCard` en `/admin` |

---

## 4. Degradación

Sin `GITHUB_USERNAME` definido:
- `getGitHubUsername()` → null.
- Secciones dependientes se **ocultan**.
- `GitHubCard` muestra un hint para configurar la variable.

Errores de red → capturados por los callers; el resto de la página sigue funcionando.
