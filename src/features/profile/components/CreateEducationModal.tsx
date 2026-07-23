"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { createEducationAction } from "@/app/actions/profile/create-education.action";

export function CreateEducationModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Nueva formación
            </button>

            <Modal
                title="Crear formación"
                description="Registra un nuevo título académico o formación."
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={createEducationAction} className="space-y-5">
                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="title">
                            Título
                        </label>
                        <input
                            id="title"
                            name="title"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Desarrollo de Software"
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
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Universidad Tecnológica"
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
                            placeholder="2020 - 2024"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                        Crear formación
                    </button>
                </form>
            </Modal>
        </>
    );
}
