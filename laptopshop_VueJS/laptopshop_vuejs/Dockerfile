FROM node:18.18.0-alpine3.18 AS build-stage

WORKDIR /app

COPY package*.json .
COPY vite.config.js .
COPY README.md .
COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine AS product-stage

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
