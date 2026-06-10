"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteProjectAction(formData: FormData) {
  const projectId = String(formData.get("projectId") ?? "");

  if (!projectId) {
    redirect("/admin/proyectos?error=missing_project_id");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    redirect("/admin/proyectos?error=delete_failed");
  }

  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");

  redirect("/admin/proyectos?deleted=true");
}
