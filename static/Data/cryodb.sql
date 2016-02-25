-- run the following command to create the database:
-- mysql -u -"insert username here" -p < "cryodb.sql"

-- to populate the db enter the following command:
-- mysql -u "insert username here" -p cryodb < populate_cryodb.sql

-- to dump your schema n such to a file run this command in command prompt:
-- mysqldump -u "insert username here" -p cryodb > schemadump.txt

-- To have this file run and dump the outputs with commands run the following in a command line:
-- mysql -t -vvv -u "insert username here" -p < querylist.sql > queryresults.txt

-- Note: the -t flag gives you the interactive print (boxes and stuff) and the -vvv prints the commands

-- Resources: http://optlab.mcmaster.ca/jiangm5/cs3db3/Tutorial%20(JAN%2023&25)/E-R%20example.pdf
-- http://i.stack.imgur.com/q40BX.jpg


drop database if exists cryodb;
create database cryodb;

use cryodb;

drop table if exists flightpath;
drop table if exists waypoint;

create table waypoint
(
	waypoint_ID		int,
	waypoint_name	varchar(15),
	waypoint_lat	varchar(15),
	waypoint_long	varchar(15),
	waypoint_desc	Text,
	primary key (waypoint_ID)

);

create table  flightpathEntry
(
	flightpathEntry_ID	int,
	flightpath_name	varchar(15),
	waypoint_ID		int,
	primary key (flightpathEntry_ID),
	foreign key (waypoint_ID) references waypoint(waypoint_ID)
		on delete set null

);