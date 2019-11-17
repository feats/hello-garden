FROM node:alpine AS base
RUN apk add --no-cache nodejs-current
ENV HOME=/home/node
USER node
WORKDIR $HOME
RUN mkdir integration
WORKDIR $HOME/integration
COPY package*.json ./
RUN npm set progress=false && \
    npm clean-install --quiet --depth 0
COPY ./ ./
ENTRYPOINT ["npm"]
CMD ["test"]
