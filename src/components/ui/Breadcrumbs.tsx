import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                <li>
                    <Link
                        href="/"
                        className="transition hover:text-neutral-950"
                    >
                        Inicio
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="transition hover:text-neutral-950"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-neutral-950">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
