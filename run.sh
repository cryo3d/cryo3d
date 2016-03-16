docker exec -it db sudo sh -c "mysqldump cryodb > /var/lib/mysql/cryodb.sql"
docker cp db:/var/lib/mysql/cryodb.sql ./static/Data/cryodb.sql

echo "Stopping all Docker containers..."
docker stop $(docker ps -a -q);

echo "Removing all Docker containers..."
docker rm $(docker ps -a -q);

echo "Pulling down php and mysql docker images"
docker pull nmcteam/php56;
docker pull sameersbn/mysql;

echo "Running sameersbn/mysql image and configuring the environment"
docker run \
    -d \
    -v /var/lib/mysql \
    -e "DB_NAME=cryodb" \
    -e "DB_USER=user" \
    -e "DB_PASS=pass" \
    -e "DB_REMOTE_ROOT_NAME=root" \
    -e "DB_REMOTE_ROOT_PASS=pass" \
    --name db \
    sameersbn/mysql;

echo "Running nmcteam/php56 image and linking up to mysql database"
docker run \
    -d \
    -p 9000:9000 \
    -v $(pwd)/php-fpm.conf:/etc/php5/fpm/php-fpm.conf \
    -v $(pwd):/var/www \
    --link db \
    --name php \
    nmcteam/php56;

echo "Running some-content-nginx image, linking php and mysql,"
echo "and exposing Docker container's port 80 to localhost's port 8080"

echo "Building the Docker image..."
docker build -t some-content-nginx .;

docker run \
    -d \
    --add-host docker.dev:192.168.99.100 \
    -p 8080:80 \
    -v $(pwd)/vhost.conf:/etc/nginx/sites-enabled/vhost.conf \
    -v $(pwd):/var/www \
    --link php \
    --name web \
    some-content-nginx;

docker cp ./static/Data/cryodb.sql db:/var/lib/mysql/cryodb.sql
echo 'Run "mysql cryodb < /var/lib/mysql/cryodb.sql" in the prompt below, then exit'
#docker exec -it db /bin/bash; mysql cryodb < /var/lib/mysql/cryodb.sql
#docker exec -it db echo "mysql cryodb < /var/lib/mysql/cryodb.sql" | /bin/bash
docker exec -it db /bin/bash

#This line starts the nginx service eventhough it should already be running,
#fixes problems for Windows users  
docker exec -it web bash service nginx start

echo "You may now navigate to Local Host 8080"
