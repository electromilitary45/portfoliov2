export type ProjectStatus = "En desarrollo" | "Planeado" | "Publicado";

export type Project = {
    id: number;
    title: string;
    description: string;
    status: ProjectStatus;
    stack: string[];
    href: string;
};
