"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createCertificateAction(formData: FormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const title = String(formData.get("title") ?? "").trim();
    const issuer = String(formData.get("issuer") ?? "").trim();
    const year = String(formData.get("year") ?? "").trim();

    if (!title || !issuer || !year) {
      throw new Error("Faltan campos obligatorios");
    }

    let fileUrl: string | null = null;
    const file = formData.get("file");

    if (file instanceof File && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `certificates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("certificates")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Error al subir archivo:", uploadError);
        throw new Error(`Error al subir el archivo: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("certificates")
        .getPublicUrl(filePath);

      fileUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("certificates").insert({
      title,
      issuer,
      year,
      file_url: fileUrl,
    });

    if (error) {
      console.error("Error al crear certificado:", error);
      throw new Error(`No se pudo crear el certificado: ${error.message}`);
    }

    revalidatePath("/");
    revalidatePath("/sobre-mi");
    revalidatePath("/admin/perfil");

    redirect("/admin/perfil?certificate_created=true");
  } catch (err) {
    console.error("=== CREATE CERTIFICATE ERROR ===");
    console.error(err);
    throw err;
  }
}
