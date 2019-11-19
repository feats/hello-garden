# Minimalistic Frontend

## Run directly

    $ npm clean-install
    $ npm test

The backend must be running:

    $ cd ../backend; npm start

And the environment must be set up to point to the backend services:

    $ export BACKEND_URL=localhost:3000

Then the frontend can be run:

    $ npm start

## Container

First build `../lib` container.  Then:

    $ docker build .

## Update dependencies

	$ npm install
