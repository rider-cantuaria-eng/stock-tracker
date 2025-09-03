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
RUN pnpm install --frozen-lockfile

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

# Build the application with standalone output
RUN cd apps/trade-panel && pnpm build

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
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/trade-panel/package.json ./apps/trade-panel/package.json

# Copy packages
COPY --from=builder /app/packages ./packages

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application and source
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel ./apps/trade-panel

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start the application with next start
CMD ["sh", "-c", "cd apps/trade-panel && pnpm start"]