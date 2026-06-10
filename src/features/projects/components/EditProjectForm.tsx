import { updateProjectAction } from "@/app/actions/projects/update-project.action";
import type { Project } from "@/features/projects/project.type";

type EditProjectFormProps = {
    project: Project;
};

export function EditProjectForm({ project }: EditProjectFormProps) {
    return (
        <form action={updateProjectAction} className="space-y-5">
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="publishedAt" value={project.publishedAt ?? ""} />

            <div>
                <label className="text-sm text-neutral-300" htmlFor={`title-${project.id}`}>
                    Título
                </label>
                <input
                    id={`title-${project.id}`}
                    name="title"
                    required
                    defaultValue={project.title}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            <div>
                <label className="text-sm text-neutral-300" htmlFor={`summary-${project.id}`}>
                    Resumen
                </label>
                <textarea
                    id={`summary-${project.id}`}
                    name="summary"
                    required
                    rows={3}
                    defaultValue={project.summary}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            <div>
                <label
                    className="text-sm text-neutral-300"
                    htmlFor={`description-${project.id}`}
                >
                    Descripción
                </label>
                <textarea
                    id={`description-${project.id}`}
                    name="description"
                    rows={5}
                    defaultValue={project.description ?? ""}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            <div>
                <label className="text-sm text-neutral-300" htmlFor={`stack-${project.id}`}>
                    Stack separado por comas
                </label>
                <input
                    id={`stack-${project.id}`}
                    name="stack"
                    defaultValue={project.stack.join(", ")}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        className="text-sm text-neutral-300"
                        htmlFor={`githubUrl-${project.id}`}
                    >
                        GitHub URL
                    </label>
                    <input
                        id={`githubUrl-${project.id}`}
                        name="githubUrl"
                        type="url"
                        defaultValue={project.githubUrl ?? ""}
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    />
                </div>

                <div>
                    <label
                        className="text-sm text-neutral-300"
                        htmlFor={`demoUrl-${project.id}`}
                    >
                        Demo URL
                    </label>
                    <input
                        id={`demoUrl-${project.id}`}
                        name="demoUrl"
                        type="url"
                        defaultValue={project.demoUrl ?? ""}
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        className="text-sm text-neutral-300"
                        htmlFor={`imageUrl-${project.id}`}
                    >
                        Image URL
                    </label>
                    <input
                        id={`imageUrl-${project.id}`}
                        name="imageUrl"
                        type="url"
                        defaultValue={project.imageUrl ?? ""}
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    />
                </div>

                <div>
                    <label
                        className="text-sm text-neutral-300"
                        htmlFor={`imageAlt-${project.id}`}
                    >
                        Image Alt
                    </label>
                    <input
                        id={`imageAlt-${project.id}`}
                        name="imageAlt"
                        defaultValue={project.imageAlt ?? ""}
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="text-sm text-neutral-300" htmlFor={`status-${project.id}`}>
                        Estado
                    </label>
                    <select
                        id={`status-${project.id}`}
                        name="status"
                        defaultValue={project.status}
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <label className="flex items-center gap-3 pt-8 text-sm text-neutral-300">
                    <input
                        name="isFeatured"
                        type="checkbox"
                        defaultChecked={project.isFeatured}
                        className="h-4 w-4 accent-red-600"
                    />
                    Marcar como destacado
                </label>
            </div>

            <button
                type="submit"
                className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Actualizar proyecto
            </button>
        </form>
    );
}