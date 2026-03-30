import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MetricCard({
  title,
  value,
  icon: Icon,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  subtitle?: string;
}) {
  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: api.dashboard.getStats,
  });

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["dashboard-chart"],
    queryFn: api.dashboard.getChartData,
  });

  const { data: topAdvertisers } = useQuery({
    queryKey: ["dashboard-top"],
    queryFn: api.dashboard.getTopAdvertisers,
  });

  const { data: recentUpdates } = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: api.dashboard.getRecentUpdates,
  });

  const handleSync = () => {
    api.sync.trigger();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Visão Geral do Mercado
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Última atualização:{" "}
            {stats?.lastSync
              ? new Date(stats.lastSync).toLocaleString("pt-BR")
              : "—"}
          </p>
        </div>
        <Button
          onClick={handleSync}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Sincronizar Agora
        </Button>
      </div>

      {/* Metrics */}
      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 bg-card" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Anúncios Escalados"
            value={stats?.totalScaledAds ?? 0}
            icon={TrendingUp}
          />
          <MetricCard
            title="Média de Gasto"
            value={stats?.averageSpend.formatted ?? "—"}
            icon={DollarSign}
          />
          <MetricCard
            title="Páginas Únicas"
            value={stats?.totalPages ?? 0}
            icon={Users}
          />
          <MetricCard
            title="Tendência"
            value={`+${stats?.trendPercentage ?? 0}%`}
            icon={BarChart3}
            subtitle="nos últimos 30 dias"
          />
        </div>
      )}

      {/* Chart */}
      <Card className="bg-card border-border p-6">
        <h2 className="text-lg font-medium text-foreground mb-4">
          Evolução — Últimos 30 Dias
        </h2>
        {chartLoading ? (
          <Skeleton className="h-64 bg-secondary" />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis
                dataKey="date"
                stroke="hsl(0 0% 40%)"
                tick={{ fill: "hsl(0 0% 67%)", fontSize: 12 }}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis
                stroke="hsl(0 0% 40%)"
                tick={{ fill: "hsl(0 0% 67%)", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 7%)",
                  border: "1px solid hsl(0 0% 20%)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="scaledAds"
                stroke="hsl(0 0% 100%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Advertisers */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Top 5 Anunciantes
          </h2>
          <div className="space-y-3">
            {topAdvertisers?.map((adv, i) => (
              <div
                key={adv.pageId}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{adv.pageName}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {adv.totalAds} anúncios
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Últimas Atualizações
          </h2>
          <div className="space-y-3">
            {recentUpdates?.map((update) => (
              <div
                key={update.ad.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">
                    {update.ad.creative?.title || update.ad.pageName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {update.ad.pageName} · Score {update.ad.score}
                  </p>
                </div>
                <span className="ml-3 inline-flex items-center rounded-md bg-accent/20 px-2 py-1 text-xs font-medium text-accent-foreground">
                  {update.ad.score}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
