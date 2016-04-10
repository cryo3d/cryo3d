var waypoints = [];
var plottedPoints = []; //keeps track of all entities drawn on the map

/* Connect 2 waypoints on map and draw a line */
function drawFlightPath(point1, point2){
	var points = [point1[0], point1[1], point2[0], point2[1]];
	var redLine = viewer.entities.add({
	    name : 'Red line on the surface',
	    polyline : {
	        positions : Cesium.Cartesian3.fromDegreesArray(points),
	        width : 3,
	        material : Cesium.Color.RED
	    }
	});
	return redLine;
}	

function plotTour(points, tour){ //use this when you want to plot multiple tours at once
	var numPoints = points.length;
	if (numPoints > 0){
		var pinCount = 0;
		for(var i = 0; i < numPoints; i++){
			var pinName = points[i][0];
			var latitude = points[i][1];
			var longitude = points[i][2];
			var description = points[i][3];
			var pin = createPin(tour, pinName, longitude, latitude, Cesium.Color.CORNFLOWERBLUE);
	      	pin.description = description;		

	      	if (pinCount != 0){
	      		var line = drawFlightPath([lastPinLong, lastPinLat], [longitude, latitude]);
	      		plottedPoints.push(line);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	

	      	plottedPoints.push(pin);
		}
		if(numPoints > 2){
	  		var line = drawFlightPath([points[numPoints-1][2], points[numPoints-1][1]], [points[0][2], points[0][1]]);
	  		plottedPoints.push(line);	
		}		
	}
}

function autopilotAll(waypoints){
	for(var i = 0; i < waypoints.length; i++){
		var latitude = parseFloat(waypoints[i].lat);
	    var longitude = parseFloat(waypoints[i].lon);

		var west = longitude - 0.5;
		var south = latitude - 0.5;
		var east = longitude + 0.5;
		var north = latitude + 0.5;
		var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
		flyTo(rectangle);
	}
}

function createPin(tour, pinName, longitude, latitude, color){
	var pinBuilder = new Cesium.PinBuilder();
		var pin = viewer.entities.add({
			tourName : tour,
		  	name : pinName,
		  	position : Cesium.Cartesian3.fromDegrees(longitude, latitude),
		  	lat: latitude,
		  	lon: longitude,
		  	billboard : {
		    image : pinBuilder.fromColor(color, 36).toDataURL(),
		    verticalOrigin : Cesium.VerticalOrigin.BOTTOM
	  	} 	
	});
	return pin;	
}

function flyTo(rectangle){
	var fly = viewer.camera.flyTo({
    	destination : rectangle,
    	duration : 5.0
	});	
}

function autopilot(waypoint){
	var latitude = parseFloat(waypoint.lat);
    var longitude = parseFloat(waypoint.lon);
	var west = longitude - 0.5;
	var south = latitude - 0.5;
	var east = longitude + 0.5;
	var north = latitude + 0.5;
	var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
	flyTo(rectangle);
}

function removeAllFlightPaths(){
	if (plottedPoints.length > 0){
		for (var j = 0; j < plottedPoints.length; j++){
			viewer.entities.remove(plottedPoints[j]);
		}
	}	
}

function showAllFlightPaths(){
	removeAllFlightPaths();
	getTourNames();
}

var e = document.getElementById('showallpins');
e.onclick = showAllFlightPaths;

showAllFlightPaths();
