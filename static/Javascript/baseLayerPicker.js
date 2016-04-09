var imageryViewModels = [];

imageryViewModels.push(new Cesium.ProviderViewModel({
    name : 'Natural Earth II',
    iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
    tooltip : 'Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/',
    creationFunction : function() {
        return Cesium.TileMapServiceImageryProvider({
            url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        });
    }
 }));

//Create a CesiumWidget without imagery, if you haven't already done so.
var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer', {imageryProvider: false});

//Finally, create the baseLayerPicker widget using our view models.
var layers = cesiumWidget.imageryLayers;
var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
    globe : cesiumWidget.scene.globe,
    imageryProviderViewModels : imageryViewModels
});