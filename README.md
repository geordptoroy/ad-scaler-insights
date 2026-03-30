# FORTE MEDIA — Meta Ad Scaler

Ferramenta analítica avançada para identificar, classificar e monitorar anúncios escalados da Meta.

## 🚀 Desenvolvimento Local

```bash
npm install
npm run dev
```

Acesse: http://localhost:8080

## 🏗️ Build de Produção

```bash
npm run build
npm run preview
```

## 🐳 Executando com Docker

### Pré-requisitos
- Docker Engine 20.10+
- Docker Compose 2.0+ (opcional)

### Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite .env com suas configurações
```

### Build da imagem
```bash
npm run docker:build
```

### Executar container
```bash
# Com docker run
npm run docker:run

# Ou com docker-compose
npm run docker:compose-up
```

Acesse: http://localhost:8080

### Parar container
```bash
npm run docker:compose-down
```

## 📋 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base da API backend | `http://localhost:3000/api` |
| `VITE_USE_MOCK` | Usar dados mockados | `true` |
| `VITE_SUPABASE_URL` | URL do projeto Supabase | — |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima do Supabase | — |

## 📁 Estrutura

```
├── src/
│   ├── components/    # Componentes UI
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Camada de serviço API
│   ├── types/         # Contratos TypeScript
│   └── hooks/         # Custom hooks
├── Dockerfile         # Multi-stage build (Nginx)
├── docker-compose.yml # Orquestração
├── nginx.conf         # Configuração Nginx
├── API_CONTRACT.md    # Documentação dos endpoints
└── .env.example       # Variáveis de ambiente
```
