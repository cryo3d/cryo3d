function menuBarToggle() {  
		var e = document.getElementById("menuBar");
		if(e.style.display == 'block'){
			e.style.display = 'none';
		}
		else{
			e.style.display = 'block';
		}
}

function adminLoginToggle() {
	var e = document.getElementById("openModal");
		if(e.style.display == 'none'){
			hideAllModals();
			e.style.display = 'block';
		}
		else{
			e.style.display = 'none';
		}
}

function hideAllModals(){
	var e = document.getElementById("openModal");
	var e1 = document.getElementById("editFlightPathModal");
	var e2 = document.getElementById("flightPathModal");
	var e3 = document.getElementById("confirmDeleteModal");
	var lastButton = document.getElementById("lastButton");
	var nextButton = document.getElementById("nextButton");
	e.style.display = 'none';
	e1.style.display = 'none';
	e2.style.display = 'none';
	e3.style.display = 'none';
	lastButton.style.display = 'none';
	nextButton.style.display = 'none';

}