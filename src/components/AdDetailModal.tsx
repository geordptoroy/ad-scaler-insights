import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Ad } from "@/types/api.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Eye, ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AdDetailModalProps {
  ad: Ad | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const trendIcons = {
  growing: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const trendLabels = {
  growing: "Crescendo",
  stable: "Estável",
  declining: "Declinando",
};

export function AdDetailModal({ ad, open, onOpenChange }: AdDetailModalProps) {
  const queryClient = useQueryClient();

  const { data: history } = useQuery({
    queryKey: ["ad-history", ad?.id],
    queryFn: () => api.ads.getHistory(ad!.id),
    enabled: !!ad && open,
  });

  const favMutation = useMutation({
    mutationFn: (adId: string) =>
      ad?.isFavorite ? api.favorites.remove(adId) : api.favorites.add(adId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scaled-ads"] }),
  });

  const monitorMutation = useMutation({
    mutationFn: (adId: string) =>
      ad?.isMonitored ? api.monitoring.remove(adId) : api.monitoring.add(adId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["scaled-ads"] }),
  });

  if (!ad) return null;

  const TrendIcon = history ? trendIcons[history.trend] : Minus;
  const breakdown = ad.scoreBreakdown;
  const maxScore = 30;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-3">
            <span className="truncate">{ad.pageName}</span>
            <Badge variant="outline" className="border-accent text-accent-foreground bg-accent/10 shrink-0">
              Score {ad.score}
            </Badge>
          </DialogTitle>
          <p className="text-sm text-muted-foreground truncate">{ad.creative?.title}</p>
        </DialogHeader>

        {/* Score Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Score Breakdown</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gasto", value: breakdown.spend, max: 10 },
              { label: "Impressões", value: breakdown.impressions, max: 12 },
              { label: "Duração", value: breakdown.duration, max: 7 },
              { label: "Tendência", value: breakdown.trend, max: 7 },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground">{item.value}/{item.max}</span>
                </div>
                <Progress
                  value={(item.value / item.max) * 100}
                  className="h-1.5 bg-secondary"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs border-t border-border pt-2">
            <span className="text-muted-foreground">Total</span>
            <span className="text-foreground font-medium">{ad.score}/{maxScore}</span>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">Gasto</span>
            <p className="text-foreground">{ad.spend.range}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">Impressões</span>
            <p className="text-foreground">{ad.impressions.range}</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">Dias no ar</span>
            <p className="text-foreground">{ad.daysActive} dias</p>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground text-xs">Tipo de mídia</span>
            <p className="text-foreground capitalize">{ad.creative?.mediaType}</p>
          </div>
        </div>

        {/* History Chart */}
        {history && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Histórico de Score</h3>
              <div className="flex items-center gap-1.5 text-xs">
                <TrendIcon className="h-3.5 w-3.5 text-accent-foreground" />
                <span className="text-muted-foreground">
                  {trendLabels[history.trend]} ({history.percentChange > 0 ? "+" : ""}
                  {history.percentChange}%)
                </span>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history.snapshots}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "hsl(0 0% 66.7%)" }}
                    tickFormatter={(v) => v.slice(5)}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(0 0% 66.7%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 6.7%)",
                      border: "1px solid hsl(0 0% 20%)",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(220 30% 28%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button
            variant={ad.isFavorite ? "secondary" : "outline"}
            size="sm"
            onClick={() => favMutation.mutate(ad.id)}
            className="gap-1.5"
          >
            <Star className={`h-3.5 w-3.5 ${ad.isFavorite ? "fill-current" : ""}`} />
            {ad.isFavorite ? "Favoritado" : "Favoritar"}
          </Button>
          <Button
            variant={ad.isMonitored ? "secondary" : "outline"}
            size="sm"
            onClick={() => monitorMutation.mutate(ad.id)}
            className="gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" />
            {ad.isMonitored ? "Monitorando" : "Monitorar"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="ml-auto gap-1.5"
          >
            <a href={ad.adSnapshotUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Meta Ad Library
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
