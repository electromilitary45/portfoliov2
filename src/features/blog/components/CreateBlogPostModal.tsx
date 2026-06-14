// src/features/blog/components/CreateBlogPostModal.tsx
"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CreateBlogPostForm } from "./CreateBlogPostForm";

export function CreateBlogPostModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="border border-white bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                Nuevo artículo
            </button>

            <Modal
                title="Crear artículo"
                description="Completa la información del blog post. Puedes guardarlo como borrador o publicarlo directamente."
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <CreateBlogPostForm />
            </Modal>
        </>
    );
}