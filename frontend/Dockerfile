FROM node:lts-alpine
WORKDIR /usr/src/web
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "dev" ]
