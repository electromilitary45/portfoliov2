import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const info: Record<string, unknown> = {};

  info.supabaseUrl = supabaseUrl ? "✓ configurado" : "✗ faltante";
  info.supabaseAnonKey = supabaseAnonKey
    ? "✓ configurado"
    : "✗ faltante";
  info.serviceRoleKey = serviceRoleKey ? "✓ configurado" : "✗ no configurado";

  // Test REST API insert
  const testId = crypto.randomUUID().slice(0, 8);

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey!,
        Authorization: `Bearer ${supabaseAnonKey!}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        path: `/debug-${testId}`,
        referrer: "debug",
        visitor_id: `debug-${testId}`,
      }),
    });

    info.restApiStatus = res.status;
    const body = await res.text();
    info.restApiBody = body.length > 200 ? body.slice(0, 200) + "..." : body;
  } catch (err) {
    info.restApiError = String(err);
  }

  // Test supabase-js insert
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const key = serviceRoleKey ?? supabaseAnonKey;
    const supabase = createClient(supabaseUrl!, key!, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("page_views")
      .insert({
        path: `/debug-js-${testId}`,
        referrer: "debug-js",
        visitor_id: `debug-js-${testId}`,
      })
      .select("id");

    info.jsInsertStatus = error ? "error" : "ok";
    info.jsInsertError = error?.message ?? null;
    info.jsInsertId = data?.[0]?.id ?? null;

    // Cleanup
    if (data?.[0]?.id) {
      await supabase.from("page_views").delete().eq("id", data[0].id);
    }
    // Also cleanup REST API insert
    await supabase
      .from("page_views")
      .delete()
      .eq("visitor_id", `debug-${testId}`);
  } catch (err) {
    info.jsInsertException = String(err);
  }

  // Count rows
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const key = serviceRoleKey ?? supabaseAnonKey;
    const supabase = createClient(supabaseUrl!, key!, {
      auth: { persistSession: false },
    });

    const { count, error } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });

    info.rowCount = count ?? 0;
    info.countError = error?.message ?? null;
  } catch (err) {
    info.countException = String(err);
  }

  return NextResponse.json(info);
}
