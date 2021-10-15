ARG NODE_VERSION=14.16.1

FROM node:${NODE_VERSION}-alpine3.10 as build

WORKDIR /app
COPY --chown=node:node . ${WORKDIR}

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.20.0
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
