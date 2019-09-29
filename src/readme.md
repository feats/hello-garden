# Services

## First-time setup

    $ npm install

## Running stuff directly (fast)

    $ npm run

will give you a list of things that can be run directly, eg.

    $ npm run frontend:units
    $ npm run units
    $ npm run backend
    $ npm start

## Build containers

    $ docker build . -f Dockerfile.backend
    $ docker build . -f Dockerfile.frontend

