import { type NextRequest, NextResponse } from "next/server";

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

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ ok: true });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        path,
        referrer: referrer ?? "",
        visitor_id: visitor_id ?? null,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Analytics track error:", res.status, text);
      return NextResponse.json({ error: text }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Analytics track exception:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
