FROM node:lts-alpine AS base
ENV HOME=/home/node
USER node
WORKDIR $HOME
RUN mkdir integration
WORKDIR $HOME/integration
COPY package*.json ./
RUN npm set progress=false && npm config set depth 0
RUN npm clean-install --quiet
COPY ./ ./
ENTRYPOINT ["npm"]
CMD ["test"]
