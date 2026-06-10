import type { BlogPost } from "@/features/blog/blog-post.type";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Construyendo mi portfolio con Next.js",
    excerpt:
      "Notas sobre la estructura inicial, decisiones técnicas y cómo estoy organizando el proyecto.",
    slug: "construyendo-mi-portfolio-con-nextjs",
    status: "published",
    readingTime: "4 min",
    publishedAt: "2026-06-10",
    tags: ["Next.js", "Portfolio", "Arquitectura"],
  },
  {
    id: 2,
    title: "Por qué separar features desde el inicio",
    excerpt:
      "Una forma simple de mantener orden sin caer en una arquitectura innecesariamente compleja.",
    slug: "por-que-separar-features-desde-el-inicio",
    status: "draft",
    readingTime: "3 min",
    publishedAt: "2026-06-10",
    tags: ["Clean Code", "Frontend"],
  },
];
