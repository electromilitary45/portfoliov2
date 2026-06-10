import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const stack = [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Vercel",
    "GitHub",
    "SQL",
    "REST APIs",
];

export function TechStackSection() {
    return (
        <section className="bg-neutral-950 py-24 text-white">
            <Container>
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <SectionLabel variant="admin">Stack</SectionLabel>

                        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                            Herramientas con las que construyo.
                        </h2>

                        <p className="mt-6 max-w-xl leading-7 text-neutral-400">
                            Este portfolio también funcionará como laboratorio para documentar
                            decisiones técnicas, arquitectura, patrones y aprendizajes reales.
                        </p>
                    </div>

                    <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                        {stack.map((item) => (
                            <article
                                key={item}
                                className="bg-neutral-950 p-6 transition hover:bg-neutral-900"
                            >
                                <p className="font-mono text-sm uppercase tracking-[0.25em] text-neutral-400">
                                    {item}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}