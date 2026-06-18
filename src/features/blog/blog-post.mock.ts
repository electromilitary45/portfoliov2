import type { BlogPost, BlogPostImage } from "@/features/blog/blog-post.type";

const sampleImages: BlogPostImage[] = [
  { url: "/blog/nextjs-portfolio-cover.png", alt: "Portada del artículo sobre Next.js", order: 0 },
  { url: "/blog/nextjs-portfolio-cover.png", alt: "Estructura de carpetas del proyecto", order: 1 },
  { url: "/blog/nextjs-portfolio-cover.png", alt: "Código de ejemplo en el editor", order: 2 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Construyendo mi portfolio con Next.js",
    excerpt:
      "Notas sobre la estructura inicial, decisiones técnicas y cómo estoy organizando el proyecto.",
    slug: "construyendo-mi-portfolio-con-nextjs",
    content:
      "Este es el contenido inicial del artículo. Más adelante este contenido será administrado desde el panel privado.\n\n## Estructura del proyecto\n\nEl proyecto sigue una arquitectura por features...\n\n![Estructura de carpetas](/blog/nextjs-portfolio-cover.png)\n\n## Conclusión\n\nNext.js 15 trae muchas mejoras...",
    status: "published",
    readingTime: "4 min",
    publishedAt: new Date().toISOString(),
    tags: ["Next.js", "Portfolio", "Arquitectura"],
    coverImageUrl: "/blog/nextjs-portfolio-cover.png",
    coverImageAlt: "Interfaz minimalista de un portfolio construido con Next.js",
    images: sampleImages,
    href: "/blog/construyendo-mi-portfolio-con-nextjs",
  },
  {
    id: "2",
    title: "Por qué separar features desde el inicio",
    excerpt:
      "Una forma simple de mantener orden sin caer en una arquitectura innecesariamente compleja.",
    slug: "por-que-separar-features-desde-el-inicio",
    content:
      "Separar por features ayuda a mantener el proyecto ordenado sin forzar patrones innecesarios.\n\n### Beneficios\n\n- Escalabilidad\n- Mantenibilidad\n- Colaboración en equipo",
    status: "published",
    readingTime: "3 min",
    publishedAt: new Date().toISOString(),
    tags: ["Clean Code", "Frontend"],
    coverImageUrl: "/blog/features-architecture-cover.png",
    coverImageAlt: "Diagrama conceptual de una arquitectura frontend por features",
    images: [
      { url: "/blog/features-architecture-cover.png", alt: "Diagrama de arquitectura", order: 0 },
    ],
    href: "/blog/por-que-separar-features-desde-el-inicio",
  },
];
