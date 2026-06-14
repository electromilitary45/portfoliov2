// src/features/blog/components/BlogPostStatusAction.tsx
"use client";

import { updateBlogPostStatusAction } from "@/app/actions/blog/update-blog-post-status.action";
import type { BlogPost } from "@/features/blog/blog-post.type";

type BlogPostStatusActionProps = {
    post: BlogPost;
};

export function BlogPostStatusAction({ post }: BlogPostStatusActionProps) {
    // Determinar el siguiente estado según el actual
    let nextStatus: "draft" | "published" | "archived";
    let label: string;

    if (post.status === "published") {
        nextStatus = "archived";
        label = "Archivar";
    } else if (post.status === "archived") {
        nextStatus = "draft";
        label = "Reactivar";
    } else {
        nextStatus = "published";
        label = "Publicar";
    }

    return (
        <form action={updateBlogPostStatusAction}>
            <input type="hidden" name="postId" value={post.id} />
            <input type="hidden" name="status" value={nextStatus} />

            <button
                type="submit"
                className="border border-white/10 px-4 py-2 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
            >
                {label}
            </button>
        </form>
    );
}