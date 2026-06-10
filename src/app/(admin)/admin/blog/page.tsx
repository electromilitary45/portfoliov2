import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

const blogAdminActions = [
    {
        number: "01",
        title: "Crear artículo",
        description:
            "Formulario para escribir título, slug, excerpt, contenido, tags e imagen de portada.",
    },
    {
        number: "02",
        title: "Gestionar estado",
        description:
            "Controlar borradores, publicaciones y futuras fechas de publicación.",
    },
    {
        number: "03",
        title: "Optimizar SEO",
        description:
            "Administrar metadata, imágenes OpenGraph y estructura para compartir artículos.",
    },
];

export default function AdminBlogPage() {
    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <PageHeader
                    variant="admin"
                    label="Admin / Blog"
                    title="Gestionar blog."
                    description="Aquí construiremos el sistema para escribir, editar, programar y publicar artículos técnicos."
                />

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Blog CMS
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Flujo editorial
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Por ahora esta sección es placeholder. Más adelante permitirá
                            administrar posts, imágenes, tags, slugs y estado de publicación.
                        </p>
                    </div>

                    <div className="mt-10 grid overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
                        {blogAdminActions.map((action) => (
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