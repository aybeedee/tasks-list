FROM node:22

WORKDIR /app

COPY package*.json .

RUN apt-get update && apt-get install -y build-essential python3

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]