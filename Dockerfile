# Base stage for dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY tsconfig.json ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=npm,target=/root/.npm \
    npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application with cache mount
RUN --mount=type=cache,id=nextjs,target=/app/.next/cache \
    npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set hostname to localhost
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000

# Start the application
CMD ["node", "server.js"]