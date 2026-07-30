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

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    if (pathname.startsWith("/admin") || pathname.startsWith("/_")) return;

    const payload = {
      path: pathname,
      referrer: document.referrer || "",
      visitor_id: getVisitorId(),
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/track", JSON.stringify(payload));
    } else {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
