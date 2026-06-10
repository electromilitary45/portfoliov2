import type { Project } from "@/features/projects/project.type";

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Portfolio v2",
    description:
      "Portfolio personal construido con Next.js, Tailwind, Supabase y Vercel, con blog, admin y gestión de proyectos.",
    status: "En desarrollo",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    href: "/proyectos",
  },
  {
    id: 2,
    title: "Admin Dashboard",
    description:
      "Panel privado para administrar proyectos, blog, experiencia, certificados y contenido dinámico del sitio.",
    status: "Planeado",
    stack: ["Supabase", "Auth", "CRUD"],
    href: "/admin",
  },
  {
    id: 3,
    title: "Technical Blog",
    description:
      "Sistema de artículos técnicos para documentar aprendizajes, soluciones, errores y avances de proyectos.",
    status: "Planeado",
    stack: ["MDX", "SEO", "CMS"],
    href: "/blog",
  },
];
