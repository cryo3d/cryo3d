/* Creates event listener to update the currently selected pin */
var pinClickedHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
pinClickedHandler.setInputAction(function(click) {
    var pickedObject = scene.pick(click.position);
    if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id.tourName)) {
        updateCurrentPinIndex(pickedObject.id.lat, pickedObject.id.lon);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

/* Creates event listeners for the next/last buttons for our manual tours */
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