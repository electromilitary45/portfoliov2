import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Certificate } from "@/features/profile/profile.type";

type CertificateListProps = {
    items: Certificate[];
};

export function CertificateList({ items }: CertificateListProps) {
    return (
        <section>
            <div className="flex items-center gap-3">
                <Award className="h-7 w-7 text-amber-500" />
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                    Certificados
                </h2>
            </div>

            <div className="mt-8 space-y-4">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group border border-neutral-200 border-l-4 border-l-amber-500 bg-white p-6 transition hover:border-amber-500/30 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.1)]"
                    >
                        <div className="flex items-center justify-between">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600">
                                {item.issuer}
                            </p>
                            <span className="rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs tracking-wider text-neutral-600 transition group-hover:bg-amber-50 group-hover:text-amber-700">
                                {item.year}
                            </span>
                        </div>

                        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-neutral-950">
                            {item.title}
                        </h3>

                        <div className="mt-5 flex flex-wrap gap-4">
                            {item.fileUrl ? (
                                <Link
                                    href={item.fileUrl}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-950 underline underline-offset-4 transition hover:text-amber-600"
                                >
                                    Ver certificado
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                            ) : null}

                            {item.linkUrl ? (
                                <Link
                                    href={item.linkUrl}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-950 underline underline-offset-4 transition hover:text-amber-600"
                                >
                                    Ver enlace
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
