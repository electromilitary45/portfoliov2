import Link from "next/link";

const footerLinks = [
    { label: "GitHub", href: "https://github.com/electromilitary45" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/villalobossebas/" },
    { label: "Email", href: "mailto:dereklevilla45@gmail.com" },
];

export function GuestFooter() {
    return (
        <footer className="border-t border-neutral-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                    <Link href="/" className="group inline-flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-red-600 transition group-hover:scale-125" />
                        <span className="font-mono text-sm uppercase tracking-[0.35em] text-neutral-950">
                            Portfolio
                        </span>
                    </Link>

                    <p className="mt-5 max-w-md text-sm leading-6 text-neutral-500">
                        Portfolio personal para documentar proyectos, artículos técnicos,
                        experiencia y evolución como developer.
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:items-end">
                    <div className="flex flex-wrap gap-5">
                        {footerLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm text-neutral-500 transition hover:text-neutral-950"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
                        © {new Date().getFullYear()} / Built with Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}