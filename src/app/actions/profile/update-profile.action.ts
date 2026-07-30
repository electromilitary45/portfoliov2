"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateProfileAction(formData: FormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const headline = String(formData.get("headline") ?? "").trim();
    const summary = String(formData.get("summary") ?? "").trim();

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ headline, summary })
        .eq("id", existing.id);

      if (updateError) {
        console.error("Error al actualizar perfil:", updateError);
        throw new Error("No se pudo guardar la información del perfil");
      }
    } else {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ headline, summary });

      if (insertError) {
        console.error("Error al insertar perfil:", insertError);
        throw new Error("No se pudo guardar la información del perfil");
      }
    }

    revalidatePath("/");
    revalidatePath("/sobre-mi");
    revalidatePath("/admin/perfil");

    redirect("/admin/perfil?profile_updated=true");
  } catch (err) {
    console.error("=== UPDATE PROFILE ERROR ===");
    console.error(err);
    throw err;
  }
}
