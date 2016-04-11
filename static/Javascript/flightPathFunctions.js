var waypoints = []; //keeps track of all waypoints during a current tour
var allEntities = []; //keeps track of all entities drawn on the map

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

/* Called when "Show all pins" is selected */
function plotTour(points, tour){
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
	      		allEntities.push(line);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	

	      	allEntities.push(pin);
		}
		if(numPoints > 2){
	  		var line = drawFlightPath([points[numPoints-1][2], points[numPoints-1][1]], [points[0][2], points[0][1]]);
	  		allEntities.push(line);	
		}		
	}
}

/* Can use this to create pin instead of rewriting all the Cesium code*/
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

/* Can use this to fly to a waypoint instead of rewriting all the Cesium code*/
function flyTo(latitude, longitude, zoom, time){
	var west = longitude - zoom;
	var south = latitude - 2*zoom;
	var east = longitude + zoom;
	var north = latitude + .5*zoom;
	var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
	
	var boxSouth = latitude - 0.5*zoom;
	var outlineRectangle = Cesium.Rectangle.fromDegrees(west, boxSouth, east, north);

	var fly = viewer.camera.flyTo({
    	destination : rectangle,
    	duration : time,
    	orientation : {
            heading : Cesium.Math.toRadians(-5.0),
            pitch : Cesium.Math.toRadians(-65.0),
            roll : 0.0
        }
	});	

	viewer.entities.add({
    	rectangle : {
	        coordinates : outlineRectangle,
	        fill : false,
	        outline : true,
	        outlineColor : Cesium.Color.RED
    	}
	});
}

/* Deletes all waypoints/flight paths from the map */
function removeAllEntities(){
	waypoints = [];
	if (allEntities.length > 0){
		for (var j = 0; j < allEntities.length; j++){
			viewer.entities.remove(allEntities[j]);
		}
	}	
}

/* Called when "Show all pins" is clicked */
function showAllFlightPaths(){
	removeAllEntities();
	getTourNames();
}

var e = document.getElementById('showallpins');
e.onclick = showAllFlightPaths;

showAllFlightPaths();

