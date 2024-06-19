FROM node:18-alpine

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]