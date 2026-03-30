// Resposta padrão paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Estrutura de um anúncio
export interface Ad {
  id: string;
  pageId: string;
  pageName: string;
  pageImage?: string;
  adSnapshotUrl: string;
  creative?: {
    title?: string;
    body?: string;
    imageUrl?: string;
    videoUrl?: string;
    mediaType: 'image' | 'video' | 'carousel';
  };
  spend: {
    range: string;
    min: number;
    max: number;
  };
  impressions: {
    range: string;
    min: number;
    max: number;
  };
  startTime: string;
  endTime?: string;
  daysActive: number;
  score: number;
  scoreBreakdown: {
    spend: number;
    impressions: number;
    duration: number;
    trend: number;
  };
  isScaled: boolean;
  isFavorite?: boolean;
  isMonitored?: boolean;
}

// Histórico de evolução
export interface AdHistory {
  adId: string;
  snapshots: {
    date: string;
    spendRange: string;
    impressionsRange: string;
    score: number;
  }[];
  trend: 'growing' | 'stable' | 'declining';
  percentChange: number;
}

// Estatísticas do Dashboard
export interface DashboardStats {
  totalScaledAds: number;
  averageSpend: {
    min: number;
    max: number;
    formatted: string;
  };
  totalPages: number;
  trendPercentage: number;
  lastSync: string;
}

// Dados do gráfico de evolução
export interface DashboardChartData {
  date: string;
  scaledAds: number;
}

// Top anunciante
export interface TopAdvertiser {
  pageId: string;
  pageName: string;
  pageImage?: string;
  totalAds: number;
  totalSpendMin: number;
  totalSpendMax: number;
}

// Atualização recente
export interface RecentUpdate {
  ad: Ad;
  detectedAt: string;
}

// Parâmetros de pesquisa avançada
export interface SearchParams {
  keywords?: string[];
  operator?: 'AND' | 'OR';
  countries?: string[];
  mediaType?: ('image' | 'video' | 'carousel')[];
  startDate?: string;
  endDate?: string;
  minSpend?: number;
  maxSpend?: number;
  minScore?: number;
  pageId?: string;
  language?: string;
  limit?: number;
  page?: number;
}

// Pesquisa salva
export interface SavedSearch {
  id: string;
  name: string;
  params: SearchParams;
  createdAt: string;
}

// Configuração de alerta
export interface AlertConfig {
  type: 'score_threshold' | 'spend_increase' | 'new_scaled';
  threshold?: number;
  adId?: string;
  pageId?: string;
  email: boolean;
  inApp: boolean;
}

// Relatório
export interface ReportParams {
  period: '7d' | '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
  metrics: ('spend' | 'impressions' | 'ads_count' | 'pages')[];
  format: 'pdf' | 'csv';
}

// Status de sincronização
export interface SyncStatus {
  lastSync: string;
  status: 'idle' | 'running';
  message?: string;
}

// Pasta de favoritos
export interface FavoriteFolder {
  id: string;
  name: string;
  count: number;
}

// Nota do usuário
export interface AdNote {
  id: string;
  adId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
