"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { createCertificateAction } from "@/app/actions/profile/create-certificate.action";

function FilePreview({ url, label }: { url: string; label: string }) {
    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

    return (
        <div className="mt-2 rounded border border-white/10 bg-neutral-900 p-3">
            <p className="mb-2 text-xs text-neutral-500">{label}</p>
            {isImage ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={url}
                        alt="Vista previa del certificado"
                        className="max-h-48 w-full rounded object-contain"
                    />
                </a>
            ) : (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-300 underline underline-offset-4 transition hover:text-white"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {url.split("/").pop()}
                </a>
            )}
        </div>
    );
}

export function CreateCertificateModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    }

    function handleOpen() {
        setIsOpen(true);
        setPreviewUrl(null);
    }

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Nuevo certificado
            </button>

            <Modal
                title="Crear certificado"
                description="Registra un nuevo certificado. Puedes subir un archivo, agregar un enlace, o ambos."
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
                            ref={fileInputRef}
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                        />

                        {previewUrl ? (
                            <FilePreview url={previewUrl} label="Vista previa:" />
                        ) : null}
                    </div>

                    <div>
                        <label className="text-sm text-neutral-300" htmlFor="linkUrl">
                            Enlace (opcional)
                        </label>
                        <input
                            id="linkUrl"
                            name="linkUrl"
                            type="url"
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="https://example.com/certificado"
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
