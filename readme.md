# Build & deploy pipeline

## Objectives

- Make a *fast* and *reliable* pipeline for a progressive web application comprised of NodeJS & Python microservices with accompanying Mongo, Redis & Elastic databases.
- The pipeline must respond very fast to changes when doing development on a local machine with Kubernetes (via Docker for Desktop), possibly detached from the network.
- The pipeline must be able to push to Google Container Registry.
- The pipeline must deploy to Google Kubernetes Engine for production & staging.
- It must be very hard to inadvertedly make changes to the production environment.

## Plan

- Setup a pipeline with Skaffold with a development profile for local build & deployment.  Focus on NodeJS services with shared, in-tree JS packages.
- Add unit/acceptance tests to the pipeline using cypress.  Focus on speed & separate testing.
- Add integration tests to the pipeline.  Focus on DB injection & test driving.
- Add staging profile to Google Cloud Platform.
- Setup the pipeline using Garden, instead of Skaffold.  Compare.
- Can Garden mount source directly into containers to avoid rebuilding?
- Isolate each module/package as much as possible: put package.json, Dockerfile, etc into package dir.  Also for secrets.
- Does Garden make sure that the right environments are used for the current context?
- Have shared "packages" that needs building (think Babel).
- Have separate tests, like in garden/examples/demo-project, also for the shared lib.
- ~~Put a reverse-proxy (like Træfik) in between the Google load balancer and services, such that HTTPS can be handled and URL-based routing can be achieved.  Use Let's Encrypt for TLS certificates.~~
- Have a secret file for each env, usable at build time as well as put into K8S secrets for the services to consume.

## Observations

- Skaffold is somewhat limited and inflexible, so Garden seems a better fit for our use case.

### Local Docker for Desktop

Start Garden pipeline for the default environment *development*:

    $ garden plugins local-kubernetes cluster-init

Start dev console:

    $ garden dev

Cleanup:

    $ garden delete environment

## Hot reload

    $ garden dev --hot=backend --hot=frontend

But with hot reload, the integration is not rerun with changes.  In fact, it is not a good idea to include tests in the build process of the container in combination with hot reload, because if the tests fails, the container will not be built, and then there is nowhere for Garden to hotsync the files to.

### GKE

GCP console: https://console.cloud.google.com/

The `garden.yml` in the root of the repo must contain an environment `staging` that has context `gke_${project}_${zone}_${cluster}`.

Check that the *current* cluster is the right one, or else change the context:

    $ kubectl config current-context
    $ kubectl config use-context gke_kaleidoscope-1-nodejs_europe-west1-b_garden-1

Then populate the cluster with registry, build pipeline, etc.:

    $ garden plugins kubernetes cluster-init --env=staging
    $ garden get status --env=staging

Make sure there is a DNS A record set for `kaleidoscope.dk` pointing to the Garden load balancer:

    $ kubectl describe service --namespace=garden-system garden-nginx-nginx-ingress-controller | grep 'LoadBalancer Ingress'

Start the development environment:

    $ garden dev --env=staging

Or just deploy:

    $ garden deploy --env=staging

Cleanup:

    $ garden delete env --env=staging
	$ gcloud container clusters delete garden-1

## Kubernetes

    $ kubectl config view
    $ kubectl config get-contexts
    $ kubectl get ns
    $ kubectl --namespace hello-garden delete pod,service --all
    $ kubectl delete namespaces demo-project

## Notes

- Garden: `name` is freetext in `environments`, but a selector in `providers`.
- Garden: All examples use deprecated syntax.
- Garden Console displays blank page for Logs.
- Garden does not cleanup the module build directories, so to make sure that, say, the `include` actually includes what is needed, you need to manually clean the build dirs.  If you see `Error: Command "git ls-files --ignored --exclude-per-directory .gitignore" failed with code 128`, this is the problem.
- Find a way to make Garden dashboard use the same port.
- Google Storage: gs://cf7de674b9c84a08b9725fa3ac833ffd
- https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/
- buildbot.net, use staging-${local.env.CIRCLE_BUILD_NUM || local.username} for namespace.
- Find out how to control names of images when using [build dependency on images](https://github.com/garden-io/garden/issues/1329).

## Secrets

    kubectl config current-context
    kubectl create namespace hello-garden
    kubectl --namespace=hello-garden create secret generic my-secrets --from-env-file=secrets.development.env
    kubectl get secrets/my-secrets --namespace hello-garden
