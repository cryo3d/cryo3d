var viewer = new Cesium.Viewer('cesiumContainer');

    var layers = viewer.scene.imageryLayers;
    var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
        url : '//cesiumjs.org/tilesets/imagery/blackmarble',
        maximumLevel : 5,
        credit : 'Black Marble imagery courtesy NASA Earth Observatory'
    }));

    layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
    url : 'Images/thecage.png',
    rectangle : Cesium.Rectangle.fromDegrees(-83.0, 38.0, -80.0, 39.75)
}));

var scene = viewer.scene;

var modelMatrix = Cesium.Transforms.westNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, -20.0));