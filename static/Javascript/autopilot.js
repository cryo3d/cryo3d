function autopilot(){
	viewer.camera.moveEnd.addEventListener(nextPoint);
	hideAllModals();
	var tourSelect = document.getElementById("cryodb");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;
	getWaypointsForAutoTour(tour);	
}

function startTour(){
	currentPinIndex = 0;
	var latitude = parseFloat(waypoints[currentPinIndex].lat);
    var longitude = parseFloat(waypoints[currentPinIndex].lon);
	flyTo(latitude, longitude, 0.5, 8.0);		
}

function nextPoint(){
	var newIndex = currentPinIndex + 1;
	if (newIndex > waypoints.length - 1){ //end of tour
		viewer.camera.moveEnd.removeEventListener(nextPoint);
	}
	else{ //go to next point
		currentPinIndex = newIndex;
		var latitude = parseFloat(waypoints[currentPinIndex].lat);
	    var longitude = parseFloat(waypoints[currentPinIndex].lon);
		flyTo(latitude, longitude, 0.5, 8.0);	
	}
}

function plotAutoTour(points, tour){ //deletes all other tours from map before plotting a new tour
	removeAllEntities();
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
	      	waypoints.push(pin);
		}
		if(numPoints > 2){
	  		var line = drawFlightPath([points[numPoints-1][2], points[numPoints-1][1]], [points[0][2], points[0][1]]);
	  		allEntities.push(line);	
		}
		startTour();
	}
}