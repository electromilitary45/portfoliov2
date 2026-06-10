import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProjectsPage() {
    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <PageHeader
                    label="Proyectos"
                    title="Proyectos construidos, documentados y publicados."
                    description="Aquí agregaremos cards con imágenes, descripción, tecnologías, links a GitHub, demos y detalles técnicos."
                />
            </Container>
        </main>
    );
}