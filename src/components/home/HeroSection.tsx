import { Button } from "@/components/ui/Button";

export function HeroSection() {
    return (
        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
                <p className="font-mono text-sm uppercase tracking-[0.45em] text-red-600">
                    Developer Portfolio
                </p>

                <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-neutral-200 md:text-7xl">
                    Construyo interfaces limpias, rápidas y mantenibles.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
                    Este portfolio será mi espacio para mostrar proyectos, experiencia,
                    estadísticas de GitHub, artículos técnicos y mi evolución como
                    developer.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                    <Button href="/proyectos">Ver proyectos</Button>
                    <Button href="/contactame" variant="secondary">
                        Contactarme
                    </Button>
                </div>
            </div>

            <div className="relative hidden min-h-[520px] border border-neutral-200 bg-white p-6 lg:block">
                <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-red-600" />

                <div className="flex h-full flex-col justify-between">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.35em] text-neutral-400">
                            System Status
                        </p>
                        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em]">
                            Portfolio en construcción.
                        </h2>
                    </div>

                    <div className="space-y-4 font-mono text-sm text-neutral-500">
                        <div className="flex justify-between border-t border-neutral-200 pt-4">
                            <span>Stack</span>
                            <span>Next.js</span>
                        </div>
                        <div className="flex justify-between border-t border-neutral-200 pt-4">
                            <span>Deploy</span>
                            <span>Vercel</span>
                        </div>
                        <div className="flex justify-between border-t border-neutral-200 pt-4">
                            <span>Backend</span>
                            <span>Supabase</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}