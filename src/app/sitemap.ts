import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/features/blog/blog-post.service";
import { getProjects } from "@/features/projects/project.service";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [projects, posts] = await Promise.all([
        getProjects(),
        getPublishedBlogPosts(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/sobre-mi`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/proyectos`,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/blog`,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contactame`,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${SITE_URL}${project.href}`,
        lastModified: project.updatedAt ?? project.publishedAt ?? undefined,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}${post.href}`,
        lastModified: post.publishedAt ?? undefined,
        changeFrequency: "yearly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
