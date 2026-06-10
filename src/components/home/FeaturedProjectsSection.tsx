import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { featuredProjects } from "@/features/projects/project.mock";

export function FeaturedProjectsSection() {
    return (
        <section className="border-t border-neutral-200 bg-neutral-50 py-24">
            <Container>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Featured Projects</SectionLabel>

                        <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-5xl">
                            Proyectos que muestran proceso, código y decisiones técnicas.
                        </h2>
                    </div>

                    <Button href="/proyectos" variant="dark">
                        Ver todos
                    </Button>
                </div>

                <div className="mt-14 grid overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                    {featuredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={project.href}
                            className="group flex min-h-[380px] flex-col justify-between bg-white p-8 transition hover:bg-neutral-950"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-mono text-sm text-red-600">
                                        {String(project.id).padStart(2, "0")}
                                    </p>

                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-red-500">
                                        {project.status}
                                    </p>
                                </div>

                                <h3 className="mt-10 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                                    {project.title}
                                </h3>

                                <p className="mt-5 leading-7 text-neutral-600 transition group-hover:text-neutral-400">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-white/10 group-hover:text-neutral-400"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}