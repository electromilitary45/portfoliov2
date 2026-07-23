"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { updateEducationAction } from "@/app/actions/profile/update-education.action";
import type { Education } from "@/features/profile/profile.type";

type UpdateEducationModalProps = {
    education: Education;
};

export function UpdateEducationModal({ education }: UpdateEducationModalProps) {
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
                title="Editar formación"
                description={`Actualiza la información de "${education.title}".`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={updateEducationAction} className="space-y-5">
                    <input type="hidden" name="educationId" value={education.id} />

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="title">
                            Título
                        </label>
                        <input
                            id="title"
                            name="title"
                            required
                            defaultValue={education.title}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="institution">
                            Institución
                        </label>
                        <input
                            id="institution"
                            name="institution"
                            required
                            defaultValue={education.institution}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="period">
                            Periodo
                        </label>
                        <input
                            id="period"
                            name="period"
                            required
                            defaultValue={education.period}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                        Guardar cambios
                    </button>
                </form>
            </Modal>
        </>
    );
}
