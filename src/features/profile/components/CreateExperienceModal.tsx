"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { createExperienceAction } from "@/app/actions/profile/create-experience.action";

export function CreateExperienceModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Nueva experiencia
            </button>

            <Modal
                title="Crear experiencia"
                description="Registra un nuevo cargo laboral con empresa, periodo, descripción y tecnologías utilizadas."
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={createExperienceAction} className="space-y-5">
                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="role">
                            Rol / Cargo
                        </label>
                        <input
                            id="role"
                            name="role"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Frontend Developer"
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
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Acme Inc."
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
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="2024 - Presente"
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
                            className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Responsabilidades y logros..."
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="stack">
                            Stack separado por comas
                        </label>
                        <input
                            id="stack"
                            name="stack"
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Next.js, TypeScript, Tailwind"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                        Crear experiencia
                    </button>
                </form>
            </Modal>
        </>
    );
}
