# Pull base image.
FROM ubuntu:14.04

RUN sudo apt-get update -y
RUN sudo apt-get upgrade -y

# Link binary
RUN sudo ln -s /usr/bin/nodejs /usr/bin/node

# Node.js install with Ubuntu
# Executable from Ubuntu repositories is called nodejs instead of node
RUN sudo apt-get install --yes nodejs

# Install Aptitude ("smarter than apt-get") - solves issues with broken packages
RUN sudo apt-get install aptitude -y

# Install NMP package manager
RUN sudo apt-get install npm -y

# Install NPM package manager
RUN sudo apt-get install npm

# Start web server
RUN sudo node server.js

# EXPOSE [port]
EXPOSE 8080