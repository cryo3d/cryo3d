function flightPathModalToggle() { // the user's flight path modal
	var e = document.getElementById("flightPathModal");

	if(e.style.display == 'none'){
		hideAllModals();
		e.style.display = 'block';
		flightPathList = jQuery.ajax({
		    url: "../PHP/listFlightPaths.php",
		    type: "GET",
		});
		flightPathList.always(function(){
		    $('#flightPathModal').html(flightPathList.responseText);
		});	
	}
	else{
		e.style.display = 'none';
	}

}

var e3 = document.getElementById('flightpathsuser');
e3.onclick = flightPathModalToggle;