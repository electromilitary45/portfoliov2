"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Blog", href: "/blog" },
    { label: "Contáctame", href: "/contactame" },
];

export function GuestNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    function isActive(href: string) {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    }

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
                            className={`text-sm transition ${
                                isActive(item.href)
                                    ? "font-medium text-neutral-950 underline underline-offset-4 decoration-red-600 decoration-2"
                                    : "text-neutral-500 hover:text-neutral-950"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <LanguageToggle />
                        <div
                            id="google_translate_element"
                            className="absolute inset-0 opacity-0"
                        />
                    </div>
                    <ThemeToggle />
                    <Button href="/admin" variant="dark" className="max-md:hidden">
                        Admin
                    </Button>
                </div>

                <button
                    type="button"
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="inline-flex items-center justify-center p-2 text-neutral-950 md:hidden"
                >
                    {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            <div
                className={`overflow-hidden border-t border-neutral-200 bg-white/80 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
                    menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
                }`}
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`rounded px-2 py-3 text-sm transition ${
                                isActive(item.href)
                                    ? "bg-neutral-100 font-medium text-neutral-950"
                                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Button href="/admin" variant="dark" className="mt-2">
                        Admin
                    </Button>

                    <div className="mt-2 flex gap-2">
                        <LanguageToggle className="w-full" />
                        <ThemeToggle className="w-full" />
                    </div>
                </div>
            </div>
        </header>
    );
}