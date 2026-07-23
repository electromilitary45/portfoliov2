import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/features/projects/project.service";
import { getPublishedBlogPosts } from "@/features/blog/blog-post.service";
import { getGitHubStats } from "@/features/github/github.service";

export async function HomeHighlights() {
    const [projects, posts, github] = await Promise.all([
        getProjects(),
        getPublishedBlogPosts(),
        getGitHubStats(),
    ]);

    const highlights = [
        {
            number: "01",
            title: "Proyectos",
            value: projects.length,
            label: projects.length === 1 ? "proyecto" : "proyectos",
            description:
                "Casos reales, repos públicos, demos, imágenes, decisiones técnicas y aprendizajes.",
            href: "/proyectos",
        },
        {
            number: "02",
            title: "GitHub Stats",
            value: github.totalStars,
            label: "estrellas",
            secondary: github.user
                ? `${github.user.public_repos} repos · ${github.user.followers} seguidores`
                : null,
            description:
                "Actividad, tecnologías, contribuciones y evolución como developer.",
            href: github.user?.html_url ?? "#",
            external: true,
        },
        {
            number: "03",
            title: "Blog",
            value: posts.length,
            label: posts.length === 1 ? "artículo" : "artículos",
            description:
                "Notas técnicas, errores resueltos, guías, bitácoras de proyectos y reflexiones.",
            href: "/blog",
        },
    ];

    return (
        <section className="border-y border-neutral-200 bg-white py-20">
            <Container>
                <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                    {highlights.map((item) => {
                        const content = (
                            <article
                                className="group flex min-h-[280px] flex-col justify-between bg-white p-8 transition hover:bg-neutral-950 md:p-10"
                            >
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-red-600">
                                        {item.number}
                                    </p>

                                    <h2 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                                        {item.title}
                                    </h2>

                                    <p className="mt-4 text-xs leading-7 text-neutral-600 transition group-hover:text-neutral-400">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <p className="text-4xl font-bold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 transition group-hover:text-neutral-400">
                                        {item.label}
                                    </p>
                                    {item.secondary && (
                                        <p className="mt-1 font-mono text-xs tracking-[0.1em] text-neutral-400 transition group-hover:text-neutral-500">
                                            {item.secondary}
                                        </p>
                                    )}
                                </div>
                            </article>
                        );

                        if (item.external) {
                            return (
                                <a
                                    key={item.number}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <Link key={item.number} href={item.href} className="block">
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
