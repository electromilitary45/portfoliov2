"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ContactNotificationEmail } from "@/features/contact/components/ContactNotificationEmail";

const DEFAULT_CONTACT_EMAIL_TO = "dereklevilla45@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasSupabaseConfig() {
    return Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}

export async function sendContactMessageAction(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const honeypot = String(formData.get("website") ?? "").trim();

    if (honeypot) {
        redirect("/contactame?sent=true");
    }

    if (name.length < 2 || name.length > 80 || !email || !EMAIL_REGEX.test(email) || message.length < 10 || message.length > 2000) {
        redirect("/contactame?error=invalid_fields");
    }

    let savedToDb = false;
    if (hasSupabaseConfig()) {
        try {
            const supabase = await createSupabaseServerClient();
            const { error } = await supabase.from("contact_messages").insert({
                name,
                email,
                message,
            });
            savedToDb = !error;
            if (error) {
                console.error("contact insert error:", error.message);
            }
        } catch (dbError) {
            console.error("contact insert exception:", dbError);
            savedToDb = false;
        }
    }

    let emailed = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
        try {
            const resend = new Resend(resendApiKey);
            const { error } = await resend.emails.send({
                from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
                to: [process.env.CONTACT_EMAIL_TO ?? DEFAULT_CONTACT_EMAIL_TO],
                replyTo: email,
                subject: `Nuevo mensaje de ${name} — Portfolio`,
                react: ContactNotificationEmail({ name, email, message }),
            });
            emailed = !error;
            if (error) {
                console.error("resend send error:", error.message);
            }
        } catch (emailError) {
            console.error("resend exception:", emailError);
            emailed = false;
        }
    }

    if (!savedToDb && !emailed) {
        redirect("/contactame?error=no_channel");
    }

    revalidatePath("/admin/mensajes");

    redirect(`/contactame?sent=true&channel=${emailed ? "email" : "db"}`);
}
