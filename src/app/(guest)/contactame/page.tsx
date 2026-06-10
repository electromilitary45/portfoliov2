import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ContactPage() {
    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <PageHeader
                    label="Contáctame"
                    title="Hablemos de proyectos, ideas o colaboración."
                    description="Aquí construiremos un formulario de contacto, enlaces sociales y una integración segura para guardar o enviar mensajes."
                />
            </Container>
        </main>
    );
}