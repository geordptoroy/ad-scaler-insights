import type {
  Ad,
  AdHistory,
  DashboardStats,
  DashboardChartData,
  TopAdvertiser,
  RecentUpdate,
  PaginatedResponse,
  SearchParams,
  AlertConfig,
  ReportParams,
  SyncStatus,
} from '@/types/api.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
}

// ─── MOCK DATA ──────────────────────────────────────────────

const mockAds: Ad[] = [
  {
    id: 'ad-001',
    pageId: 'page-001',
    pageName: 'TechStore Brasil',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=001',
    creative: {
      title: 'Mega Promoção de Smartphones',
      body: 'Os melhores smartphones com até 40% de desconto. Frete grátis para todo o Brasil. Aproveite!',
      mediaType: 'image',
    },
    spend: { range: 'R$ 500k - R$ 1M', min: 500000, max: 999999 },
    impressions: { range: '5M - 10M', min: 5000000, max: 9999999 },
    startTime: '2026-01-15T00:00:00Z',
    daysActive: 74,
    score: 27,
    scoreBreakdown: { spend: 10, impressions: 10, duration: 5, trend: 2 },
    isScaled: true,
    isFavorite: true,
    isMonitored: true,
  },
  {
    id: 'ad-002',
    pageId: 'page-002',
    pageName: 'ModaFit Online',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=002',
    creative: {
      title: 'Nova Coleção Verão 2026',
      body: 'Roupas fitness com tecido tecnológico. Compre 3 e leve 4. Entrega expressa.',
      mediaType: 'video',
    },
    spend: { range: 'R$ 100k - R$ 500k', min: 100000, max: 499999 },
    impressions: { range: '1M - 5M', min: 1000000, max: 4999999 },
    startTime: '2026-02-01T00:00:00Z',
    daysActive: 57,
    score: 24,
    scoreBreakdown: { spend: 8, impressions: 8, duration: 5, trend: 3 },
    isScaled: true,
    isFavorite: false,
    isMonitored: true,
  },
  {
    id: 'ad-003',
    pageId: 'page-003',
    pageName: 'NutriVida Suplementos',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=003',
    creative: {
      title: 'Whey Protein Isolado - Preço Imbatível',
      body: 'Suplementação de qualidade com preço justo. Compra segura e entrega rápida.',
      mediaType: 'carousel',
    },
    spend: { range: 'R$ 50k - R$ 100k', min: 50000, max: 99999 },
    impressions: { range: '500k - 1M', min: 500000, max: 999999 },
    startTime: '2026-02-20T00:00:00Z',
    daysActive: 38,
    score: 21,
    scoreBreakdown: { spend: 6, impressions: 6, duration: 5, trend: 4 },
    isScaled: true,
    isFavorite: true,
    isMonitored: false,
  },
  {
    id: 'ad-004',
    pageId: 'page-004',
    pageName: 'EduTech Cursos',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=004',
    creative: {
      title: 'Curso de Marketing Digital Completo',
      body: 'Aprenda tudo sobre tráfego pago, copywriting e funis de vendas. Acesso vitalício.',
      mediaType: 'video',
    },
    spend: { range: 'R$ 100k - R$ 500k', min: 100000, max: 499999 },
    impressions: { range: '5M - 10M', min: 5000000, max: 9999999 },
    startTime: '2026-01-05T00:00:00Z',
    daysActive: 84,
    score: 26,
    scoreBreakdown: { spend: 8, impressions: 10, duration: 5, trend: 3 },
    isScaled: true,
    isFavorite: false,
    isMonitored: true,
  },
  {
    id: 'ad-005',
    pageId: 'page-005',
    pageName: 'CasaDecor',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=005',
    creative: {
      title: 'Móveis Planejados com 30% OFF',
      body: 'Transforme sua casa com design exclusivo. Parcele em até 12x sem juros.',
      mediaType: 'image',
    },
    spend: { range: 'R$ 500k - R$ 1M', min: 500000, max: 999999 },
    impressions: { range: '10M+', min: 10000000, max: 15000000 },
    startTime: '2025-12-10T00:00:00Z',
    daysActive: 110,
    score: 29,
    scoreBreakdown: { spend: 10, impressions: 12, duration: 7, trend: 0 },
    isScaled: true,
    isFavorite: false,
    isMonitored: false,
  },
  {
    id: 'ad-006',
    pageId: 'page-001',
    pageName: 'TechStore Brasil',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=006',
    creative: {
      title: 'Notebook Gamer com Desconto Exclusivo',
      body: 'Performance extrema para jogos e trabalho. Garantia estendida de 2 anos.',
      mediaType: 'image',
    },
    spend: { range: 'R$ 100k - R$ 500k', min: 100000, max: 499999 },
    impressions: { range: '1M - 5M', min: 1000000, max: 4999999 },
    startTime: '2026-03-01T00:00:00Z',
    daysActive: 29,
    score: 22,
    scoreBreakdown: { spend: 8, impressions: 8, duration: 3, trend: 3 },
    isScaled: true,
    isFavorite: false,
    isMonitored: false,
  },
  {
    id: 'ad-007',
    pageId: 'page-006',
    pageName: 'PetLove Express',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=007',
    creative: {
      title: 'Ração Premium com Frete Grátis',
      body: 'Cuide do seu pet com a melhor nutrição. Entrega em até 24h nas capitais.',
      mediaType: 'carousel',
    },
    spend: { range: 'R$ 50k - R$ 100k', min: 50000, max: 99999 },
    impressions: { range: '1M - 5M', min: 1000000, max: 4999999 },
    startTime: '2026-02-10T00:00:00Z',
    daysActive: 48,
    score: 20,
    scoreBreakdown: { spend: 6, impressions: 8, duration: 5, trend: 1 },
    isScaled: true,
    isFavorite: true,
    isMonitored: false,
  },
  {
    id: 'ad-008',
    pageId: 'page-007',
    pageName: 'AutoPeças Online',
    adSnapshotUrl: 'https://www.facebook.com/ads/library/?id=008',
    creative: {
      title: 'Peças automotivas com preço de fábrica',
      body: 'Mais de 50.000 peças em estoque. Garantia de fábrica em todos os produtos.',
      mediaType: 'image',
    },
    spend: { range: 'R$ 10k - R$ 50k', min: 10000, max: 49999 },
    impressions: { range: '100k - 500k', min: 100000, max: 499999 },
    startTime: '2026-03-10T00:00:00Z',
    daysActive: 20,
    score: 18,
    scoreBreakdown: { spend: 4, impressions: 4, duration: 3, trend: 7 },
    isScaled: true,
    isFavorite: false,
    isMonitored: false,
  },
];

