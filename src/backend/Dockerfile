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
RUN mkdir shared backend
WORKDIR $HOME/backend
COPY backend/package*.json backend/setup-npm-env.sh ./
RUN touch config.js && \
	npm set progress=false && \
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
COPY shared/ ../shared/
COPY backend/ ./

##
## Test
##
FROM test-dependencies AS test
COPY --from=source $HOME/backend/ $HOME/backend/
COPY --from=source $HOME/shared/ $HOME/shared/
RUN npm test

##
## Production
##
FROM source AS production
EXPOSE 3000
CMD ["node", "app.js"]
