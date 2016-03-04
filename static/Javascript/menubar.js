function menuBarToggle() {  
		var e = document.getElementById("menuBar");
		if(e.style.display == 'block')
		e.style.display = 'none';
		else
		e.style.display = 'block';
}

function adminLoginToggle() {
	var e = document.getElementById("openModal");
		if(e.style.display == 'none')
		e.style.display = 'block';
		else
		e.style.display = 'none';
}