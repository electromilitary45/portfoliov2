"use client";

import "./globals.css";

export default function GlobalError({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    return (
        <html lang="es">
            <body className="bg-neutral-50 text-neutral-950 antialiased">
                <main className="flex min-h-screen items-center justify-center py-20">
                    <div className="mx-auto max-w-xl px-6 text-center">
                        <p className="font-mono text-xs uppercase tracking-[0.45em] text-red-600">
                            Error 500
                        </p>

                        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                            Algo salió mal
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-neutral-600">
                            Ocurrió un error crítico en la aplicación.
                            {error.digest ? (
                                <span className="mt-4 block font-mono text-xs uppercase tracking-[0.15em] text-neutral-400">
                                    Ref: {error.digest}
                                </span>
                            ) : null}
                        </p>

                        <button
                            type="button"
                            onClick={() => unstable_retry()}
                            className="mt-10 inline-flex items-center justify-center border border-neutral-950 bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}
