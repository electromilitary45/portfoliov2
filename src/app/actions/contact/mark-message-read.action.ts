"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function markMessageReadAction(formData: FormData) {
    const messageId = String(formData.get("messageId") ?? "");
    const isRead = String(formData.get("isRead") ?? "") === "true";

    if (!messageId) {
        redirect("/admin/mensajes?error=missing_message_id");
    }

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: isRead })
        .eq("id", messageId);

    if (error) {
        redirect("/admin/mensajes?error=update_failed");
    }

    revalidatePath("/admin/mensajes");

    redirect("/admin/mensajes?updated=true");
}
