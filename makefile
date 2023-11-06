.PHONY: build connect publish

IMAGE_NAME=honeywell_cypress
IMAGE_RELEASE=1.3
IMAGE_PATH=docker/images/cypress
DOCKERFILE_NAME=dockerfile

ARTIFACTORY_USER=H295226
ARTIFACTORY_PASSWORD=${CYPRESS_LDAP_PASSWORD}
ARTIFACTORY_FOLDER=omt-docker-stable-local
ARTIFACTORY_HOST=artifactory-na.honeywell.com

DOCKERFILE_PATH_NAME= $(addprefix $(IMAGE_PATH)/, $(DOCKERFILE_NAME))
DOCKER_IMAGE= $(addprefix $(IMAGE_NAME):, $(IMAGE_RELEASE))
DOCKER_PATH= $(addprefix $(ARTIFACTORY_FOLDER)., $(ARTIFACTORY_HOST))
DOCKER_PATH_NAME= $(addprefix $(DOCKER_PATH)/, $(DOCKER_IMAGE))

SHELL = /bin/bash
GGID=$(shell id -g)
UUID=$(shell id -u)

build:
	docker build . \
	--build-arg UUID=${UUID} \
	--build-arg GGID=${GGID} \
	-t $(DOCKER_PATH_NAME) \
	--file $(DOCKERFILE_PATH_NAME)


connect:
	@docker login --username=$(ARTIFACTORY_USER) --password=$(ARTIFACTORY_PASSWORD) $(DOCKER_PATH)


publish: build connect
	@docker push $(DOCKER_PATH_NAME)
