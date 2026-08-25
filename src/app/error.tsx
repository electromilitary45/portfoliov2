"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-[calc(100vh-80px)] items-center bg-neutral-50 py-20">
            <Container>
                <div className="mx-auto max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.45em] text-red-600">
                        Error 500
                    </p>

                    <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-7xl">
                        Algo salió mal
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
                        Ocurrió un error inesperado al cargar esta página. Puedes
                        intentarlo de nuevo o volver al inicio.
                        {error.digest ? (
                            <span className="mt-4 block font-mono text-xs uppercase tracking-[0.15em] text-neutral-400">
                                Ref: {error.digest}
                            </span>
                        ) : null}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button variant="primary" onClick={() => unstable_retry()}>
                            Intentar de nuevo
                        </Button>

                        <Button href="/" variant="secondary">
                            Volver al inicio
                        </Button>
                    </div>
                </div>
            </Container>
        </main>
    );
}
