# Minimalistic Integration Test

## Run directly

Both backend and frontend must be running:

    $ cd ../backend; npm start
    $ cd ../frontend; npm start

And the environment must be set up to point to the backend and front services:

    $ export BACKEND_URL=http://localhost:3000
    $ export FRONTEND_URL=http://localhost:5000

Then the integration test can be run:

    $ npm clean-install
    $ npm test

but that requires the URLs http://backend and http://frontend to route to the services under test.

## Container

    $ docker build .
