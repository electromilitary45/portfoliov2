import { ExternalLink } from "lucide-react";

type TopPagesTableProps = {
  data: { path: string; count: number }[];
};

export function TopPagesTable({ data }: TopPagesTableProps) {
  if (data.length === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-5">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          Páginas Populares
        </p>
        <p className="mt-8 text-center text-sm text-neutral-600">
          Sin datos todavía
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
        Páginas Populares
      </p>

      <div className="mt-4 space-y-1.5">
        {data.map((page) => (
          <div key={page.path} className="group flex items-center gap-3 px-2 py-1.5">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-neutral-300">
                  {page.path || "/"}
                  <ExternalLink size={10} className="text-neutral-600" />
                </span>
                <span className="font-mono text-xs tabular-nums text-neutral-400">
                  {page.count}
                </span>
              </div>
              <div className="h-1 w-full bg-white/5">
                <div
                  className="h-full bg-red-500/50 transition"
                  style={{ width: `${(page.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
