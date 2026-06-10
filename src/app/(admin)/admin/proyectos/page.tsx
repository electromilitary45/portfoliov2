import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAdminProjects } from "@/features/projects/project.service";
import { CreateProjectModal } from "@/features/projects/components/CreateProjectModal";
import { DeleteProjectButton } from "@/features/projects/components/DeleteProjectButton";
import { ProjectStatusAction } from "@/features/projects/components/ProjectStatusAction";

export default async function AdminProjectsPage() {
    const projects = await getAdminProjects();

    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <PageHeader
                    variant="admin"
                    label="Admin / Proyectos"
                    title="Gestionar proyectos."
                    description="Crea proyectos para publicarlos en el portfolio, marcarlos como destacados y agregar links a GitHub o demo."
                />

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Project CMS
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Administración de proyectos
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
                                Crea proyectos desde un modal y visualiza los publicados debajo. Luego
                                agregaremos edición, borrado, filtros por estado e imágenes.
                            </p>
                        </div>

                        <CreateProjectModal />
                    </div>
                </section>

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Project List
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Todos los proyectos
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Mostramos todos los proyectos registrados, incluyendo drafts,
                            publicados y archivados. Luego agregaremos edición, borrado,
                            filtros por estado y subida de imágenes.
                        </p>
                    </div>

                    <div className="mt-10 overflow-hidden border border-white/10">
                        {projects.map((project) => (
                            <article
                                key={project.id}
                                className="grid gap-4 border-b border-white/10 bg-neutral-950 p-5 last:border-b-0 md:grid-cols-[1fr_auto]"
                            >
                                <div>
                                    <p
                                        className={`font-mono text-xs uppercase tracking-[0.2em] ${project.status === "published"
                                            ? "text-red-500"
                                            : project.status === "draft"
                                                ? "text-neutral-400"
                                                : "text-neutral-600"
                                            }`}
                                    >
                                        {project.status}
                                    </p>

                                    <h3 className="mt-3 text-xl font-semibold text-white">
                                        {project.title}
                                    </h3>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">
                                        {project.summary}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-3 md:items-end">
                                    {project.status === "published" ? (
                                        <a
                                            href={`/proyectos/${project.slug}`}
                                            target="_blank"
                                            className="text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white"
                                        >
                                            Ver público
                                        </a>
                                    ) : null}

                                    <div className="flex flex-wrap gap-2 md:justify-end">
                                        <ProjectStatusAction project={project} />
                                        <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </Container>
        </section>
    );
}