"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/features/projects/project.type";

const allowedStatuses: ProjectStatus[] = ["draft", "published", "archived"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseStack(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function updateProjectAction(formData: FormData) {
  const projectId = String(formData.get("projectId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const stack = parseStack(String(formData.get("stack") ?? ""));
  const githubUrl = String(formData.get("githubUrl") ?? "").trim() || null;
  const demoUrl = String(formData.get("demoUrl") ?? "").trim() || null;
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const imageAlt = String(formData.get("imageAlt") ?? "").trim() || null;
  const isFeatured = formData.get("isFeatured") === "on";
  const status = String(formData.get("status") ?? "draft") as ProjectStatus;
  const currentPublishedAt =
    String(formData.get("publishedAt") ?? "").trim() || null;

  if (!projectId || !title || !summary || !allowedStatuses.includes(status)) {
    redirect("/admin/proyectos?error=invalid_project_update");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      slug: slugify(title),
      summary,
      description: description || null,
      status,
      stack,
      github_url: githubUrl,
      demo_url: demoUrl,
      image_url: imageUrl,
      image_alt: imageAlt,
      is_featured: isFeatured,
      published_at:
        status === "published"
          ? (currentPublishedAt ?? new Date().toISOString())
          : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    redirect("/admin/proyectos?error=update_failed");
  }

  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");

  redirect("/admin/proyectos?updated=true");
}
