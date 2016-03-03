/* populate relations */

use cryodb;

insert into waypoint values (00000001,"Greenland-1", "66.9208667", "-43.170726", "This is Greenland up close and personal... AKA totally white. Despite its name, Greenland actually means 'Land of People.'");
insert into waypoint values (00000001,"Greenland-2", "70.9208667","-40.170726","This is the 2nd location in Greenland");
insert into waypoint values (00000001,"Greenland-3", "75.9208667","-40.170726","Location 3");
insert into waypoint values (00000002,"Anchorage","58.271403","-134.443284", "This place cold.");
insert into waypoint values (00000002,"Juneau","61.195141","-149.809919","This place also cold.");
insert into waypoint values (00000002,"Fairbanks","64.833965","-147.657242","This place is fair.");
insert into flightpathEntry values(0001,"Greenland");
insert into flightpathEntry values(0002,"Alaska");

