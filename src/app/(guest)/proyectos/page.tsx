import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { getProjects } from "@/features/projects/project.service";

export default function ProjectsPage() {
    const projects = getProjects();

    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <PageHeader
                    label="Proyectos"
                    title="Proyectos construidos, documentados y publicados."
                    description="Aquí agregaremos cards con imágenes, descripción, tecnologías, links a GitHub, demos y detalles técnicos."
                />

                <section className="mt-14 grid overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </section>
            </Container>
        </main>
    );
}