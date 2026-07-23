"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function createExperienceAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const stack = parseStack(String(formData.get("stack") ?? ""));

  if (!role || !company || !period) {
    throw new Error("Faltan campos obligatorios");
  }

  const { error } = await supabase.from("experiences").insert({
    role,
    company,
    period,
    description: description || null,
    stack,
  });

  if (error) {
    console.error("=== SUPABASE INSERT ERROR ===");
    console.error(JSON.stringify(error, null, 2));
    throw new Error(`No se pudo crear la experiencia: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?created=true");
}
