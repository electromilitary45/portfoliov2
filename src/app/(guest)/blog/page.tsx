import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogPostCard } from "@/features/blog/components/BlogPostCard";
import { getPublishedBlogPosts } from "@/features/blog/blog-post.service";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Notas, guías y bitácoras de desarrollo: aprendizajes, decisiones técnicas, errores resueltos y avances reales.",
    alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
    const posts = await getPublishedBlogPosts();

    return (
        <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
            <Container>
                <PageHeader
                    label="Blog"
                    title="Notas, guías y bitácoras de desarrollo."
                    description="Un espacio para documentar aprendizajes, decisiones técnicas, errores resueltos y avances reales mientras construyo proyectos."
                />

                <section className="mt-14 border-t border-neutral-200 pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-600">
                                Writing Log
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                                Artículos publicados
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                            Estos posts vienen desde Supabase cuando las variables de entorno
                            están configuradas; en local puede usarse mock como respaldo.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {posts.map((post) => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
            </Container>
        </main>
    );
}