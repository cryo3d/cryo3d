echo "Stopping all Docker containers..."
docker stop $(docker ps -a -q);

echo "Removing all Docker containers..."
docker rm $(docker ps -a -q);

echo "Building the Docker image..."
docker build -t some-content-nginx .;

echo "Exposing port 8080 and running Docker image on Local Host"
docker run --name some-nginx -d -p 8080:80 some-content-nginx;

echo "You may now navigate to Local Host 8080"