FROM phusion/baseimage
MAINTAINER YOUR NAME <YOUR EMAIL>

CMD ["/sbin/my_init"]

RUN apt-get update && apt-get install -y python-software-properties
RUN add-apt-repository ppa:nginx/stable
RUN apt-get update && apt-get install -y nginx


RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /etc/service/nginx
ADD start.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

RUN service nginx start

RUN cat /etc/nginx/nginx.conf

RUN ls /etc/nginx/sites-enabled/

EXPOSE 8080


RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*