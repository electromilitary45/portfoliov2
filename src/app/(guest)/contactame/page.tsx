import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { sendContactMessageAction } from "@/app/actions/contact/send-contact-message.action";

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

const inputClasses =
    "w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none";

type ContactPageProps = {
    searchParams: Promise<{
        sent?: string;
        channel?: string;
        error?: string;
    }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const { sent, error } = await searchParams;

    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <PageHeader
                    label="Contáctame"
                    title="Hablemos de proyectos, ideas o colaboración."
                    description="Puedes contactarme para conversar sobre desarrollo web, oportunidades, colaboración técnica o feedback sobre alguno de mis proyectos."
                />

                {sent && (
                    <div className="mt-10 border-l-4 border-green-500 bg-green-50 p-6">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-green-600">
                            Mensaje enviado
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                            Gracias por escribir. Te responderé lo antes posible.
                        </p>
                    </div>
                )}

                {error === "invalid_fields" && (
                    <div className="mt-10 border-l-4 border-red-600 bg-red-50 p-6">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600">
                            Datos inválidos
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                            Revisa los campos: el nombre es obligatorio, el email debe ser
                            válido y el mensaje debe tener entre 10 y 2000 caracteres.
                        </p>
                    </div>
                )}

                {error === "no_channel" && (
                    <div className="mt-10 border-l-4 border-red-600 bg-red-50 p-6">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600">
                            Error al enviar
                        </p>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                            No se pudo entregar tu mensaje en este momento. Inténtalo más
                            tarde o escríbeme directo por alguno de los canales de abajo.
                        </p>
                    </div>
                )}

                <section className="mt-14 border-t border-neutral-200 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600">
                                Envía un mensaje
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                                Formulario de contacto
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Completa el formulario y me llegará directamente a mi correo.
                            También puedes usar los canales rápidos de abajo.
                        </p>
                    </div>

                    <form
                        action={sendContactMessageAction}
                        className="mt-10 grid gap-6 bg-white p-8 md:p-10"
                    >
                        <div className="grid gap-6 md:grid-cols-2">
                            <label className="block">
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Nombre *
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    minLength={2}
                                    maxLength={80}
                                    placeholder="Tu nombre"
                                    className={`mt-2 ${inputClasses}`}
                                />
                            </label>

                            <label className="block">
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                                    Email *
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="tu@email.com"
                                    className={`mt-2 ${inputClasses}`}
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                                Mensaje *
                            </span>
                            <textarea
                                name="message"
                                required
                                minLength={10}
                                maxLength={2000}
                                rows={7}
                                placeholder="Cuéntame sobre tu proyecto, propuesta o duda..."
                                className={`mt-2 resize-y ${inputClasses}`}
                            />
                        </label>

                        {/* Honeypot anti-spam: invisible para humanos */}
                        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                            <label>
                                No rellenes este campo si eres humano:
                                <input
                                    type="text"
                                    name="website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </label>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6">
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-400">
                                * Campos obligatorios
                            </p>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center border border-neutral-950 bg-neutral-950 px-8 py-3 text-sm font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                            >
                                Enviar mensaje
                            </button>
                        </div>
                    </form>
                </section>

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
                            Si prefieres, contáctame directo por cualquiera de estos canales.
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
