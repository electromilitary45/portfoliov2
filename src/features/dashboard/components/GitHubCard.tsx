import type { GitHubStats } from "@/features/github/github.type";

type GitHubCardProps = {
  stats: GitHubStats;
};

export function GitHubCard({ stats }: GitHubCardProps) {
  const { user, totalStars, topRepos, topLanguages } = stats;

  if (!user) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          GitHub
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          Configura GITHUB_USERNAME en .env.local para ver stats.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          GitHub
        </p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-400 transition hover:text-red-300"
        >
          {user.login}
        </a>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-light text-white tabular-nums">
            {totalStars}
          </p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
            Stars
          </p>
        </div>
        <div>
          <p className="text-2xl font-light text-white tabular-nums">
            {user.public_repos}
          </p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
            Repos
          </p>
        </div>
        <div>
          <p className="text-2xl font-light text-white tabular-nums">
            {user.followers}
          </p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
            Followers
          </p>
        </div>
      </div>

      {topRepos.length > 0 && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Top Repos
          </p>
          <div className="space-y-1.5">
            {topRepos.slice(0, 3).map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded px-2 py-1.5 text-sm text-neutral-400 transition hover:bg-white/[0.03] hover:text-white"
              >
                <span className="truncate">{repo.name}</span>
                <span className="ml-3 flex shrink-0 items-center gap-1 font-mono text-xs text-yellow-500">
                  ★ {repo.stargazers_count}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {topLanguages.length > 0 && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Lenguajes
          </p>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map((lang) => (
              <span
                key={lang.language}
                className="border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-400"
              >
                {lang.language} ({lang.count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
