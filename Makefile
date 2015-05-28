CURRENT_DIRECTORY := $(shell pwd)
TWITTER_APIKEY := $(shell env | grep TWITTER_APIKEY)
TWITTER_APISECRET := $(shell env | grep TWITTER_APISECRET)

prepare-test:
	@echo "Starting database"
	@docker run -d --name testdb -p 27020:27017 -e MONGODB_DATATABASE=testdb mongo:2.6 > .docker

test:
	@echo "Testing"
	docker run --rm -e NODE_ENV=test -e "$(TWITTER_APIKEY)" -e "$(TWITTER_APISECRET)" -v $(CURRENT_DIRECTORY)/application:/var/www -p 3999:3000 --link testdb:mongodb luis/sails npm test

clean-test:
	@if [ -f $(CURRENT_DIRECTORY)/.docker ]; \
	then \
  		docker rm --force testdb ; \
		rm .docker; \
	else echo "No test containers to clean"; \
	fi;

clean:
	@fig rm --force web

install:
	cd $(CURRENT_DIRECTORY)/application ; npm install

build:
	@fig up -d
	@fig run --rm web npm install
	@docker build --tag=dashi3 .

init:
	@docker run --rm -v $(CURRENT_DIRECTORY)/application:/var/www luis/sails npm install

start:
	@fig up -d
	@fig logs web

stop:
	@fig stop

status:
	@fig ps

log:
	@fig logs web

cli:
	@fig run --rm web bash

restart:
	@fig stop web
	@fig start web
	@fig logs web

.PHONY: test clean build start stop restart log status cli install init clean-test
