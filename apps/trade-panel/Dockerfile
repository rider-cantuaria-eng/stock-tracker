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
RUN pnpm install --no-frozen-lockfile --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY apps/trade-panel ./apps/trade-panel
COPY package.json pnpm-workspace.yaml ./

# Build the application
RUN cd apps/trade-panel && pnpm build

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/trade-panel/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/trade-panel/.next/static ./.next/static

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check is handled by docker-compose

# Start the application
CMD ["node", "server.js"]
