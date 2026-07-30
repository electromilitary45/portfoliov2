import { Eye, Users, BarChart3 } from "lucide-react";

type AnalyticsCardsProps = {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
};

export function AnalyticsCards({
  totalVisits,
  todayVisits,
  uniqueVisitors,
}: AnalyticsCardsProps) {
  const cards = [
    {
      label: "Visitas Totales",
      value: totalVisits,
      icon: BarChart3,
    },
    {
      label: "Visitas Hoy",
      value: todayVisits,
      icon: Eye,
      accent: true,
    },
    {
      label: "Visitantes Únicos",
      value: uniqueVisitors,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`group relative overflow-hidden border p-5 transition ${
            card.accent
              ? "border-red-500/30 bg-red-500/[0.03] hover:border-red-500"
              : "border-white/10 bg-white/[0.02] hover:border-white/20"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
                {card.label}
              </p>
              <p className="mt-2 text-4xl font-light text-white tabular-nums">
                {card.value.toLocaleString()}
              </p>
            </div>
            <card.icon
              size={24}
              className={`mt-1 transition ${
                card.accent
                  ? "text-red-500/50 group-hover:text-red-400"
                  : "text-neutral-600 group-hover:text-neutral-400"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
