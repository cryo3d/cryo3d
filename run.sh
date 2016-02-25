echo "Stopping all Docker containers..."
docker stop $(docker ps -a -q);

echo "Removing all Docker containers..."
docker rm $(docker ps -a -q);

echo "Building the Docker image..."
docker build -t some-content-nginx .;

echo "Exposing port 8080 and running Docker image on Local Host"
docker-compose up -d

echo "You may now navigate to Local Host 8080"
