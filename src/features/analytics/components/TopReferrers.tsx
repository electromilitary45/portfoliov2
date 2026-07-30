type TopReferrersProps = {
  data: { referrer: string; count: number }[];
};

export function TopReferrers({ data }: TopReferrersProps) {
  if (data.length === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          Fuentes de Tráfico
        </p>
        <p className="mt-8 text-center text-sm text-neutral-600">
          Sin datos todavía
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
        Fuentes de Tráfico
      </p>

      <div className="mt-4 space-y-1.5">
        {data.map((ref) => (
          <div
            key={ref.referrer}
            className="flex items-center justify-between px-2 py-1.5 text-sm"
          >
            <span className="max-w-[70%] truncate text-neutral-300">
              {ref.referrer === "(direct)"
                ? "🔗 Directo"
                : ref.referrer.length > 40
                  ? ref.referrer.slice(0, 40) + "..."
                  : ref.referrer}
            </span>
            <span className="font-mono text-xs tabular-nums text-neutral-500">
              {ref.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
