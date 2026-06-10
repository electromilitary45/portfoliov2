import type { Experience } from "@/features/profile/profile.type";

type ExperienceTimelineProps = {
    items: Experience[];
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
    return (
        <section>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                Experiencia
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
                            {item.role}
                        </h3>

                        <p className="mt-2 text-neutral-500 transition group-hover:text-neutral-400">
                            {item.company}
                        </p>

                        <p className="mt-5 leading-7 text-neutral-600 transition group-hover:text-neutral-400">
                            {item.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {item.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-white/10 group-hover:text-neutral-400"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}