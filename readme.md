# Build & deploy pipeline

## Objectives

- Make a *fast* and *reliable* pipeline for a progressive web application comprised of NodeJS & Python microservices with accompanying Mongo, Redis & Elastic databases.
- The pipeline must respond very fast to changes when doing development on a local machine with Kubernetes (via Docker for Desktop), possibly detached from the network.
- The pipeline must be able to push to Google Container Registry.
- The pipeline must deploy to Google Kubernetes Engine for production & staging.

## Plan

- Setup a pipeline with Skaffold with a development profile for local build & deployment.  Focus on NodeJS services with shared, in-tree JS packages.
- Add unit/acceptance tests to the pipeline using cypress.  Focus on speed & separate testing.
- Add integration tests to the pipeline.  Focus on DB injection & test driving.
- Add staging profile to Google Cloud Platform.
- Setup the pipeline using Garden, instead of Skaffold.  Compare.

## Observations

- Skaffold is somewhat limited and inflexible, so Garden seems a better fit for our use case.

## Notes

    $ brew tap garden-io/garden
    $ brew install garden-cli

### Local Docker for Desktop

Start Garden pipeline:

    $ garden plugins local-kubernetes cluster-init --env=devel

How to get the token for the dashboard?  Is it OK to just click Skip?

    $ garden dev --env=devel
...


Cleanup:

    $ garden delete environment devel


### GKE

    $ brew cask install google-cloud-sdk
    $ gcloud components update
    $ gcloud auth login
    $ gcloud compute regions list
    $ gcloud compute zones list
    $ gcloud config set compute/region europe-west1
    $ gcloud config set compute/zone europe-west1-b
    $ gcloud projects create kaleidoscope-1-nodejs --set-as-default
    $ gcloud config set project kaleidoscope-1-nodejs

Enable [GKE](https://console.cloud.google.com/apis/library/container.googleapis.com?q=kubernetes%20engine)

Create a cluster (with the above config it defaults to single zone & stable K8s channel):

    $ gcloud container clusters create garden-1 --quiet
    $ gcloud container clusters list
    $ gcloud container clusters get-credentials garden-1

Last one puts certificate, etc. in `~/.kube/config`.  Check that the new cluster is the *current*:

    $ kubectl config current-context
    $ kubectl config use-context gke_kaleidoscope-1-nodejs_europe-west1-b_garden-1

The `garden.yml` in the root of the repo must contain an environment `staging` that has context `gke_${project}_${zone}_${cluster}`.  Then populate the cluster with registry, build pipeline, etc.:

    $ garden plugins kubernetes cluster-init --env=staging
    $ garden get status --env=staging

Make sure there is a DNS A record set for `kaleidoscope.dk` pointing to the Garden load balancer:

    $ kubectl describe service --namespace=garden-system garden-nginx-nginx-ingress-controller | grep 'LoadBalancer Ingress'

Start the development environment:

    $ garden dev --env=staging


...

Cleanup:

    $ garden delete environment staging
	$ gcloud container clusters delete garden-1

## Kubernetes

    $ kubectl config view
    $ kubectl config get-contexts
    $ kubectl get ns
    $ kubectl --namespace demo-project delete pod,service --all
    $ kubectl delete namespaces demo-project

## Notes

- Garden: `name` is freetext in `environments`, but a selector in `providers`.
- Garden: All examples use deprecated syntax.
- Google Storage: gs://cf7de674b9c84a08b9725fa3ac833ffd
- https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/
- buildbot.net
