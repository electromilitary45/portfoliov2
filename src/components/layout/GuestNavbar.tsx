import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Blog", href: "/blog" },
    { label: "Contáctame", href: "/contactame" },
];

export function GuestNavbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="group flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-red-600 transition group-hover:scale-125" />
                    <span className="font-mono text-sm uppercase tracking-[0.35em] text-neutral-950">
                        Portfolio
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-neutral-500 transition hover:text-neutral-950"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Button href="/admin" variant="dark" className="hidden md:inline-flex">
                    Admin
                </Button>
            </nav>
        </header>
    );
}