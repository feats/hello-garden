# Build & deploy pipeline

## Objectives

- Make a *fast* and *reliable* pipeline a progressive web application comprised of NodeJS & Python microservices with accompanying Mongo & Redis databases.
- The pipeline must be ultra fast when doing development on a local machine with Kubernetes (via Docker for Desktop), probably detached from the network.
- The pipeline must be able to push to Google Container Registry.
- The pipeline must deploy to Google Kubernetes Engine for production & staging.

## Plan

- Setup a pipeline with Skaffold with a development profile for local build & deployment.  Focus on NodeJS services with shared, in-tree JS packages.
- Add unit/acceptance tests to the pipeline using cypress.  Focus on speed & separate testing.
- Add integration tests to the pipeline.  Focus on DB injection & test driving.
- Add production profile to Google Cloud Platform.
- Setup the pipeline using Garden, instead of Skaffold.  Compare.
