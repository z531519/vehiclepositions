FROM node:18-slim


WORKDIR /home/node

RUN mkdir /var/www
RUN chown -R node /var/www

USER node
COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
COPY types ./types
COPY .eslintrc.js  ./

RUN npm ci
ENV HOME /home/node
# RUN chown -R www-data /app
# USER www-data



EXPOSE 3000
ENV NODE_ENV production
RUN npm run build
CMD ["npx", "serve", "-s", "build"]