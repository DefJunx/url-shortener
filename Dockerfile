FROM node:15.6.0-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]