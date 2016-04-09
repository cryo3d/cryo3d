echo "Stopping all Docker containers..."
docker stop $(docker ps -a -q);

echo "Removing all Docker containers..."
docker rm $(docker ps -a -q);

echo "Removing all dangling Docker images..."
docker rmi $(docker images --filter dangling=true)

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

echo "Now we sleep for 30 seconds to let mysql start up..."
sleep 30

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
echo "and exposing Docker container's port 80 to dockerhost's port 8080"

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

#Starts the nginx service, fixes problems for Windows users  
docker exec -it web bash service nginx start

