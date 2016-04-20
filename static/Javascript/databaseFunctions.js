function getTourNames(){
	$.ajax({
	    data: "",
	    url: 'PHP/tournames.php',
 	    dataType: 'json',		    
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        //if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	    	for (var i = 0; i < data.length; i++){
	   			 getWaypoints(data[i]);
	    	}
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
	        //if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   		plotTour(data, tour);
	   	}
	});				
}


function getWaypointsForManualTour(tour){
	$.ajax({
		type: "GET",
	    url: 'PHP/waypoints.php',
	    data: 'name=' + tour,
		dataType: 'json',		    
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        //if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   		plotManualTour(data, tour);
	   	}
	});				
}

function getWaypointsForAutoTour(tour){
	$.ajax({
		type: "GET",
	    url: 'PHP/waypoints.php',
	    data: 'name=' + tour,
		dataType: 'json',		    
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        //if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   		plotAutoTour(data, tour);
	   	}
	});				
}

function updateWaypoint(tour, waypoint){
	var lat = String(document.getElementById("newLat").value);
	var longd = String(document.getElementById("newLong").value);
	var des = String(document.getElementById("newDesc").value);

	$.ajax({
		type: "GET",
	    url: 'PHP/editWaypoint.php',
	    data: 'name=' + waypoint + '&tour=' + tour + '&lat=' + lat + '&long=' + longd + '&desc=' + des,
		dataType: 'html',		    
	    error: function (xhr, status, error) {
	        //if (xhr.status > 0) alert('got error: ' + status + ' , ' + error); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   	}
	});			
}

function removeWaypoint(tour, waypoint){
	$.ajax({
		type: "GET",
	    url: 'PHP/deleteWaypoint.php',
	    data: 'name=' + waypoint + '&tour=' + tour,
		dataType: 'html',		    
	    error: function (xhr, status, error) {
	        //if (xhr.status > 0) alert('got error: ' + status + ' , ' + error); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   	}
	});	
}

/* TO DO: make call to PHP script that can insert a
waypoint on a preexisting tour */
function addWaypoint(){}