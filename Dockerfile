FROM node:15.6.0-alpine3.12

ENV PORT=9000

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE $PORT

CMD [ "npm", "start" ]