"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/features/projects/project.type";

const allowedStatuses: ProjectStatus[] = ["draft", "published", "archived"];

export async function updateProjectStatusAction(formData: FormData) {
  const projectId = String(formData.get("projectId") ?? "");
  const status = String(formData.get("status") ?? "") as ProjectStatus;

  if (!projectId || !allowedStatuses.includes(status)) {
    redirect("/admin/proyectos?error=invalid_status_update");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("projects")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .eq("id", projectId);

  if (error) {
    redirect("/admin/proyectos?error=status_update_failed");
  }

  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath(`/proyectos`);
  revalidatePath("/admin/proyectos");

  redirect("/admin/proyectos?updated=true");
}
