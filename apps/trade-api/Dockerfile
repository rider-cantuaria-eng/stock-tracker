# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/trade-api/package.json ./apps/trade-api/
COPY packages/ ./packages/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Generate Prisma client
COPY apps/trade-api/prisma ./apps/trade-api/prisma
RUN cd apps/trade-api && pnpm exec prisma generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm install -g pnpm
RUN pnpm build --filter=trade-api

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder /app/apps/trade-api/dist ./dist
COPY --from=builder /app/apps/trade-api/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/trade-api/prisma ./prisma

USER nestjs

EXPOSE 3000

ENV PORT 3000

# Start the application
CMD ["node", "dist/main.js"]
