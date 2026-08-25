import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
    title: "Contáctame",
    description:
        "Contáctame para conversar sobre desarrollo web, oportunidades profesionales, colaboración técnica o feedback de mis proyectos.",
    alternates: { canonical: "/contactame" },
};

const contactLinks = [
    {
        label: "GitHub",
        value: "Revisar repositorios y proyectos públicos",
        href: "https://github.com/electromilitary45",
    },
    {
        label: "LinkedIn",
        value: "Conectar profesionalmente",
        href: "https://www.linkedin.com/in/villalobossebas/",
    },
    {
        label: "Email",
        value: "Enviar mensaje directo",
        href: "mailto:dereklevilla45@gmail.com",
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <PageHeader
                    label="Contáctame"
                    title="Hablemos de proyectos, ideas o colaboración."
                    description="Puedes contactarme para conversar sobre desarrollo web, oportunidades, colaboración técnica o feedback sobre alguno de mis proyectos."
                />

                <section className="mt-14 border-t border-neutral-200 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600">
                                Contact Channels
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                                Canales disponibles
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Más adelante conectaremos un formulario con validación y una
                            integración segura para guardar o enviar mensajes.
                        </p>
                    </div>

                    <div className="mt-10 grid overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                        {contactLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group flex min-h-[260px] flex-col justify-between bg-white p-8 transition hover:bg-neutral-950"
                            >
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600 transition group-hover:text-red-500">
                                        {item.label}
                                    </p>

                                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                                        {item.value}
                                    </h3>
                                </div>

                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-neutral-500">
                                    Abrir canal →
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            </Container>
        </main>
    );
}