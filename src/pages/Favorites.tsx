import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function Favorites() {
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => api.favorites.list(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Meus Favoritos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Anúncios salvos para referência rápida
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 bg-card" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <Card className="bg-card border-border p-12 text-center">
          <Star className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Nenhum favorito salvo ainda.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((ad) => (
            <Card
              key={ad.id}
              className="bg-card border-border p-5 space-y-3"
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
              <div className="text-xs text-muted-foreground">
                {ad.spend.range} · {ad.daysActive} dias no ar
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
