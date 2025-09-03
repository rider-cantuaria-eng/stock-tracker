# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install wget for health checks
RUN apk add --no-cache wget

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy dependency files
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml* ./
COPY apps/trade-api/package.json ./apps/trade-api/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --no-frozen-lockfile --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY apps/trade-api ./apps/trade-api
COPY package.json pnpm-workspace.yaml ./

# Generate Prisma client
RUN cd apps/trade-api && pnpm exec prisma generate

# Build the application
RUN cd apps/trade-api && pnpm build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application and all dependencies
COPY --from=builder --chown=nestjs:nodejs /app/apps/trade-api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/trade-api/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/trade-api/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

USER nestjs

# Expose port
EXPOSE 3001

# Set environment to production
ENV NODE_ENV=production

# Health check is handled by docker-compose

# Start the application
CMD ["node", "dist/main.js"]