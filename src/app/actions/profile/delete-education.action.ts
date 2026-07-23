"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function deleteEducationAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const educationId = String(formData.get("educationId") ?? "");

  if (!educationId) {
    throw new Error("Falta el ID de la educación");
  }

  if (!uuidRegex.test(educationId)) {
    throw new Error("ID de educación inválido");
  }

  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", educationId);

  if (error) {
    console.error("Error al eliminar educación:", error);
    throw new Error("No se pudo eliminar la educación");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?education_deleted=true");
}
