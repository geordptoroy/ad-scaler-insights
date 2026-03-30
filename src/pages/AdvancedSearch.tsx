import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SearchParams } from "@/types/api.types";
import { Search as SearchIcon, Save, Download } from "lucide-react";

export default function AdvancedSearch() {
  const [keywords, setKeywords] = useState("");
  const [mediaType, setMediaType] = useState<string>("all");
  const [minScore, setMinScore] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const params: SearchParams = {
    keywords: keywords ? keywords.split(",").map((k) => k.trim()) : undefined,
    mediaType:
      mediaType !== "all"
        ? [mediaType as "image" | "video" | "carousel"]
        : undefined,
    minScore: minScore ? Number(minScore) : undefined,
    page: 1,
    limit: 20,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["search", params],
    queryFn: () => api.search.advanced(params),
    enabled: submitted,
  });

  const handleSearch = () => setSubmitted(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Pesquisa Avançada
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Consulta parametrizada com alta granularidade
        </p>
      </div>

      <Card className="bg-card border-border p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Palavras-chave
            </label>
            <Input
              placeholder="smartphone, fitness..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Tipo de Mídia
            </label>
            <Select value={mediaType} onValueChange={setMediaType}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="image">Imagem</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
                <SelectItem value="carousel">Carrossel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Score Mínimo
            </label>
            <Input
              type="number"
              placeholder="18"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSearch} className="bg-primary text-primary-foreground">
            <SearchIcon className="mr-2 h-4 w-4" />
            Pesquisar
          </Button>
          <Button variant="outline" className="border-border">
            <Save className="mr-2 h-4 w-4" />
            Salvar Pesquisa
          </Button>
          <Button variant="outline" className="border-border">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </Card>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 bg-card" />
          ))}
        </div>
      )}

      {data && (
        <>
          <p className="text-sm text-muted-foreground">
            {data.total} resultados encontrados
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.data.map((ad) => (
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
                  {ad.spend.range} · {ad.impressions.range}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {submitted && !isLoading && (!data || data.data.length === 0) && (
        <Card className="bg-card border-border p-12 text-center">
          <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
        </Card>
      )}
    </div>
  );
}
