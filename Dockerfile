FROM node:15-alpine as base
WORKDIR /app
COPY package*.json ./
EXPOSE 1337

FROM base as production
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . /
CMD ["node", "."]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon"]