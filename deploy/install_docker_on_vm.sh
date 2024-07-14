#!/bin/bash

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc


# Install command line tools
sudo apt-get install        \
    docker-ce               \
    docker-ce-cli           \
    containerd.io           \
    docker-buildx-plugin    \
    docker-compose-plugin   


# Confirm installation was successful
sudo docker run hello-world