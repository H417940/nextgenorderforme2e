#!/bin/bash

export DOCKER_PATH="omt-docker-stable-local.artifactory-na.honeywell.com"
export DOCKER_IMAGE="${DOCKER_PATH}/honeywell_cypress:1.2"

export GID=$(id -g)
export UUID=$(id -u)
