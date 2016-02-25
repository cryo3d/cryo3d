// var js = document.createElement("script");

// js.type = "text/javascript";
// js.src = "../Build/Cesium/Cesium.js"
// js.async = true;

// document.body.appendChild(js);

// console.log(js.type);
// console.log(js.async);


QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
QUnit.test("Viewer initialized", function(assert){

	var viewer = initViewer();

	assert.equal(viewer.animation, undefined);
	assert.equal(viewer.timeline, undefined);

})