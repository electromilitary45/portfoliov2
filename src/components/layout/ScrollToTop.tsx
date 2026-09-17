"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY > 400);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center border border-neutral-200 bg-white text-neutral-500 shadow-lg transition-all duration-300 hover:border-neutral-950 hover:text-neutral-950 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
            }`}
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    );
}
