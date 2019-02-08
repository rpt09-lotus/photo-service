FROM node:8

ENV DBUSERNAME=postgres

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3003

CMD npm start

