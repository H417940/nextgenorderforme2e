#!/bin/bash

source ./start_variables.sh

DEST_TEST_PATH=cypress/e2e
DEST_TEST_PATH_FILE="${DEST_TEST_PATH}/test.feature"

NPM_PATH="${PWD}"
NPM_PATH_FOLDER="${NPM_PATH}/npm"

if [ $# != "3" ]
then
	echo "$0 <TEXT EXECUTION ID (OMT-813)> <username> <password>"
	exit 255
fi

KEYS=$1
USERNAME=$2
PASSWORD=$3

echo -e "----------------------------\n    INITIALIZE TEST PATH\n----------------------------"
rm -rf "${DEST_TEST_PATH_FILE}"
if [ ! -d "${NPM_PATH_FOLDER}" ]
then
    mkdir -p "${NPM_PATH_FOLDER}"
fi

echo -e "----------------------------\n    DOWNLOADING TEST\n----------------------------"
curl -u "${USERNAME}:${PASSWORD}" \
    "https://acsjira.honeywell.com/rest/raven/1.0/export/test?keys=${KEYS}&fz=false" \
    -o "${DEST_TEST_PATH_FILE}"

echo -e "----------------------------\n    ARTIFACTORY LOGIN\n----------------------------"
docker login --username="${USERNAME}" --password="${PASSWORD}" "${DOCKER_IMAGE}"

echo -e "----------------------------\n    DOCKER INSTALL\n----------------------------"
docker run \
    -u "$GID":"$UUID" \
    -v "$PWD":/e2e \
    -v "${NPM_PATH_FOLDER}:/home/node/.npm" \
    --workdir /e2e \
    --entrypoint npm \
    "${DOCKER_IMAGE}" \
    install \
        cypress@12.17.4 \
        @badeball/cypress-cucumber-preprocessor@18.0.4 \
        typescript@5.1.6 \
        @cypress/browserify-preprocessor@3.0.2 \
        mocha@10.2.0


echo -e "----------------------------\n    DOCKER RUN TEST\n----------------------------"
docker run \
    -u "$GID":"$UUID" \
    --net=host \
    --env ELECTRON_EXTRA_LAUNCH_ARGS=--disable-gpu \
    --env JIRA_USERNAME="${USERNAME}" \
    --env JIRA_PASSWORD="${PASSWORD}" \
    --env JIRA_PROJECT_KEY="${KEYS}" \
    -v "$PWD":/e2e \
    --workdir /e2e \
    --env CYPRESS_HOST=https://127.0.0.1 \
    "${DOCKER_IMAGE}" \
    --browser chrome

##**https://github.com/cucumber/json-formatter
echo -e "----------------------------\n    DOCKER MERGIN RESULTS\n----------------------------"
docker run \
   -i \
   --entrypoint cucumber-json-formatter \
   "${DOCKER_IMAGE}" < cucumber-messages.ndjson > cucumber-results.json

echo -e "----------------------------\n    UPDATE TEST RESULT\n----------------------------"
curl \
    -H "Content-Type: application/json" \
    -X POST \
    -u "${USERNAME}:${PASSWORD}" \
    --data @cucumber-results.json  \
    "https://acsjira.honeywell.com/rest/raven/1.0/import/execution/cucumber?testExecKey=${KEYS}"
