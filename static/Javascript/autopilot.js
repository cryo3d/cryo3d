/* Triggered when the user selects a tour and then clicks "Autopilot" */
function autopilot(){
	hideAllModals();
	var tourSelectList = document.getElementById("cryodb");
	var selectedTour = tourSelectList.options[tourSelectList.selectedIndex].text;
	getWaypointsForAutoTour(selectedTour);	
}

/* Removes all points/lines on map, plots the selected tour on the map,
connects the waypoints with flightpaths, adds first/last button to
pin entities */
function plotAutoTour(points, tour){
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
	      		var flightPath = drawFlightPath([lastPinLong, lastPinLat], [longitude, latitude]);
	      		allEntities.push(flightPath);
	      	}
	      	lastPinLat = latitude;
	      	lastPinLong = longitude;
	      	pinCount++;	

	      	allEntities.push(pin); // keeps track of pins we've drawn so we can delete later
	      	waypoints.push(pin); // keeps track of pins in the currently selected tour
		}
		if(numPoints > 2){
	  		var flightPath = drawFlightPath([points[numPoints-1][2], points[numPoints-1][1]], [points[0][2], points[0][1]]);
	  		allEntities.push(flightPath);	
		}
		startTour();
	}
}

/* Flies to first pin of the selected tour */
function startTour(){
	addAutopilotEventListeners();
	currentPinIndex = 0;
	var latitude = parseFloat(waypoints[currentPinIndex].lat);
    var longitude = parseFloat(waypoints[currentPinIndex].lon);
	flyTo(latitude, longitude, 0.2, 5.0);		
}

/* Called automatically when camera stops moving, then starts
flying to the next waypoint */
function nextPoint(){
	var oldPin = waypoints[currentPinIndex];
	viewer.selectedEntity = oldPin;
	var newIndex = currentPinIndex + 1;
	if (newIndex > waypoints.length - 1){ //end of tour
		removeAutopilotEventListeners();
	}
	else{ //go to next point
		currentPinIndex = newIndex;
		var pin = waypoints[currentPinIndex];
		var latitude = parseFloat(pin.lat);
	    var longitude = parseFloat(pin.lon);
	    pauseFirstThenFlyTo(oldPin, pin, 0.2, 0.5, 5000);		
	}
}

/* groundSpeed should be very small since the distances are measured
in degrees */
function pauseFirstThenFlyTo(pin1, pin2, zoom, groundSpeed, pauseTime){ 
	setTimeout(function() {
		  flyToNextPin(pin1, pin2, zoom, groundSpeed);
	}, pauseTime);
}

function addAutopilotEventListeners(){
	viewer.camera.moveEnd.addEventListener(nextPoint);
}

function removeAutopilotEventListeners(){
	viewer.camera.moveEnd.removeEventListener(nextPoint);
}
