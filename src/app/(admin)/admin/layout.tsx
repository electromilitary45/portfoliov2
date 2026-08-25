import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth/sign-out.action";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminMobileNav } from "@/components/layout/AdminMobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const adminNavItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Proyectos", href: "/admin/proyectos" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Perfil", href: "/admin/perfil" },
    { label: "Mensajes", href: "/admin/mensajes" },
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
        <div className="palette-admin min-h-screen bg-neutral-950 text-white">
            <AdminMobileNav navItems={adminNavItems} />
            <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 overflow-y-auto border-r border-white/10 bg-neutral-950 p-6 lg:flex lg:flex-col">
                <div className="flex min-h-full flex-col justify-between">
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

                    <div className="mt-10 border-t border-white/10 pt-6">
                        <div className="mb-3 flex justify-end">
                            <ThemeToggle variant="admin" />
                        </div>

                        <Link
                            href="/"
                            className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                        >
                            Volver al sitio
                        </Link>

                        <form action={signOutAction} className="mt-3">
                            <button
                                type="submit"
                                className="block w-full border border-white/10 px-4 py-3 text-left text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                            >
                                Cerrar sesión
                            </button>
                        </form>

                        <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-neutral-600">
                            Portfolio CMS
                        </p>
                    </div>
                </div>
            </aside>

            <main className="min-h-screen lg:pl-72">{children}</main>
        </div>
    );
}