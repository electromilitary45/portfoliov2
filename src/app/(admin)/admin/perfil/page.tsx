import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

const profileAdminActions = [
    {
        number: "01",
        title: "Experiencia",
        description:
            "Administrar roles, empresas, periodos, descripción y tecnologías usadas.",
    },
    {
        number: "02",
        title: "Estudios",
        description:
            "Registrar formación académica, instituciones, fechas y detalles relevantes.",
    },
    {
        number: "03",
        title: "Certificados",
        description:
            "Guardar certificados, emisores, años, enlaces y archivos de respaldo.",
    },
];

export default function AdminProfilePage() {
    return (
        <section className="min-h-screen py-20">
            <Container className="lg:px-12">
                <PageHeader
                    variant="admin"
                    label="Admin / Perfil"
                    title="Gestionar perfil."
                    description="Aquí administraremos experiencia, estudios, certificados, tecnologías y contenido de la página Sobre mí."
                />

                <section className="mt-14 border-t border-white/10 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                Profile CMS
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                                Contenido profesional
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Por ahora esta sección es placeholder. Luego gestionará la
                            información que se muestra en la página Sobre mí.
                        </p>
                    </div>

                    <div className="mt-10 grid overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
                        {profileAdminActions.map((action) => (
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