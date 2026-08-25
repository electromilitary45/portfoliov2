"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "portfolio-theme";

type ThemeToggleProps = {
    className?: string;
    variant?: "guest" | "admin";
};

const variantClasses = {
    guest:
        "border-neutral-200 text-neutral-500 hover:border-neutral-950 hover:text-neutral-950",
    admin:
        "border-white/10 text-neutral-300 hover:border-red-500 hover:text-white",
} as const;

export function ThemeToggle({
    className = "",
    variant = "guest",
}: ThemeToggleProps) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
        setMounted(true);
    }, []);

    function toggleTheme() {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);

        try {
            localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
        } catch {
            /* almacenamiento no disponible */
        }
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                mounted && isDark
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
            }
            className={`inline-flex h-10 w-10 items-center justify-center border transition ${variantClasses[variant]} ${className}`}
        >
            {mounted ? (
                isDark ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )
            ) : (
                <Moon className="h-4 w-4 opacity-0" />
            )}
        </button>
    );
}
