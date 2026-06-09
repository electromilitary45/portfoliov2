import { GuestFooter } from "@/components/layout/GuestFooter";
import { GuestNavbar } from "@/components/layout/GuestNavbar";

export default function AboutPage() {
    return (
        <>
            <GuestNavbar />
            <main className="mx-auto min-h-[calc(100vh-161px)] max-w-7xl px-6 py-20">
                <p className="font-mono text-sm uppercase tracking-[0.35em] text-red-600">
                    Sobre mí
                </p>
                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
                    Experiencia, estudios y certificados.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                    Aquí construiremos tu perfil profesional, experiencia laboral,
                    formación académica, certificados y tecnologías principales.
                </p>
            </main>
            <GuestFooter />
        </>
    );
}