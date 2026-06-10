import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <PageHeader
                    label="Sobre mí"
                    title="Experiencia, estudios y certificados."
                    description="Aquí construiremos tu perfil profesional, experiencia laboral, formación académica, certificados y tecnologías principales."
                />
            </Container>
        </main>
    );
}