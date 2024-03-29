FROM node:20-alpine AS dev

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

FROM node:20-alpine AS build

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=dev /usr/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:20-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
