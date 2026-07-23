"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function deleteCertificateAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const certificateId = String(formData.get("certificateId") ?? "");

  if (!certificateId) {
    throw new Error("Falta el ID del certificado");
  }

  if (!uuidRegex.test(certificateId)) {
    throw new Error("ID de certificado inválido");
  }

  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", certificateId);

  if (error) {
    console.error("Error al eliminar certificado:", error);
    throw new Error("No se pudo eliminar el certificado");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");

  redirect("/admin/perfil?certificate_deleted=true");
}
