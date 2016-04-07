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

function updateWaypoint(tour, waypoint){
	var lat = document.getElementById("newLat").value;
	var longd = document.getElementById("newLong").value;
	var des = document.getElementById("newDesc").value;

	$.ajax({
		type: "GET",
	    url: 'PHP/editWaypoint.php',
	    data: {name: waypoint, tour: tour, latitude: lat, longitude: longd, desc: des},
	    //data: 'name=' + waypoint + '&tour=' + tour + '&lat=' + lat + '&long=' + longd + '&desc=' + desc,
		dataType: 'json',		    
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function(data) {
	   		console.log("success");
	   	}
	});			
}