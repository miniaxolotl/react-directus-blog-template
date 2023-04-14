# configure image
FROM node:lts-hydrogen as build
WORKDIR /build
COPY . .

# initialize build tools
RUN \
	yarn install --frozen-lockfile \
	&& yarn rollup \
	&& yarn build:web

# configure image
FROM alpine:3.17
WORKDIR /app
COPY --from=build /build .

RUN \
	# initialize system packages
	apk update && apk upgrade \
	# configure node
	&& apk add --no-cache nodejs npm \ 
	&& npm install -g yarn
	# && npm install -g yarn

# finalize image
EXPOSE 80 3020
# CMD ["yarn", "start:web"]
CMD yarn build:web && yarn start:web

LABEL org.opencontainers.image.source https://github.com/celestialstag/react-directus-template
LABEL org.opencontainers.image.description="react-directus-template"
LABEL org.opencontainers.image.licenses=GPL-3.0
