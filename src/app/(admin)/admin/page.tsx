export default function AdminPage() {
    return (
        <section className="min-h-screen px-6 py-20 lg:px-12">
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

            <div className="mt-12 grid gap-4 md:grid-cols-3">
                <article className="border border-white/10 p-6">
                    <p className="font-mono text-sm text-red-500">01</p>
                    <h2 className="mt-6 text-2xl font-semibold">Proyectos</h2>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                        Crear, editar y publicar proyectos del portfolio.
                    </p>
                </article>

                <article className="border border-white/10 p-6">
                    <p className="font-mono text-sm text-red-500">02</p>
                    <h2 className="mt-6 text-2xl font-semibold">Blog</h2>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                        Gestionar artículos técnicos, categorías y publicaciones.
                    </p>
                </article>

                <article className="border border-white/10 p-6">
                    <p className="font-mono text-sm text-red-500">03</p>
                    <h2 className="mt-6 text-2xl font-semibold">Perfil</h2>
                    <p className="mt-3 text-sm leading-6 text-neutral-400">
                        Administrar experiencia, certificados y estudios.
                    </p>
                </article>
            </div>
        </section>
    );
}