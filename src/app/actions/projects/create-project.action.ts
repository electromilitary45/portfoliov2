"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function createProjectAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const stack = parseStack(String(formData.get("stack") ?? ""));
  const githubUrl = String(formData.get("githubUrl") ?? "").trim() || null;
  const demoUrl = String(formData.get("demoUrl") ?? "").trim() || null;
  const isFeatured = formData.get("isFeatured") === "on";
  const status = String(formData.get("status") ?? "draft");

  if (!title || !summary) {
    redirect("/admin/proyectos?error=missing_required_fields");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("projects").insert({
    title,
    slug: slugify(title),
    summary,
    description: description || null,
    status,
    stack,
    github_url: githubUrl,
    demo_url: demoUrl,
    is_featured: isFeatured,
    published_at: status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    redirect("/admin/proyectos?error=create_failed");
  }

  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");

  redirect("/admin/proyectos?created=true");
}
