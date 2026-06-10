"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { EditProjectForm } from "@/features/projects/components/EditProjectForm";
import type { Project } from "@/features/projects/project.type";

type EditProjectButtonProps = {
    project: Project;
};

export function EditProjectButton({ project }: EditProjectButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
            >
                Editar
            </button>

            <Modal
                title="Editar proyecto"
                description={`Actualiza la información de "${project.title}". Los cambios se reflejarán en el sitio público si el proyecto está publicado.`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <EditProjectForm project={project} />
            </Modal>
        </>
    );
}