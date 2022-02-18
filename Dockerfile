# Install dependencies only when needed
FROM node:14.19.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14.19.0-alpine AS builder

ARG VERSION="v0.0.0"
ARG SENTRY_WEBPACK_PLUGIN_ENABLED="false"
ARG SENTRY_URL=""
ARG SENTRY_ORG=""
ARG SENTRY_PROJECT=""
ARG SENTRY_AUTH_TOKEN=""
ARG SENTRY_DSN=""
ARG PLAUSIBLE_ENABLED="false"
ARG PLAUSIBLE_DOMAIN=""
ARG PLAUSIBLE_CUSTOM_DOMAIN=""

WORKDIR /app

ENV SENTRY_WEBPACK_PLUGIN_ENABLED=$SENTRY_WEBPACK_PLUGIN_ENABLED \
    SENTRY_URL=$SENTRY_URL \
    SENTRY_ORG=$SENTRY_ORG \
    SENTRY_PROJECT=$SENTRY_PROJECT \
    SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
    SENTRY_DSN=$SENTRY_DSN \
    NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN \
    NEXT_PUBLIC_VERSION=$VERSION \
    NEXT_PUBLIC_PLAUSIBLE_ENABLED=$PLAUSIBLE_ENABLED \
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$PLAUSIBLE_DOMAIN \
    NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN=$PLAUSIBLE_CUSTOM_DOMAIN \
    BUILDING_PROCESS=true

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build

# Production image, copy all the files and run next
FROM node:14.19.0-alpine AS runner

WORKDIR /app

ARG VERSION="0.0.0"
ARG SENTRY_DSN=""
ARG PLAUSIBLE_ENABLED="false"
ARG PLAUSIBLE_DOMAIN=""
ARG PLAUSIBLE_CUSTOM_DOMAIN=""

ENV NODE_ENV=production \
    SENTRY_DSN=$SENTRY_DSN \
    NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN \
    VERSION=$VERSION \
    NEXT_PUBLIC_VERSION=$VERSION \
    NEXT_PUBLIC_PLAUSIBLE_ENABLED=$PLAUSIBLE_ENABLED \
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$PLAUSIBLE_DOMAIN \
    NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN=$PLAUSIBLE_CUSTOM_DOMAIN \
    BUILDING_PROCESS=false

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY .env .env.production ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
