/* Creates event listener to update the currently selected pin */
var pinClickedHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
pinClickedHandler.setInputAction(function(click) {
    var pickedObject = scene.pick(click.position);
    if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id.tourName)) {
        updateCurrentPinIndex(pickedObject.id.lat, pickedObject.id.lon);
    }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
