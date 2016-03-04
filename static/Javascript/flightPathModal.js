function showEditFlightPathModal(){
	document.getElementById("flightPathModal").innerHTML = "Edit stuff!";
}
function showAddFlightPathModal(){
	document.getElementById("flightPathModal").innerHTML = "Add stuff!";
}

function flightPathModalToggle() {
	var e = document.getElementById("flightPathModal");
	e.innerHTML = '<button onclick="showEditFlightPathModal()" class="flightPathModalButton">Edit Flight Path</button><button onclick="showAddFlightPathModal()" class="flightPathModalButton">Add Flight Path</button>';
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

