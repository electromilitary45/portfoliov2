"use client";

import { useEffect, useRef } from "react";
import { Globe } from "lucide-react";

type LanguageToggleProps = {
    className?: string;
    variant?: "guest" | "admin";
};

const variantClasses = {
    guest:
        "border-neutral-200 text-neutral-500 hover:border-neutral-950 hover:text-neutral-950",
    admin:
        "border-white/10 text-neutral-300 hover:border-red-500 hover:text-white",
} as const;

export function LanguageToggle({
    className = "",
    variant = "guest",
}: LanguageToggleProps) {
    const btnRef = useRef<HTMLButtonElement>(null);

    function handleClick() {
        const googBtn = document.querySelector(
            "#google_translate_element .goog-te-gadget-simple"
        ) as HTMLElement | null;
        if (googBtn) {
            googBtn.click();
        }
    }

    return (
        <button
            ref={btnRef}
            type="button"
            onClick={handleClick}
            aria-label="Cambiar idioma"
            title="Cambiar idioma"
            className={`inline-flex h-10 w-10 items-center justify-center border transition ${variantClasses[variant]} ${className}`}
        >
            <Globe className="h-4 w-4" />
        </button>
    );
}
