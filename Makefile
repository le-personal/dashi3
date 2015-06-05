CURRENT_DIRECTORY := $(shell pwd)
TWITTER_APIKEY := $(shell env | grep TWITTER_APIKEY)
TWITTER_APISECRET := $(shell env | grep TWITTER_APISECRET)
GOOGLE_OAUTH_CLIENTID := $(shell env | grep GOOGLE_OAUTH_CLIENTID)
GOOGLE_OAUTH_CLIENTSECRET := $(shell env | grep GOOGLE_OAUTH_CLIENTSECRET)
GOOGLE_OAUTH_CALLBACKURL := $(shell env | grep GOOGLE_OAUTH_CALLBACKURL)

prepare-test:
	@echo "Starting mongodb database and redis"
	@docker run -d --name testdb -p 27020:27017 -e MONGODB_DATATABASE=testdb mongo:2.6 > .docker-mongo
	@docker run -d --name testRedis -p 26379:6389 redis:latest > .docker-redis

test:
	@echo "Testing"
	docker run --rm -e NODE_ENV=test -e "$(TWITTER_APIKEY)" -e "$(TWITTER_APISECRET)" -e "$(GOOGLE_OAUTH_CLIENTID)" -e "$(GOOGLE_OAUTH_CLIENTSECRET)" -e "$(GOOGLE_OAUTH_CALLBACKURL)" -v $(CURRENT_DIRECTORY)/application:/var/www -p 3999:3000 --link testdb:mongodb --link testRedis:redis luis/sails npm test

clean-test:
	@if [ -f $(CURRENT_DIRECTORY)/.docker-mongo ]; \
	then \
  		docker rm --force testdb ; \
		rm .docker-mongo; \
	else echo "No mongo container to clean"; \
	fi;

	@if [ -f $(CURRENT_DIRECTORY)/.docker-redis ]; \
	then \
  		docker rm --force testRedis ; \
		rm .docker-redis; \
	else echo "No redis container to clean"; \
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
