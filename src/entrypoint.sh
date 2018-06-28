#!/bin/bash
set -e

if [ $CONTAINER_TIMEZONE ] &&  [ "$SET_CONTAINER_TIMEZONE" = "false" ]; then
    echo ${CONTAINER_TIMEZONE} >/etc/timezone && dpkg-reconfigure -f noninteractive tzdata
    echo "Container timezone set to: $CONTAINER_TIMEZONE"
    export SET_CONTAINER_TIMEZONE=true
else
    echo "Container timezone not modified"
fi

if [ "$1" = 'app' ]; then
    /bin/run-parts --verbose --regex '\.(sh)$' "/usr/share/docker-entrypoint.pre"
    if [ ! -d /share/fancyindex ]; then
        echo "add Nginx-Fancyindex-Theme in share"
        cp -r /theme/Nginx-Fancyindex-Theme /share/fancyindex
    fi
    cp /share/fancyindex/mdl/color/$COLOR.min.css /share/fancyindex/mdl/material.min.css
    nginx -g "daemon off;"
    /bin/run-parts --verbose --regex '\.(sh)$' "/usr/share/docker-entrypoint.post"
fi

exec "$@"