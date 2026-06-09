export default function AdminPage() {
    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-20 text-white">
            <section className="mx-auto max-w-7xl">
                <p className="font-mono text-sm uppercase tracking-[0.35em] text-red-500">
                    Admin
                </p>
                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
                    Panel de administración.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">
                    Aquí construiremos el dashboard para administrar proyectos, blog,
                    certificados, experiencia y contenido del portfolio.
                </p>
            </section>
        </main>
    );
}