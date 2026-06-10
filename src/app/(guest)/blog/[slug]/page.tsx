import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getBlogPostBySlug } from "@/features/blog/blog-post.service";
import Image from "next/image";

type BlogPostDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPostDetailPage({
    params,
}: BlogPostDetailPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <article className="mx-auto max-w-3xl">
                    <SectionLabel>Blog</SectionLabel>

                    <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-neutral-950">
                        {post.title}
                    </h1>

                    <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                        <span>{post.readingTime}</span>
                        <span>/</span>
                        <span>{post.publishedAt}</span>
                    </div>

                    <p className="mt-10 text-xl leading-9 text-neutral-600">
                        {post.excerpt}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-neutral-200 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {post.coverImageUrl ? (
                        <div className="relative mt-12 aspect-[16/9] overflow-hidden border border-neutral-200 bg-neutral-100">
                            <Image
                                src={post.coverImageUrl}
                                alt={post.coverImageAlt ?? post.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 768px, 100vw"
                                priority
                            />
                        </div>
                    ) : null}

                    <div className="mt-16 border-t border-neutral-200 pt-10">
                        <p className="leading-8 text-neutral-600">
                            Este es un placeholder para el contenido completo del artículo.
                            Más adelante aquí renderizaremos contenido desde Supabase, MDX o
                            un editor del admin.
                        </p>
                    </div>
                </article>
            </Container>
        </main>
    );
}