export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    status: BlogPostStatus;
    readingTime: string;
    publishedAt: string;
    tags: string[];
};
