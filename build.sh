#!/bin/bash
docker rm unfluff && docker rmi unfluff
docker build -t unfluff .
docker run -d --name unfluff --link mongo:mongo -e "VIRTUAL_HOST=unfluff.subdavis.com" -e "LETSENCRYPT_HOST=unfluff.subdavis.com" -e "LETSENCRYPT_EMAIL=davisba@live.unc.edu" unfluff