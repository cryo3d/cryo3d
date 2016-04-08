function showEditFlightPathModal(){
	flightPathDropDownList = jQuery.ajax({
	    url: "../PHP/populateTourNameList.php",
	    type: "GET",
	});
	flightPathDropDownList.always(function(){
	    $('#editFlightPathModal').html(flightPathDropDownList.responseText);
	});
}

function nameNewTour(){
	var name = document.getElementById("tourName").value;

}

function insertNewTourName(){
	var name = document.getElementById("tourName").value;

    $.ajax({
    url: 'PHP/insertNewTourName.php',
    type: "GET",
 	data:{tourName: name},
    error: function (xhr, status, error) {
        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
    },
    success: function() {
   	}
	});
}

function showAddFlightPathModal(){
	document.getElementById("editFlightPathModal").innerHTML =  '<center><h2>Pick a tour name:</h2><br><br>' +
															'<input id="tourName" class="textForm" type="text">' +
															'</button>' +
															'<button onclick="nameNewTour()" class="flightPathModalButton" style"height:25px">' +
															'OK</button></center>';
}

function editFlightPathModalToggle() { // the admin's flight path modal
	var e = document.getElementById("editFlightPathModal");

	if(e.style.display == 'none'){
		hideAllModals();
		e.style.display = 'block';
		e.innerHTML = '<button onclick="showEditFlightPathModal()" class="flightPathModalButton">' +
					'Edit Existing Flight Path' +
					'</button><button onclick="showAddFlightPathModal()" class="flightPathModalButton">' +
					'Add New Flight Path</button>';	
	}
	else{
		e.style.display = 'none';
	}
}

var e2 = document.getElementById('flightpathsadmin'); //flightpath admin menubar button
e2.onclick = editFlightPathModalToggle;


function addFlightPath(){
    $.ajax({
	    url: 'PHP/addFlightPath.php',
	    error: function (xhr, status, error) {
	        if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
	    },
	    success: function() {
       	}
	});
}

function editExistingFlightPathUI(){
	var tourSelect = document.getElementById("editFP");
	var selectedText = tourSelect.options[tourSelect.selectedIndex].text;
	var tour = selectedText;


	editPathStuff = jQuery.ajax({
	    url: "../PHP/editExistingTour.php",
	    type: "GET",
	    data: 'name=' + tour,
		dataType: 'json',		    
	});
	editPathStuff.always(function(){
	    $('#editFlightPathModal').html(editPathStuff.responseText);
	});
}

function getWaypointFields(){
	var selected = document.getElementById("editWP");
	var txt = "";
	var i;
	for (i = 0; i < selected.length; i++) {
	    if (selected[i].checked) {
	        txt = txt + selected[i].value + " ";
	    }
	}

	$.ajax({
		type: "GET",
	    url: 'PHP/waypointAttrs.php',
	    data: 'name=' + txt,
		dataType: 'json',		    
	    error: function (xhr, status, error) {
	        if (xhr.status > 0) alert('got error: ' + status);
	    },
	    success: function(data) {
	   		showWaypointFields(data);
	   	}
	});		
}

function showWaypointFields(attrs){
	if(attrs.length > 0){
		var waypoint = attrs[0];
		var tour = attrs[1];
		var latitude = attrs[2];
		var longitude = attrs[3];
		var description = attrs[4];		
		var num = attrs[5];	
	}
	var htmlStr = 'Latitude: <input type="text" id="newLat" value="' + latitude + '"><br>';
	htmlStr = htmlStr + 'Longitude: <input type="text" id="newLong" value="' + longitude + '"><br>';
	htmlStr = htmlStr + 'Description: <input type="text" id="newDesc" value="' + description + '"><br>';
	htmlStr = htmlStr + '<button onclick="updateWaypoint(\'' + tour + '\',\'' + waypoint + '\')">SAVE</button><br>';
	//TO DO: confirmDeleteToggle not properly showing "are you sure?" modal
	//htmlStr = htmlStr + '<button onclick="confirmDeleteToggle(\'' + tour + '\',\'' + waypoint + '\')">DELETE</button><br>';
	htmlStr = htmlStr + '<button onclick="removeWaypoint(\'' + tour + '\',\'' + waypoint + '\')">DELETE</button><br>';
	document.getElementById("waypointAttrsDiv").innerHTML = htmlStr;
}

function confirmDeleteToggle(tour, waypoint) { // the admin's flight path modal
	var e = document.getElementById("confirmDeleteModal");

	if(e.style.display == 'none'){
		hideAllModals();
		e.style.display = 'block';
		e.innerHTML = '<b>Are you sure you would like to delete this waypoint?</b><br>' +
					'<button onclick="yesDelete(\'' + tour + '\',\'' + waypoint + '\')">YES</button>' +
					'<button onclick="noDelete()">NO</button>';	
	}
	else{
		e.style.display = 'none';
	}
}

function yesDeleteWaypoint(tour, waypoint){
	var e = document.getElementById("confirmDeleteModal");
	e.style.display = 'none';
	removeWaypoint(tour, waypoint);
}

function noDeleteWaypoint(){
	var e = document.getElementById("confirmDeleteModal");
	e.style.display = 'none';
}