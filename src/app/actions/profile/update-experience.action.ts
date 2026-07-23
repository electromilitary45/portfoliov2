"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseStack(value: string) {
  return [
    ...new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

export async function updateExperienceAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const experienceId = String(formData.get("experienceId") ?? "");
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const stack = parseStack(String(formData.get("stack") ?? ""));

  if (!experienceId || !role || !company || !period) {
    throw new Error("Datos inválidos para actualizar");
  }

  if (!uuidRegex.test(experienceId)) {
    throw new Error("ID de experiencia inválido — los datos mostrados son mock, no hay registros en la base de datos");
  }

  const { error } = await supabase
    .from("experiences")
    .update({
      role,
      company,
      period,
      description: description || null,
      stack,
    })
    .eq("id", experienceId);

  if (error) {
    console.error("=== SUPABASE UPDATE ERROR ===");
    console.error(JSON.stringify(error, null, 2));
    throw new Error(`No se pudo actualizar la experiencia: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?updated=true");
}
