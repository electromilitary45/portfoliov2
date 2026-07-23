"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function deleteExperienceAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const experienceId = String(formData.get("experienceId") ?? "");

  if (!experienceId) {
    throw new Error("Falta el ID de la experiencia");
  }

  if (!uuidRegex.test(experienceId)) {
    throw new Error("ID de experiencia inválido — los datos mostrados son mock, no hay registros en la base de datos");
  }

  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", experienceId);

  if (error) {
    console.error("Error al eliminar experiencia:", error);
    throw new Error("No se pudo eliminar la experiencia");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?deleted=true");
}
