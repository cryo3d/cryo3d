function layerPickerModalToggle() { // the user's flight path modal
	var e = document.getElementById("layerPickerModal");

	if(e.style.display == 'none'){
		hideAllModals();
		e.style.display = 'block';
	}
	else{
		e.style.display = 'none';
	}
}

function addLayerToggleOption(label, layerName, minValue, maxValue, stepValue){
	var html = document.getElementById("layerPickerModal").innerHTML;
	html = html + label + ': <input type="range" ' +
		//'onClick="updateLayerAlpha(' + layerName + ', document.getElementById("' + label + '").value)"' +
		' id="' + layerName + '" ' +
		'min="' + minValue + '" ' +
		'max="' + maxValue + '" ' +
		'step="' + stepValue + '" ' +
		'><br>';
	document.getElementById("layerPickerModal").innerHTML = html;

}

addLayerToggleOption("Terra Sea Ice", "terraSeaIce", 0.0, 1.0, 0.1);
addLayerToggleOption("Aqua Sea Ice", "aquaSeaIce", 0.0, 1.0, 0.1);
addLayerToggleOption("Coastlines", "coastlines", 0.0, 1.0, 0.1);
var terraSeaIceSlider = document.getElementById("terraSeaIce");
	terraSeaIceSlider.onclick = function () {
  	  updateLayerAlpha(terraSeaIce, terraSeaIceSlider.value);
	};	
var aquaSeaIceSlider = document.getElementById("aquaSeaIce");
	aquaSeaIceSlider.onclick = function () {
  		updateLayerAlpha(aquaSeaIce, aquaSeaIceSlider.value);
};	
var coastlinesSlider = document.getElementById("coastlines");
	coastlinesSlider.onclick = function () {
	  updateLayerAlpha(coastlines, coastlinesSlider.value);
};	

var e3 = document.getElementById('layerPicker');
e3.onclick = layerPickerModalToggle;

function updateLayerAlpha(layerName, value){
    layerName.alpha = value;
}

