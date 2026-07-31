import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Decode JWT payload without verifying signature
function decodeJwtPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return "not a jwt";
    const payload = JSON.parse(atob(parts[1]));
    return { role: payload.role, iss: payload.iss?.slice(0, 20) };
  } catch {
    return "decode failed";
  }
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const info: Record<string, unknown> = {};

  info.url = supabaseUrl ?? "missing";
  info.anonKeyRole = supabaseAnonKey ? decodeJwtPayload(supabaseAnonKey) : "missing";
  info.serviceRoleKeyRole = serviceRoleKey ? decodeJwtPayload(serviceRoleKey) : "missing";

  // Test simple INSERT (no select) via REST API with anon key
  const testId = crypto.randomUUID().slice(0, 8);
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey!,
        Authorization: `Bearer ${supabaseAnonKey!}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        path: `/debug-${testId}`,
        referrer: "debug",
        visitor_id: `anon-${testId}`,
      }),
    });
    info.restAnonInsert = res.status;

    // Cleanup
    if (res.ok) {
      await fetch(
        `${supabaseUrl}/rest/v1/page_views?visitor_id=eq.anon-${testId}`,
        {
          method: "DELETE",
          headers: {
            apikey: supabaseAnonKey!,
            Authorization: `Bearer ${supabaseAnonKey!}`,
          },
        },
      );
    }
  } catch (err) {
    info.restAnonError = String(err);
  }

  // Test INSERT with service_role key
  const testId2 = crypto.randomUUID().slice(0, 8);
  try {
    const key = serviceRoleKey ?? supabaseAnonKey!;
    const res = await fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        path: `/debug-svc-${testId2}`,
        referrer: "debug-svc",
        visitor_id: `svc-${testId2}`,
      }),
    });
    info.restSvcInsert = res.status;

    if (!res.ok) {
      const body = await res.text();
      info.restSvcError = body.slice(0, 200);
    }

    // Cleanup
    if (res.ok) {
      await fetch(`${supabaseUrl}/rest/v1/page_views?visitor_id=eq.svc-${testId2}`, {
        method: "DELETE",
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
    }
  } catch (err) {
    info.restSvcException = String(err);
  }

  // Count rows (via service role or anon)
  try {
    const key = serviceRoleKey ?? supabaseAnonKey!;
    const res = await fetch(
      `${supabaseUrl}/rest/v1/page_views?select=id&limit=0`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "count=exact",
        },
      },
    );
    info.count = res.headers.get("content-range") ?? "no count header";
    info.countStatus = res.status;
  } catch (err) {
    info.countError = String(err);
  }

  return NextResponse.json(info);
}
