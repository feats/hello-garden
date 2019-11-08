##
## Base
##
FROM node:alpine AS base
RUN apk add --no-cache nodejs-current tini
ENV HOME=/home/node
USER node
WORKDIR $HOME
ENTRYPOINT ["/sbin/tini", "--"]

##
## Production dependencies
##
FROM base AS production-dependencies
COPY package*.json ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --only=production

##
## Test dependencies
##
FROM production-dependencies AS test-dependencies
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install

##
## Source code
##
FROM production-dependencies AS source
COPY ./ ./

##
## Test
##
FROM test-dependencies AS test
COPY --from=source $HOME/./ $HOME/./
RUN npm test

##
## Release
##
FROM scratch AS production
COPY --from=source /home/node/ /