import type { Profile } from "@/features/profile/profile.type";

export const profile: Profile = {
  headline:
    "Developer enfocado en construir productos web limpios y mantenibles.",
  summary:
    "Me interesa crear interfaces claras, aprender buenas prácticas de arquitectura y documentar el proceso detrás de cada proyecto.",
  experience: [
    {
      id: "1",
      role: "Frontend Developer",
      company: "Proyecto personal",
      period: "2026 - Presente",
      description:
        "Construcción de portfolio profesional con Next.js, Supabase, Vercel, blog técnico y panel de administración.",
      stack: ["Next.js", "TypeScript", "Tailwind"],
    },
  ],
  education: [
    {
      id: 1,
      title: "Desarrollo de Software",
      institution: "Formación técnica / autodidacta",
      period: "En progreso",
    },
  ],
  certificates: [
    {
      id: 1,
      title: "Certificado pendiente",
      issuer: "Por definir",
      year: "2026",
    },
  ],
};
