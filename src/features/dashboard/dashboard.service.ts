import { getAdminProjects } from "@/features/projects/project.service";
import { getAllBlogPostsForAdmin } from "@/features/blog/blog-post.service";
import { getAdminExperiences } from "@/features/profile/profile.service";
import { getAdminEducation } from "@/features/profile/profile.service";
import { getAdminCertificates } from "@/features/profile/profile.service";
import { getGitHubStats } from "@/features/github/github.service";
import type { Project } from "@/features/projects/project.type";
import type { BlogPost } from "@/features/blog/blog-post.type";
import type { GitHubStats } from "@/features/github/github.type";

export type ContentStats = {
  total: number;
  published: number;
  draft: number;
  archived: number;
};

export type DashboardData = {
  projects: ContentStats;
  blogPosts: ContentStats;
  experiences: number;
  education: number;
  certificates: number;
  recentProjects: Array<{
    id: string;
    title: string;
    status: Project["status"];
    createdAt: string;
    href: string;
  }>;
  recentPosts: Array<{
    id: string;
    title: string;
    status: BlogPost["status"];
    tags: string[];
    publishedAt?: string | null;
    href: string;
  }>;
  github: GitHubStats;
};

function computeStats<T extends { status: string }>(items: T[]): ContentStats {
  return {
    total: items.length,
    published: items.filter((i) => i.status === "published").length,
    draft: items.filter((i) => i.status === "draft").length,
    archived: items.filter((i) => i.status === "archived").length,
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const [projects, posts, experiences, education, certificates, github] =
      await Promise.all([
        getAdminProjects(),
        getAllBlogPostsForAdmin(),
        getAdminExperiences(),
        getAdminEducation(),
        getAdminCertificates(),
        getGitHubStats(),
      ]);

    const sortedProjects = [...projects].sort(
      (a, b) =>
        new Date(b.createdAt ?? "").getTime() -
        new Date(a.createdAt ?? "").getTime(),
    );

    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = a.publishedAt ?? "";
      const dateB = b.publishedAt ?? "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    return {
      projects: computeStats(projects),
      blogPosts: computeStats(posts),
      experiences: experiences.length,
      education: education.length,
      certificates: certificates.length,
      recentProjects: sortedProjects.slice(0, 5).map((p) => ({
        id: p.id,
        title: p.title,
        status: p.status,
        createdAt: p.createdAt ?? "",
        href: p.href,
      })),
      recentPosts: sortedPosts.slice(0, 5).map((p) => ({
        id: p.id,
        title: p.title,
        status: p.status,
        tags: p.tags,
        publishedAt: p.publishedAt,
        href: p.href,
      })),
      github,
    };
  } catch {
    return {
      projects: { total: 0, published: 0, draft: 0, archived: 0 },
      blogPosts: { total: 0, published: 0, draft: 0, archived: 0 },
      experiences: 0,
      education: 0,
      certificates: 0,
      recentProjects: [],
      recentPosts: [],
      github: {
        user: null,
        totalStars: 0,
        topRepos: [],
        recentRepos: [],
        topLanguages: [],
      },
    };
  }
}
