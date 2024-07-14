#!/bin/bash
set -e

FILES=(
    "application/backend"
    "application/frontend/public"
    "application/frontend/src"
    "application/frontend/package.json"
    "application/frontend/package-lock.json"
    "deploy/"
)

for file in ${FILES[@]}; do

    # For whole directories we'll create a remote version first
    if [[ ! $file =~ "." ]]; then
        echo "Creating remote directory ${file}..."
        gcloud compute ssh  \
            --project=${GCP_PROJECT}    \
            --zone=${GCP_ZONE}          \
            ${GCP_VM_NAME} --           \
            "mkdir -p dev/${file}"
    fi     

    # Copy the local path to the remote path
    gcloud compute scp                      \
        --recurse                           \
        --project=${GCP_PROJECT}            \
        --zone=${GCP_ZONE}                  \
        $file                               \
        ${GCP_VM_NAME}:/home/Ian/dev/      
done


# Copy extra files to VM
echo "Copying extra files to VM..."
gcloud compute scp                      \
    --recurse                           \
    --project=${GCP_PROJECT}            \
    --zone=${GCP_ZONE}                  \
    Makefile                            \
    docker-compose.yml                  \
    requirements.txt                    \
    ${GCP_VM_NAME}:/home/Ian/dev/      