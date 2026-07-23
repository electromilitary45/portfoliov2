"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function updateCertificateAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const certificateId = String(formData.get("certificateId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const issuer = String(formData.get("issuer") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const currentFileUrl = String(formData.get("currentFileUrl") ?? "").trim() || null;

  if (!certificateId || !title || !issuer || !year) {
    throw new Error("Datos inválidos para actualizar");
  }

  if (!uuidRegex.test(certificateId)) {
    throw new Error("ID de certificado inválido");
  }

  let fileUrl = currentFileUrl;
  const file = formData.get("file");

  if (file instanceof File && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `certificates/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(filePath, file);

    if (uploadError) {
      console.error("=== UPLOAD ERROR ===");
      console.error(JSON.stringify(uploadError, null, 2));
      throw new Error(`Error al subir el archivo: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(filePath);

    fileUrl = publicUrlData.publicUrl;
  }

  const { error } = await supabase
    .from("certificates")
    .update({
      title,
      issuer,
      year,
      file_url: fileUrl,
    })
    .eq("id", certificateId);

  if (error) {
    console.error("Error al actualizar certificado:", error);
    throw new Error("No se pudo actualizar el certificado");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?certificate_updated=true");
}
