echo "Stopping all Docker containers..."
docker stop $(docker ps -a -q);

echo "Removing all Docker containers..."
docker rm $(docker ps -a -q);

echo "Pulling down php and mysql docker images"
docker pull nmcteam/php56;
docker pull sameersbn/mysql;

echo "Building the Docker image..."
docker build -t some-content-nginx .;

echo "Exposing port 8080 and running Docker image on Local Host"
docker run \
    -d \
    -p 9000:9000 \
    -v $(pwd)/php-fpm.conf:/etc/php5/fpm/php-fpm.conf \
    -v $(pwd):/var/www \
    --name php \
    nmcteam/php56;

docker run \
    -d \
    -p 8080:80 \
    -v $(pwd)/vhost.conf:/etc/nginx/sites-enabled/vhost.conf \
    -v $(pwd):/var/www \
    --link php \
    --name web \
    some-content-nginx;

echo "You may now navigate to Local Host 8080"
