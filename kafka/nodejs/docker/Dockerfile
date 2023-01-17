FROM node:18-slim

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY .env ./

RUN npm ci

RUN chown -R www-data /app
USER www-data

WORKDIR /app
ENV HOME=/app
ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "start"]