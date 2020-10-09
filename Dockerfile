FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

WORKDIR /app/src

CMD node index.ts