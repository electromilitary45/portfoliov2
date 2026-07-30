import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, referrer, visitor_id } = body;

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ ok: true });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey ?? supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? "",
      visitor_id: visitor_id ?? null,
    });

    if (error) {
      console.error("Analytics track error:", error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Analytics track exception:", err);
    return NextResponse.json({ ok: true });
  }
}
