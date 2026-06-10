import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

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
            </Container>
        </section>
    );
}