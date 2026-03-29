FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY backend .

EXPOSE 8081

CMD ["npm", "start"]