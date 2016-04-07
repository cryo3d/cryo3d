function initViewer()
    {
        var extent = Cesium.Rectangle.fromDegrees(-99.240573,41.808406,20.313421,86.468825);
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
        var viewer = new Cesium.Viewer('cesiumContainer', {
        animation : false,
        timeline : false,
        });
 
        return viewer;
    }
 
    var viewer = initViewer();

/* Allows us to run our own custom scripts */
viewer.infoBox.frame.removeAttribute('sandbox');	
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

function getTourNames(){
	$.ajax({
	    data: "",
	    url: 'PHP/tournames.php',
 	    dataType: 'json',		    
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   		 getWaypoints(data);
	   	}
		});
}


function getWaypoints(tour){
	$.ajax({
		type: "GET",
	    url: 'PHP/waypoints.php',
	    data: 'name=' + tour,
		    dataType: 'json',		    
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   		plotTour(data, tour);
	   	}
	});				
}

function plotTour(points, tour){
	var waypoints = [];

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
	      		drawFlightPath([[lastPinLong, lastPinLat], [longitude, latitude]]);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	

	      	//waypoints.push(pin);
	      	autopilotTest(pin);		

		}

		//autopilot(waypoints);

	}

}

function autopilot(waypoints){
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

function autopilotTest(waypoint){
	/* currently flies to russia ?? */
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