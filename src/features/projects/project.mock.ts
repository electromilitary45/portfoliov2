import type { Project } from "@/features/projects/project.type";

export const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Portfolio v2",
    slug: "portfolio-v2",
    summary:
      "Portfolio personal construido con Next.js, Tailwind, Supabase y Vercel, con blog, admin y gestión de proyectos.",
    description:
      "Proyecto para mostrar experiencia, proyectos, blog técnico y panel de administración.",
    status: "published",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
    imageAlt: null,
    isFeatured: true,
    sortOrder: 1,
    publishedAt: new Date().toISOString(),
    href: "/proyectos/portfolio-v2",
  },
  {
    id: "2",
    title: "Admin Dashboard",
    slug: "admin-dashboard",
    summary:
      "Panel privado para administrar proyectos, blog, experiencia, certificados y contenido dinámico del sitio.",
    description:
      "Dashboard para gestionar proyectos, blog, perfil, certificados y experiencia.",
    status: "published",
    stack: ["Supabase", "Auth", "CRUD"],
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
    imageAlt: null,
    isFeatured: true,
    sortOrder: 2,
    publishedAt: new Date().toISOString(),
    href: "/proyectos/admin-dashboard",
  },
  {
    id: "3",
    title: "Technical Blog",
    slug: "technical-blog",
    summary:
      "Sistema de artículos técnicos para documentar aprendizajes, soluciones, errores y avances de proyectos.",
    description:
      "Blog con posts, tags, imágenes, slugs y contenido administrable desde el panel.",
    status: "published",
    stack: ["Next.js", "SEO", "Content"],
    githubUrl: null,
    demoUrl: null,
    imageUrl: null,
    imageAlt: null,
    isFeatured: true,
    sortOrder: 3,
    publishedAt: new Date().toISOString(),
    href: "/proyectos/technical-blog",
  },
];
