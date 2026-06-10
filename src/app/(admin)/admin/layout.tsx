import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminNavItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Proyectos", href: "/admin/proyectos" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Perfil", href: "/admin/perfil" },
];

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-neutral-950 p-6 lg:block">
                <div className="flex h-full flex-col justify-between">
                    <div>
                        <Link href="/admin" className="group flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-red-500 transition group-hover:scale-125" />
                            <span className="font-mono text-sm uppercase tracking-[0.35em]">
                                Admin
                            </span>
                        </Link>

                        <div className="mt-10 border-t border-white/10 pt-6">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
                                Management
                            </p>

                            <nav className="mt-5 space-y-2">
                                {adminNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <Link
                            href="/"
                            className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                        >
                            Volver al sitio
                        </Link>

                        <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-neutral-600">
                            Portfolio CMS
                        </p>
                    </div>
                </div>
            </aside>

            <main className="lg:pl-72">{children}</main>
        </div>
    );
}