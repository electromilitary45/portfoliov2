import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogPostCard } from "@/features/blog/components/BlogPostCard";
import { getPublishedBlogPosts } from "@/features/blog/blog-post.service";

export default function BlogPage() {
    const posts = getPublishedBlogPosts();

    return (
        <main className="min-h-[calc(100vh-161px)] py-20">
            <Container>
                <PageHeader
                    label="Blog"
                    title="Notas, guías y bitácoras de desarrollo."
                    description="Más adelante construiremos un blog completo con posts, categorías, slugs, contenido editable y vista individual de cada artículo."
                />

                <section className="mt-14 grid gap-4 md:grid-cols-2">
                    {posts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </section>
            </Container>
        </main>
    );
}