# FROM node:20-alpine AS dev

# WORKDIR /usr/app

# COPY --chown=node:node package*.json ./

# RUN npm ci

# COPY --chown=node:node . .

# USER node

# FROM node:20-alpine AS build

# WORKDIR /usr/app

# COPY --chown=node:node package*.json ./

# COPY --chown=node:node --from=dev /usr/app/node_modules ./node_modules

# COPY --chown=node:node . .

# RUN npm run build

# RUN npm ci --only=production && npm cache clean --force

# USER node

# FROM node:20-alpine As production

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# CMD [ "node", "dist/main.js" ]

# FROM node:20-alpine AS base

# FROM base AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app
# RUN npm install turbo --global
# COPY . .
# RUN turbo prune --scope=user --docker


FROM node:20-alpine AS builder
# RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=user --docker

