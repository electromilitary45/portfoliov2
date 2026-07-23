"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { updateExperienceAction } from "@/app/actions/profile/update-experience.action";
import type { Experience } from "@/features/profile/profile.type";

type UpdateExperienceModalProps = {
    experience: Experience;
};

export function UpdateExperienceModal({ experience }: UpdateExperienceModalProps) {
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
                title="Editar experiencia"
                description={`Actualiza la información de "${experience.role}" en ${experience.company}.`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={updateExperienceAction} className="space-y-5">
                    <input type="hidden" name="experienceId" value={experience.id} />

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="role">
                            Rol / Cargo
                        </label>
                        <input
                            id="role"
                            name="role"
                            required
                            defaultValue={experience.role}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="company">
                            Empresa
                        </label>
                        <input
                            id="company"
                            name="company"
                            required
                            defaultValue={experience.company}
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
                            defaultValue={experience.period}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={experience.description}
                            className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="stack">
                            Stack separado por comas
                        </label>
                        <input
                            id="stack"
                            name="stack"
                            defaultValue={experience.stack.join(", ")}
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
