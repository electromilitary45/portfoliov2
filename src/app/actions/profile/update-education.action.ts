"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function updateEducationAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const educationId = String(formData.get("educationId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const institution = String(formData.get("institution") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();

  if (!educationId || !title || !institution || !period) {
    throw new Error("Datos inválidos para actualizar");
  }

  if (!uuidRegex.test(educationId)) {
    throw new Error("ID de educación inválido");
  }

  const { error } = await supabase
    .from("education")
    .update({
      title,
      institution,
      period,
    })
    .eq("id", educationId);

  if (error) {
    console.error("Error al actualizar educación:", error);
    throw new Error("No se pudo actualizar la educación");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?education_updated=true");
}
