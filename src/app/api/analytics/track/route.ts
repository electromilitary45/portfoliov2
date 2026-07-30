import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer, visitor_id } = await request.json();

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ ok: true });
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    });

    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? "",
      visitor_id: visitor_id ?? null,
    });

    if (error) {
      console.error("Analytics track error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
