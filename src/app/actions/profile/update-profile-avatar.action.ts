"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateProfileAvatarAction(formData: FormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const file = formData.get("avatar");

    if (!(file instanceof File) || file.size === 0) {
      throw new Error("No se seleccionó ninguna imagen");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("El archivo debe ser una imagen");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("La imagen no debe superar los 5MB");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `profile/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Error al subir avatar:", uploadError);
      throw new Error(`Error al subir la imagen: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", existing.id);

      if (updateError) {
        console.error("Error al actualizar avatar en profiles:", updateError);
        throw new Error("No se pudo guardar la información del avatar");
      }
    } else {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ avatar_url: avatarUrl });

      if (insertError) {
        console.error("Error al insertar avatar en profiles:", insertError);
        throw new Error("No se pudo guardar la información del avatar");
      }
    }

    revalidatePath("/");
    revalidatePath("/sobre-mi");
    revalidatePath("/admin/perfil");

    redirect("/admin/perfil?avatar_updated=true");
  } catch (err) {
    console.error("=== UPDATE PROFILE AVATAR ERROR ===");
    console.error(err);
    throw err;
  }
}
