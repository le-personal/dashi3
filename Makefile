CURRENT_DIRECTORY := $(shell pwd)

test:
	@docker run --rm -e NODE_ENV=test -v $(CURRENT_DIRECTORY)/application:/var/www -p 3999:3000 --link dashi3_mysql_1:mysql --name mocka luis/sails npm test

start-all:
	@fig start

clean:
	@fig stop

install:
	@fig run --rm web npm install

build:
	@fig run --rm web npm install
	@docker build --tag=dashi3 .

up:
	@fig up -d

start:
	@fig start web
	@tail -f /var/log/docker/dashi3/nodejs.log

stop:
	@fig stop web

status:
	@fig ps

log:
	@tail -f /var/log/docker/dashi3/nodejs.log

cli:
	@fig run --rm web bash

restart:
	@fig stop web 
	@fig start web
	@tail -f /var/log/docker/dashi3/nodejs.log

.PHONY: test start-all clean build start stop restart log status cli install up