export type PageView = {
  id: string;
  path: string;
  referrer: string;
  visitorId?: string | null;
  createdAt: string;
};

export type DailyVisits = {
  date: string;
  visits: number;
  unique_visitors: number;
};

export type AnalyticsSummary = {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  dailyVisits: DailyVisits[];
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  recentVisits: PageView[];
};
