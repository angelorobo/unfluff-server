# unfluff-server

This is a VERY simple implementation of a node.js + express REST client interface for [node-unfluff](https://github.com/ageitgey/node-unfluff).


# Run

$ git clone git@github.com:angeloh/unfluff-server.git
$ cd unfluff-server
$ ./build.sh
$ ./run.sh

# Test

$ curl -X GET \
  'http://localhost:3000/unfluff?url=https://www.nytimes.com/2019/05/06/us/politics/trump-tariffs-china.html' \
  -H 'cache-control: no-cache'