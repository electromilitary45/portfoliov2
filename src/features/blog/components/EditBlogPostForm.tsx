// src/features/blog/components/EditBlogPostForm.tsx
"use client";

import Image from "next/image";
import { updateBlogPostAction } from "@/app/actions/blog/update-blog-post.action";
import type { BlogPost } from "@/features/blog/blog-post.type";

type EditBlogPostFormProps = {
    post: BlogPost;
};

export function EditBlogPostForm({ post }: EditBlogPostFormProps) {
    return (
        <form action={updateBlogPostAction} className="space-y-5">
            <input type="hidden" name="postId" value={post.id} />
            {/* Si queremos mantener la URL actual por si no se sube nueva imagen */}
            <input type="hidden" name="currentCoverImageUrl" value={post.coverImageUrl ?? ""} />
            <input type="hidden" name="currentCoverImageAlt" value={post.coverImageAlt ?? ""} />

            {/* Título */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`title-${post.id}`}>
                    Título
                </label>
                <input
                    id={`title-${post.id}`}
                    name="title"
                    required
                    defaultValue={post.title}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* Slug */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`slug-${post.id}`}>
                    Slug (URL)
                </label>
                <input
                    id={`slug-${post.id}`}
                    name="slug"
                    required
                    defaultValue={post.slug}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* Extracto */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`excerpt-${post.id}`}>
                    Extracto
                </label>
                <textarea
                    id={`excerpt-${post.id}`}
                    name="excerpt"
                    required
                    rows={3}
                    defaultValue={post.excerpt}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* Contenido */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`content-${post.id}`}>
                    Contenido (Markdown o HTML)
                </label>
                <textarea
                    id={`content-${post.id}`}
                    name="content"
                    rows={12}
                    defaultValue={post.content ?? ""}
                    className="mt-2 w-full resize-none border border-white/10 bg-neutral-900 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`tags-${post.id}`}>
                    Tags (separados por comas)
                </label>
                <input
                    id={`tags-${post.id}`}
                    name="tags"
                    required
                    defaultValue={post.tags.join(", ")}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* Tiempo de lectura */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`readingTime-${post.id}`}>
                    Tiempo de lectura
                </label>
                <input
                    id={`readingTime-${post.id}`}
                    name="readingTime"
                    required
                    defaultValue={post.readingTime}
                    className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                />
            </div>

            {/* Imagen destacada: mostrar actual + input file */}
            <div className="space-y-4">
                {post.coverImageUrl && (
                    <div>
                        <p className="text-sm text-neutral-300">Imagen actual</p>
                        <div className="relative mt-2 aspect-[16/9] overflow-hidden border border-white/10 bg-neutral-900">
                            <Image
                                src={post.coverImageUrl}
                                alt={post.coverImageAlt ?? post.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 640px, 100vw"
                            />
                        </div>
                        <p className="mt-2 break-all text-xs text-neutral-500">
                            {post.coverImageUrl}
                        </p>
                    </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="text-sm text-neutral-300" htmlFor={`coverImageFile-${post.id}`}>
                            {post.coverImageUrl ? "Reemplazar imagen" : "Subir imagen"}
                        </label>
                        <input
                            id={`coverImageFile-${post.id}`}
                            name="coverImageFile"
                            type="file"
                            accept="image/*"
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-300 outline-none transition file:mr-4 file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-950 focus:border-red-500"
                        />
                        {post.coverImageUrl && (
                            <p className="mt-1 text-xs text-neutral-500">
                                Si no seleccionas un archivo, se mantendrá la imagen actual.
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-neutral-300" htmlFor={`coverImageAlt-${post.id}`}>
                            Texto alternativo
                        </label>
                        <input
                            id={`coverImageAlt-${post.id}`}
                            name="coverImageAlt"
                            defaultValue={post.coverImageAlt ?? ""}
                            className="mt-2 w-full border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
                            placeholder="Descripción de la imagen"
                        />
                    </div>
                </div>
            </div>

            {/* Estado */}
            <div>
                <label className="text-sm text-neutral-300" htmlFor={`status-${post.id}`}>
                    Estado
                </label>
                <select
                    id={`status-${post.id}`}
                    name="status"
                    defaultValue={post.status}
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
                Actualizar artículo
            </button>
        </form>
    );
}