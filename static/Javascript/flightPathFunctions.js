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

function plotOneTour(points, tour){ //deletes all other tours from map before plotting a new tour
	if (plottedPoints.length > 0){
		for (var j = 0; j < plottedPoints.length; j++){
			viewer.entities.remove(plottedPoints[j]);
		}
	}
	if (waypoints.length > 0){
		waypoints = [];
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
	      	lat: latitude,
	      	lon: longitude,	      	
	      	billboard : {
	        image : pinBuilder.fromColor(Cesium.Color.CORNFLOWERBLUE, 36).toDataURL(),
	        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
	      	} 	
	    	});
	      	pin.description = description +
	      		'<div style="text-align:center; padding:10px">' +	
	      		'<button class="clickButton">Last Waypoint</button>' +	
	      		'<button class="clickButton">Next Waypoint</button></div>';	

	      	if (pinCount != 0){
	      		var line = drawFlightPath([[lastPinLong, lastPinLat], [longitude, latitude]]);
	      		plottedPoints.push(line);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	


	      	plottedPoints.push(pin);
	      	waypoints.push(pin);
	      	//autopilot(pin);		
		}
		if(points.length > 2){
	  		var line = drawFlightPath([[points[points.length-1][2], points[points.length-1][1]], [points[0][2], points[0][1]]]);
	  		plottedPoints.push(line);	
		}

		currentPin = 0;
		manualPilot(waypoints, currentPin);
		//autopilotAll(waypoints);
	}
}


var waypoints = [];
var currentPin = 0;

function plotTour(points, tour){ //use this when you want to plot multiple tours at once
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
	      	lat: latitude,
	      	lon: longitude,
	      	billboard : {
	        image : pinBuilder.fromColor(Cesium.Color.CORNFLOWERBLUE, 36).toDataURL(),
	        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
	      	} 	
	    	});
	      	pin.description = description +
	      		'<div style="text-align:center; padding:10px">' +	
	      		'<button class="clickButton">Last Waypoint</button>' +	
	      		'<button class="clickButton">Next Waypoint</button></div>';		

	      	if (pinCount != 0){
	      		var line = drawFlightPath([[lastPinLong, lastPinLat], [longitude, latitude]]);
	      		plottedPoints.push(line);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	

	      	plottedPoints.push(pin);
	      	waypoints.push(pin);
		}
		if(points.length > 2){
	  		var line = drawFlightPath([[points[points.length-1][2], points[points.length-1][1]], [points[0][2], points[0][1]]]);
	  		plottedPoints.push(line);	
		}		
	}

}

function takeTour(){
	hideAllModals();
	var tourSelect = document.getElementById("cryodb");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;
	getWaypointsForTour(tour);
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

function manualPilot(waypoints, index){
		var latitude = parseFloat(waypoints[index].lat);
	    var longitude = parseFloat(waypoints[index].lon);

		var west = longitude - 0.5;
		var south = latitude - 0.5;
		var east = longitude + 0.5;
		var north = latitude + 0.5;
		var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
		flyTo(rectangle);

		var newIndex = index + 1;
		if (newIndex > waypoints.length - 1){
			newIndex = 0;
		}
		currentPin = newIndex;
}

function flyTo(rectangle){
	var fly = viewer.camera.flyTo({
    	destination : rectangle,
    	duration : 10.0
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

function showAllFlightPaths(){
	if (plottedPoints.length > 0){
		for (var j = 0; j < plottedPoints.length; j++){
			viewer.entities.remove(plottedPoints[j]);
		}
	}

	getTourNames();
}

var plottedPoints = [];
showAllFlightPaths();

var e = document.getElementById('showallpins');
e.onclick = showAllFlightPaths;

viewer.infoBox.frame.addEventListener('load', function(){
	viewer.infoBox.frame.contentDocument.body.addEventListener('click', function(e){
		if (e.target && e.target.className === 'clickButton'){
			manualPilot(waypoints, currentPin);
		}
	}, false);
}, false);