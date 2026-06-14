// src/features/blog/components/EditBlogPostButton.tsx
"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { EditBlogPostForm } from "./EditBlogPostForm";
import type { BlogPost } from "@/features/blog/blog-post.type";

type EditBlogPostButtonProps = {
    post: BlogPost;
};

export function EditBlogPostButton({ post }: EditBlogPostButtonProps) {
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
                title="Editar artículo"
                description={`Actualiza la información de "${post.title}". Los cambios se reflejarán en el sitio público si el post está publicado.`}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <EditBlogPostForm post={post} />
            </Modal>
        </>
    );
}