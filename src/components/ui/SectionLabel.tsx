type SectionLabelProps = {
    children: string;
    variant?: "guest" | "admin";
};

export function SectionLabel({
    children,
    variant = "guest",
}: SectionLabelProps) {
    const colorClass = variant === "admin" ? "text-red-500" : "text-red-600";

    return (
        <p
            className={`font-mono text-sm uppercase tracking-[0.35em] ${colorClass}`}
        >
            {children}
        </p>
    );
}