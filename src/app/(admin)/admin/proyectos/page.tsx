import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

const projectAdminActions = [
    {
        number: "01",
        title: "Crear proyecto",
        description: "Formulario para registrar título, descripción, stack, imágenes y links.",
    },
    {
        number: "02",
        title: "Editar contenido",
        description: "Actualizar información, estado, repositorio, demo e imágenes.",
    },
    {
        number: "03",
        title: "Publicar",
        description: "Controlar qué proyectos aparecen en el sitio público.",
    },
];

export default function AdminProjectsPage() {
    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <PageHeader
                    variant="admin"
                    label="Admin / Proyectos"
                    title="Gestionar proyectos."
                    description="Aquí construiremos el CRUD para crear, editar, publicar y ordenar los proyectos del portfolio."
                />

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Project CMS
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Flujo de administración
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Por ahora esta sección es placeholder. Más adelante se conectará
                            con Supabase, Storage y server actions.
                        </p>
                    </div>

                    <div className="mt-10 grid overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
                        {projectAdminActions.map((action) => (
                            <article
                                key={action.number}
                                className="min-h-[240px] bg-neutral-950 p-6 transition hover:bg-neutral-900"
                            >
                                <p className="font-mono text-sm text-red-500">
                                    {action.number}
                                </p>

                                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
                                    {action.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-neutral-400">
                                    {action.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </Container>
        </section>
    );
}