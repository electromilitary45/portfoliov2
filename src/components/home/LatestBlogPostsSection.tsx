import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BlogPostCard } from "@/features/blog/components/BlogPostCard";
import { getPublishedBlogPosts } from "@/features/blog/blog-post.service";

export function LatestBlogPostsSection() {
    const posts = getPublishedBlogPosts().slice(0, 2);

    return (
        <section className="border-t border-neutral-200 bg-white py-24">
            <Container>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Latest Posts</SectionLabel>

                        <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-5xl">
                            Notas técnicas, aprendizajes y decisiones de desarrollo.
                        </h2>
                    </div>

                    <Button href="/blog" variant="secondary">
                        Leer blog
                    </Button>
                </div>

                <div className="mt-14 grid gap-4 md:grid-cols-2">
                    {posts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            </Container>
        </section>
    );
}