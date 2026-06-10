export type BlogPostStatus = "draft" | "published" | "archived";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  content?: string | null;
  status: BlogPostStatus;
  readingTime: string;
  publishedAt?: string | null;
  tags: string[];
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  href: string;
};