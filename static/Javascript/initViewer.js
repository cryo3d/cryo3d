function initViewer(){
    var extent = Cesium.Rectangle.fromDegrees(-99.240573,41.808406,20.313421,86.468825);
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    var viewer = new Cesium.Viewer('cesiumContainer', {
    animation : false,
    timeline : false,
    vrButton: true
    });

    return viewer;
}
 
var viewer = initViewer();
var scene = viewer.scene;

/* Allows us to run our own custom scripts */
viewer.infoBox.frame.removeAttribute('sandbox');	