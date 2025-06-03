# Dockerfile for a Node.js application
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3443

CMD ["node", "app.js"]