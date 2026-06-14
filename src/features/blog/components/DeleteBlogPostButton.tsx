// src/features/blog/components/DeleteBlogPostButton.tsx
"use client";

import { useState } from "react";
import { deleteBlogPostAction } from "@/app/actions/blog/delete-blog-post.action";
import { Modal } from "@/components/ui/Modal";

type DeleteBlogPostButtonProps = {
    postId: string;
    postTitle: string;
};

export function DeleteBlogPostButton({ postId, postTitle }: DeleteBlogPostButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Eliminar
            </button>

            <Modal
                title="Eliminar artículo"
                description={`Esta acción eliminará "${postTitle}" de forma permanente. No se puede deshacer.`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form action={deleteBlogPostAction} className="space-y-5">
                    <input type="hidden" name="postId" value={postId} />

                    <div className="border border-red-500/20 bg-red-500/10 p-4">
                        <p className="text-sm leading-6 text-red-200">
                            Confirma que quieres eliminar este artículo. Si solo quieres ocultarlo del sitio público, puedes cambiarlo a "archivado".
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="border border-white/10 px-5 py-3 text-sm text-neutral-300 transition hover:border-white/30 hover:text-white"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="border border-red-500 bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:border-red-600 hover:bg-red-600"
                        >
                            Sí, eliminar
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}