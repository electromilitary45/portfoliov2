"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ReorderItem = {
  id: string;
  sortOrder: number;
};

export async function reorderCertificatesAction(items: ReorderItem[]) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  for (const item of items) {
    if (!uuidRegex.test(item.id)) {
      throw new Error("ID de certificado inválido");
    }
  }

  const updates = items.map((item) => ({
    id: item.id,
    sort_order: item.sortOrder,
  }));

  const { error } = await supabase.from("certificates").upsert(updates, { onConflict: "id" });

  if (error) {
    console.error("Error al reordenar certificados:", error);
    throw new Error("No se pudo reordenar los certificados");
  }

  revalidatePath("/");
  revalidatePath("/sobre-mi");
  revalidatePath("/admin/perfil");
}
