import { blogPosts } from "@/features/blog/blog-post.mock";

export function getBlogPosts() {
    return blogPosts;
}

export function getPublishedBlogPosts() {
    return blogPosts.filter((post) => post.status === "published");
}
