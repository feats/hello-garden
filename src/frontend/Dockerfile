##
## Images of shared modules
##
ARG MYLIB_IMAGE_NAME=mylib
ARG MYLIB_IMAGE_VERSION=latest
FROM ${MYLIB_IMAGE_NAME}:${MYLIB_IMAGE_VERSION} AS mylib

##
## Base
##
FROM node:lts-alpine AS base
RUN apk add --no-cache tini
ENV HOME=/home/node
USER node
WORKDIR $HOME
ENTRYPOINT ["/sbin/tini", "--"]

##
## Production dependencies
##
FROM base AS production-dependencies
COPY --from=mylib / lib
RUN mkdir frontend
WORKDIR $HOME/frontend
COPY package*.json ./
RUN npm set progress=false && npm config set depth 0
RUN npm clean-install --quiet --only=production

##
## Test dependencies
##
FROM production-dependencies AS test-dependencies
RUN npm clean-install --quiet

##
## Source code
##
FROM production-dependencies AS source
COPY ./ ./

##
## Test
##
FROM test-dependencies AS test
COPY --from=source $HOME/frontend/ $HOME/frontend/
RUN npm test

##
## Production
##
FROM source AS production
EXPOSE 5000
CMD ["npm", "start"]
