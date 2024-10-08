# Ian is Online

This repo contains source code to build and deploy my personal website. 

At a high level, this is a Dockerized Flask application that serves a React frontend; when a PR is merged onto `main` it triggers a Cloud Build execution that automatically pushes the container into production.

## Source Code

* `application/backend/` - Defines the Flask application that serves the website
* `application/frontend/` - Defines the React application that the user interacts with
* `docker-compose.yml` - Only used for local development, I like it because it's easy
* `deploy/Dockerfile` - Defines our Docker container, in development and production
* `deploy/cloudbuild.yaml` - Defines the CI/CD workflow with Google Cloud Build

## Local Development

Run the Docker container locally like so:
```
make build-app
```

## To Do
* I still haven't gotten the multistage Docker container to build
  * Currently we have to compile the React app before merging into main