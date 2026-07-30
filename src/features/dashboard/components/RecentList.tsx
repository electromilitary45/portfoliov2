import Link from "next/link";

type RecentItem = {
  id: string;
  title: string;
  status: string;
  href: string;
  date?: string;
  tags?: string[];
};

type RecentListProps = {
  title: string;
  items: RecentItem[];
  emptyText: string;
  createHref: string;
  createLabel: string;
};

const statusColors: Record<string, string> = {
  published: "bg-green-500",
  draft: "bg-yellow-500",
  archived: "bg-neutral-500",
};

export function RecentList({
  title,
  items,
  emptyText,
  createHref,
  createLabel,
}: RecentListProps) {
  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          {title}
        </p>
        <Link
          href={createHref}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-400 transition hover:text-red-300"
        >
          {createLabel}
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {items.length === 0 && (
          <p className="py-8 text-center text-sm text-neutral-600">
            {emptyText}
          </p>
        )}

        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex items-center gap-3 border border-transparent px-3 py-2.5 transition hover:border-white/10 hover:bg-white/[0.03]"
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                statusColors[item.status] ?? "bg-neutral-500"
              }`}
            />
            <span className="flex-1 truncate text-sm text-neutral-300 transition group-hover:text-white">
              {item.title}
            </span>
            {item.tags && item.tags.length > 0 && (
              <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-600 md:inline">
                {item.tags[0]}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
