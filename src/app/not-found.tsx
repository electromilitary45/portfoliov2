import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
    title: "Página no encontrada",
};

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] items-center bg-neutral-50 py-20">
            <Container>
                <div className="mx-auto max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.45em] text-red-600">
                        Error 404
                    </p>

                    <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-7xl">
                        Página no encontrada
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
                        La página que buscas no existe o fue movida. Revisa la
                        dirección o vuelve al inicio para seguir explorando.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button href="/" variant="primary">
                            Volver al inicio
                        </Button>

                        <Link
                            href="/proyectos"
                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
                        >
                            Ver proyectos
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}
