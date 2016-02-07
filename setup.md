##Development:
*Questions? Get in contact with:*
- Michelle Bray 		michelle.bray@colorado.edu
- Ali Hakimi			ali.hakimi@colorado.edu
- Annie Kelly			annie.kelly@colorado.edu
- Chris Gray			chris.gray@colorado.edu
- Lincoln Samelson		lincoln.samelson@colorado.edu
- Olivia Abrant			olivia.abrant@colorado.edu

###Initial Setup
####Github
Install Git if you do not already have it.  Click [here](https://help.github.com/articles/set-up-git/#platform-all) for setup instructions for all operating systems.

Fork the Cryo3D repo on Github:
- Find the Cryo3D repository [here] (https://github.com/cryo3d/cryo3d)
- In the top right corner of the page, click '**Fork**'
- Having trouble? Visit [Github's site](https://help.github.com/articles/fork-a-repo/)

####Local
Create a `/workspaces` directory and cd into it

Clone your fork of the Cryo3D repo into your workspaces directory
```
$ git clone {URL_of_your_fork}
```

Use `$ git remote -v` to check for a list of remotes synced to this local repo.  Ensure origin links back to your own fork.

Set an upstream path to sync back with the master branch of the original Cryo3D repo (you will use your own fork with branching for development and create pull requests back into the "master" repo.  This will ensure safe, consistent code via code reviews)

To set the appropriate upstream, type the following into your terminal:
```
$ git remote add upstream https://github.com/cryo3d/cryo3d
```

Throughout development cycle, pull changes from upstream to stay up-to-date with "master."  Use the following commands:
```
$ git fetch upstream name_of_branch
$ git pull upstream name_of_banch
```
**Make sure to checkout a new branch (on your own fork) with each major story/feature**

####Docker
Install Docker.  Reference Docker's setup instructions [here](http://docs.docker.com/windows/started/).  Links to help with all OS's can be found from this page.

Keep in mind that virtualization must be enabled.  This means a little extra setup work for OSX users.

For a simple 'Hello World' program with Docker, navigate [here] (https://github.com/docker-library/hello-world)

A detail explanation of how this works can be found [here] (https://github.com/docker-library/docs/tree/master/hello-world)

For a list of all running containers:
```
$ docker ps -l
```

`$ echo $DOCKER_HOST` within the container to bind the docker host to exposed port (8080 in this case) 

To stop/remove all Docker containers (this needs to be done frequently, as containers do not disappear when closing Docker):
```
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)
```

####Nginx
Install Nginx.  The Wiki for doing so can be found [here] (https://www.nginx.com/resources/wiki/).

Fork this repository into your workspaces directory

`cd` into root (base of working directory).

To build an image using the Dockerfile (Note: the -t flag tags the resulting image with the name provided, in this case some-content-nginx), run:
```
docker build -t some-content-nginx .
```

Next, run a container from the resulting image with
```
docker run --name some-nginx -d -p 8080:80 some-content-nginx
```

The server is now up and running at http://{$DOCKER_HOST}:8080/. Make sure to replace the last colon and following four digits in your $DOCKER_HOST with our exposed port number (:8080).

For now, a Cesium helloworld homepage should be printed to the screen.