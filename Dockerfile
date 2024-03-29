ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base
ARG PROJECT=user
ARG PORT

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=$PROJECT --docker


FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm update
RUN npm install
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo run build --filter=${PROJECT}

FROM base as prod 
USER node
COPY --chown=node:node --from=installer /app/node_modules ./node_modules
COPY --chown=node:node --from=installer /app/apps/${PROJECT}/dist ./dist
EXPOSE ${PORT}
CMD [ "node", "dist/main.js" ]