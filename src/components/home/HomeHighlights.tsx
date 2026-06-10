import { Container } from "@/components/ui/Container";

const highlights = [
  {
    number: "01",
    title: "Proyectos",
    description:
      "Casos reales, repos públicos, demos, imágenes, decisiones técnicas y aprendizajes.",
  },
  {
    number: "02",
    title: "GitHub Stats",
    description:
      "Actividad, tecnologías, contribuciones y evolución como developer.",
  },
  {
    number: "03",
    title: "Blog",
    description:
      "Notas técnicas, errores resueltos, guías, bitácoras de proyectos y reflexiones.",
  },
];

export function HomeHighlights() {
  return (
    <section className="border-y border-neutral-200 bg-white py-20">
      <Container>
        <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.number}
              className="group min-h-[280px] bg-white p-8 transition hover:bg-neutral-950 md:p-10"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-red-600">
                    {item.number}
                  </p>

                  <h2 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-neutral-950 transition group-hover:text-white">
                    {item.title}
                  </h2>
                </div>

                <p className="mt-8 leading-7 text-neutral-600 transition group-hover:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}