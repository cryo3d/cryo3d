# Sample Queries

# To have this file run and dump the outputs run the following in a command line:
# mysql -t -vvv -u alihakimi -p < querylist.sql > queryresults.txt


use cryodb;

#Output all the waypoints in the greenland tour or the alaska tour
select waypoint_name from waypoint natural join flightpathEntry where flightpath_name = "Greenland Tour";
select waypoint_name from waypoint natural join flightpathEntry where flightpath_name = "Alaska Tour";

#get the name and coordinates of all the waypoints in a flightpath
select waypoint_name,waypoint_lat as Lattitude,waypoint_long as Longitude from waypoint natural join flightpathEntry where flightpath_name = "Alaska Tour";