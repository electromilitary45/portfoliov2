import { GraduationCap } from "lucide-react";
import type { Education } from "@/features/profile/profile.type";

type EducationListProps = {
    items: Education[];
};

export function EducationList({ items }: EducationListProps) {
    return (
        <section>
            <div className="flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-blue-600" />
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                    Estudios
                </h2>
            </div>

            <div className="mt-8 space-y-4">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group border border-neutral-200 border-l-4 border-l-blue-600 bg-white p-6 transition hover:border-blue-600/30 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.1)]"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
                            {item.period}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
                            {item.title}
                        </h3>

                        <p className="mt-1 text-neutral-500">
                            {item.institution}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
