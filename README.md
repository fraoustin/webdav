# Docker Image for gitweb

generate a nginx server webdav

You can use client

- ihm on http://127.0.0.1/ (fraoustin/Nginx-Fancyindex-Theme)
- windows : winscp https://sourceforge.net/projects/winscp/
- android : in play store you can find apps (WebDAV Navigator Lite, ...)
- linux : by nautilus (davfs://127.0.0.1/) or by davfs2 

    apt-get install davfs2

    mount.davfs http://127.0.0.1 /media/mywebdav

You can read https://doc.ubuntu-fr.org/davfs2


load when start image load file in

- /usr/share/gitweb/docker-entrypoint.pre
- /usr/share/gitweb/docker-entrypoint.post

## Parameter

- SET_CONTAINER_TIMEZONE (false or true) manage time of container
- CONTAINER_TIMEZONE timezone of container
- DAVUSER (default user)
- DAVPASSWORD (default pass)
- COLOR (default blue) for web ihm (blue, green, grey, greydark, orange, purple, red)

## Volume

- /share

## Port

- 80 

## Command

- addauth : add user for git
- rmauth : remove user

## Usage direct

run image fraoustin/webdav

    docker run -d -v <localpath>:/share --name webdav -p 80:80 fraoustin/webdav

user default is *user* and password default is *pass*

you use http://localhost/ for access ihm

## Usage by Dockerfile

Sample of Dockerfile

    FROM fraoustin/webdav
    COPY ./00_init.sh /usr/share/docker-entrypoint.pre/00_init.sh
    RUN chmod +x -R /usr/share/gitweb/docker-entrypoint.pre

File 00_init.sh

    #!/bin/bash
    if [ ! -z "$DAVUSER" ]; then
        addauth $DAVUSER $DAVPASSWORD
    fi    


build image mywebdav

    docker build -t mywebdav .

run image mywebdav

    docker run -d -e "CONTAINER_TIMEZONE=Europe/Paris" -e DAVUSER=myuser" -e "DAVPASSWORD=mypassword" -v <localpath>:/share --name test -p 80:80 mywebdav

## External library

- mdl on https://getmdl.io/
- Nginx-Fancyindex-Theme on https://github.com/fraoustin/Nginx-Fancyindex-Theme
- wedav.js on https://github.com/aslakhellesoy/webdavjs


