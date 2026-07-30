"use client";

import { useState } from "react";
import { updateProfileAction } from "@/app/actions/profile/update-profile.action";

type ProfileAboutEditorProps = {
  headline: string;
  summary: string;
};

export function ProfileAboutEditor({ headline, summary }: ProfileAboutEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
      >
        Editar Sobre mí
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-lg border border-white/10 bg-neutral-950 p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                Sobre mí
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                Edita tu frase principal y la descripción que aparece en la página Sobre mí.
              </p>
            </div>

            <form
              action={updateProfileAction}
              onSubmit={() => setTimeout(() => setIsOpen(false), 100)}
              className="space-y-5"
            >
              <div>
                <label className="text-sm text-neutral-300" htmlFor="headline">
                  Frase principal
                </label>
                <input
                  id="headline"
                  name="headline"
                  required
                  defaultValue={headline}
                  className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  placeholder="Developer enfocado en construir productos web..."
                />
              </div>

              <div>
                <label className="text-sm text-neutral-300" htmlFor="summary">
                  Descripción
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={5}
                  defaultValue={summary}
                  className="mt-2 w-full resize-y border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  placeholder="Cuéntale al mundo sobre ti..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-white/10 px-6 py-3 text-sm font-medium text-neutral-400 transition hover:border-white/30 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
