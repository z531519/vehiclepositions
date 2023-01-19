FROM node:18-slim

USER node
WORKDIR /app

COPY --chown=node package*.json tsconfig.json ./
COPY --chown=node config ./config
COPY --chown=node src ./src

RUN npm ci
ENV HOME=/app
ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "start"]