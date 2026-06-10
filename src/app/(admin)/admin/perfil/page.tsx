import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

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
            </Container>
        </section>
    );
}