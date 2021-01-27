FROM node:15-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as production
EXPOSE 9000
ENV NODE_ENV=production
ENV PORT=9000
RUN npm ci --only=production
COPY . /
CMD ["node", "."]

FROM base as dev
EXPOSE 1337
ENV NODE_ENV=development
ENV PORT=1337
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon"]