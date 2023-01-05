FROM node:18-slim

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci

RUN chown -R www-data /app
USER www-data

WORKDIR /app
ENV HOME=/app

CMD ["npm", "start"]