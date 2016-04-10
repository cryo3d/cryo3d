function plotManualTour(points, tour){ //deletes all other tours from map before plotting a new tour
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
	      	pin.description = description +
	      		'<div style="text-align:center; padding:10px">' +	
	      		'<button class="lastButton">Last Waypoint</button>' +	
	      		'<button class="nextButton">Next Waypoint</button></div>';	

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

function manualPilotNext(){
	var newIndex = currentPinIndex + 1;
	if (newIndex > waypoints.length - 1){
		newIndex = 0;
	}
	currentPinIndex = newIndex;

	var latitude = parseFloat(waypoints[currentPinIndex].lat);
    var longitude = parseFloat(waypoints[currentPinIndex].lon);
	flyTo(latitude, longitude, 0.5, 8.0);	

}

function manualPilotLast(){
	var newIndex = currentPinIndex - 1;
	if (newIndex < 0){
		newIndex = waypoints.length - 1;
	}
	currentPinIndex = newIndex;

	var latitude = parseFloat(waypoints[currentPinIndex].lat);
    var longitude = parseFloat(waypoints[currentPinIndex].lon);
	flyTo(latitude, longitude, 0.5, 8.0);	
}

function takeTour(){
	hideAllModals();
	var tourSelect = document.getElementById("cryodb");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;
	getWaypointsForManualTour(tour);
}

function flyToFirstWaypoint(){
	currentPinIndex = 0;
	var latitude = parseFloat(waypoints[currentPinIndex].lat);
    var longitude = parseFloat(waypoints[currentPinIndex].lon);
	flyTo(latitude, longitude, 0.5, 8.0);	
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

viewer.infoBox.frame.addEventListener('load', function(){
	viewer.infoBox.frame.contentDocument.body.addEventListener('click', function(e){
		if (e.target && e.target.className === 'lastButton'){
			manualPilotLast();
		}
		else if (e.target && e.target.className === 'nextButton'){
			manualPilotNext();
		}
	}, false);
}, false);

pinClickedHandler.setInputAction(function(click) {
    var pickedObject = scene.pick(click.position);
    if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id.tourName)) {
        updateCurrentPinIndex(pickedObject.id.lat, pickedObject.id.lon);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);