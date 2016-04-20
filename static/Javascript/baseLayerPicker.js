function initBaseLayerPicker() {

    var imageryViewModels = [];

    imageryViewModels.push(new Cesium.ProviderViewModel({
        name : 'Natural Earth\u00a0II',
        iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
        tooltip : 'Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/',
        creationFunction : function() {
            return Cesium.TileMapServiceImageryProvider({
                url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
            });
        }
     }));
/*
    imageryViewModels.push(new Cesium.ProviderViewModel({
        name : 'Natural Earth III',
        iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthIII.jpg'),
        tooltip : 'Natural Earth III, darkened for contrast.\nhhttp://www.shadedrelief.com/natural3/',
        creationFunction : function() {
            return Cesium.TileMapServiceImageryProvider({
                url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthIII')
            });
        }
     }));    
*/
    //Create a CesiumWidget without imagery, if you haven't already done so.
    //var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer', {imageryProvider: false});

    //Finally, create the baseLayerPicker widget using our view models.
    //var layers = viewer.imageryLayers;
    
    //throws ERROR: "Cesium.js:455 Uncaught TypeError: Cannot read property 'defaultAlpha' of undefined"
    var baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
        globe : viewer.scene.globe,
        imageryProviderViewModels : imageryViewModels
    });

    return baseLayerPicker;
}

var baseLayerPicker = initBaseLayerPicker();