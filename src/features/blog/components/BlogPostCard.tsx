import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/features/blog/blog-post.type";

type BlogPostCardProps = {
    post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
    return (
        <Link
            href={post.href}
            className="group block overflow-hidden border border-neutral-200 bg-white transition hover:border-neutral-950 hover:bg-neutral-950"
        >
            {post.coverImageUrl ? (
                <div className="relative aspect-[16/9] border-b border-neutral-200 bg-neutral-100 group-hover:border-white/10">
                    <Image
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt ?? post.title}
                        fill
                        className="object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                        sizes="(min-width: 768px) 50vw, 100vw"
                    />
                </div>
            ) : null}

            <div className="p-8">
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
            </div>
        </Link>
    );
}