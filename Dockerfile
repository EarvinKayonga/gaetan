FROM node:16-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM node:16-alpine as production
USER daemon
WORKDIR /usr/src/app
COPY index.js ./
RUN chown -r daemon:daemon /usr/src/app
COPY --from=development /usr/src/app/node_modules ./node_modules
CMD [ "node", "index.js" ]
