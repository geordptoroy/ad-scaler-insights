

# Docker Ready — Plano de Implementação

## Resumo
Adicionar todos os arquivos de configuração Docker ao projeto FORTE MEDIA para conteinerização imediata após download.

## Arquivos a Criar

### 1. `Dockerfile` (multi-stage build)
- Stage 1 (builder): Node 20 Alpine, `npm ci`, `npm run build`
- Stage 2 (runner): Nginx Alpine servindo `/dist` na porta 8080
- Usar Nginx ao invés de `serve` para melhor performance em produção

### 2. `docker-compose.yml`
- Serviço `frontend` com build context, porta 8080, env_file `.env`, healthcheck, restart policy
- Container name: `forte-media-frontend`

### 3. `.dockerignore`
- Excluir `node_modules`, `dist`, `.git`, `.env*`, logs, IDE configs

### 4. `nginx.conf`
- SPA fallback (`try_files $uri /index.html`), cache de assets estáticos (1y), gzip

### 5. `.env.example`
- `VITE_API_URL`, `VITE_USE_MOCK`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Arquivos a Modificar

### 6. `package.json`
- Adicionar scripts: `docker:build`, `docker:run`, `docker:compose-up`, `docker:compose-down`

### 7. `vite.config.ts`
- Adicionar `build.sourcemap: false`, `build.minify: 'terser'`, `rollupOptions.output.manualChunks` para vendor/ui splitting

### 8. `README.md`
- Seção Docker com pré-requisitos, build, run, compose, variáveis de ambiente

## Detalhes Técnicos
- Dockerfile usará Nginx Alpine (mais leve e performático que `serve`)
- Multi-stage build para imagem final mínima (~30MB)
- Healthcheck via `wget --spider` no compose
- Chunks separados: `vendor` (react, react-dom, tanstack) e `ui` (radix components)

