docker cp ./static/Data/cryodb.sql db:/var/lib/mysql/cryodb.sql

#Assures that the mysql server starts before we try to restore it
docker exec -it db /etc/init.d/mysql start

#Restoring mysql database with backedup data
docker exec db /bin/sh -c "mysql cryodb < /var/lib/mysql/cryodb.sql"
