# directive=RUN
FROM alpine:3.17

# configure image
WORKDIR /app
COPY . .

# initialize system packages
RUN apk update && apk upgrade
RUN apk add --no-cache bash python3 py3-pip 
RUN apk add --no-cache build-base

# initialize node packages
RUN apk add --no-cache curl
RUN apk add --no-cache nodejs
RUN apk add --no-cache npm
RUN npm install -g yarn
# initialize web server packages
# RUN apk add --no-cache nginx
# RUN apk add --no-cache certbot

# initialize git
RUN apk add --no-cache git

# initialize build tools
RUN yarn install --frozen-lockfile
RUN yarn rollup
RUN yarn build:web

# initialize nginx
# RUN rm -rf /etc/nginx/conf.d/*
# RUN rm -rf /etc/nginx/nginx.conf
# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY ./nginx /etc/nginx/conf.d

# start directus

EXPOSE 80 3020

CMD ["yarn", "start:web"]
