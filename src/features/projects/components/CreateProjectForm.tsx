import { createProjectAction } from "@/app/actions/projects/create-project.action";

export function CreateProjectForm() {
    return (
        <form action={createProjectAction} className="space-y-5">
            {/* Título */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="title">
                    Título
                </label>
                <input
                    id="title"
                    name="title"
                    required
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Portfolio v2"
                />
            </div>

            {/* Resumen */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="summary">
                    Resumen
                </label>
                <textarea
                    id="summary"
                    name="summary"
                    required
                    rows={3}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Resumen corto del proyecto..."
                />
            </div>

            {/* Descripción */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="description">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Detalles técnicos, decisiones, aprendizajes..."
                />
            </div>

            {/* Stack */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="stack">
                    Stack separado por comas
                </label>
                <input
                    id="stack"
                    name="stack"
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Next.js, TypeScript, Supabase"
                />
            </div>

            {/* URLs */}
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="text-sm text-neutral-300" htmlFor="githubUrl">
                        GitHub URL
                    </label>
                    <input
                        id="githubUrl"
                        name="githubUrl"
                        type="url"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        placeholder="https://github.com/..."
                    />
                </div>

                <div>
                    <label className="text-sm text-neutral-300" htmlFor="demoUrl">
                        Demo URL
                    </label>
                    <input
                        id="demoUrl"
                        name="demoUrl"
                        type="url"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        placeholder="https://..."
                    />
                </div>
            </div>

            {/* Imagen */}
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="text-sm text-neutral-300" htmlFor="imageFile">
                        Imagen del proyecto
                    </label>
                    <input
                        id="imageFile"
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="text-sm text-neutral-300" htmlFor="imageAlt">
                        Texto alternativo
                    </label>
                    <input
                        id="imageAlt"
                        name="imageAlt"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        placeholder="Screenshot del proyecto..."
                    />
                </div>
            </div>

            {/* Imagen */}
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="text-sm text-neutral-300" htmlFor="status">
                        Estado
                    </label>
                    <select
                        id="status"
                        name="status"
                        defaultValue="draft"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <label className="flex items-center gap-3 pt-8 text-sm text-neutral-300">
                    <input
                        name="isFeatured"
                        type="checkbox"
                        className="h-4 w-4 accent-red-600"
                    />
                    Marcar como destacado
                </label>
            </div>

            <button
                type="submit"
                className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Crear proyecto
            </button>
        </form>
    );
}