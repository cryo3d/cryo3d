function showEditFlightPathModal(){
	flightPathDropDownList = jQuery.ajax({
	    url: "../PHP/populateTourNameList.php",
	    type: "GET",
	});
	flightPathDropDownList.always(function(){
	    $('#flightPathModal').html(flightPathDropDownList.responseText);
	});
}
function showAddFlightPathModal(){
	document.getElementById("flightPathModal").innerHTML =  '<center><h2>Pick a tour name:</h2><br><br>' +
															'<input class="textForm" type="text">' +
															'</button>' +
															'<button onclick="" class="flightPathModalButton" style"height:25px">' +
															'OK</button></center>';
}

function flightPathModalToggle() {
	var e = document.getElementById("flightPathModal");
	e.innerHTML = '<button onclick="showEditFlightPathModal()" class="flightPathModalButton">' +
					'Edit Existing Flight Path' +
					'</button><button onclick="showAddFlightPathModal()" class="flightPathModalButton">' +
					'Add New Flight Path</button>';
		if(e.style.display == 'none')
		e.style.display = 'block';
		else
		e.style.display = 'none';
}

var e2 = document.getElementById('flightpaths');
e2.onclick = flightPathModalToggle;

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

