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
                <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <SectionLabel variant="admin">Stack</SectionLabel>

                        <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                            Herramientas con las que construyo.
                        </h2>

                        <p className="mt-6 max-w-xl leading-7 text-neutral-400">
                            Este portfolio también funcionará como laboratorio para documentar
                            decisiones técnicas, arquitectura, patrones y aprendizajes reales.
                        </p>
                    </div>

                    <div className="grid overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                        {stack.map((item, index) => (
                            <article
                                key={item}
                                className="group flex min-h-28 items-end justify-between border-b border-white/10 bg-neutral-950 p-6 transition last:border-b-0 hover:bg-neutral-900 sm:border-r sm:[&:nth-child(even)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                            >
                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 transition group-hover:text-red-500">
                                    {String(index + 1).padStart(2, "0")}
                                </p>

                                <p className="text-right font-mono text-sm uppercase tracking-[0.25em] text-neutral-300 transition group-hover:text-white">
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