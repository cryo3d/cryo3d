/* Removes all points/lines on map, plots the selected tour on the map,
connects the waypoints with flightpaths, adds first/last button to
pin entities */
function plotManualTour(points, tour){
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
	      	/*pin.description = description +
	      		'<div style="text-align:center; padding:10px">' +	
	      		'<button class="lastButton">Last Waypoint</button>' +	
	      		'<button class="nextButton">Next Waypoint</button></div>';	*/

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
		flyToFirstWaypoint();
	}
}

/* Called during a manual tour when the user clicks "next" */
function manualPilotNext(){
	var oldPin = waypoints[currentPinIndex];
	removeDescriptionBox();
	addManualCameraListeners();
	var newIndex = currentPinIndex + 1;
	if (newIndex > waypoints.length - 1){
		newIndex = 0;
	}
	currentPinIndex = newIndex;

	var pin = waypoints[currentPinIndex];
	var latitude = parseFloat(pin.lat);
    var longitude = parseFloat(pin.lon);
	flyToNextPin(oldPin, pin, 0.2, 0.5);
}

/* Called during a manual tour when the user clicks "last" */
function manualPilotLast(){
	var oldPin = waypoints[currentPinIndex];
	removeDescriptionBox();
	addManualCameraListeners();
	var newIndex = currentPinIndex - 1;
	if (newIndex < 0){
		newIndex = waypoints.length - 1;
	}
	currentPinIndex = newIndex;

	var pin = waypoints[currentPinIndex];
	var latitude = parseFloat(pin.lat);
    var longitude = parseFloat(pin.lon);
	flyToNextPin(oldPin, pin, 0.2, 0.5);
}

/* Triggered when the user selects a tour and then clicks "Manual" */
function takeTour(){
	hideAllModals();
	var tourSelect = document.getElementById("cryodb");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;
	getWaypointsForManualTour(tour);
}

/* Flies to first pin of the selected tour */
function flyToFirstWaypoint(){
	hideAllModals();
	addManualCameraListeners();
	currentPinIndex = 0;
	var latitude = parseFloat(waypoints[currentPinIndex].lat);
    var longitude = parseFloat(waypoints[currentPinIndex].lon);
	flyTo(latitude, longitude, 0.2, 10.0, true);	
	showLastNextButtons();

}

/* gets called when we are in a manual tour and somebody clicks on a pin
(instead of clicking next or last) so we update the currentPinIndex so
that when they click the next ot last button in the description box it goes
to the correctly updated pin */
function updateCurrentPinIndex(lat, lon){
	for (var i = 0; i < waypoints.length; i++){
		if ((waypoints[i].lat == lat) && (waypoints[i].lon == lon)){
			currentPinIndex = i;
			break;
		}
	}
}

function showLastNextButtons(){
	hideAllModals();
	var last = document.getElementById("lastButton");
	var next = document.getElementById("nextButton");
	last.style.display = 'inline-block';
	next.style.display = 'inline-block';
}

function showDescriptionBox(){
	viewer.selectedEntity = waypoints[currentPinIndex];
	viewer.camera.moveEnd.removeEventListener(showDescriptionBox);
	viewer.camera.moveStart.removeEventListener(removeDescriptionBox);
}

function removeDescriptionBox(){
	viewer.selectedEntity = null;
}

function addManualCameraListeners(){
	viewer.camera.moveEnd.addEventListener(showDescriptionBox);
	viewer.camera.moveStart.addEventListener(removeDescriptionBox);
}

function removeManualCameraListeners(){
	viewer.camera.moveEnd.removeEventListener(showDescriptionBox);
}