const mockDashboardStats: DashboardStats = {
  totalScaledAds: 342,
  averageSpend: { min: 500000, max: 999999, formatted: 'R$ 500k - R$ 1M' },
  totalPages: 87,
  trendPercentage: 12.5,
  lastSync: '2026-03-30T06:00:00Z',
};

const mockChartData: DashboardChartData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 2, i + 1).toISOString().split('T')[0],
  scaledAds: Math.floor(280 + Math.random() * 80 + i * 2),
}));

const mockTopAdvertisers: TopAdvertiser[] = [
  { pageId: 'page-005', pageName: 'CasaDecor', totalAds: 18, totalSpendMin: 2500000, totalSpendMax: 5000000 },
  { pageId: 'page-001', pageName: 'TechStore Brasil', totalAds: 15, totalSpendMin: 1500000, totalSpendMax: 3000000 },
  { pageId: 'page-004', pageName: 'EduTech Cursos', totalAds: 12, totalSpendMin: 1000000, totalSpendMax: 2000000 },
  { pageId: 'page-002', pageName: 'ModaFit Online', totalAds: 9, totalSpendMin: 800000, totalSpendMax: 1500000 },
  { pageId: 'page-003', pageName: 'NutriVida Suplementos', totalAds: 7, totalSpendMin: 500000, totalSpendMax: 1000000 },
];

const mockRecentUpdates: RecentUpdate[] = mockAds.slice(0, 5).map((ad) => ({
  ad,
  detectedAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
}));

function paginate<T>(data: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  return {
    data: data.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages,
  };
}

const mockHistory: AdHistory = {
  adId: 'ad-001',
  snapshots: Array.from({ length: 14 }, (_, i) => ({
    date: new Date(2026, 2, 17 + i).toISOString().split('T')[0],
    spendRange: 'R$ 500k - R$ 1M',
    impressionsRange: '5M - 10M',
    score: 22 + Math.floor(i * 0.4),
  })),
  trend: 'growing',
  percentChange: 15.3,
};

// ─── API SERVICE ─────────────────────────────────────────────

