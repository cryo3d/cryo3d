$.getScript('../Build/Cesium/Cesium.js', function(){
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
	
	/* Flies to destination and zooms in to specified rectangle */
	function flyFlightPaths(){
		var latitude = 70.9208667;
        var longitude = -40.170726;

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

	/* Reads flightpath info from json and populates globe with waypoints and flightpaths */
	/* TO DO: instead of displaying all of them on the globe at once, have dropdown list of
	tours to choose from and display specific flight path when selected */
	var pinCount = 0;
	var lastPinLat = 0;
	var lastPinLong = 0;
	function loadFlightPaths(){
	    var x = 0;
	    var flightPaths=jsonstr;
	    var flightPathData = flightPaths[0];
	    for(var tourName in flightPathData){
	        var tourNameObj = flightPathData[tourName];
	        pinCount = 0;
	    	for(var pinName in tourNameObj){
	    		var pinObj = tourNameObj[pinName];
		        var latitude = pinObj["latitude"];
		        var longitude = pinObj["longitude"];
		        var description = pinObj["description"];

				var pinBuilder = new Cesium.PinBuilder();
		    	var pin = viewer.entities.add({
		      	name : pinName,
		      	position : Cesium.Cartesian3.fromDegrees(longitude, latitude),
		      	billboard : {
		        image : pinBuilder.fromColor(Cesium.Color.CORNFLOWERBLUE, 36).toDataURL(),
		        verticalOrigin : Cesium.VerticalOrigin.BOTTOM
		      	} 	
		    	});
		      	pin.description = description +
		      		'<div style="text-align:center; padding:10px"><button class="clickButton">' +
		      		'Next Waypoint</button></div>';

		      	if (pinCount != 0){
		      		drawFlightPath([[lastPinLong, lastPinLat], [longitude, latitude]]);
		      	}
		      	lastPinLat = latitude;
		      	lastPinLong = longitude;
		      	pinCount++;
	    	}
	    }
	}

	// Since the viewer is newly constructed, the iframe is still about:blank.
	// This listens for the iframe to change to the Cesium description template,
	// which only happens once at startup.
	viewer.infoBox.frame.addEventListener('load', function() {
	    // Now that the description is loaded, register a click listener inside
	    // the document of the iframe.
	    viewer.infoBox.frame.contentDocument.body.addEventListener('click', function(e) {
	        // The document body will be rewritten when the selectedEntity changes,
	        // but this body listener will survive.  Now it must determine if it was
	        // one of the clickable buttons.
	        if (e.target && e.target.className === 'clickButton') {
	            flyFlightPaths();
	        }
	    }, false);
	}, false);

	loadFlightPaths();
});