/* Connect 2 waypoints on map and draw a line */
function drawFlightPath(waypoints){
	var points = [];
	for (var i = 0; i < waypoints.length; i++){
		points.push(waypoints[i][0]);
		points.push(waypoints[i][1]);
	}		
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

function plotTour(points, tour){
	var waypoints = [];

	if (plottedPoints.length > 0){
		for (var j = 0; j < plottedPoints.length; j++){
			viewer.entities.remove(plottedPoints[j]);
		}
	}

	if (points.length > 0){
		var pinCount = 0;
		for(var i = 0; i < points.length; i++){
			var pinName = points[i][0];
			var latitude = points[i][1];
			var longitude = points[i][2];
			var description = points[i][3];
			var pinBuilder = new Cesium.PinBuilder();
	    	var pin = viewer.entities.add({
	    	tourName : tour,
	      	name : pinName,
	      	position : Cesium.Cartesian3.fromDegrees(longitude, latitude),
	      	billboard : {
	        image : pinBuilder.fromColor(Cesium.Color.CORNFLOWERBLUE, 36).toDataURL(),
	        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
	      	} 	
	    	});
	      	pin.description = description;	

	      	if (pinCount != 0){
	      		var line = drawFlightPath([[lastPinLong, lastPinLat], [longitude, latitude]]);
	      		plottedPoints.push(line);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	

	      	plottedPoints.push(pin);
	      	waypoints.push(pin);
	      	autopilot(pin);		

		}

		//autopilotAll(waypoints);
	}

}

function takeTour(){
	var tourSelect = document.getElementById("cryodb");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;
	getWaypoints(tour);
}

function autopilotAll(waypoints){
	for(var i = 0; i < waypoints.length; i++){
		var positions = waypoints[i].position;

		var latitude = positions.getValue().y;
	    var longitude =positions.getValue().x;

		var west = longitude - 0.5;
		var south = latitude - 0.5;
		var east = longitude + 0.5;
		var north = latitude + 0.5;
		var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

		viewer.camera.flyTo({
	    	destination : Cesium.Cartesian3(longitude, latitude),
	    	duration : 10.0
		});
	}
}

function autopilot(waypoint){
	//viewer.zoomTo(waypoint); // works but zooms in all the way without nice flying animation

	/* below code currently flies to russia ?? */
	var positions = waypoint.position;

	var latitude = toDegrees(positions.getValue().y);
    var longitude = toDegrees(positions.getValue().x);

	var west = longitude - 0.5;
	var south = latitude - 0.5;
	var east = longitude + 0.5;
	var north = latitude + 0.5;
	var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

	viewer.camera.flyTo({
    	destination : rectangle,
    	duration : 8.0
	});
}

function toDegrees(radians){
	var pi = Math.PI;
	return (radians * (180/pi));
}

var plottedPoints = [];