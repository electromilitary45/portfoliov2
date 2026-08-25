import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { getProjects } from "@/features/projects/project.service";

export const metadata: Metadata = {
    title: "Proyectos",
    description:
        "Archivo de proyectos donde documento el proceso, decisiones técnicas, stack utilizado, repositorios públicos y demos.",
    alternates: { canonical: "/proyectos" },
};

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <PageHeader
                    label="Proyectos"
                    title="Proyectos construidos, documentados y publicados."
                    description="Una colección de proyectos donde documento el proceso, decisiones técnicas, stack utilizado, repositorios públicos, demos e imágenes relevantes."
                />

                <section className="mt-14 border-t border-neutral-200 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600">
                                Project Index
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                                Archivo de proyectos
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Estos proyectos vienen desde Supabase cuando las variables de
                            entorno están configuradas; en local puede usarse mock como
                            respaldo.
                        </p>
                    </div>

                    <div className="mt-10 grid overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            </Container>
        </main>
    );
}