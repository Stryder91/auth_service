FROM node:alpine

WORKDIR /app
RUN npm install --only=prod
COPY package.json .
COPY . . 

CMD ["npm", "start"]