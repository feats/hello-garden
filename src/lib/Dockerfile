##
## Base
##
FROM node:lts-alpine AS base
ENV HOME=/home/node
USER node
WORKDIR $HOME

##
## Production dependencies
##
FROM base AS production-dependencies
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
COPY --from=source $HOME/./ $HOME/./
RUN npm test

##
## Release
##
FROM scratch AS production
COPY --from=source /home/node/ /