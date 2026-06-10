import { createSupabaseServerClient } from "@/lib/supabase/server";
import { featuredProjects } from "@/features/projects/project.mock";
import type { Project } from "@/features/projects/project.type";

type SupabaseProjectRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  status: Project["status"];
  stack: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  image_alt: string | null;
  is_featured: boolean;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapProjectRow(row: SupabaseProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    description: row.description,
    status: row.status,
    stack: row.stack,
    githubUrl: row.github_url,
    demoUrl: row.demo_url,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    href: `/proyectos/${row.slug}`,
  };
}

function shouldUseMockProjects() {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getProjects(): Promise<Project[]> {
  if (shouldUseMockProjects()) {
    return featuredProjects;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,title,slug,summary,description,status,stack,github_url,demo_url,image_url,image_alt,is_featured,sort_order,published_at,created_at,updated_at",
      )
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error || !data) {
      return featuredProjects;
    }

    return data.map((row) => mapProjectRow(row as SupabaseProjectRow));
  } catch {
    return featuredProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (shouldUseMockProjects()) {
    return featuredProjects.filter((project) => project.isFeatured);
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,title,slug,summary,description,status,stack,github_url,demo_url,image_url,image_alt,is_featured,sort_order,published_at,created_at,updated_at",
      )
      .eq("status", "published")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      return featuredProjects.filter((project) => project.isFeatured);
    }

    return data.map((row) => mapProjectRow(row as SupabaseProjectRow));
  } catch {
    return featuredProjects.filter((project) => project.isFeatured);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (shouldUseMockProjects()) {
    return featuredProjects.find((project) => project.slug === slug) ?? null;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,title,slug,summary,description,status,stack,github_url,demo_url,image_url,image_alt,is_featured,sort_order,published_at,created_at,updated_at",
      )
      .eq("status", "published")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return featuredProjects.find((project) => project.slug === slug) ?? null;
    }

    return mapProjectRow(data as SupabaseProjectRow);
  } catch {
    return featuredProjects.find((project) => project.slug === slug) ?? null;
  }
}

export async function getAdminProjects(): Promise<Project[]> {
  if (shouldUseMockProjects()) {
    return featuredProjects;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,title,slug,summary,description,status,stack,github_url,demo_url,image_url,image_alt,is_featured,sort_order,published_at,created_at,updated_at",
      )
      .order("created_at", { ascending: false });

    if (error || !data) {
      return featuredProjects;
    }

    return data.map((row) => mapProjectRow(row as SupabaseProjectRow));
  } catch {
    return featuredProjects;
  }
}
