import { FolderKanban, FileText, Briefcase, Award } from "lucide-react";
import Link from "next/link";
import { getDashboardData } from "@/features/dashboard/dashboard.service";
import { getAnalyticsSummary } from "@/features/analytics/analytics.service";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { RecentList } from "@/features/dashboard/components/RecentList";
import { GitHubCard } from "@/features/dashboard/components/GitHubCard";
import { StatusBar } from "@/features/dashboard/components/StatusBar";
import { AnalyticsCards } from "@/features/analytics/components/AnalyticsCards";
import { VisitsChart } from "@/features/analytics/components/VisitsChart";
import { TopPagesTable } from "@/features/analytics/components/TopPagesTable";
import { TopReferrers } from "@/features/analytics/components/TopReferrers";

export default async function AdminDashboardPage() {
  const [data, analytics] = await Promise.all([
    getDashboardData(),
    getAnalyticsSummary(),
  ]);

  const quickActions = [
    { label: "Nuevo Proyecto", href: "/admin/proyectos" },
    { label: "Nuevo Post", href: "/admin/blog" },
    { label: "Editar Perfil", href: "/admin/perfil" },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-light text-white">Dashboard</h1>
        <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          Panel de control de tu portafolio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Proyectos"
          value={data.projects.total}
          icon={FolderKanban}
          sub={`${data.projects.published} publicados · ${data.projects.draft} borradores`}
          href="/admin/proyectos"
          accent
        />
        <StatsCard
          label="Blog"
          value={data.blogPosts.total}
          icon={FileText}
          sub={`${data.blogPosts.published} publicados · ${data.blogPosts.draft} borradores`}
          href="/admin/blog"
        />
        <StatsCard
          label="Experiencia"
          value={data.experiences}
          icon={Briefcase}
          href="/admin/perfil"
        />
        <StatsCard
          label="Certificados"
          value={data.certificates}
          icon={Award}
          href="/admin/perfil"
        />
      </div>

      {/* Status bars */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <StatusBar
          published={data.projects.published}
          draft={data.projects.draft}
          archived={data.projects.archived}
          total={data.projects.total}
        />
        <StatusBar
          published={data.blogPosts.published}
          draft={data.blogPosts.draft}
          archived={data.blogPosts.archived}
          total={data.blogPosts.total}
        />
      </div>

      {/* Analytics Section */}
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-xl font-light text-white">Analítica Web</h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
            Tráfico y visitantes del sitio
          </p>
        </div>

        <AnalyticsCards
          totalVisits={analytics.totalVisits}
          todayVisits={analytics.todayVisits}
          uniqueVisitors={analytics.uniqueVisitors}
        />

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VisitsChart data={analytics.dailyVisits} />
          </div>
          <TopPagesTable data={analytics.topPages} />
        </div>

        <div className="mt-4">
          <TopReferrers data={analytics.topReferrers} />
        </div>
      </div>

      {/* Recent Items + GitHub */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RecentList
            title="Últimos Proyectos"
            items={data.recentProjects}
            emptyText="No hay proyectos todavía"
            createHref="/admin/proyectos"
            createLabel="Crear"
          />
          <RecentList
            title="Últimos Posts"
            items={data.recentPosts}
            emptyText="No hay posts todavía"
            createHref="/admin/blog"
            createLabel="Crear"
          />
        </div>

        <div className="space-y-6">
          <GitHubCard stats={data.github} />

          {/* Quick Actions */}
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
              Acciones Rápidas
            </p>
            <div className="mt-4 space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-red-500 hover:bg-white/[0.03] hover:text-white"
                >
                  {action.label}
                </Link>
              ))}
              <Link
                href="/"
                className="block border border-white/10 px-4 py-3 text-sm text-neutral-300 transition hover:border-white/30 hover:bg-white/[0.03] hover:text-white"
              >
                Ver sitio público
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
