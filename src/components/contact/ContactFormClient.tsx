"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const inputClasses =
    "w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none";

export function ContactFormClient() {
    const [submitting, setSubmitting] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setSubmitting(true);
        // El form action nativo se encarga del envío
    }

    return (
        <form
            action={async (formData) => {
                const { sendContactMessageAction } = await import("@/app/actions/contact/send-contact-message.action");
                await sendContactMessageAction(formData);
            }}
            onSubmit={handleSubmit}
            className="relative mt-10 grid gap-6 bg-white p-8 md:p-10"
        >
            <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Nombre *
                    </span>
                    <input
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder="Tu nombre"
                        className={`mt-2 ${inputClasses}`}
                    />
                </label>

                <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Email *
                    </span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@email.com"
                        className={`mt-2 ${inputClasses}`}
                    />
                </label>
            </div>

            <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Mensaje *
                </span>
                <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={7}
                    placeholder="Cuéntame sobre tu proyecto, propuesta o duda..."
                    className={`mt-2 resize-y ${inputClasses}`}
                />
            </label>

            {/* Honeypot anti-spam: invisible para humanos */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                <label>
                    No rellenes este campo si eres humano:
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-400">
                    * Campos obligatorios
                </p>
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center border border-neutral-950 bg-neutral-950 px-8 py-3 text-sm font-medium text-white transition hover:border-red-600 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        "Enviar mensaje"
                    )}
                </button>
            </div>
        </form>
    );
}
