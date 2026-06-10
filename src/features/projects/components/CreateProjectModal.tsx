"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CreateProjectForm } from "@/features/projects/components/CreateProjectForm";

export function CreateProjectModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Nuevo proyecto
            </button>

            <Modal
                title="Crear proyecto"
                description="Completa la información base del proyecto. Luego podremos agregar edición, imágenes y publicación avanzada."
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <CreateProjectForm />
            </Modal>
        </>
    );
}