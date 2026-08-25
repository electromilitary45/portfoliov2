type WeeklyTrendProps = {
    current: number;
    previous: number;
};

export function WeeklyTrend({ current, previous }: WeeklyTrendProps) {
    let deltaLabel = "—";
    let deltaColor = "text-neutral-500";
    let trendIcon = "→";

    if (previous > 0) {
        const delta = Math.round(((current - previous) / previous) * 100);
        if (delta > 0) {
            trendIcon = "▲";
            deltaColor = "text-green-400";
            deltaLabel = `+${delta}%`;
        } else if (delta < 0) {
            trendIcon = "▼";
            deltaColor = "text-red-400";
            deltaLabel = `${delta}%`;
        } else {
            deltaLabel = "0%";
        }
    } else if (current > 0) {
        trendIcon = "▲";
        deltaColor = "text-green-400";
        deltaLabel = "nuevo";
    }

    return (
        <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
                Tendencia semanal
            </p>

            <p className="mt-4 text-3xl font-light tabular-nums text-white">
                {current}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                visitas últimos 7 días
            </p>

            <div
                className={`mt-3 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-xs ${deltaColor}`}
            >
                <span>{trendIcon}</span>
                <span>{deltaLabel}</span>
                <span className="text-neutral-600">vs semana anterior ({previous})</span>
            </div>
        </div>
    );
}
