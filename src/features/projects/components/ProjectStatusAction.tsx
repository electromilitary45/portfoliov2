import { updateProjectStatusAction } from "@/app/actions/projects/update-project-status.action";
import type { Project } from "@/features/projects/project.type";

type ProjectStatusActionProps = {
    project: Project;
};

export function ProjectStatusAction({ project }: ProjectStatusActionProps) {
    const nextStatus = project.status === "published" ? "archived" : "published";
    const label = project.status === "published" ? "Archivar" : "Publicar";

    return (
        <form action={updateProjectStatusAction}>
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="status" value={nextStatus} />

            <button
                type="submit"
                className="border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
            >
                {label}
            </button>
        </form>
    );
}