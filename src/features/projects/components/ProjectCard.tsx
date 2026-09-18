import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/features/projects/project.type";

type ProjectCardProps = {
    project: Project;
    index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <Link
            href={project.href}
            className="group flex h-full flex-col justify-between bg-white p-6 transition hover:bg-neutral-950"
        >
            <div>
                <div className="relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-100 transition group-hover:border-white/10 group-hover:bg-neutral-900">
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.imageAlt ?? project.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(min-width: 768px) 33vw, 100vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center px-6 text-center">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-neutral-600">
                                Sin imagen
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="font-mono text-sm text-red-600">
                        {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-red-500">
                        {project.status}
                    </p>
                </div>

                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                    {project.title}
                </h3>

                <p
                    className="mt-5 line-clamp-3 leading-7 text-neutral-600 transition group-hover:text-neutral-400"
                    title={project.summary}
                >
                    {project.summary}
                </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tech, i) => (
                    <span
                        key={`${tech}-${i}`}
                        className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-white/10 group-hover:text-neutral-400"
                    >
                        {tech}
                    </span>
                ))}
                {project.stack.length > 3 && (
                    <span
                        className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-white/10 group-hover:text-neutral-400"
                        title={project.stack.slice(3).join(", ")}
                    >
                        +{project.stack.length - 3}
                    </span>
                )}
            </div>
        </Link>
    );
}