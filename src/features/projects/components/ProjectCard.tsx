import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/features/projects/project.type";

type ProjectCardProps = {
    project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={project.href}
            className="group flex min-h-[460px] flex-col justify-between bg-white p-6 transition hover:bg-neutral-950"
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
                        {String(project.sortOrder).padStart(2, "0")}
                    </p>

                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-red-500">
                        {project.status}
                    </p>
                </div>

                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                    {project.title}
                </h3>

                <p className="mt-5 leading-7 text-neutral-600 transition group-hover:text-neutral-400">
                    {project.summary}
                </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-white/10 group-hover:text-neutral-400"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </Link>
    );
}