docker stop $(docker ps -a -q);
docker rm $(docker ps -a -q);
docker build -t some-content-nginx .;
docker run --name some-nginx -d -p 8080:80 some-content-nginx;