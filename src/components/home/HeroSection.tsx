import Image from "next/image";
import { Folder, ExternalLink, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getProfileWithAvatar } from "@/features/profile/profile.service";
import { getGitHubStats } from "@/features/github/github.service";

function formatRelativeTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "hoy";
    if (diffDays === 1) return "ayer";
    if (diffDays < 7) return `hace ${diffDays} días`;
    if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} sem`;
    if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} mes`;
    return `hace ${Math.floor(diffDays / 365)} año`;
}

export async function HeroSection() {
    const [profile, github] = await Promise.all([
        getProfileWithAvatar(),
        getGitHubStats(),
    ]);

    const stats = [
        { label: "Repos", value: github.user?.public_repos ?? 0 },
        { label: "Estrellas", value: github.totalStars },
        { label: "Seguidores", value: github.user?.followers ?? 0 },
    ];

    return (
        <section className="bg-neutral-50 py-16 lg:py-20">
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-[2fr_0.8fr]">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-5 sm:gap-8">
                            {profile.avatarUrl && (
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-neutral-200 md:h-24 md:w-24">
                                    <Image
                                        src={profile.avatarUrl}
                                        alt="Foto de perfil"
                                        fill
                                        sizes="96px"
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="font-mono text-xs uppercase tracking-[0.45em] text-red-600 sm:text-sm">
                                    Developer Portfolio
                                </p>

                                <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-5xl md:text-7xl lg:text-8xl">
                                    {profile.headline}
                                </h1>
                            </div>
                        </div>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600 lg:text-xl lg:leading-9">
                            {profile.summary}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-10">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-3xl font-bold tracking-[-0.03em] text-neutral-950 lg:text-4xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-neutral-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            <Button href="/proyectos" variant="primary">
                                Ver proyectos
                            </Button>

                            <Button href="/contactame" variant="secondary">
                                Contactarme
                            </Button>
                        </div>
                    </div>

                    <div className="relative hidden min-h-[400px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 shadow-2xl lg:flex dark:border-neutral-800">
                        {/* Scan line overlay */}
                        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.03]">
                            <div className="animate-scanline h-full w-full bg-gradient-to-b from-transparent via-white to-transparent" />
                        </div>

                        {/* Title bar */}
                        <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-3">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                            <div className="ml-3 flex items-center gap-2 text-xs text-neutral-500">
                                <Monitor className="h-3.5 w-3.5" />
                                <span className="font-mono">actividad reciente</span>
                            </div>
                        </div>

                        {/* Terminal content */}
                        <div className="flex flex-1 flex-col p-6 font-mono text-sm">
                            {/* Username prompt */}
                            {github.user && (
                                <div className="mb-5">
                                    <span className="text-green-400">❯</span>
                                    <span className="ml-2 text-neutral-500">whoami</span>
                                    <div className="mt-2 pl-4">
                                        <a
                                            href={github.user.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-base font-semibold text-white transition hover:text-red-400"
                                        >
                                            @{github.user.login}
                                            <ExternalLink className="h-3.5 w-3.5 text-neutral-500" />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Languages with progress bars */}
                            {github.topLanguages.length > 0 && (
                                <div className="mb-5">
                                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-600">
                                         <span className="text-red-400">{"//"}</span>
                                        <span>top languages</span>
                                    </div>
                                    <div className="space-y-2.5">
                                        {(() => {
                                            const totalBytes = github.topLanguages.reduce(
                                                (sum, l) => sum + l.bytes,
                                                0
                                            );
                                            const barColors = [
                                                "bg-blue-400", "bg-orange-400", "bg-purple-400",
                                                "bg-cyan-400", "bg-pink-400", "bg-yellow-400",
                                                "bg-green-400", "bg-red-400", "bg-indigo-400",
                                                "bg-teal-400", "bg-amber-400", "bg-fuchsia-400",
                                            ];
                                            const hashColor = (str: string) => {
                                                let h = 0;
                                                for (let i = 0; i < str.length; i++) {
                                                    h = str.charCodeAt(i) + ((h << 5) - h);
                                                }
                                                return barColors[Math.abs(h) % barColors.length];
                                            };
                                            return github.topLanguages.map((lang) => {
                                                const pct = Math.round((lang.bytes / totalBytes) * 100);
                                                const barColor = hashColor(lang.language);
                                                return (
                                                    <div key={lang.language} className="flex items-center gap-3">
                                                        <span className="w-20 shrink-0 truncate text-xs text-neutral-400">
                                                            {lang.language}
                                                        </span>
                                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
                                                            <div
                                                                className={`h-full rounded-full ${barColor} transition-all duration-700`}
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                        <span className="w-8 text-right text-xs text-neutral-600">
                                                            {pct}%
                                                        </span>
                                                    </div>
                                                );
                                            });
                                        })()}
                                    </div>
                                </div>
                            )}

                            {/* Recent repos */}
                            <div className="mb-5">
                                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-600">
                                     <span className="text-red-400">{"//"}</span>
                                    <span>recent repos</span>
                                </div>
                                <div className="space-y-2">
                                    {github.recentRepos.slice(0, 4).map((repo) => (
                                        <a
                                            key={repo.name}
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between rounded-lg px-2 py-1.5 -mx-2 transition hover:bg-neutral-900"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <Folder className="h-4 w-4 shrink-0 text-yellow-500/70 group-hover:text-yellow-400" />
                                                <span className="truncate text-sm text-neutral-300 group-hover:text-white transition">
                                                    {repo.name}
                                                </span>
                                                {repo.language && (
                                                    <span className="hidden shrink-0 text-xs text-neutral-600 sm:inline">
                                                        {repo.language}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="shrink-0 pl-3 text-xs text-neutral-600">
                                                {formatRelativeTime(repo.pushed_at)}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Meta info */}
                            <div className="mt-auto border-t border-neutral-800 pt-4">
                                <div className="flex items-center gap-6 text-xs text-neutral-600">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-red-400">→</span>
                                        <span className="text-neutral-500">Stack:</span>
                                        <span className="text-neutral-400">Next.js</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-red-400">→</span>
                                        <span className="text-neutral-500">Deploy:</span>
                                        <span className="text-neutral-400">Vercel</span>
                                    </div>
                                </div>
                            </div>

                            {/* Blinking cursor */}
                            <div className="mt-4 flex items-center gap-1.5 text-sm">
                                <span className="text-green-400">❯</span>
                                <span className="inline-block h-4 w-2 animate-blink bg-green-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
