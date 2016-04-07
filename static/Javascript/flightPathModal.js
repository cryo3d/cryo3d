function showEditFlightPathModal(){
	flightPathDropDownList = jQuery.ajax({
	    url: "../PHP/populateTourNameList.php",
	    type: "GET",
	});
	flightPathDropDownList.always(function(){
	    $('#editFlightPathModal').html(flightPathDropDownList.responseText);
	});
}

function insertNewTourName(){
	var name = document.getElementById("tourName").value;

    $.ajax({
    url: 'PHP/insertNewTourName.php',
    type: "get", //send it through get method
 	data:{tourName: name},
    error: function (xhr, status, error) {
        // executed if something went wrong during call
        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
    },
    success: function() {
   		 //alert("No errors");
   	}
});
}

function showAddFlightPathModal(){
	document.getElementById("editFlightPathModal").innerHTML =  '<center><h2>Pick a tour name:</h2><br><br>' +
															'<input id="tourName" class="textForm" type="text">' +
															'</button>' +
															'<button onclick="insertNewTourName()" class="flightPathModalButton" style"height:25px">' +
															'OK</button></center>';
}

function editFlightPathModalToggle() { // the admin's flight path modal
	var e = document.getElementById("editFlightPathModal");
	e.innerHTML = '<button onclick="showEditFlightPathModal()" class="flightPathModalButton">' +
					'Edit Existing Flight Path' +
					'</button><button onclick="showAddFlightPathModal()" class="flightPathModalButton">' +
					'Add New Flight Path</button>';
	if(e.style.display == 'none')
		e.style.display = 'block';
	else
		e.style.display = 'none';
}

function flightPathModalToggle() { // the user's flight path modal
	var e = document.getElementById("flightPathModal");
	flightPathList = jQuery.ajax({
	    url: "../PHP/listFlightPaths.php",
	    type: "GET",
	});
	flightPathList.always(function(){
	    $('#flightPathModal').html(flightPathList.responseText);
	});

	if(e.style.display == 'none')
		e.style.display = 'block';
	else
		e.style.display = 'none';	
}

var e2 = document.getElementById('flightpathsadmin');
e2.onclick = editFlightPathModalToggle;

var e3 = document.getElementById('flightpathsuser');
e3.onclick = flightPathModalToggle;

function takeTour(){
	var tourSelect = document.getElementById("cryodb");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;
	getWaypoints(tour);
}

function addFlightPath(){
    $.ajax({
	    url: 'PHP/addFlightPath.php',
	    error: function (xhr, status, error) {
	        // executed if something went wrong during call
	        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function() {
       		 //alert("No errors");
       	}
	});
}

