import { blogPosts } from "@/features/blog/blog-post.mock";

export function getBlogPosts() {
  return blogPosts;
}

export function getPublishedBlogPosts() {
  return blogPosts.filter((post) => post.status === "published");
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(
    (post) => post.slug === slug && post.status === "published",
  );
}
