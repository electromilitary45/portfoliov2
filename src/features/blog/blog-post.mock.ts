import type { BlogPost } from "@/features/blog/blog-post.type";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Construyendo mi portfolio con Next.js",
    excerpt:
      "Notas sobre la estructura inicial, decisiones técnicas y cómo estoy organizando el proyecto.",
    slug: "construyendo-mi-portfolio-con-nextjs",
    content:
      "Este es el contenido inicial del artículo. Más adelante este contenido será administrado desde el panel privado.",
    status: "published",
    readingTime: "4 min",
    publishedAt: new Date().toISOString(),
    tags: ["Next.js", "Portfolio", "Arquitectura"],
    coverImageUrl: "/blog/nextjs-portfolio-cover.png",
    coverImageAlt:
      "Interfaz minimalista de un portfolio construido con Next.js",
    href: "/blog/construyendo-mi-portfolio-con-nextjs",
  },
  {
    id: "2",
    title: "Por qué separar features desde el inicio",
    excerpt:
      "Una forma simple de mantener orden sin caer en una arquitectura innecesariamente compleja.",
    slug: "por-que-separar-features-desde-el-inicio",
    content:
      "Separar por features ayuda a mantener el proyecto ordenado sin forzar patrones innecesarios.",
    status: "published",
    readingTime: "3 min",
    publishedAt: new Date().toISOString(),
    tags: ["Clean Code", "Frontend"],
    coverImageUrl: "/blog/features-architecture-cover.png",
    coverImageAlt:
      "Diagrama conceptual de una arquitectura frontend por features",
    href: "/blog/por-que-separar-features-desde-el-inicio",
  },
];
