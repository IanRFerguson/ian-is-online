# Ian is Online

This repo contains source code to build and deploy my personal website. 

## Local Development

You have two options here:
1. To run the full application as it exists in production, run `make app` ... this will compile the frontend first, then serve it with Flask.
2. You can run the separate services concurrently ... in two separate Terminal windows, run `make backend` and `make frontend`; this allows you to make changes to the React frontend in real time