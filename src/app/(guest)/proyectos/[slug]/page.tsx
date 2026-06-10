import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getProjectBySlug } from "@/features/projects/project.service";

type ProjectDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProjectDetailPage({
    params,
}: ProjectDetailPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <article className="mx-auto max-w-4xl">
                    <Link
                        href="/proyectos"
                        className="mb-10 inline-flex font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 transition hover:text-neutral-950"
                    >
                        ← Volver a proyectos
                    </Link>

                    <SectionLabel>Proyecto</SectionLabel>

                    <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-neutral-950">
                        {project.title}
                    </h1>

                    <p className="mt-8 max-w-3xl text-xl leading-9 text-neutral-600">
                        {project.summary}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="border border-neutral-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">
                        {project.githubUrl ? (
                            <Button href={project.githubUrl} variant="secondary" target="_blank" rel="noreferrer">
                                Ver GitHub
                            </Button>
                        ) : null}

                        {project.demoUrl ? (
                            <Button href={project.demoUrl} variant="primary" target="_blank" rel="noreferrer">
                                Ver demo
                            </Button>
                        ) : null}
                    </div>

                    {project.imageUrl ? (
                        <div className="relative mt-12 aspect-[16/9] overflow-hidden border border-neutral-200 bg-neutral-100">
                            <Image
                                src={project.imageUrl}
                                alt={project.imageAlt ?? project.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 896px, 100vw"
                                priority
                            />
                        </div>
                    ) : null}

                    <section className="mt-16 border-t border-neutral-200 bg-white p-8">
                        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                            Detalles del proyecto
                        </h2>

                        <p className="mt-6 leading-8 text-neutral-600">
                            {project.description ??
                                "Más adelante aquí documentaremos el proceso, decisiones técnicas, arquitectura, aprendizajes e imágenes adicionales del proyecto."}
                        </p>
                    </section>
                </article>
            </Container>
        </main>
    );
}