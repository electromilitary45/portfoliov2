// src/features/blog/components/CreateBlogPostForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { createBlogPostAction } from "@/app/actions/blog/create-blog-post.action";

export function CreateBlogPostForm() {
    const router = useRouter();

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const titleInput = e.target;
        const slugInput = document.getElementById("slug") as HTMLInputElement;
        if (slugInput && !slugInput.value) {
            slugInput.value = generateSlug(titleInput.value);
        }
    };

    return (
        <form action={createBlogPostAction} className="space-y-5">
            {/* Título */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="title">
                    Título
                </label>
                <input
                    id="title"
                    name="title"
                    required
                    onBlur={handleTitleChange}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Mi nuevo artículo"
                />
            </div>

            {/* Slug */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="slug">
                    Slug (URL)
                </label>
                <input
                    id="slug"
                    name="slug"
                    required
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="mi-nuevo-articulo"
                />
                <p className="mt-1 text-xs text-neutral-500">
                    Se genera automático desde el título, pero puedes editarlo.
                </p>
            </div>

            {/* Extracto */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="excerpt">
                    Extracto
                </label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    rows={3}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Breve descripción del artículo..."
                />
            </div>

            {/* Contenido */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="content">
                    Contenido (Markdown o HTML)
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={10}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-red-500"
                    placeholder="# Mi artículo&#10;&#10;Este es el contenido..."
                />
                <p className="mt-1 text-xs text-neutral-500">
                    Puedes usar Markdown o HTML directamente.
                </p>
            </div>

            {/* Tags */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="tags">
                    Tags (separados por comas)
                </label>
                <input
                    id="tags"
                    name="tags"
                    required
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="Next.js, React, Tutorial"
                />
            </div>

            {/* Tiempo de lectura */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor="readingTime">
                    Tiempo de lectura
                </label>
                <input
                    id="readingTime"
                    name="readingTime"
                    required
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                    placeholder="4 min"
                />
            </div>

            {/* Imagen destacada: input file */}
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="text-sm text-neutral-300" htmlFor="coverImageFile">
                        Imagen destacada
                    </label>
                    <input
                        id="coverImageFile"
                        name="coverImageFile"
                        type="file"
                        accept="image/*"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="text-sm text-neutral-300" htmlFor="coverImageAlt">
                        Texto alternativo
                    </label>
                    <input
                        id="coverImageAlt"
                        name="coverImageAlt"
                        className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                        placeholder="Descripción de la imagen"
                    />
                </div>
            </div>

            {/* Estado */}
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
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Archivado</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Crear artículo
            </button>
        </form>
    );
}