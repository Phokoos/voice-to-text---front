FROM node:latest as build

WORKDIR /App

COPY App/package*.json ./

RUN npm install

COPY App/. .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]