export const api = {
  dashboard: {
    getStats: (): Promise<DashboardStats> =>
      USE_MOCK ? Promise.resolve(mockDashboardStats) : request('/dashboard/stats'),
    getChartData: (): Promise<DashboardChartData[]> =>
      USE_MOCK ? Promise.resolve(mockChartData) : request('/dashboard/chart'),
    getTopAdvertisers: (): Promise<TopAdvertiser[]> =>
      USE_MOCK ? Promise.resolve(mockTopAdvertisers) : request('/dashboard/top-advertisers'),
    getRecentUpdates: (): Promise<RecentUpdate[]> =>
      USE_MOCK ? Promise.resolve(mockRecentUpdates) : request('/dashboard/recent'),
  },
  ads: {
    getScaled: (params?: { page?: number; limit?: number; minScore?: number }): Promise<PaginatedResponse<Ad>> => {
      if (USE_MOCK) {
        const p = params?.page || 1;
        const l = params?.limit || 20;
        const minScore = params?.minScore || 18;
        const filtered = mockAds.filter((a) => a.score >= minScore);
        return Promise.resolve(paginate(filtered, p, l));
      }
      return request('/ads/scaled', { method: 'POST', body: JSON.stringify(params) });
    },
    getById: (id: string): Promise<Ad> => {
      if (USE_MOCK) {
        const ad = mockAds.find((a) => a.id === id);
        return ad ? Promise.resolve(ad) : Promise.reject(new Error('Ad not found'));
      }
      return request(`/ads/${id}`);
    },
    getHistory: (id: string): Promise<AdHistory> => {
      if (USE_MOCK) return Promise.resolve({ ...mockHistory, adId: id });
      return request(`/ads/${id}/history`);
    },
  },
  search: {
    advanced: (params: SearchParams): Promise<PaginatedResponse<Ad>> => {
      if (USE_MOCK) {
        const p = params.page || 1;
        const l = params.limit || 20;
        let filtered = [...mockAds];
        if (params.keywords?.length) {
          const kw = params.keywords.map((k) => k.toLowerCase());
          filtered = filtered.filter((a) =>
            kw.some(
              (k) =>
                a.creative?.title?.toLowerCase().includes(k) ||
                a.creative?.body?.toLowerCase().includes(k) ||
                a.pageName.toLowerCase().includes(k)
            )
          );
        }
        if (params.mediaType?.length) {
          filtered = filtered.filter((a) => a.creative && params.mediaType!.includes(a.creative.mediaType));
        }
        if (params.minScore) {
          filtered = filtered.filter((a) => a.score >= params.minScore!);
        }
        return Promise.resolve(paginate(filtered, p, l));
      }
      return request('/search', { method: 'POST', body: JSON.stringify(params) });
    },
    save: (params: { name: string; params: SearchParams }): Promise<{ id: string; message: string }> =>
      USE_MOCK
        ? Promise.resolve({ id: 'search-001', message: 'Pesquisa salva com sucesso' })
        : request('/search/save', { method: 'POST', body: JSON.stringify(params) }),
  },
  favorites: {
    list: (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Ad>> => {
      if (USE_MOCK) {
        const favs = mockAds.filter((a) => a.isFavorite);
        return Promise.resolve(paginate(favs, params?.page || 1, params?.limit || 20));
      }
      return request('/favorites');
    },
    add: (adId: string): Promise<{ success: boolean }> =>
      USE_MOCK ? Promise.resolve({ success: true }) : request('/favorites', { method: 'POST', body: JSON.stringify({ adId }) }),
    remove: (adId: string): Promise<{ success: boolean }> =>
      USE_MOCK ? Promise.resolve({ success: true }) : request(`/favorites/${adId}`, { method: 'DELETE' }),
  },
  monitoring: {
    list: (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Ad>> => {
      if (USE_MOCK) {
        const monitored = mockAds.filter((a) => a.isMonitored);
        return Promise.resolve(paginate(monitored, params?.page || 1, params?.limit || 20));
      }
      return request('/monitoring');
    },
    add: (adId: string): Promise<{ success: boolean }> =>
      USE_MOCK ? Promise.resolve({ success: true }) : request('/monitoring', { method: 'POST', body: JSON.stringify({ adId }) }),
    remove: (adId: string): Promise<{ success: boolean }> =>
      USE_MOCK ? Promise.resolve({ success: true }) : request(`/monitoring/${adId}`, { method: 'DELETE' }),
    alerts: (config: AlertConfig): Promise<{ success: boolean }> =>
      USE_MOCK ? Promise.resolve({ success: true }) : request('/monitoring/alerts', { method: 'POST', body: JSON.stringify(config) }),
  },
  reports: {
    generate: (params: ReportParams): Promise<{ reportId: string; downloadUrl: string }> =>
      USE_MOCK
        ? Promise.resolve({ reportId: 'report-001', downloadUrl: '/reports/download/report-001' })
        : request('/reports/export', { method: 'POST', body: JSON.stringify(params) }),
    download: (reportId: string): string => `${API_URL}/reports/download/${reportId}`,
  },
  sync: {
    trigger: (): Promise<{ jobId: string; status: string }> =>
      USE_MOCK
        ? Promise.resolve({ jobId: 'job-001', status: 'started' })
        : request('/sync/trigger', { method: 'POST' }),
    status: (): Promise<SyncStatus> =>
      USE_MOCK
        ? Promise.resolve({ lastSync: '2026-03-30T06:00:00Z', status: 'idle' as const })
        : request('/sync/status'),
  },
};
