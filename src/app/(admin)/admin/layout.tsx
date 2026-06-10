import Link from "next/link";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 p-6 lg:block">
                <Link
                    href="/admin"
                    className="font-mono text-sm uppercase tracking-[0.35em]"
                >
                    Admin
                </Link>

                <nav className="mt-12 space-y-2">
                    <Link
                        href="/admin"
                        className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/proyectos"
                        className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        Proyectos
                    </Link>

                    <Link
                        href="/admin/blog"
                        className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        Blog
                    </Link>

                    <Link
                        href="/admin/perfil"
                        className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        Perfil
                    </Link>

                    <Link
                        href="/"
                        className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        Volver al sitio
                    </Link>
                </nav>
            </aside>

            <main className="lg:pl-72">{children}</main>
        </div>
    );
}