FROM  node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package.json /usr/src/app/
COPY daemon.json /etc/docker/daemon.json

RUN npm install

COPY ./dist /usr/src/app/dist

EXPOSE 3005

CMD [ "npm", "start" ]