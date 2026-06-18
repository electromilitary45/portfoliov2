import { createSupabaseServerClient } from "@/lib/supabase/server";
import { blogPosts } from "@/features/blog/blog-post.mock";
import type { BlogPost, BlogPostImage } from "@/features/blog/blog-post.type";

type SupabaseBlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  status: BlogPost["status"];
  reading_time: string;
  tags: string[];
  cover_image_url: string | null;
  cover_image_alt: string | null;
  images: BlogPostImage[] | null;   // ← AÑADE ESTA LÍNEA
  published_at: string | null;
};

function mapBlogPostRow(row: SupabaseBlogPostRow): BlogPost {
  const images = row.images ?? [];
  const coverImageUrl = images.length > 0 ? images[0].url : row.cover_image_url;
  const coverImageAlt = images.length > 0 ? images[0].alt : row.cover_image_alt;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    status: row.status,
    readingTime: row.reading_time,
    tags: row.tags,
    coverImageUrl,
    coverImageAlt,
    images,
    publishedAt: row.published_at,
    href: `/blog/${row.slug}`,
  };
}

function shouldUseMockBlogPosts() {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (shouldUseMockBlogPosts()) {
    return blogPosts;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id,title,slug,excerpt,content,status,reading_time,tags,cover_image_url,cover_image_alt,published_at,images", // ← añadir images
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) {
      return blogPosts;
    }

    return data.map((row) => mapBlogPostRow(row as SupabaseBlogPostRow));
  } catch {
    return blogPosts;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return getBlogPosts();
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (shouldUseMockBlogPosts()) {
    return blogPosts.find((post) => post.slug === slug) ?? null;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id,title,slug,excerpt,content,status,reading_time,tags,cover_image_url,cover_image_alt,published_at,images", // ← añadir images
      )
      .eq("status", "published")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return blogPosts.find((post) => post.slug === slug) ?? null;
    }

    return mapBlogPostRow(data as SupabaseBlogPostRow);
  } catch {
    return blogPosts.find((post) => post.slug === slug) ?? null;
  }
}

// ==================== ADMIN METHODS ====================

export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  if (shouldUseMockBlogPosts()) {
    return blogPosts; // usamos el mock existente
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id,title,slug,excerpt,content,status,reading_time,tags,cover_image_url,cover_image_alt,published_at,images", // ← añadir images
      )
      .order("created_at", { ascending: false }); // orden descendente, más nuevos primero

    if (error || !data) {
      return blogPosts;
    }

    return data.map((row) => mapBlogPostRow(row as SupabaseBlogPostRow));
  } catch {
    return blogPosts;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  if (shouldUseMockBlogPosts()) {
    return blogPosts.find((post) => post.id === id) ?? null;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id,title,slug,excerpt,content,status,reading_time,tags,cover_image_url,cover_image_alt,published_at,images", // ← añadir images
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      return blogPosts.find((post) => post.id === id) ?? null;
    }

    return mapBlogPostRow(data as SupabaseBlogPostRow);
  } catch {
    return blogPosts.find((post) => post.id === id) ?? null;
  }
}
