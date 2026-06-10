import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

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
            </Container>
        </section>
    );
}