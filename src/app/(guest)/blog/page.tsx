import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export default function BlogPage() {
    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <PageHeader
                    label="Blog"
                    title="Notas, guías y bitácoras de desarrollo."
                    description="Más adelante construiremos un blog completo con posts, categorías, slugs, contenido editable y vista individual de cada artículo."
                />
            </Container>
        </main>
    );
}