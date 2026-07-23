"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { updateCertificateAction } from "@/app/actions/profile/update-certificate.action";
import type { Certificate } from "@/features/profile/profile.type";

type UpdateCertificateModalProps = {
    certificate: Certificate;
};

export function UpdateCertificateModal({ certificate }: UpdateCertificateModalProps) {
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
                title="Editar certificado"
                description={`Actualiza la información de "${certificate.title}".`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={updateCertificateAction} className="space-y-5">
                    <input type="hidden" name="certificateId" value={certificate.id} />
                    <input type="hidden" name="currentFileUrl" value={certificate.fileUrl ?? ""} />

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="title">
                            Título
                        </label>
                        <input
                            id="title"
                            name="title"
                            required
                            defaultValue={certificate.title}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
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
                            defaultValue={certificate.issuer}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
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
                            defaultValue={certificate.year}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
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

                        {certificate.fileUrl ? (
                            <p className="mt-2 text-xs text-neutral-500">
                                Archivo actual: {certificate.fileUrl.split("/").pop()} (sube uno nuevo para reemplazarlo)
                            </p>
                        ) : null}
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
