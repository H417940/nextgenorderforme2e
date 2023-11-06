#!/bin/bash
set -e

source ./start_variables.sh


echo -e "----------------------------\n    DOCKER BUILD\n----------------------------"
docker build \
    --build-arg UUID=${UUID} \
    --build-arg GGID=${GID} \
    -t ${DOCKER_IMAGE} \
    ./docker/images/cypress

echo -e "----------------------------\n    DOCKER RUN BASH\n----------------------------"
docker run \
    -it \
    -u "$GID":"$UUID" \
    -v "$PWD":/e2e \
    --workdir /e2e \
    --entrypoint bash \
    "${DOCKER_IMAGE}"