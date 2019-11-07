##
## Base
##
FROM node:alpine AS base
RUN apk add --no-cache nodejs-current tini
ENV HOME=/home/node
# USER node
WORKDIR $HOME
ENTRYPOINT ["/sbin/tini", "--"]

##
## Production dependencies
##
FROM base AS production-dependencies
COPY .shared/mylib mylib
RUN mkdir backend
WORKDIR $HOME/backend
COPY package*.json ./
RUN touch config.js && \
    npm set progress=false && \
    npm config set depth 0
RUN npm install --only=production

##
## Test dependencies
##
FROM production-dependencies AS test-dependencies
RUN npm install

##
## Source code
##
FROM production-dependencies AS source
COPY ./ ./

##
## Test
##
FROM test-dependencies AS test
COPY --from=source $HOME/backend/ $HOME/backend/
RUN npm test

##
## Production
##
FROM source AS production
EXPOSE 3000
CMD ["npm", "start"]
