import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { getFeaturedProjects } from "@/features/projects/project.service";

export async function FeaturedProjectsSection() {
    const projects = await getFeaturedProjects();

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

                    <Button href="/proyectos" variant="secondary">
                        Ver todos
                    </Button>
                </div>

                <div className="mt-14 grid overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </Container>
        </section>
    );
}