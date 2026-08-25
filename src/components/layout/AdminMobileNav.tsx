"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOutAction } from "@/app/actions/auth/sign-out.action";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type AdminMobileNavProps = {
    navItems: { label: string; href: string }[];
};

export function AdminMobileNav({ navItems }: AdminMobileNavProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950 lg:hidden">
            <div className="flex h-16 items-center justify-between px-6">
                <Link href="/admin" className="group flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-red-500 transition group-hover:scale-125" />
                    <span className="font-mono text-sm uppercase tracking-[0.35em] text-white">
                        Admin
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle variant="admin" />
                    <button
                        type="button"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="inline-flex items-center justify-center p-2 text-white"
                    >
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="border-t border-white/10">
                    <nav className="space-y-2 px-6 py-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                        >
                            Volver al sitio
                        </Link>
                        <form action={signOutAction} className="pt-2">
                            <button
                                type="submit"
                                className="block w-full border border-white/10 px-4 py-3 text-left text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                            >
                                Cerrar sesión
                            </button>
                        </form>
                    </nav>
                </div>
            )}
        </div>
    );
}