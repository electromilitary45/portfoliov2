import { FolderKanban, FileText, Briefcase, Award, Mail } from "lucide-react";
import Link from "next/link";
import { getDashboardData } from "@/features/dashboard/dashboard.service";
import { getAnalyticsSummary } from "@/features/analytics/analytics.service";
import { getUnreadMessagesCount } from "@/features/contact/contact.service";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { RecentList } from "@/features/dashboard/components/RecentList";
import { StatusBar } from "@/features/dashboard/components/StatusBar";
import { AnalyticsCards } from "@/features/analytics/components/AnalyticsCards";
import { VisitsChart } from "@/features/analytics/components/VisitsChart";
import { TopPagesTable } from "@/features/analytics/components/TopPagesTable";
import { TopReferrers } from "@/features/analytics/components/TopReferrers";
import { WeeklyTrend } from "@/features/analytics/components/WeeklyTrend";

export default async function AdminDashboardPage() {
  const [data, analytics, unreadMessages] = await Promise.all([
    getDashboardData(),
    getAnalyticsSummary(),
    getUnreadMessagesCount(),
  ]);

  const quickActions = [
    { label: "Nuevo Proyecto", href: "/admin/proyectos" },
    { label: "Nuevo Post", href: "/admin/blog" },
    { label: "Editar Perfil", href: "/admin/perfil" },
  ];

  // Tendencia: últimos 7 días vs los 7 anteriores (dailyVisits va de más
  // antiguo a más reciente).
  const visits = analytics.dailyVisits.map((d) => d.visits);
  const last7 = visits.slice(-7).reduce((sum, n) => sum + n, 0);
  const prev7 = visits.slice(-14, -7).reduce((sum, n) => sum + n, 0);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-light text-white">Dashboard</h1>
        <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          Panel de control de tu portafolio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
        <StatsCard
          label="Mensajes"
          value={unreadMessages}
          icon={Mail}
          sub={
            unreadMessages > 0 ? "sin leer — revisa tu bandeja" : "todo al día"
          }
          href="/admin/mensajes"
          accent={unreadMessages > 0}
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
            Tráfico y visitantes del sitio público
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
          <WeeklyTrend current={last7} previous={prev7} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <TopPagesTable data={analytics.topPages} />
          <TopReferrers data={analytics.topReferrers} />
        </div>
      </div>

      {/* Recent Items + Quick Actions */}
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

        <div>
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
