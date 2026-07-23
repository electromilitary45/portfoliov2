"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { createCertificateAction } from "@/app/actions/profile/create-certificate.action";

export function CreateCertificateModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Nuevo certificado
            </button>

            <Modal
                title="Crear certificado"
                description="Registra un nuevo certificado y opcionalmente sube el archivo (imagen o PDF)."
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={createCertificateAction} className="space-y-5">
                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="title">
                            Título
                        </label>
                        <input
                            id="title"
                            name="title"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="AWS Certified Developer"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="issuer">
                            Emisor
                        </label>
                        <input
                            id="issuer"
                            name="issuer"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Amazon Web Services"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="year">
                            Año
                        </label>
                        <input
                            id="year"
                            name="year"
                            required
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="2024"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="file">
                            Archivo (imagen o PDF)
                        </label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*,application/pdf"
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                        Crear certificado
                    </button>
                </form>
            </Modal>
        </>
    );
}
