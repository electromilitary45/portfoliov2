import type { GitHubStats, GitHubRepo, GitHubUser } from "@/features/github/github.type";

export function getGitHubUsername(): string | null {
  return process.env.GITHUB_USERNAME ?? null;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function githubGraphql<T>(query: string): Promise<T | null> {
  if (!GITHUB_TOKEN) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

interface GraphqlLangEdge {
  size: number;
  node: { name: string };
}

interface GraphqlRepoNode {
  name: string;
  isFork: boolean;
  languages: { edges: GraphqlLangEdge[] };
}

interface GraphqlUserData {
  user: {
    repositories: { nodes: GraphqlRepoNode[] };
  };
}

async function fetchLanguagesByBytes(): Promise<
  { language: string; bytes: number }[]
> {
  const username = getGitHubUsername();
  if (!username || !GITHUB_TOKEN) return [];

  const query = `{
    user(login: "${username}") {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          name
          isFork
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name }
            }
          }
        }
      }
    }
  }`;

  const data = await githubGraphql<GraphqlUserData>(query);
  if (!data?.user) return [];

  const langBytes = new Map<string, number>();

  for (const repo of data.user.repositories.nodes) {
    if (repo.isFork) continue;
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      langBytes.set(name, (langBytes.get(name) ?? 0) + edge.size);
    }
  }

  return [...langBytes.entries()]
    .map(([language, bytes]) => ({ language, bytes }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 3);
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const username = getGitHubUsername();

  if (!username) {
    return { user: null, totalStars: 0, topRepos: [], recentRepos: [], topLanguages: [] };
  }

  try {
    const [userRes, reposRes, recentRes, topLanguages] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=stars&direction=desc`,
        { next: { revalidate: 3600 } },
      ),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`,
        { next: { revalidate: 3600 } },
      ),
      fetchLanguagesByBytes(),
    ]);

    if (!userRes.ok || !reposRes.ok || !recentRes.ok) {
      return { user: null, totalStars: 0, topRepos: [], recentRepos: [], topLanguages: [] };
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();
    const recent: GitHubRepo[] = await recentRes.json();

    const ownRepos = repos.filter((repo) => !repo.fork);
    const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const topRepos = ownRepos.slice(0, 5);
    const recentRepos = recent.filter((repo) => !repo.fork).slice(0, 5);

    return { user, totalStars, topRepos, recentRepos, topLanguages };
  } catch {
    return { user: null, totalStars: 0, topRepos: [], recentRepos: [], topLanguages: [] };
  }
}
