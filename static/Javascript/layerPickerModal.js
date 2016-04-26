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

function addLayerToggleOption(label, layerName, minValue, maxValue, stepValue, defaultValue){
	console.log(label, layerName, minValue, maxValue, stepValue);
	var html = document.getElementById("layerPickerModal").innerHTML;
	html = html + label + ': <input type="range" ' +
		//'onClick="updateLayerAlpha(' + layerName + ', document.getElementById("' + label + '").value)"' +
		' id="' + layerName + '" ' +
		'min="' + minValue + '" ' +
		'max="' + maxValue + '" ' +
		'step="' + stepValue + '" ' +
		'value="' + defaultValue + '" ' + 	//default value of alpha on slider
		'><br>';
	document.getElementById("layerPickerModal").innerHTML = html;

}

addLayerToggleOption("Sea Ice", "aquaSeaIce", 0.0, 1.0, 0.1, 1.0);
addLayerToggleOption("Snow Cover", "terraSnowCover", 0.0, 1.0, 0.1, 1.0);
addLayerToggleOption("Soil Temperature", "soilTemperature", 0.0, 1.0, 0.1, 1.0);
addLayerToggleOption("Soil Moisture", "soilMoisture", 0.0, 1.0, 0.1, 0.5);
addLayerToggleOption("Coastlines", "coastlines", 0.0, 1.0, 0.1, 1.0);
addLayerToggleOption("Earth at Night", "night", 0.0, 1.0, 0.1, 0.0);
addLayerToggleOption("Satellite Imagery", "correctedReflectance", 0.0, 1.0, 0.1, 0.0);

var aquaSeaIceSlider = document.getElementById("aquaSeaIce");
aquaSeaIceSlider.onmouseup = function() {
	updateLayerAlpha(aquaSeaIce, aquaSeaIceSlider.value);
};

var terraSnowCoverSlider = document.getElementById("terraSnowCover");
terraSnowCoverSlider.onmouseup = function() {
	updateLayerAlpha(terraSnowCover, terraSnowCoverSlider.value);
};

var soilTemperatureSlider = document.getElementById("soilTemperature");
soilTemperatureSlider.onmouseup = function() {
	updateLayerAlpha(soilTemperature, soilTemperatureSlider.value);
};

var soilMoistureSlider = document.getElementById("soilMoisture");
soilMoistureSlider.onmouseup = function() {
	updateLayerAlpha(soilMoisture, soilMoistureSlider.value);
};

var coastlinesSlider = document.getElementById("coastlines");
coastlinesSlider.onmouseup = function() {
	updateLayerAlpha(coastlines, coastlinesSlider.value);
};

var nightSlider = document.getElementById("night");
nightSlider.onmouseup = function() {
	updateLayerAlpha(night, nightSlider.value);
};

var correctedReflectanceSlider = document.getElementById("correctedReflectance");
correctedReflectanceSlider.onmouseup = function() {
	updateLayerAlpha(correctedReflectance, correctedReflectanceSlider.value);
};

var e3 = document.getElementById('layerPicker');
e3.onclick = layerPickerModalToggle;

function updateLayerAlpha(layerName, value){
    layerName.alpha = value;
}

