# Initial setup

These steps need to be taken once, after first `git clone`.

## Node Package Manager

Update to the newest NPM version:
    
    $ npm install -g npm

Make it easy to run NPM package binaries:

    $ npm install -g npx

Then get the dependencies:

    $ npm install

## Garden

    $ brew tap garden-io/garden
    $ brew install garden-cli

## Misc

The `package.json` will ensure that `scripts/setup-node-env.sh` will be run after dependencies have been downloaded.

Global NPM goodness:

    $ npm install -g eslint
    $ npm install -g eslint-plugin-cypress
    $ npm install -g standard
