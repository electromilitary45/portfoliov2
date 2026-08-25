import Image from "next/image";
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

    const topLanguages = github.topLanguages.map((l) => l.language).slice(0, 3);
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

                    <div className="relative hidden min-h-[400px] flex-col overflow-hidden border border-neutral-200 bg-white p-8 shadow-sm lg:flex">
                        <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-red-600" />

                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.35em] text-neutral-400">
                                Actividad reciente
                            </p>

                            {github.user && (
                                <a
                                    href={github.user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-neutral-950 transition hover:text-red-600"
                                >
                                    <span>@{github.user.login}</span>
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>

                        <div className="mt-auto space-y-4 font-mono text-sm text-neutral-500">
                            {topLanguages.length > 0 && (
                                <div className="flex justify-between border-t border-neutral-200 pt-4">
                                    <span>Lenguajes</span>
                                    <span className="text-neutral-950">{topLanguages.join(", ")}</span>
                                </div>
                            )}

                            {github.recentRepos.slice(0, 4).map((repo) => (
                                <div key={repo.name} className="flex items-center justify-between border-t border-neutral-200 pt-4">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="max-w-[65%] truncate text-neutral-950 transition hover:text-red-600"
                                    >
                                        {repo.name}
                                    </a>
                                    <span className="shrink-0 text-xs text-neutral-400">
                                        {formatRelativeTime(repo.pushed_at)}
                                    </span>
                                </div>
                            ))}

                            <div className="flex justify-between border-t border-neutral-200 pt-4">
                                <span>Stack</span>
                                <span className="text-neutral-950">Next.js</span>
                            </div>

                            <div className="flex justify-between border-t border-neutral-200 pt-4">
                                <span>Deploy</span>
                                <span className="text-neutral-950">Vercel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
