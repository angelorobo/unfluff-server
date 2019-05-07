#!/bin/bash
docker stop unfluff
docker rm unfluff && docker rmi unfluff
docker build -t unfluff .