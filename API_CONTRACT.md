# API Contract — FORTE MEDIA

## Base URL
`/api`

## Authentication
Bearer token (JWT from Supabase Auth)
```
Authorization: Bearer <token>
```

---

## Endpoints

### Dashboard

#### GET /dashboard/stats
**Response:**
```json
{
  "totalScaledAds": 342,
  "averageSpend": { "min": 500000, "max": 999999, "formatted": "R$ 500k - R$ 1M" },
  "totalPages": 87,
  "trendPercentage": 12.5,
  "lastSync": "2026-03-30T06:00:00Z"
}
```

#### GET /dashboard/chart
**Response:** `DashboardChartData[]`
```json
[{ "date": "2026-03-01", "scaledAds": 295 }]
```

#### GET /dashboard/top-advertisers
**Response:** `TopAdvertiser[]`
```json
[{ "pageId": "page-005", "pageName": "CasaDecor", "totalAds": 18, "totalSpendMin": 2500000, "totalSpendMax": 5000000 }]
```

#### GET /dashboard/recent
**Response:** `RecentUpdate[]`

---

### Ads

#### POST /ads/scaled
**Body:**
```json
{
  "page": 1,
  "limit": 20,
  "minScore": 18,
  "filters": {
    "pageId": "123456",
    "countries": ["BR"]
  }
}
```
**Response:** `PaginatedResponse<Ad>`

#### GET /ads/:id
**Response:** `Ad`

#### GET /ads/:id/history
**Response:** `AdHistory`

---

### Search

#### POST /search
**Body:** `SearchParams`
```json
{
  "keywords": ["smartphone"],
  "operator": "AND",
  "countries": ["BR"],
  "mediaType": ["image", "video"],
  "startDate": "2026-01-01",
  "endDate": "2026-03-30",
  "minScore": 15,
  "limit": 20,
  "page": 1
}
```
**Response:** `PaginatedResponse<Ad>`

#### POST /search/save
**Body:**
```json
{ "name": "Minha busca", "params": { ... } }
```
**Response:**
```json
{ "id": "search-001", "message": "Pesquisa salva com sucesso" }
```

---

### Favorites

#### GET /favorites
**Response:** `PaginatedResponse<Ad>`

#### POST /favorites
**Body:** `{ "adId": "ad-001" }`
**Response:** `{ "success": true }`

#### DELETE /favorites/:adId
**Response:** `{ "success": true }`

---

### Monitoring

#### GET /monitoring
**Response:** `PaginatedResponse<Ad>`

#### POST /monitoring
**Body:** `{ "adId": "ad-001" }`
**Response:** `{ "success": true }`

#### DELETE /monitoring/:adId
**Response:** `{ "success": true }`

#### POST /monitoring/alerts
**Body:**
```json
{
  "type": "score_threshold",
  "threshold": 25,
  "adId": "ad-001",
  "email": true,
  "inApp": true
}
```
**Response:** `{ "success": true }`

---

### Reports

#### POST /reports/export
**Body:**
```json
{
  "period": "30d",
  "metrics": ["spend", "impressions", "ads_count", "pages"],
  "format": "pdf"
}
```
**Response:**
```json
{ "reportId": "report-001", "downloadUrl": "/reports/download/report-001" }
```

#### GET /reports/download/:reportId
**Response:** File download

---

### Sync

#### POST /sync/trigger
**Response:**
```json
{ "jobId": "job-001", "status": "started" }
```

#### GET /sync/status
**Response:**
```json
{ "lastSync": "2026-03-30T06:00:00Z", "status": "idle" }
```

---

## Types Reference

See `src/types/api.types.ts` for complete TypeScript interfaces:
- `Ad` — Estrutura completa de um anúncio
- `AdHistory` — Histórico com snapshots e tendência
- `DashboardStats` — Métricas do dashboard
- `PaginatedResponse<T>` — Resposta paginada padrão
- `SearchParams` — Parâmetros de pesquisa avançada
- `AlertConfig` — Configuração de alertas
- `ReportParams` — Parâmetros de geração de relatório
- `SyncStatus` — Status da sincronização
