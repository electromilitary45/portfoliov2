import Link from "next/link";

const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Blog", href: "/blog" },
    { label: "Contáctame", href: "/contactame" },
];

export function GuestNavbar() {
    return (
        <header className="border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="font-mono text-sm uppercase tracking-[0.35em]">
                    Portfolio
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-neutral-600 transition hover:text-neutral-950"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Link
                    href="/admin"
                    className="border border-neutral-300 px-4 py-2 text-sm transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                >
                    Admin
                </Link>
            </nav>
        </header>
    );
}