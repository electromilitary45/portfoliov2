import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AnalyticsSummary, DailyVisits, PageView } from "@/features/analytics/analytics.type";

type RawPageView = {
  id: string;
  path: string;
  referrer: string;
  visitor_id: string | null;
  created_at: string;
};

function mapPageView(row: RawPageView): PageView {
  return {
    id: row.id,
    path: row.path,
    referrer: row.referrer,
    visitorId: row.visitor_id,
    createdAt: row.created_at,
  };
}

function shouldUseMock() {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function getTodayRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start.getTime() + 86_400_000);
  return { start: start.toISOString(), end: end.toISOString() };
}

function get30DaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  if (shouldUseMock()) {
    return {
      totalVisits: 0,
      todayVisits: 0,
      uniqueVisitors: 0,
      dailyVisits: [],
      topPages: [],
      topReferrers: [],
      recentVisits: [],
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const today = getTodayRange();
    const thirtyDaysAgo = get30DaysAgo();

    const [totalRes, todayRes, dailyRes, pagesRes, referrersRes, recentRes] =
      await Promise.all([
        supabase
          .from("page_views")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("page_views")
          .select("*", { count: "exact", head: true })
          .gte("created_at", today.start)
          .lt("created_at", today.end),
        supabase
          .from("page_views")
          .select("created_at, visitor_id")
          .gte("created_at", thirtyDaysAgo),
        supabase
          .from("page_views")
          .select("path")
          .gte("created_at", thirtyDaysAgo),
        supabase
          .from("page_views")
          .select("referrer")
          .gte("created_at", thirtyDaysAgo)
          .neq("referrer", ""),
        supabase
          .from("page_views")
          .select("id,path,referrer,visitor_id,created_at")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

    const totalVisits = totalRes.count ?? 0;
    const todayVisits = todayRes.count ?? 0;

    // Unique visitors (by visitor_id)
    const allViews = dailyRes.data ?? [];
    const uniqueIds = new Set(
      allViews
        .filter((v) => v.visitor_id)
        .map((v) => v.visitor_id),
    );
    const uniqueVisitors = uniqueIds.size;

    // Daily visits for last 30 days
    const dailyMap = new Map<string, { visits: number; unique: Set<string> }>();

    const todayDate = new Date().toISOString().slice(0, 10);
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dailyMap.set(key, { visits: 0, unique: new Set() });
    }

    for (const v of allViews) {
      const key = new Date(v.created_at).toISOString().slice(0, 10);
      const entry = dailyMap.get(key);
      if (entry) {
        entry.visits++;
        if (v.visitor_id) entry.unique.add(v.visitor_id);
      }
    }

    const dailyVisits: DailyVisits[] = [...dailyMap.entries()].map(
      ([date, data]) => ({
        date,
        visits: data.visits,
        unique_visitors: data.unique.size,
      }),
    );

    // Top pages
    const pageCount = new Map<string, number>();
    for (const v of pagesRes.data ?? []) {
      pageCount.set(v.path, (pageCount.get(v.path) ?? 0) + 1);
    }
    const topPages = [...pageCount.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Top referrers
    const refCount = new Map<string, number>();
    for (const v of referrersRes.data ?? []) {
      const ref = v.referrer || "(direct)";
      refCount.set(ref, (refCount.get(ref) ?? 0) + 1);
    }
    const topReferrers = [...refCount.entries()]
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const recentVisits = (recentRes.data ?? []).map((row) =>
      mapPageView(row as RawPageView),
    );

    return {
      totalVisits,
      todayVisits,
      uniqueVisitors,
      dailyVisits,
      topPages,
      topReferrers,
      recentVisits,
    };
  } catch (err) {
    console.error("Analytics summary error:", err);
    return {
      totalVisits: 0,
      todayVisits: 0,
      uniqueVisitors: 0,
      dailyVisits: [],
      topPages: [],
      topReferrers: [],
      recentVisits: [],
    };
  }
}
