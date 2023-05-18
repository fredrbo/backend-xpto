FROM node

RUN npm install -g npm@9.6.6

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5004

CMD ["npm", "start"]