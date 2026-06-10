import type { Education } from "@/features/profile/profile.type";

type EducationListProps = {
    items: Education[];
};

export function EducationList({ items }: EducationListProps) {
    return (
        <section>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                Estudios
            </h2>

            <div className="mt-8 space-y-4">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group border border-neutral-200 bg-white p-6 transition hover:border-neutral-950 hover:bg-neutral-950"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-600 transition group-hover:text-red-500">
                            {item.period}
                        </p>

                        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                            {item.title}
                        </h3>

                        <p className="mt-2 text-neutral-500 transition group-hover:text-neutral-400">
                            {item.institution}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}