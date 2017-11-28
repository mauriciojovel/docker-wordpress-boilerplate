#!/bin/bash
read -p "Client Theme directory: " client_theme_name
read -p "Client Theme title: " client_title
read -p "Theme php package: " php_package
read -p "Theme functions prefix: " function_prefix
read -p "i18 prefix: " i18n_prefix
read -p "Client url: " client_url
read -p "Client port: " client_port
cp -r client-bootstrap $client_theme_name
find $client_theme_name -type f -print0 | xargs -0 sed -i "s/__php_package__/$php_package/g"
find $client_theme_name -type f -print0 | xargs -0 sed -i "s/Client Bootstrap Theme/$client_title/g"
find $client_theme_name -type f -print0 | xargs -0 sed -i "s/client_theme_bootstrap/$function_prefix/g"
find $client_theme_name -type f -print0 | xargs -0 sed -i "s/client-theme-bootstrap/$i18n_prefix/g"
sed -i "s/client-bootstrap/$client_theme_name/g" ../../docker-compose.yml
sed -i "s/nginx:local.dev/nginx:$client_url/g" ../../docker-compose.yml
sed -i "s/80:80/$client_port:$client_port/g" ../../docker-compose.yml
sed -i "s/listen 80/listen $client_port/g" ../../docker/nginx/default.conf
sed -i "s/local.dev/$client_url:$client_port/g" "$client_theme_name/src/gulpfile.js"
