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
COPY apps/trade-panel/package.json ./apps/trade-panel/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY apps/trade-panel ./apps/trade-panel
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Build the application
RUN cd apps/trade-panel && pnpm install && pnpm build

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1

# Install pnpm
RUN npm install -g pnpm@latest

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files first
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder --chown=nextjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel/package.json ./apps/trade-panel/package.json

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy packages and built application
COPY --from=builder --chown=nextjs:nodejs /app/packages ./packages
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel/.next ./apps/trade-panel/.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel/public ./apps/trade-panel/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel/next.config.mjs ./apps/trade-panel/next.config.mjs

# Create the necessary directory structure and copy node_modules
RUN mkdir -p ./node_modules/.pnpm
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.pnpm ./node_modules/.pnpm

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check is handled by docker-compose

# Start the application with next start
CMD ["pnpm", "--filter", "trade-panel", "start"]