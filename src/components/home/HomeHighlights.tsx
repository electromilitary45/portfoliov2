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
    <section className="border-y border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-px bg-neutral-200 px-6 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.number} className="bg-white p-8 md:p-10">
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-red-600">
              {item.number}
            </p>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">
              {item.title}
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}