import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/features/contact/contact-message.type";

type RawContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
};

function mapContactMessage(row: RawContactMessage): ContactMessage {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        isRead: row.is_read,
        createdAt: row.created_at,
    };
}

function shouldUseMock() {
    return (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}

export async function getContactMessages(): Promise<ContactMessage[]> {
    if (shouldUseMock()) {
        return [];
    }

    try {
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from("contact_messages")
            .select("id, name, email, message, is_read, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            return [];
        }

        return (data ?? []).map(mapContactMessage);
    } catch {
        return [];
    }
}
