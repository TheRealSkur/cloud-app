FROM node:20 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 8081

CMD ["node", "server.js"]