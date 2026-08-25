"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteContactMessageAction(formData: FormData) {
    const messageId = String(formData.get("messageId") ?? "");

    if (!messageId) {
        redirect("/admin/mensajes?error=missing_message_id");
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);

    if (error) {
        redirect("/admin/mensajes?error=delete_failed");
    }

    revalidatePath("/admin/mensajes");

    redirect("/admin/mensajes?deleted=true");
}
