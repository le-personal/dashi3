CURRENT_DIRECTORY := $(shell pwd)

prepare-test:
	@echo "Starting database"
	@docker run -d --name testdb -e MYSQL_ROOT_PASSWORD=secretpass -e MYSQL_USER=tester -e MYSQL_PASSWORD=secret -e MYSQL_DATABASE=testdb mysql > .docker

test:
	@echo "Testing"
	@docker run --rm -e NODE_ENV=test -v $(CURRENT_DIRECTORY)/application:/var/www -p 3999:3000 --link testdb:mysql luis/sails npm test

clean-test:
	@if [ -a $(CURRENT_DIRECTORY)/.docker ]; \
	then \
  		docker rm --force testdb ; \
		rm .docker; \
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
