FROM node:18.12.1
ARG PNPM_VERSION=7.26.2
ENV PROJECT_ROOT="/usr/src/app"
RUN npm --global install pnpm@${PNPM_VERSION}
USER node
WORKDIR $PROJECT_ROOT

COPY --chown=node:node pnpm-*.yaml ./
COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node src src

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store\
 # ↑ By caching the content-addressable store we stop downloading the same packages again and again
 pnpm install --frozen-lockfile
