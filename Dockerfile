FROM luis/sails

MAINTAINER Luis Elizondo "lelizondo@gmail.com"

EXPOSE 3000

ADD ./application /var/www
