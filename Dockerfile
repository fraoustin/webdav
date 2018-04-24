FROM nginx:1.13
LABEL maintainer "fraoustin@gmail.com"

ENV SET_CONTAINER_TIMEZONE false 
ENV CONTAINER_TIMEZONE "" 

# manage start container
COPY ./src/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN mkdir /usr/share/docker-entrypoint.pre
RUN mkdir /usr/share/docker-entrypoint.post
COPY ./src/00_init.sh /usr/share/docker-entrypoint.pre/00_init.sh
RUN chmod +x -R /usr/share/docker-entrypoint.pre

# install extra nginx
RUN apt-get update && apt-get install -y \
        apache2-utils \
        git \
        nginx-extras \
    && rm -rf /var/lib/apt/lists/* 

COPY ./src/default.conf /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/sites-enabled/default

# add cmd nginx
COPY ./src/cmd/addauth.sh /usr/bin/addauth
COPY ./src/cmd/rmauth.sh /usr/bin/rmauth
RUN chmod +x /usr/bin/addauth
RUN chmod +x /usr/bin/rmauth

# add theme
RUN mkdir /theme
WORKDIR /theme
RUN git clone https://github.com/TheInsomniac/Nginx-Fancyindex-Theme.git

RUN mkdir /share
VOLUME /share

ENV DAVUSER user
ENV DAVPASSWORD pass

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["app"]

#docker build  --build-arg http_proxy=http://faoustin:sibylle@proxy.sodebo.fr:8080 -t test .
#docker run -d -v C:/Users/faoustin:/share -e "DAVUSER=user" -e "DAVPASSWORD=pass" --name test -p 80:80 test