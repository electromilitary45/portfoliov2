"use client";

import type { ReactNode } from "react";

type ModalProps = {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export function Modal({
    title,
    description,
    isOpen,
    onClose,
    children,
}: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
            <button
                type="button"
                aria-label="Cerrar modal"
                onClick={onClose}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <section className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/10 bg-neutral-950 p-6 text-white shadow-2xl">
                <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-5">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                            Admin Action
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                            {title}
                        </h2>

                        {description ? (
                            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
                                {description}
                            </p>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-white/10 px-3 py-2 text-sm text-neutral-300 transition hover:border-red-500 hover:text-white"
                    >
                        Cerrar
                    </button>
                </div>

                <div className="pt-6">{children}</div>
            </section>
        </div>
    );
}