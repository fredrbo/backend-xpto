FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/src

EXPOSE 5004

CMD ["npm", "start"]
