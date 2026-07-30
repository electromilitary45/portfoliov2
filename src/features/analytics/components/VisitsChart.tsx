import type { DailyVisits } from "@/features/analytics/analytics.type";

type VisitsChartProps = {
  data: DailyVisits[];
};

export function VisitsChart({ data }: VisitsChartProps) {
  if (data.length === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          Tráfico Diario (30 días)
        </p>
        <p className="mt-8 text-center text-sm text-neutral-600">
          No hay datos de tráfico todavía
        </p>
      </div>
    );
  }

  const maxVisits = Math.max(...data.map((d) => d.visits), 1);

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          Tráfico Diario (30 días)
        </p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-500/60" />
            Visitas
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-500/20" />
            Únicos
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-[3px] h-40">
        {data.map((day) => {
          const visitsH = (day.visits / maxVisits) * 100;
          const uniqueH = (day.unique_visitors / maxVisits) * 100;

          return (
            <div
              key={day.date}
              className="group relative flex flex-1 flex-col justify-end"
            >
              <div className="relative w-full">
                <div
                  className="w-full bg-red-500/20 transition hover:bg-red-500/30"
                  style={{ height: `${Math.max(uniqueH, 0.5)}%` }}
                />
                <div
                  className="absolute bottom-0 w-full bg-red-500/60 transition hover:bg-red-500/80"
                  style={{ height: `${Math.max(visitsH, 0.5)}%` }}
                />
              </div>
              <div className="absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-neutral-900 px-2 py-1 font-mono text-[11px] text-white shadow-lg group-hover:block">
                {day.date}: {day.visits} visits
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.1em] text-neutral-600">
        <span>{data[0]?.date ?? ""}</span>
        <span>{data[data.length - 1]?.date ?? ""}</span>
      </div>
    </div>
  );
}
