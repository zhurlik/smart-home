#!/bin/bash

# https://hub.docker.com/_/rabbitmq

docker --version
docker image ls
docker build --no-cache --tag test-rabbitmq ./src/main/resources/dockerfiles/
docker ps -a
docker container stop test-rabbitmq-server
docker rm -f test-rabbitmq-server
docker run -d --hostname test-rabbitmq-server --name test-rabbitmq-server -p 15672:15672 -p 5672:5672 -p 15674:15674 -p 1883:1883 test-rabbitmq

# SSH login docker exec -it test-rabbitmq-server /bin/bash