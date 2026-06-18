import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getBlogPostBySlug } from "@/features/blog/blog-post.service";
import type { BlogPostImage } from "@/features/blog/blog-post.type";
import { ImageCarousel } from "@/components/ui/ImageCarousel";

type BlogPostDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Helper to get all images for display (cover + additional images)
function getDisplayImages(post: { coverImageUrl?: string | null; coverImageAlt?: string | null; images?: BlogPostImage[] }): BlogPostImage[] {
  const images = post.images ?? [];
  if (images.length > 0) {
    return images;
  }
  // Backward compatibility: if no images array but coverImageUrl exists
  if (post.coverImageUrl) {
    return [{ url: post.coverImageUrl, alt: post.coverImageAlt ?? "", order: 0 }];
  }
  return [];
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const displayImages = getDisplayImages(post);
  const hasImages = displayImages.length > 0;

  return (
    <main className="min-h-[calc(100vh-161px)] bg-neutral-50 py-20">
      <Container>
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-10 inline-flex font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 transition hover:text-neutral-950"
          >
            ← Volver al blog
          </Link>

          <SectionLabel>Blog</SectionLabel>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-neutral-950">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            <span>{post.readingTime}</span>
            <span>/</span>
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("es-ES") : "Sin fecha"}</span>
          </div>

          <p className="mt-10 text-xl leading-9 text-neutral-600">
            {post.excerpt}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-neutral-200 bg-white px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {hasImages && (
            <div className="mt-12">
              <ImageCarousel images={displayImages} title={post.title} />
            </div>
          )}

          <div className="mt-16 border-t border-neutral-200 bg-white p-8">
            <div className="prose prose-neutral max-w-none">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p className="leading-8 text-neutral-600">
                  Este es un placeholder para el contenido completo del artículo. Más adelante aquí renderizaremos contenido desde Supabase, MDX o un editor del admin.
                </p>
              )}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}