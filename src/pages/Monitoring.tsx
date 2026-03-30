import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Monitoring() {
  const { data, isLoading } = useQuery({
    queryKey: ["monitoring"],
    queryFn: () => api.monitoring.list(),
  });

  const { data: history } = useQuery({
    queryKey: ["ad-history", "ad-001"],
    queryFn: () => api.ads.getHistory("ad-001"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Monitoramento
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe anúncios específicos ao longo do tempo
        </p>
      </div>

      {/* Chart */}
      {history && (
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Evolução de Score — {history.adId}
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={history.snapshots}>
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
                dataKey="score"
                stroke="hsl(0 0% 100%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-3 mt-4">
            <Badge
              variant="outline"
              className="border-accent text-accent-foreground bg-accent/10"
            >
              {history.trend === "growing"
                ? "Em crescimento"
                : history.trend === "stable"
                ? "Estável"
                : "Em queda"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {history.percentChange > 0 ? "+" : ""}
              {history.percentChange}% variação
            </span>
          </div>
        </Card>
      )}

      {/* Monitored ads */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 bg-card" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <Card className="bg-card border-border p-12 text-center">
          <p className="text-muted-foreground">
            Nenhum anúncio monitorado ainda.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {data?.data.map((ad) => (
            <Card
              key={ad.id}
              className="bg-card border-border p-4 flex items-center justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {ad.pageName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {ad.creative?.title}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {ad.spend.range}
                </span>
                <Badge
                  variant="outline"
                  className="border-accent text-accent-foreground bg-accent/10"
                >
                  {ad.score}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
