import type { GitHubStats, GitHubRepo, GitHubUser } from "@/features/github/github.type";

export function getGitHubUsername(): string | null {
  return process.env.GITHUB_USERNAME ?? null;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const username = getGitHubUsername();

  if (!username) {
    return { user: null, totalStars: 0, topRepos: [], recentRepos: [], topLanguages: [] };
  }

  try {
    const [userRes, reposRes, recentRes] = await Promise.all([
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

    const langCount = new Map<string, number>();
    for (const repo of ownRepos) {
      if (repo.language) {
        langCount.set(repo.language, (langCount.get(repo.language) ?? 0) + 1);
      }
    }
    const topLanguages = [...langCount.entries()]
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return { user, totalStars, topRepos, recentRepos, topLanguages };
  } catch {
    return { user: null, totalStars: 0, topRepos: [], recentRepos: [], topLanguages: [] };
  }
}
