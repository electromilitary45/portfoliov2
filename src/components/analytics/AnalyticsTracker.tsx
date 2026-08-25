"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  const key = "portfolio_visitor_id";
  let id = localStorage.getItem(key);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }

  return id;
}

function trackVisit(path: string, referrer: string, visitorId: string) {
  const payload = JSON.stringify({ path, referrer, visitor_id: visitorId });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
  } else {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

function isAdminSession(): boolean {
  if (typeof document === "undefined") return false;

  // Sesión activa del CMS: las cookies de Supabase Auth empiezan con "sb-".
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("sb-"));
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");
  const initialised = useRef(false);

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/_") ||
        isAdminSession()
      )
        return;
      const id = setTimeout(
        () => trackVisit(pathname, document.referrer, getVisitorId()),
        500,
      );
      return () => clearTimeout(id);
    }

    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/_") ||
      isAdminSession()
    )
      return;

    trackVisit(pathname, document.referrer, getVisitorId());
  }, [pathname]);

  return null;
}
