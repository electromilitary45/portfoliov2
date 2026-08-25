"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "portfolio-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
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
            className={`inline-flex h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950 ${className}`}
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
