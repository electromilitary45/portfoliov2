import Link from "next/link";
import type { BlogPost } from "@/features/blog/blog-post.type";

type BlogPostCardProps = {
    post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block border border-neutral-200 bg-white p-8 transition hover:border-neutral-950 hover:bg-neutral-950"
        >
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                <span>{post.readingTime}</span>
                <span>/</span>
                <span>{post.publishedAt}</span>
            </div>

            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                {post.title}
            </h2>

            <p className="mt-5 leading-7 text-neutral-600 transition group-hover:text-neutral-400">
                {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 transition group-hover:border-white/10 group-hover:text-neutral-400"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
}