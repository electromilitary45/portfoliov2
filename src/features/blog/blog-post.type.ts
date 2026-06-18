export type BlogPostStatus = "draft" | "published" | "archived";

export type BlogPostImage = {
  url: string;
  alt: string;
  order: number;
};

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
  // Cover image (backward compatibility - first image in images array)
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  // New: multiple images support
  images?: BlogPostImage[];
  href: string;
};