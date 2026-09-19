import { Briefcase } from "lucide-react";
import type { Experience } from "@/features/profile/profile.type";

type ExperienceTimelineProps = {
    items: Experience[];
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
    return (
        <section>
            <div className="flex items-center gap-3">
                <Briefcase className="h-7 w-7 text-red-600" />
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                    Experiencia
                </h2>
            </div>

            <div className="relative mt-8 ml-0 space-y-0 border-l-2 border-neutral-200 pl-6 md:ml-4 md:pl-8">
                {items.map((item, index) => (
                    <article
                        key={item.id}
                        className="group relative pb-10 last:pb-0"
                    >
                        <div className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-200 bg-white transition group-hover:border-red-600 group-hover:bg-red-600 md:-left-[41px]">
                            <div className="h-2 w-2 rounded-full bg-neutral-400 transition group-hover:bg-white" />
                        </div>

                        {index < items.length - 1 && (
                            <div className="absolute -left-[2px] top-6 h-[calc(100%-24px)] w-0.5 bg-neutral-100" />
                        )}

                        <div className="border border-neutral-200 bg-white p-6 transition hover:border-red-600/30 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.1)]">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
                                {item.period}
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
                                {item.role}
                            </h3>

                            <p className="mt-1 text-neutral-500">
                                {item.company}
                            </p>

                            <p className="mt-4 leading-7 text-neutral-600">
                                {item.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {item.stack.map((tech, i) => (
                                    <span
                                        key={`${tech}-${i}`}
                                        className="border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-red-600/20 group-hover:bg-red-600/5 group-hover:text-red-600"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
