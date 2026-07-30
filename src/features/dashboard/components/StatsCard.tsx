import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  sub?: string;
  href?: string;
  accent?: boolean;
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  sub,
  href,
  accent,
}: StatsCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={`group relative overflow-hidden border p-5 transition ${
        accent
          ? "border-red-500/30 bg-red-500/[0.03] hover:border-red-500"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
            {label}
          </p>
          <p className="mt-2 text-4xl font-light text-white tabular-nums">
            {value}
          </p>
          {sub && (
            <p className="mt-1 text-xs text-neutral-500">{sub}</p>
          )}
        </div>
        <Icon
          size={28}
          className={`mt-1 transition ${
            accent
              ? "text-red-500/50 group-hover:text-red-400"
              : "text-neutral-600 group-hover:text-neutral-400"
          }`}
        />
      </div>
    </Wrapper>
  );
}
