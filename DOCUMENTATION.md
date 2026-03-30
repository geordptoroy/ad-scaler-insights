# FORTE MEDIA — Documentação Técnica Completa

## Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Estrutura de Diretórios](#estrutura-de-diretórios)
5. [Design System](#design-system)
6. [Camada de Serviço (API)](#camada-de-serviço-api)
7. [Tipos TypeScript](#tipos-typescript)
8. [Páginas e Rotas](#páginas-e-rotas)
9. [Componentes Principais](#componentes-principais)
10. [Autenticação](#autenticação)
11. [Docker & Deploy](#docker--deploy)
12. [Variáveis de Ambiente](#variáveis-de-ambiente)
13. [Testes](#testes)
14. [Guia de Contribuição](#guia-de-contribuição)

---

## Visão Geral

**FORTE MEDIA** é uma ferramenta analítica avançada que conecta-se à Meta Ad Library API para identificar, classificar e monitorar anúncios escalados — aqueles com alto volume de investimento, alcance massivo e tendência de crescimento.

### Público-alvo
- Profissionais de marketing digital
- Agências de publicidade
- E-commerces e infoprodutores
- Analistas de inteligência competitiva

### Funcionalidades Principais
- **Dashboard**: Visão geral com métricas-chave, gráfico de evolução, top anunciantes
- **Anúncios Escalados**: Listagem de anúncios com score ≥ 18, visualização grid/lista
- **Pesquisa Avançada**: Filtros por keyword, país, tipo de mídia, gasto, score
- **Monitoramento**: Acompanhamento de anúncios com histórico de evolução
- **Favoritos**: Organização de anúncios salvos em pastas
- **Relatórios**: Geração de relatórios em PDF/CSV
- **Configurações**: Perfil, preferências, integrações, API

---

## Arquitetura

```
┌─────────────────────────────────────────────┐
│                   Frontend                   │
│            (React + Vite + TypeScript)        │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages    │  │Components│  │  Hooks   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │         │
│  ┌────▼──────────────▼──────────────▼─────┐  │
│  │         Service Layer (api.ts)          │  │
│  │    ┌─────────────────────────────┐      │  │
│  │    │  VITE_USE_MOCK=true → Mock  │      │  │
│  │    │  VITE_USE_MOCK=false → API  │      │  │
│  │    └─────────────────────────────┘      │  │
│  └────────────────────┬───────────────────┘  │
└───────────────────────┼──────────────────────┘
                        │ (quando backend pronto)
                        ▼
              ┌─────────────────┐
              │   Backend API   │
              │  (Node.js custom)│
              └─────────────────┘
```

### Princípios
- **API-First**: Frontend desacoplado, pronto para integração com backend
- **Mock Toggle**: `VITE_USE_MOCK` controla se usa dados mock ou API real
- **Type Safety**: Todos os contratos definidos em TypeScript
- **Responsive**: Mobile-first com breakpoints Tailwind

---

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.3 | UI framework |
| TypeScript | 5.8 | Tipagem estática |
| Vite | 5.4 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first CSS |
| shadcn/ui | - | Componentes base (Radix UI) |
| React Router | 6.30 | Roteamento SPA |
| TanStack Query | 5.83 | Data fetching & cache |
| Recharts | 2.15 | Gráficos e visualizações |
| Lucide React | 0.462 | Ícones |
| Docker | - | Conteinerização |
| Nginx Alpine | - | Servidor de produção |

---

## Estrutura de Diretórios

```
forte-media/
├── public/                    # Arquivos estáticos
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── AdDetailModal.tsx  # Modal de detalhes do anúncio
│   │   ├── AppLayout.tsx      # Layout principal com sidebar
│   │   ├── AppSidebar.tsx     # Navegação lateral
│   │   ├── NavLink.tsx        # Link de navegação ativo
│   │   └── TopBar.tsx         # Barra superior
│   ├── hooks/
│   │   ├── use-mobile.tsx     # Detecção de mobile
│   │   └── use-toast.ts      # Sistema de toasts
│   ├── pages/
│   │   ├── AdvancedSearch.tsx # Pesquisa avançada
│   │   ├── Dashboard.tsx      # Dashboard principal
│   │   ├── Favorites.tsx      # Favoritos
│   │   ├── Login.tsx          # Login e cadastro
│   │   ├── Monitoring.tsx     # Monitoramento
│   │   ├── NotFound.tsx       # Página 404
│   │   ├── Reports.tsx        # Relatórios
│   │   ├── ScaledAds.tsx      # Anúncios escalados
│   │   └── Settings.tsx       # Configurações
│   ├── services/
│   │   └── api.ts             # Camada de serviço com mock
│   ├── types/
│   │   └── api.types.ts       # Interfaces TypeScript
│   ├── lib/
│   │   └── utils.ts           # Utilitários (cn, etc.)
│   ├── App.tsx                # Rotas e providers
│   ├── index.css              # Design tokens (HSL)
│   └── main.tsx               # Entry point
├── API_CONTRACT.md            # Contrato de API (endpoints)
├── DOCUMENTATION.md           # Esta documentação
├── Dockerfile                 # Build multi-stage
├── docker-compose.yml         # Orquestração
├── nginx.conf                 # Configuração Nginx
├── .env.example               # Variáveis de ambiente
└── tailwind.config.ts         # Configuração Tailwind
```

---

## Design System

### Paleta de Cores (HSL)

| Token | HSL | Hex | Uso |
|---|---|---|---|
| `--background` | 0 0% 0% | #000000 | Fundo principal |
| `--foreground` | 0 0% 100% | #FFFFFF | Texto principal |
| `--card` | 0 0% 6.7% | #111111 | Cards e containers |
| `--secondary` | 0 0% 13.3% | #222222 | Elementos secundários |
| `--muted-foreground` | 0 0% 66.7% | #AAAAAA | Texto secundário |
| `--accent` | 220 30% 28% | #2C3E66 | Cor de destaque |
| `--border` | 0 0% 20% | #333333 | Bordas |
| `--destructive` | 0 62.8% 50% | #CC3333 | Erros e ações destrutivas |
| `--success` | 142 71% 45% | #22C55E | Sucesso |
| `--warning` | 38 92% 50% | #F59E0B | Avisos |

### Tipografia
- **Família**: Inter (Google Fonts)
- **Pesos**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Logo**: font-light, tracking-[0.2em], uppercase

### Componentes
- Todos os componentes usam tokens semânticos via Tailwind
- Cores HSL definidas em `src/index.css` como CSS custom properties
- Extensões de cores em `tailwind.config.ts`
- Scrollbar customizada para manter consistência visual

---

## Camada de Serviço (API)

### Localização: `src/services/api.ts`

O serviço API é organizado em namespaces:

```typescript
api.dashboard.getStats()           // DashboardStats
api.dashboard.getChartData()       // DashboardChartData[]
api.dashboard.getTopAdvertisers()  // TopAdvertiser[]
api.dashboard.getRecentUpdates()   // RecentUpdate[]

api.ads.getScaled({ page, limit, minScore })  // PaginatedResponse<Ad>
api.ads.getById(id)                            // Ad
api.ads.getHistory(id)                         // AdHistory

api.search.advanced(params)        // PaginatedResponse<Ad>
api.search.save({ name, params })  // { id, message }

api.favorites.list({ page, limit }) // PaginatedResponse<Ad>
api.favorites.add(adId)             // { success }
api.favorites.remove(adId)          // { success }

api.monitoring.list({ page, limit }) // PaginatedResponse<Ad>
api.monitoring.add(adId)             // { success }
api.monitoring.remove(adId)          // { success }
api.monitoring.alerts(config)        // { success }

api.reports.generate(params)         // { reportId, downloadUrl }
api.reports.download(reportId)       // URL string

api.sync.trigger()                   // { jobId, status }
api.sync.status()                    // SyncStatus
```

### Mock Data
- 8 anúncios mock com dados realistas em pt-BR
- Dashboard stats, chart data (30 dias), top advertisers
- Todos os mocks retornam `Promise` para simular async
- `paginate()` helper para paginação consistente

### Toggle Mock/Real
```env
VITE_USE_MOCK=true   # Usa dados mock (padrão)
VITE_USE_MOCK=false  # Chama API real em VITE_API_URL
```

---

## Tipos TypeScript

### Localização: `src/types/api.types.ts`

| Interface | Descrição |
|---|---|
| `PaginatedResponse<T>` | Wrapper de paginação (data, total, page, limit, totalPages) |
| `Ad` | Estrutura completa de um anúncio (id, pageName, creative, spend, impressions, score, scoreBreakdown) |
| `AdHistory` | Histórico de evolução (snapshots com score diário, trend, percentChange) |
| `DashboardStats` | Estatísticas do dashboard (totalScaledAds, averageSpend, totalPages, trendPercentage) |
| `DashboardChartData` | Ponto do gráfico de evolução (date, scaledAds) |
| `TopAdvertiser` | Top anunciante (pageName, totalAds, totalSpend) |
| `RecentUpdate` | Atualização recente (ad, detectedAt) |
| `SearchParams` | Parâmetros de pesquisa avançada (keywords, operator, countries, mediaType, etc.) |
| `SavedSearch` | Pesquisa salva (id, name, params, createdAt) |
| `AlertConfig` | Configuração de alerta (type, threshold, email, inApp) |
| `ReportParams` | Parâmetros de relatório (period, metrics, format) |
| `SyncStatus` | Status de sincronização (lastSync, status, message) |
| `FavoriteFolder` | Pasta de favoritos (id, name, count) |
| `AdNote` | Nota do usuário (id, adId, content, timestamps) |

### Score System
O score de um anúncio é composto por 4 dimensões:
- **Gasto** (0-10): Baseado no range de investimento
- **Impressões** (0-12): Volume de alcance
- **Duração** (0-7): Dias ativo
- **Tendência** (0-7): Crescimento recente
- **Total máximo**: 30 pontos
- **Threshold escalado**: ≥ 18

---

## Páginas e Rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/login` | `Login.tsx` | Tela de login e cadastro |
| `/` | `Dashboard.tsx` | Dashboard com métricas e gráficos |
| `/scaled-ads` | `ScaledAds.tsx` | Listagem de anúncios escalados (grid/lista) |
| `/search` | `AdvancedSearch.tsx` | Pesquisa com filtros avançados |
| `/monitoring` | `Monitoring.tsx` | Monitoramento de anúncios |
| `/favorites` | `Favorites.tsx` | Anúncios favoritos |
| `/reports` | `Reports.tsx` | Geração de relatórios |
| `/settings` | `Settings.tsx` | Configurações (4 abas) |
| `*` | `NotFound.tsx` | Página 404 |

### Layout
- Rotas internas usam `AppLayout` (sidebar + topbar)
- `/login` é rota pública sem layout
- `NotFound` é rota catch-all sem layout

---

## Componentes Principais

### `AppLayout`
Wrapper com sidebar colapsável (usando shadcn `SidebarProvider`) e `TopBar`. Renderiza `<Outlet />` do React Router.

### `AppSidebar`
Navegação lateral com 7 itens + ícones Lucide. Colapsável para modo icon-only. Logo "FORTE MEDIA" com tracking de 0.2em.

### `TopBar`
Barra superior com:
- Botão de toggle da sidebar
- Input de busca global (Ctrl+K)
- Indicador de sincronização (último sync)
- Menu de usuário (dropdown)

### `AdDetailModal`
Modal de detalhes do anúncio com:
- Score breakdown com barras de progresso
- Informações gerais (gasto, impressões, dias, mídia)
- Gráfico de histórico de score (Recharts LineChart)
- Ações: Favoritar, Monitorar, Abrir na Meta Ad Library

---

## Autenticação

### Estado Atual
Autenticação mock usando `localStorage`. A tela de login suporta:
- Login com email/senha
- Cadastro com nome, email, senha
- Toggle entre login e cadastro
- Mostrar/ocultar senha
- Loading state

### Armazenamento (Mock)
```typescript
localStorage.setItem("forte-media-auth", JSON.stringify({ email, name }));
```

### Integração Futura
O sistema está preparado para substituição por um backend real (JWT, refresh tokens, etc.). O fluxo de UI já está implementado.

---

## Docker & Deploy

### Build Local
```bash
docker build -t forte-media .
docker run -p 8080:8080 --env-file .env forte-media
```

### Docker Compose
```bash
docker compose up -d      # Iniciar
docker compose down        # Parar
docker compose logs -f     # Logs
```

### Dockerfile (Multi-stage)
1. **Builder**: Node 20 Alpine → `npm ci` → `npm run build`
2. **Runner**: Nginx Alpine → serve `/dist` na porta 8080

### Nginx
- SPA fallback: `try_files $uri /index.html`
- Cache de assets: `1 ano` para arquivos com hash
- Gzip: habilitado para text, CSS, JS, JSON, SVG

### Build Optimization (Vite)
- **Minificação**: Terser
- **Code splitting**: Chunks separados para `vendor` (react, tanstack) e `ui` (radix)
- **Sourcemaps**: Desabilitados em produção

---

## Variáveis de Ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000/api` | URL base da API |
| `VITE_USE_MOCK` | `true` | Usar dados mock |
| `VITE_SUPABASE_URL` | - | URL do Supabase (futuro) |
| `VITE_SUPABASE_ANON_KEY` | - | Chave pública Supabase (futuro) |

### Arquivo `.env.example`
Copie para `.env` e configure:
```bash
cp .env.example .env
```

---

## Testes

### Setup
- **Framework**: Vitest
- **DOM**: jsdom
- **Utilitários**: @testing-library/react, @testing-library/jest-dom
- **E2E**: Playwright (configurado)

### Executar
```bash
npm test              # Unit tests
npx playwright test   # E2E tests
```

### Estrutura
```
src/test/
├── setup.ts          # Configuração global
└── example.test.ts   # Teste exemplo
```

---

## Guia de Contribuição

### Padrões de Código
1. **Componentes**: Functional components com TypeScript
2. **Estilização**: Apenas tokens semânticos do Tailwind (nunca cores hardcoded)
3. **Data fetching**: TanStack Query com `queryKey` descritivo
4. **Estado**: `useState` para local, Query cache para server state
5. **Importações**: Alias `@/` para `src/`

### Workflow
1. Clone o repositório
2. `npm install`
3. `cp .env.example .env`
4. `npm run dev`
5. Faça suas alterações
6. `npm run build` para verificar
7. `npm test` para validar

### Adicionando uma Nova Página
1. Crie o componente em `src/pages/NovaPagina.tsx`
2. Adicione a rota em `src/App.tsx`
3. Adicione o item de navegação em `src/components/AppSidebar.tsx`
4. Adicione os endpoints mock em `src/services/api.ts`
5. Defina os tipos em `src/types/api.types.ts`

### Adicionando um Novo Endpoint
1. Defina o tipo de retorno em `api.types.ts`
2. Adicione o mock data em `api.ts`
3. Crie o método no namespace apropriado do `api` object
4. Documente no `API_CONTRACT.md`
