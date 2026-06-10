export type ProjectStatus = "draft" | "published" | "archived";

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string | null;
  status: ProjectStatus;
  stack: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isFeatured: boolean;
  sortOrder: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  href: string;
};
