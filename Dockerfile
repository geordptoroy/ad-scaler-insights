# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY bun.lockb* ./
COPY bun.lock* ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
