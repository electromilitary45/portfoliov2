"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createEducationAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const title = String(formData.get("title") ?? "").trim();
  const institution = String(formData.get("institution") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();

  if (!title || !institution || !period) {
    throw new Error("Faltan campos obligatorios");
  }

  const { error } = await supabase.from("education").insert({
    title,
    institution,
    period,
  });

  if (error) {
    console.error("Error al crear educación:", error);
    throw new Error("No se pudo crear la educación");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?education_created=true");
}
