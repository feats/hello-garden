##
## Base
##
FROM node:12.13.0-alpine3.10 AS base
ENV HOME=/home/node
USER node
WORKDIR $HOME

##
## Production dependencies
##
FROM base AS production-dependencies
COPY package*.json ./
RUN npm set progress=false && \
    npm clean-install --quiet --depth 0 --only=production

##
## Test dependencies
##
FROM production-dependencies AS test-dependencies
RUN npm set progress=false && \
    npm clean-install --quiet --depth 0

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