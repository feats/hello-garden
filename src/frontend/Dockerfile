##
## Base
##
FROM node:alpine AS base
RUN apk add --no-cache nodejs-current tini
ENV HOME=/home/node
# USER node # http://npm.github.io/installation-setup-docs/installing/a-note-on-permissions.html
WORKDIR $HOME
ENTRYPOINT ["/sbin/tini", "--"]

##
## Production dependencies
##
FROM base AS production-dependencies
COPY mylib mylib
RUN mkdir frontend
WORKDIR $HOME/frontend
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
COPY backend/config.js ../backend/
COPY ./ ./

##
## Test
##
FROM test-dependencies AS test
COPY --from=source $HOME/backend/ $HOME/backend/
COPY --from=source $HOME/frontend/ $HOME/frontend/
RUN npm test

##
## Production
##
FROM source AS production
EXPOSE 5000
CMD ["npm", "start"]
