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
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Generate Prisma client
RUN cd apps/trade-api && pnpm exec prisma generate

# Build the application
RUN cd apps/trade-api && pnpm build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

# Install pnpm in runner stage
RUN npm install -g pnpm@latest

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy package files first
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder --chown=nestjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nestjs:nodejs /app/apps/trade-api/package.json ./apps/trade-api/package.json

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application and generated files
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages
COPY --from=builder --chown=nestjs:nodejs /app/apps/trade-api/dist ./apps/trade-api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/trade-api/prisma ./apps/trade-api/prisma

# Create the necessary directory structure and copy Prisma client
RUN mkdir -p ./node_modules/.pnpm
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/.pnpm ./node_modules/.pnpm

USER nestjs

# Expose port
EXPOSE 3001

# Set environment to production
ENV NODE_ENV=production

# Health check is handled by docker-compose

# Start the application
CMD ["node", "apps/trade-api/dist/main.js"]