import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type PageHeaderProps = {
    label: string;
    title: string;
    description: string;
    variant?: "guest" | "admin";
    children?: ReactNode;
};

export function PageHeader({
    label,
    title,
    description,
    variant = "guest",
    children,
}: PageHeaderProps) {
    const descriptionClass =
        variant === "admin" ? "text-neutral-400" : "text-neutral-600";

    return (
        <header>
            <SectionLabel variant={variant}>{label}</SectionLabel>

            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-neutral-950">
                {title}
            </h1>

            <p className={`mt-6 max-w-2xl text-lg leading-8 ${descriptionClass}`}>
                {description}
            </p>

            {children ? <div className="mt-10">{children}</div> : null}
        </header>
    );
}