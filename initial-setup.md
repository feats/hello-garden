# Initial setup

These steps need to be taken once, after first `git clone`.

## Node Package Manager

Update to the newest NPM version:

    $ npm install -g npm

## Garden

    $ brew tap garden-io/garden
    $ brew install garden-cli

## Google Kubernetes Engine

GCP console: https://console.cloud.google.com/

    $ brew cask install google-cloud-sdk
    $ gcloud components update
    $ gcloud auth login
    $ gcloud compute regions list
    $ gcloud compute zones list
    $ gcloud config set compute/region europe-west1
    $ gcloud config set compute/zone europe-west1-b
    $ gcloud projects create kaleidoscope-1-nodejs --set-as-default
    $ gcloud config set project kaleidoscope-1-nodejs

The configuration is stored locally in `~/.config/gcloud/`.  You can view the current configuration:

    $ gcloud config list

Enable [GKE](https://console.cloud.google.com/apis/library/container.googleapis.com?q=kubernetes%20engine) in GCP.

Create a cluster (with the above config it defaults to single zone & stable K8s channel):

    $ gcloud container clusters create garden-1 --quiet
    $ gcloud container clusters list
    $ gcloud container clusters get-credentials garden-1

Last one puts certificate, etc. in `~/.kube/config`.

## Misc

Global NPM goodness:

    $ npm install -g eslint
    $ npm install -g eslint-plugin-cypress
    $ npm install -g standard
