"use client";

import { useState } from "react";
import { deleteExperienceAction } from "@/app/actions/profile/delete-experience.action";
import { Modal } from "@/components/ui/Modal";

type DeleteExperienceButtonProps = {
    experienceId: string;
    role: string;
};

export function DeleteExperienceButton({
    experienceId,
    role,
}: DeleteExperienceButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Eliminar
            </button>

            <Modal
                title="Eliminar experiencia"
                description={`Esta acción eliminará "${role}" de forma permanente. No se puede deshacer.`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={deleteExperienceAction} className="space-y-5">
                    <input type="hidden" name="experienceId" value={experienceId} />

                    <div className="border border-red-500/20 bg-red-500/10 p-4">
                        <p className="text-sm leading-6 text-red-200">
                            Confirma que quieres eliminar esta experiencia laboral.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="border border-white/10 px-5 py-3 text-sm text-neutral-300 transition hover:border-white/30 hover:text-white"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="border border-red-500 bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                        >
                            Sí, eliminar
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
