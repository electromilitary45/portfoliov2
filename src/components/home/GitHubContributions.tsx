import { Container } from "@/components/ui/Container";
import { getGitHubUsername } from "@/features/github/github.service";

async function getContributionSvg(): Promise<string | null> {
    const username = getGitHubUsername();
    if (!username) return null;

    try {
        const res = await fetch(`https://ghchart.rshah.org/${username}`, {
            next: { revalidate: 86400 },
        });
        if (!res.ok) return null;
        return await res.text();
    } catch {
        return null;
    }
}

export async function GitHubContributions() {
    const svg = await getContributionSvg();
    if (!svg) return null;

    return (
        <section className="border-t border-neutral-200 bg-neutral-50 py-24">
            <Container>
                <div className="mx-auto max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.35em] text-red-600">
                        GitHub Activity
                    </p>

                    <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-neutral-950">
                        Mapa de contribuciones
                    </h2>

                    <div
                        className="mt-10 overflow-x-auto rounded-lg border border-neutral-200 bg-white p-6"
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                </div>
            </Container>
        </section>
    );
}
