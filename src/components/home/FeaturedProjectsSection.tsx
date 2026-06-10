import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const featuredProjects = [
    {
        id: 1,
        title: "Portfolio v2",
        description:
            "Portfolio personal construido con Next.js, Tailwind, Supabase y Vercel, con blog, admin y gestión de proyectos.",
        status: "En desarrollo",
        stack: ["Next.js", "TypeScript", "Tailwind"],
        href: "/proyectos",
    },
    {
        id: 2,
        title: "Admin Dashboard",
        description:
            "Panel privado para administrar proyectos, blog, experiencia, certificados y contenido dinámico del sitio.",
        status: "Planeado",
        stack: ["Supabase", "Auth", "CRUD"],
        href: "/admin",
    },
    {
        id: 3,
        title: "Technical Blog",
        description:
            "Sistema de artículos técnicos para documentar aprendizajes, soluciones, errores y avances de proyectos.",
        status: "Planeado",
        stack: ["MDX", "SEO", "CMS"],
        href: "/blog",
    },
];

export function FeaturedProjectsSection() {
    return (
        <section className="bg-neutral-400 py-24">
            <Container>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Featured Projects</SectionLabel>

                        <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                            Proyectos que muestran proceso, código y decisiones técnicas.
                        </h2>
                    </div>

                    <Button href="/proyectos" variant="secondary">
                        Ver todos
                    </Button>
                </div>

                <div className="mt-14 grid gap-px bg-neutral-200 md:grid-cols-3">
                    {featuredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={project.href}
                            className="group flex min-h-[360px] flex-col justify-between bg-white p-8 transition hover:bg-neutral-950"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="font-mono text-sm text-red-600">
                                        0{project.id}
                                    </p>
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-black group-hover:text-neutral-500">
                                        {project.status}
                                    </p>
                                </div>

                                <h3 className="mt-10 text-3xl font-semibold tracking-[-0.04em] text-neutral-600 group-hover:text-neutral-400">
                                    {project.title}
                                </h3>

                                <p className="mt-5 leading-7 text-neutral-600 group-hover:text-neutral-400">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 group-hover:text-neutral-400"
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