CURRENT_DIRECTORY := $(shell pwd)

test:
	@echo "Starting database"
	@docker run -d --name testdb -e MYSQL_ROOT_PASSWORD=secretpass -e MYSQL_USER=tester -e MYSQL_PASSWORD=secret -e MYSQL_DATABASE=testdb mysql > ./.docker
	
	@echo "Waiting for MySQL to be ready"
	@sleep 14

	@echo "Testing"
	@docker run --rm -e NODE_ENV=test -v $(CURRENT_DIRECTORY)/application:/var/www -p 3999:3000 --link testdb:mysql luis/sails npm test

	echo "Cleaning up"
	@docker rm -f $(shell cat ./.docker)
	rm .docker

clean:
	@fig rm --force web

install:
	cd $(CURRENT_DIRECTORY)/application ; npm install

build:
	@fig up -d 
	@fig run --rm web npm install
	@docker build --tag=dashi3 .

up:
	@fig up -d

start:
	@fig up -d
	@tail -f $(CURRENT_DIRECTORY)/logs/nodejs.log

stop:
	@fig stop

status:
	@fig ps

log:
	@tail -f $(CURRENT_DIRECTORY)/logs/nodejs.log

cli:
	@fig run --rm web bash

restart:
	@fig stop web 
	@fig start web
	@tail -f $(CURRENT_DIRECTORY)/logs/nodejs.log

.PHONY: test clean build start stop restart log status cli install up