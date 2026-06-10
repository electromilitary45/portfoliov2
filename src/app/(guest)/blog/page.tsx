export default function BlogPage() {
    return (
            <main className="mx-auto min-h-[calc(100vh-161px)] max-w-7xl px-6 py-20">
                <p className="font-mono text-sm uppercase tracking-[0.35em] text-red-600">
                    Blog
                </p>
                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
                    Notas, guías y bitácoras de desarrollo.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                    Más adelante construiremos un blog completo con posts, categorías,
                    slugs, contenido editable y vista individual de cada artículo.
                </p>
            </main>
    );
}