import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LayoutGrid, List, Image, Video, Layers } from "lucide-react";
import { AdDetailModal } from "@/components/AdDetailModal";
import type { Ad } from "@/types/api.types";

const mediaIcons = {
  image: Image,
  video: Video,
  carousel: Layers,
};

export default function ScaledAds() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["scaled-ads", page],
    queryFn: () => api.ads.getScaled({ page, limit: 20 }),
  });

  const filtered = data?.data.filter(
    (ad) =>
      !search ||
      ad.pageName.toLowerCase().includes(search.toLowerCase()) ||
      ad.creative?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Anúncios Escalados
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {data?.total ?? 0} anúncios com score ≥ 18
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Buscar por termo ou página..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs bg-card border-border"
        />
        <div className="ml-auto flex gap-1">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 bg-card" />
          ))}
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered?.map((ad) => {
            const MediaIcon = ad.creative
              ? mediaIcons[ad.creative.mediaType]
              : Image;
            return (
              <Card
                key={ad.id}
                className="bg-card border-border p-5 space-y-3 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {ad.pageName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {ad.creative?.title}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-2 shrink-0 border-accent text-accent-foreground bg-accent/10"
                  >
                    {ad.score}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <MediaIcon className="h-3.5 w-3.5" />
                  <span>{ad.spend.range}</span>
                  <span>·</span>
                  <span>{ad.impressions.range}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {ad.daysActive} dias no ar
                  </span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setSelectedAd(ad)}>
                    Ver Detalhes
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">
                    Página
                  </th>
                  <th className="text-left p-3 text-muted-foreground font-medium">
                    Texto
                  </th>
                  <th className="text-left p-3 text-muted-foreground font-medium">
                    Gasto
                  </th>
                  <th className="text-left p-3 text-muted-foreground font-medium">
                    Impressões
                  </th>
                  <th className="text-left p-3 text-muted-foreground font-medium">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((ad) => (
                  <tr
                    key={ad.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-3 text-foreground">{ad.pageName}</td>
                    <td className="p-3 text-muted-foreground max-w-[200px] truncate">
                      {ad.creative?.title}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {ad.spend.range}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {ad.impressions.range}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className="border-accent text-accent-foreground bg-accent/10"
                      >
                        {ad.score}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <AdDetailModal ad={selectedAd} open={!!selectedAd} onOpenChange={(open) => !open && setSelectedAd(null)} />

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {data.page} de {data.totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
