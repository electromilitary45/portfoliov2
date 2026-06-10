export default function AdminBlogPage() {
    return (
        <section className="min-h-screen px-6 py-20 lg:px-12">
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-red-500">
                Admin / Blog
            </p>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em]">
                Gestionar blog.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">
                Aquí construiremos el sistema para escribir, editar, programar y
                publicar artículos técnicos.
            </p>
        </section>
    );
}