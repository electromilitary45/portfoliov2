type StatusBarProps = {
  published: number;
  draft: number;
  archived: number;
  total: number;
};

export function StatusBar({ published, draft, archived, total }: StatusBarProps) {
  if (total === 0) return null;

  const pubPct = (published / total) * 100;
  const draftPct = (draft / total) * 100;
  const archPct = (archived / total) * 100;

  return (
    <div className="mt-5">
      <div className="flex h-1.5 w-full overflow-hidden bg-white/5">
        {published > 0 && (
          <div
            style={{ width: `${pubPct}%` }}
            className="bg-green-500/70 transition-all"
          />
        )}
        {draft > 0 && (
          <div
            style={{ width: `${draftPct}%` }}
            className="bg-yellow-500/70 transition-all"
          />
        )}
        {archived > 0 && (
          <div
            style={{ width: `${archPct}%` }}
            className="bg-neutral-500/70 transition-all"
          />
        )}
      </div>
      <div className="mt-2 flex gap-4">
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-500/70" />
          Pub {published}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-yellow-400">
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          Draft {draft}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-400">
          <span className="h-2 w-2 rounded-full bg-neutral-500/70" />
          Arch {archived}
        </span>
      </div>
    </div>
  );
}
